import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { google } from "googleapis";

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== PASSWORD ====================================================
const APP_PASSWORD = process.env.APP_PASSWORD || "BuffSilverSurfer";

function checkPassword(req) {
  const header = req.headers["x-app-password"];
  const query  = req.query?.password;
  return header === APP_PASSWORD || query === APP_PASSWORD;
}

// ===== LOGGING =====================================================
const LOGS_FILE = path.join(__dirname, "logs.json");
let searchLogs = [];

try {
  if (fs.existsSync(LOGS_FILE)) {
    searchLogs = JSON.parse(fs.readFileSync(LOGS_FILE, "utf8"));
  }
} catch { searchLogs = []; }

function saveLogsToFile() {
  try { fs.writeFileSync(LOGS_FILE, JSON.stringify(searchLogs, null, 2)); } catch {}
}

// ===== GOOGLE SHEETS CHARACTER DATA ================================
const GRANT_SHEET_ID = "1ZMx87XYuw_72vkLjygkCSAnJwTpIz_Z4UPvwjoflUzY";
const GRANT_RANGE    = "Unused Characters!A:A";
const SNAP_SHEET_ID  = "1kLFsyYieH0It5uEdirrzwOXvs7O8UyfbEbfJhSdKp68";
const SNAP_RANGE     = "Card Truth!A:A";

let characterCache = null;
let cacheTime = 0;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

function getGoogleAuth() {
  const credJson = process.env.GOOGLE_SERVICE_ACCOUNT;
  if (!credJson) throw new Error("No GOOGLE_SERVICE_ACCOUNT env var set");
  const credentials = JSON.parse(credJson);
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
}

async function fetchSheetColumn(sheetId, range) {
  const auth = getGoogleAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const response = await sheets.spreadsheets.values.get({ spreadsheetId: sheetId, range });
  // Skip header row, flatten, filter blanks
  return (response.data.values || []).slice(1).map(row => row[0]).filter(Boolean);
}

function normalizeName(name) {
  return String(name).toLowerCase()
    .replace(/\s*\(.*?\)/g, "")
    .replace(/\s*\[.*?\]/g, "")
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

async function loadCharacterData() {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT) {
    console.warn("[SNAP] No GOOGLE_SERVICE_ACCOUNT — character data will use frontend fallback.");
    return null;
  }
  try {
    const [grantRaw, snapRaw] = await Promise.all([
      fetchSheetColumn(GRANT_SHEET_ID, GRANT_RANGE),
      fetchSheetColumn(SNAP_SHEET_ID, SNAP_RANGE),
    ]);
    const snapNormalized = new Set(snapRaw.map(normalizeName));
    // unusedNewCards = in grant AND not already in SNAP
    const unusedNewCards = grantRaw.filter(n => !snapNormalized.has(normalizeName(n)));
    console.log(`[SNAP] Loaded ${grantRaw.length} grant chars, ${snapRaw.length} SNAP cards, ${unusedNewCards.length} unused new cards.`);
    return { grantChars: grantRaw, snapCards: snapRaw, unusedNewCards };
  } catch (err) {
    console.error("[SNAP] Failed to load character data:", err.message);
    return null;
  }
}

async function getCharacterData(forceRefresh = false) {
  if (!forceRefresh && characterCache && (Date.now() - cacheTime) < CACHE_TTL) {
    return characterCache;
  }
  const data = await loadCharacterData();
  if (data) {
    characterCache = data;
    cacheTime = Date.now();
  }
  return characterCache;
}

// Pre-load on startup (non-blocking)
getCharacterData().catch(() => {});

// ===== HTML UTILS =================================================
function escHtml(str) {
  return String(str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// ===== ROUTES =====================================================

// Health check
app.get("/", (_req, res) => res.send("SNAP Season Generator 🎴 Online"));

// ── Auth check
app.get("/api/auth", (req, res) => {
  if (!checkPassword(req)) return res.status(401).json({ ok: false });
  res.json({ ok: true });
});

// ── Character data (requires auth)
app.get("/api/characters", async (req, res) => {
  if (!checkPassword(req)) return res.status(401).json({ error: "Unauthorized" });
  try {
    const data = await getCharacterData();
    res.json({ ok: true, data: data || null });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Generate (requires auth)
app.post("/api/generate", async (req, res) => {
  if (!checkPassword(req)) return res.status(401).json({ error: "Unauthorized" });
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "Missing ANTHROPIC_API_KEY" });

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Slack (requires auth)
app.post("/api/slack", async (req, res) => {
  if (!checkPassword(req)) return res.status(401).json({ error: "Unauthorized" });
  try {
    const token = process.env.SLACK_BOT_TOKEN;
    if (!token) return res.status(500).json({ error: "Missing SLACK_BOT_TOKEN environment variable" });
    const { message, channel } = req.body;
    const response = await fetch("https://slack.com/api/chat.postMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ channel: channel || "C07EXLBDDNE", text: message })
    });
    const data = await response.json();
    if (!data.ok) throw new Error(data.error || "Slack API error");
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Log a search (requires auth)
app.post("/api/log", (req, res) => {
  if (!checkPassword(req)) return res.status(401).json({ error: "Unauthorized" });
  try {
    const entry = {
      timestamp:     new Date().toISOString(),
      theme:         req.body.theme        || "",
      seasonName:    req.body.seasonName   || "",
      confidence:    req.body.confidence   ?? null,
      seasonPass:    req.body.seasonPass   || "",
      newCardsCount: req.body.newCardsCount ?? 0,
      variantCount:  req.body.variantCount  ?? 0,
      wishlistCount: req.body.wishlistCount ?? 0,
    };
    searchLogs.push(entry);
    saveLogsToFile();
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Get all logs as JSON (requires auth)
app.get("/api/logs", (req, res) => {
  if (!checkPassword(req)) return res.status(401).json({ error: "Unauthorized" });
  res.json({ ok: true, logs: searchLogs });
});

// ── Log viewer HTML page (password via query param)
app.get("/logs", (req, res) => {
  if (!checkPassword(req)) {
    return res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Season Generator Logs</title>
  <style>
    body { font-family:'Inter','Segoe UI',sans-serif; background:#020617; color:#f1f5f9;
           display:flex; align-items:center; justify-content:center; height:100vh; margin:0; }
    .box { background:#0f172a; border:1px solid #334155; border-radius:16px; padding:40px;
           text-align:center; max-width:360px; width:100%; }
    h2 { margin:0 0 6px; font-size:20px; font-weight:800; }
    .sub { color:#475569; font-size:12px; margin:0 0 24px; }
    input { width:100%; padding:12px 14px; border-radius:10px; border:1px solid #334155;
            background:#1e293b; color:#f1f5f9; font-size:14px; outline:none;
            margin-bottom:12px; box-sizing:border-box; }
    button { width:100%; padding:12px; border-radius:10px; border:none; cursor:pointer;
             background:linear-gradient(135deg,#6366f1,#8b5cf6); color:#fff;
             font-weight:700; font-size:14px; }
  </style>
</head>
<body>
  <div class="box">
    <div style="font-size:32px;margin-bottom:10px">📊</div>
    <h2>Season Generator Logs</h2>
    <p class="sub">Second Dinner internal use only</p>
    <form method="GET">
      <input name="password" type="password" placeholder="Enter password" autofocus />
      <button type="submit">🔐 View Logs</button>
    </form>
  </div>
</body>
</html>`);
  }

  const confColor = (c) => c >= 75 ? "#4ade80" : c >= 50 ? "#facc15" : "#f87171";
  const pw = req.query?.password || "";

  const rows = searchLogs.slice().reverse().map(l => {
    const d = new Date(l.timestamp).toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
    const c = l.confidence ?? 0;
    return `<tr>
      <td style="color:#64748b;white-space:nowrap;font-size:12px">${escHtml(d)} PT</td>
      <td style="font-weight:600;color:#818cf8">${escHtml(l.theme)}</td>
      <td>${escHtml(l.seasonName)}</td>
      <td style="color:${confColor(c)};font-weight:700;text-align:center">${c}%</td>
      <td style="font-size:12px;color:#94a3b8">${escHtml(l.seasonPass)}</td>
      <td style="text-align:center">${l.newCardsCount}</td>
      <td style="text-align:center">${l.variantCount}</td>
      <td style="text-align:center;color:${l.wishlistCount > 0 ? "#fb923c" : "#64748b"}">${l.wishlistCount}</td>
    </tr>`;
  }).join("");

  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Season Generator — Search Logs</title>
  <style>
    * { box-sizing:border-box; }
    body { font-family:'Inter','Segoe UI',sans-serif; background:#020617; color:#f1f5f9; margin:0; padding:24px; }
    h1 { font-size:22px; font-weight:800; margin-bottom:4px;
         background:linear-gradient(90deg,#818cf8,#f472b6,#fb923c);
         -webkit-background-clip:text; -webkit-text-fill-color:transparent; display:inline-block; }
    .sub { color:#475569; font-size:12px; margin-bottom:20px; }
    a { color:#6366f1; }
    table { width:100%; border-collapse:collapse; font-size:13px; }
    th { text-align:left; padding:8px 12px; border-bottom:1px solid #1e293b;
         color:#64748b; font-size:11px; text-transform:uppercase; letter-spacing:.05em; white-space:nowrap; }
    td { padding:10px 12px; border-bottom:1px solid #0f172a; vertical-align:middle; }
    tr:hover td { background:#0f172a; }
    .empty { text-align:center; color:#475569; padding:60px; }
  </style>
</head>
<body>
  <h1>📊 Season Generator — Search Logs</h1>
  <div class="sub">
    ${searchLogs.length} search${searchLogs.length === 1 ? "" : "es"} logged &nbsp;·&nbsp;
    <a href="/logs?password=${escHtml(pw)}">Refresh</a> &nbsp;·&nbsp;
    <a href="/">Back to app</a>
  </div>
  ${searchLogs.length === 0
    ? '<div class="empty">No searches logged yet. Generate a season to see it here!</div>'
    : `<table>
    <thead>
      <tr>
        <th>Date (PT)</th>
        <th>Theme</th>
        <th>Season Name</th>
        <th style="text-align:center">Confidence</th>
        <th>Season Pass</th>
        <th style="text-align:center">New Cards</th>
        <th style="text-align:center">Variants</th>
        <th style="text-align:center">Wishlist</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>`}
</body>
</html>`);
});

// ===== SERVE FRONTEND =============================================
app.use(express.static(path.join(__dirname, "../dist")));

// Catch-all fallback (Express 5 safe)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`[SNAP] Server running on port ${port}`);
});
