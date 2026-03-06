import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

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

// ===== HTML UTILS =================================================
function escHtml(str) {
  return String(str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// ===== ROUTES =====================================================

// ── Auth check
app.get("/api/auth", (req, res) => {
  if (!checkPassword(req)) return res.status(401).json({ ok: false });
  res.json({ ok: true });
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
      submittedBy:   req.body.submittedBy  || "Unknown",
      seasonName:    req.body.seasonName   || "",
      confidence:    req.body.confidence   ?? null,
      seasonPass:    req.body.seasonPass   || "",
      newCardsCount: req.body.newCardsCount ?? 0,
      variantCount:  req.body.variantCount  ?? 0,
      wishlistCount: req.body.wishlistCount ?? 0,
      roster:        req.body.roster       || [],
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

// ── Log viewer HTML page
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

  const rows = searchLogs.slice().reverse().map((l, idx) => {
    const d = new Date(l.timestamp).toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
    const c = l.confidence ?? 0;
    const rosterId = `roster-${idx}`;
    const rosterItems = (l.roster || []);
    const rosterHtml = rosterItems.length
      ? `<div id="${rosterId}" style="display:none;margin-top:6px;padding:8px;background:#0f172a;border-radius:6px;font-size:11px;line-height:1.8">
          ${rosterItems.map(r => {
            const tierColor = r.tier === "Season Pass" ? "#f59e0b" : r.tier === "Series 5" ? "#818cf8" : "#34d399";
            return `<span style="color:${tierColor};margin-right:4px">[${r.tier}]</span><span style="color:#e2e8f0">${escHtml(r.name)}</span><br>`;
          }).join("")}
        </div>
        <button onclick="var el=document.getElementById('${rosterId}');el.style.display=el.style.display==='none'?'block':'none'" 
          style="margin-top:4px;font-size:10px;color:#6366f1;background:none;border:none;cursor:pointer;padding:0">
          ▼ show roster
        </button>`
      : "";
    return `<tr>
      <td style="color:#64748b;white-space:nowrap;font-size:12px">${escHtml(d)} PT</td>
      <td style="font-weight:600;color:#94a3b8;font-size:12px">${escHtml(l.submittedBy || "—")}</td>
      <td style="font-weight:600;color:#818cf8">${escHtml(l.theme)}</td>
      <td>${escHtml(l.seasonName)}<br><div style="font-size:11px;color:#475569">${escHtml(l.seasonPass)}</div>${rosterHtml}</td>
      <td style="color:${confColor(c)};font-weight:700;text-align:center">${c}%</td>
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
    <a href="/logs?password=${escHtml(pw)}">Refresh</a>
  </div>
  ${searchLogs.length === 0
    ? '<div class="empty">No searches logged yet. Generate a season to see it here!</div>'
    : `<table>
    <thead>
      <tr>
        <th>Date (PT)</th><th>By</th><th>Theme</th><th>Season Name</th>
        <th style="text-align:center">Confidence</th>
        <th style="text-align:center">New Cards</th><th style="text-align:center">Variants</th>
        <th style="text-align:center">Wishlist</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>`}
</body>
</html>`);
});

// ===== PLANNER ====================================================
const PLANNER_FILE = path.join(__dirname, "planner.json");
let plannerData = { seasons: [], ideas: [] };

try {
  if (fs.existsSync(PLANNER_FILE)) {
    plannerData = JSON.parse(fs.readFileSync(PLANNER_FILE, "utf8"));
    if (!plannerData.seasons) plannerData.seasons = [];
    if (!plannerData.ideas)   plannerData.ideas   = [];
  }
} catch { plannerData = { seasons: [], ideas: [] }; }

function savePlanner() {
  try { fs.writeFileSync(PLANNER_FILE, JSON.stringify(plannerData, null, 2)); } catch {}
}

function nextId(arr) {
  return arr.length === 0 ? 1 : Math.max(...arr.map(x => x.id || 0)) + 1;
}

// ── Get all planner data
app.get("/api/planner", (req, res) => {
  if (!checkPassword(req)) return res.status(401).json({ error: "Unauthorized" });
  res.json({ ok: true, seasons: plannerData.seasons, ideas: plannerData.ideas });
});

// ── Create season
app.post("/api/planner/seasons", (req, res) => {
  if (!checkPassword(req)) return res.status(401).json({ error: "Unauthorized" });
  const season = { id: nextId(plannerData.seasons), ...req.body, createdAt: new Date().toISOString() };
  plannerData.seasons.push(season);
  savePlanner();
  res.json({ ok: true, season });
});

// ── Update season
app.put("/api/planner/seasons/:id", (req, res) => {
  if (!checkPassword(req)) return res.status(401).json({ error: "Unauthorized" });
  const id = parseInt(req.params.id);
  const idx = plannerData.seasons.findIndex(s => s.id === id);
  if (idx === -1) return res.status(404).json({ error: "Season not found" });
  plannerData.seasons[idx] = { ...plannerData.seasons[idx], ...req.body, id, updatedAt: new Date().toISOString() };
  savePlanner();
  res.json({ ok: true, season: plannerData.seasons[idx] });
});

// ── Delete season
app.delete("/api/planner/seasons/:id", (req, res) => {
  if (!checkPassword(req)) return res.status(401).json({ error: "Unauthorized" });
  const id = parseInt(req.params.id);
  plannerData.seasons = plannerData.seasons.filter(s => s.id !== id);
  savePlanner();
  res.json({ ok: true });
});

// ── Create idea
app.post("/api/planner/ideas", (req, res) => {
  if (!checkPassword(req)) return res.status(401).json({ error: "Unauthorized" });
  const idea = { id: nextId(plannerData.ideas), ...req.body, createdAt: new Date().toISOString() };
  plannerData.ideas.push(idea);
  savePlanner();
  res.json({ ok: true, idea });
});

// ── Update idea
app.put("/api/planner/ideas/:id", (req, res) => {
  if (!checkPassword(req)) return res.status(401).json({ error: "Unauthorized" });
  const id = parseInt(req.params.id);
  const idx = plannerData.ideas.findIndex(i => i.id === id);
  if (idx === -1) return res.status(404).json({ error: "Idea not found" });
  plannerData.ideas[idx] = { ...plannerData.ideas[idx], ...req.body, id, updatedAt: new Date().toISOString() };
  savePlanner();
  res.json({ ok: true, idea: plannerData.ideas[idx] });
});

// ── Delete idea
app.delete("/api/planner/ideas/:id", (req, res) => {
  if (!checkPassword(req)) return res.status(401).json({ error: "Unauthorized" });
  const id = parseInt(req.params.id);
  plannerData.ideas = plannerData.ideas.filter(i => i.id !== id);
  savePlanner();
  res.json({ ok: true });
});

// ===== SERVE FRONTEND =============================================
// NOTE: This must come AFTER all API/page routes so Express serves
// the React app for all non-API paths (including "/").
app.use(express.static(path.join(__dirname, "../dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`[SNAP] Server running on port ${port}`);
});
