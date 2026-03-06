import { useState, useEffect, useCallback } from "react";

// ─── Theme categories with colors ────────────────────────────────────────────
const THEME_CATEGORIES = [
  { id: "spider",      label: "Spider-Man",      color: "#dc2626" },
  { id: "xmen",        label: "X-Men / Mutants",  color: "#7c3aed" },
  { id: "avengers",    label: "Avengers",          color: "#1d4ed8" },
  { id: "cosmic",      label: "Cosmic / Space",    color: "#0891b2" },
  { id: "magic",       label: "Magic / Mystical",  color: "#9333ea" },
  { id: "street",      label: "Street Level",      color: "#15803d" },
  { id: "villain",     label: "Villains",          color: "#b91c1c" },
  { id: "horror",      label: "Horror / Dark",     color: "#78350f" },
  { id: "scifi",       label: "Sci-Fi / Tech",     color: "#0369a1" },
  { id: "classic",     label: "Classic Marvel",    color: "#a16207" },
  { id: "event",       label: "Events / Crossover",color: "#be185d" },
  { id: "marvel383",   label: "Marvel 383 (SNAP Original)", color: "#4f46e5" },
  { id: "other",       label: "Other",             color: "#475569" },
];

const STATUS_OPTIONS = [
  { id: "idea",          label: "💡 Idea",          color: "#475569", bg: "#1e293b" },
  { id: "brainstorming", label: "🔍 Brainstorming", color: "#0891b2", bg: "#0c2533" },
  { id: "locked",        label: "✅ Locked",         color: "#16a34a", bg: "#052e16" },
  { id: "archived",      label: "📦 Archived",       color: "#64748b", bg: "#0f172a" },
];

const GRANT_OPTIONS = [
  { id: "in_grant",   label: "✅ In-Grant",       color: "#4ade80" },
  { id: "pending",    label: "⏳ Pending Grant",  color: "#facc15" },
  { id: "not_feasible", label: "🚫 Not Feasible", color: "#f87171" },
  { id: "tbd",        label: "❓ TBD",            color: "#94a3b8" },
];

// Generate 30 months starting from Jan 2025
function generateMonths() {
  const months = [];
  const start = new Date(2025, 0, 1);
  for (let i = 0; i < 36; i++) {
    const d = new Date(start);
    d.setMonth(start.getMonth() + i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    months.push({ key, label, year: d.getFullYear(), month: d.getMonth() });
  }
  return months;
}
const MONTHS = generateMonths();

// ─── Helpers ─────────────────────────────────────────────────────────────────
const API_PW = () => sessionStorage.getItem("planner-pw") || "";

async function apiFetch(path, opts = {}) {
  const pw = API_PW();
  const res = await fetch(path, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      "x-app-password": pw,
      ...(opts.headers || {}),
    },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "API error");
  return data;
}

function getCategoryInfo(id) {
  return THEME_CATEGORIES.find(c => c.id === id) || THEME_CATEGORIES[THEME_CATEGORIES.length - 1];
}

function getStatusInfo(id) {
  return STATUS_OPTIONS.find(s => s.id === id) || STATUS_OPTIONS[0];
}

function getGrantInfo(id) {
  return GRANT_OPTIONS.find(g => g.id === id) || GRANT_OPTIONS[GRANT_OPTIONS.length - 1];
}

// ─── Empty Season Template ────────────────────────────────────────────────────
function emptySeason(monthKey) {
  return {
    monthKey: monthKey || "",
    name: "",
    theme: "",
    themeCategory: "other",
    is383: false,
    status: "idea",
    grantViability: "tbd",
    characters: "",
    seasonPass: "",
    confidence: 50,
    recognizability: 50,
    slackUrl: "",
    notes: "",
    deadlines: {
      brainstorming: "",
      characterFinalization: "",
      seasonLock: "",
    },
  };
}

function emptyIdea() {
  return {
    name: "",
    theme: "",
    themeCategory: "other",
    is383: false,
    grantViability: "tbd",
    confidence: 50,
    notes: "",
    priority: 50,
  };
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
    }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: "#0f172a", border: "1px solid #334155", borderRadius: 16,
        padding: 28, width: "100%", maxWidth: 680, maxHeight: "90vh",
        overflowY: "auto", position: "relative",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ fontWeight: 800, fontSize: 18, color: "#f1f5f9" }}>{title}</div>
          <button onClick={onClose} style={{
            background: "none", border: "none", color: "#64748b", fontSize: 20,
            cursor: "pointer", lineHeight: 1, padding: "0 4px",
          }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Form components ──────────────────────────────────────────────────────────
const inputStyle = {
  width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #334155",
  background: "#1e293b", color: "#f1f5f9", fontSize: 13, outline: "none",
  boxSizing: "border-box", fontFamily: "inherit",
};

const labelStyle = { display: "block", marginBottom: 6, fontSize: 11, fontWeight: 600,
  color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" };

function FormRow({ label, children, half }) {
  return (
    <div style={{ marginBottom: 14, ...(half ? { flex: 1 } : {}) }}>
      {label && <label style={labelStyle}>{label}</label>}
      {children}
    </div>
  );
}

function FormGrid({ children }) {
  return <div style={{ display: "flex", gap: 12 }}>{children}</div>;
}

// ─── Season Edit Modal ────────────────────────────────────────────────────────
function SeasonEditModal({ season, onSave, onDelete, onClose, isNew }) {
  const [form, setForm] = useState(season);
  const [saving, setSaving] = useState(false);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const setDeadline = (key, val) => setForm(f => ({ ...f, deadlines: { ...f.deadlines, [key]: val } }));

  const handleSave = async () => {
    setSaving(true);
    try { await onSave(form); onClose(); }
    catch (e) { alert("Save failed: " + e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this season?")) return;
    await onDelete(season.id);
    onClose();
  };

  const cat = getCategoryInfo(form.themeCategory);

  return (
    <Modal title={isNew ? "➕ Add Season" : "✏️ Edit Season"} onClose={onClose}>
      <FormRow label="Month">
        <select value={form.monthKey} onChange={e => set("monthKey", e.target.value)} style={inputStyle}>
          <option value="">— Unscheduled —</option>
          {MONTHS.map(m => <option key={m.key} value={m.key}>{m.label}</option>)}
        </select>
      </FormRow>

      <FormGrid>
        <FormRow label="Season Name" half>
          <input style={inputStyle} value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Season of the Cosmic" />
        </FormRow>
        <FormRow label="Theme" half>
          <input style={inputStyle} value={form.theme} onChange={e => set("theme", e.target.value)} placeholder="e.g. Guardians of the Galaxy" />
        </FormRow>
      </FormGrid>

      <FormRow label="Theme Category">
        <select value={form.themeCategory} onChange={e => set("themeCategory", e.target.value)} style={{ ...inputStyle, borderColor: cat.color }}>
          {THEME_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
      </FormRow>

      <FormGrid>
        <FormRow label="Status" half>
          <select value={form.status} onChange={e => set("status", e.target.value)} style={inputStyle}>
            {STATUS_OPTIONS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </FormRow>
        <FormRow label="Grant Viability" half>
          <select value={form.grantViability} onChange={e => set("grantViability", e.target.value)} style={inputStyle}>
            {GRANT_OPTIONS.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
          </select>
        </FormRow>
      </FormGrid>

      <FormRow label="Marvel 383 / SNAP Original">
        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", color: form.is383 ? "#818cf8" : "#94a3b8", fontSize: 13 }}>
          <input type="checkbox" checked={form.is383} onChange={e => set("is383", e.target.checked)}
            style={{ width: 16, height: 16, accentColor: "#818cf8" }} />
          This is a Marvel 383 season (SNAP original with reprinted characters)
        </label>
      </FormRow>

      <FormGrid>
        <FormRow label={`Confidence: ${form.confidence}%`} half>
          <input type="range" min={0} max={100} value={form.confidence}
            onChange={e => set("confidence", +e.target.value)}
            style={{ width: "100%", accentColor: "#6366f1" }} />
        </FormRow>
        <FormRow label={`Recognizability: ${form.recognizability}%`} half>
          <input type="range" min={0} max={100} value={form.recognizability}
            onChange={e => set("recognizability", +e.target.value)}
            style={{ width: "100%", accentColor: "#f472b6" }} />
        </FormRow>
      </FormGrid>

      <FormRow label="Season Pass Character">
        <input style={inputStyle} value={form.seasonPass} onChange={e => set("seasonPass", e.target.value)} placeholder="e.g. Star-Lord" />
      </FormRow>

      <FormRow label="Character List (comma or newline separated)">
        <textarea style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
          value={form.characters} onChange={e => set("characters", e.target.value)}
          placeholder="Gamora, Drax, Nebula, Rocket..." />
      </FormRow>

      <div style={{ fontSize: 12, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10, marginTop: 4 }}>
        Deadlines
      </div>
      <FormGrid>
        <FormRow label="Brainstorming Meeting" half>
          <input type="date" style={inputStyle} value={form.deadlines?.brainstorming || ""}
            onChange={e => setDeadline("brainstorming", e.target.value)} />
        </FormRow>
        <FormRow label="Character Finalization" half>
          <input type="date" style={inputStyle} value={form.deadlines?.characterFinalization || ""}
            onChange={e => setDeadline("characterFinalization", e.target.value)} />
        </FormRow>
      </FormGrid>
      <FormRow label="Season Lock Date">
        <input type="date" style={{ ...inputStyle, maxWidth: 200 }} value={form.deadlines?.seasonLock || ""}
          onChange={e => setDeadline("seasonLock", e.target.value)} />
      </FormRow>

      <FormRow label="Slack Thread URL">
        <input style={inputStyle} type="url" value={form.slackUrl} onChange={e => set("slackUrl", e.target.value)}
          placeholder="https://seconddinner.slack.com/archives/..." />
      </FormRow>

      <FormRow label="Notes">
        <textarea style={{ ...inputStyle, minHeight: 64, resize: "vertical" }}
          value={form.notes} onChange={e => set("notes", e.target.value)}
          placeholder="Any additional context, ideas, concerns..." />
      </FormRow>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20, gap: 10 }}>
        <div>
          {!isNew && (
            <button onClick={handleDelete} style={{
              background: "none", border: "1px solid #7f1d1d", color: "#f87171",
              borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13,
            }}>🗑 Delete</button>
          )}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={onClose} style={{
            background: "none", border: "1px solid #334155", color: "#94a3b8",
            borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13,
          }}>Cancel</button>
          <button onClick={handleSave} disabled={saving} style={{
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none",
            color: "#fff", borderRadius: 8, padding: "8px 20px", cursor: "pointer",
            fontSize: 13, fontWeight: 700, opacity: saving ? 0.6 : 1,
          }}>{saving ? "Saving…" : "Save Season"}</button>
        </div>
      </div>
    </Modal>
  );
}

// ─── Idea Edit Modal ──────────────────────────────────────────────────────────
function IdeaEditModal({ idea, onSave, onDelete, onClose, isNew, onPromote }) {
  const [form, setForm] = useState(idea);
  const [saving, setSaving] = useState(false);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSave = async () => {
    setSaving(true);
    try { await onSave(form); onClose(); }
    catch (e) { alert("Save failed: " + e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this idea?")) return;
    await onDelete(idea.id);
    onClose();
  };

  const cat = getCategoryInfo(form.themeCategory);

  return (
    <Modal title={isNew ? "➕ New Idea" : "✏️ Edit Idea"} onClose={onClose}>
      <FormGrid>
        <FormRow label="Theme Name" half>
          <input style={inputStyle} value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Symbiotes" />
        </FormRow>
        <FormRow label="Theme Detail" half>
          <input style={inputStyle} value={form.theme} onChange={e => set("theme", e.target.value)} placeholder="Broader description" />
        </FormRow>
      </FormGrid>

      <FormRow label="Theme Category">
        <select value={form.themeCategory} onChange={e => set("themeCategory", e.target.value)} style={{ ...inputStyle, borderColor: cat.color }}>
          {THEME_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
      </FormRow>

      <FormGrid>
        <FormRow label="Grant Viability" half>
          <select value={form.grantViability} onChange={e => set("grantViability", e.target.value)} style={inputStyle}>
            {GRANT_OPTIONS.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
          </select>
        </FormRow>
        <FormRow label={`Priority: ${form.priority}`} half>
          <input type="range" min={0} max={100} value={form.priority}
            onChange={e => set("priority", +e.target.value)}
            style={{ width: "100%", accentColor: "#f472b6" }} />
        </FormRow>
      </FormGrid>

      <FormRow label={`Confidence: ${form.confidence}%`}>
        <input type="range" min={0} max={100} value={form.confidence}
          onChange={e => set("confidence", +e.target.value)}
          style={{ width: "100%", accentColor: "#6366f1" }} />
      </FormRow>

      <FormRow label="Marvel 383 / SNAP Original">
        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", color: form.is383 ? "#818cf8" : "#94a3b8", fontSize: 13 }}>
          <input type="checkbox" checked={form.is383} onChange={e => set("is383", e.target.checked)}
            style={{ width: 16, height: 16, accentColor: "#818cf8" }} />
          This is a Marvel 383 concept
        </label>
      </FormRow>

      <FormRow label="Notes / Character Ideas">
        <textarea style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
          value={form.notes} onChange={e => set("notes", e.target.value)}
          placeholder="Any initial character ideas, references, or context..." />
      </FormRow>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20, gap: 10 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {!isNew && (
            <button onClick={handleDelete} style={{
              background: "none", border: "1px solid #7f1d1d", color: "#f87171",
              borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13,
            }}>🗑 Delete</button>
          )}
          {!isNew && onPromote && (
            <button onClick={() => { onPromote(form); onClose(); }} style={{
              background: "none", border: "1px solid #0369a1", color: "#38bdf8",
              borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13,
            }}>📅 Schedule Season</button>
          )}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={onClose} style={{
            background: "none", border: "1px solid #334155", color: "#94a3b8",
            borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13,
          }}>Cancel</button>
          <button onClick={handleSave} disabled={saving} style={{
            background: "linear-gradient(135deg,#0891b2,#6366f1)", border: "none",
            color: "#fff", borderRadius: 8, padding: "8px 20px", cursor: "pointer",
            fontSize: 13, fontWeight: 700, opacity: saving ? 0.6 : 1,
          }}>{saving ? "Saving…" : "Save Idea"}</button>
        </div>
      </div>
    </Modal>
  );
}

// ─── Deadline Dots ────────────────────────────────────────────────────────────
function DeadlineDots({ deadlines }) {
  if (!deadlines) return null;
  const today = new Date().toISOString().slice(0, 10);
  const items = [
    { key: "brainstorming",        label: "Brainstorm",      color: "#38bdf8" },
    { key: "characterFinalization", label: "Char. Final.",    color: "#fb923c" },
    { key: "seasonLock",           label: "Season Lock",     color: "#f87171" },
  ].filter(d => deadlines[d.key]);

  if (!items.length) return null;
  return (
    <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 4 }}>
      {items.map(d => {
        const isPast = deadlines[d.key] < today;
        const isSoon = !isPast && deadlines[d.key] <= new Date(Date.now() + 14 * 864e5).toISOString().slice(0, 10);
        return (
          <div key={d.key} title={`${d.label}: ${deadlines[d.key]}`} style={{
            fontSize: 9, padding: "1px 5px", borderRadius: 4, fontWeight: 700,
            background: isPast ? "#1e293b" : isSoon ? d.color + "33" : "#1e293b",
            color: isPast ? "#475569" : isSoon ? d.color : "#64748b",
            border: `1px solid ${isPast ? "#1e293b" : d.color + "55"}`,
          }}>
            {isSoon && "⚡ "}{d.label.split(" ")[0]}
          </div>
        );
      })}
    </div>
  );
}

// ─── Season Card (in timeline) ────────────────────────────────────────────────
function SeasonCard({ season, onEdit, adjacentConflict }) {
  const cat  = getCategoryInfo(season.themeCategory);
  const stat = getStatusInfo(season.status);
  const grant = getGrantInfo(season.grantViability);
  const chars = season.characters ? season.characters.split(/[,\n]+/).map(s => s.trim()).filter(Boolean) : [];

  return (
    <div onClick={() => onEdit(season)} style={{
      background: "#0f172a",
      border: `1px solid ${season.status === "locked" ? "#16a34a" : "#1e293b"}`,
      borderLeft: `3px solid ${cat.color}`,
      borderRadius: 10, padding: "10px 12px", cursor: "pointer", marginBottom: 8,
      transition: "all 0.15s",
      boxShadow: season.status === "locked" ? "0 0 0 1px #052e16" : "none",
    }}
      onMouseEnter={e => e.currentTarget.style.background = "#1e293b"}
      onMouseLeave={e => e.currentTarget.style.background = "#0f172a"}
    >
      {/* Header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: "#f1f5f9", lineHeight: 1.3 }}>
            {season.is383 && <span title="Marvel 383 / SNAP Original" style={{ color: "#818cf8", marginRight: 4 }}>⬡</span>}
            {season.name || <span style={{ color: "#475569" }}>Unnamed Season</span>}
          </div>
          {season.theme && (
            <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{season.theme}</div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3, flexShrink: 0 }}>
          <div style={{ fontSize: 10, padding: "2px 6px", borderRadius: 4, background: stat.bg, color: stat.color, fontWeight: 700 }}>
            {stat.label}
          </div>
        </div>
      </div>

      {/* Category + Grant + conflict */}
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 6, alignItems: "center" }}>
        <div style={{ fontSize: 9, padding: "1px 6px", borderRadius: 4, background: cat.color + "22", color: cat.color, fontWeight: 700, border: `1px solid ${cat.color}44` }}>
          {cat.label}
        </div>
        <div style={{ fontSize: 9, padding: "1px 6px", borderRadius: 4, color: grant.color, fontWeight: 700, border: `1px solid ${grant.color}44` }}>
          {grant.label}
        </div>
        {adjacentConflict && (
          <div title="Adjacent season has the same theme category!" style={{ fontSize: 10, color: "#fb923c" }}>⚠️ Repeat Theme</div>
        )}
      </div>

      {/* Season Pass */}
      {season.seasonPass && (
        <div style={{ fontSize: 10, color: "#f59e0b", marginTop: 5 }}>
          🌟 Season Pass: <span style={{ color: "#fcd34d" }}>{season.seasonPass}</span>
        </div>
      )}

      {/* Characters preview */}
      {chars.length > 0 && (
        <div style={{ marginTop: 5, display: "flex", flexWrap: "wrap", gap: 3 }}>
          {chars.slice(0, 8).map((c, i) => (
            <div key={i} style={{ fontSize: 9, padding: "1px 5px", background: "#1e293b", border: "1px solid #334155", borderRadius: 4, color: "#94a3b8" }}>
              {c}
            </div>
          ))}
          {chars.length > 8 && <div style={{ fontSize: 9, color: "#475569" }}>+{chars.length - 8} more</div>}
        </div>
      )}

      {/* Scores */}
      <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
        <div style={{ fontSize: 10, color: "#64748b" }}>
          Confidence: <span style={{ color: season.confidence >= 70 ? "#4ade80" : season.confidence >= 40 ? "#facc15" : "#f87171", fontWeight: 700 }}>
            {season.confidence}%
          </span>
        </div>
        <div style={{ fontSize: 10, color: "#64748b" }}>
          Recognizability: <span style={{ color: "#818cf8", fontWeight: 700 }}>{season.recognizability}%</span>
        </div>
      </div>

      {/* Deadlines */}
      <DeadlineDots deadlines={season.deadlines} />

      {/* Slack link */}
      {season.slackUrl && (
        <div style={{ marginTop: 5 }}>
          <a href={season.slackUrl} target="_blank" rel="noreferrer"
            onClick={e => e.stopPropagation()}
            style={{ fontSize: 10, color: "#6366f1" }}>
            💬 Slack Thread
          </a>
        </div>
      )}
    </div>
  );
}

// ─── Idea Card (in backlog) ───────────────────────────────────────────────────
function IdeaCard({ idea, onEdit }) {
  const cat   = getCategoryInfo(idea.themeCategory);
  const grant = getGrantInfo(idea.grantViability);

  return (
    <div onClick={() => onEdit(idea)} style={{
      background: "#0f172a", border: "1px solid #1e293b",
      borderLeft: `3px solid ${cat.color}`,
      borderRadius: 10, padding: "10px 12px", cursor: "pointer", marginBottom: 8,
    }}
      onMouseEnter={e => e.currentTarget.style.background = "#1e293b"}
      onMouseLeave={e => e.currentTarget.style.background = "#0f172a"}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: "#e2e8f0" }}>
          {idea.is383 && <span style={{ color: "#818cf8", marginRight: 4 }}>⬡</span>}
          {idea.name || <span style={{ color: "#475569" }}>Unnamed Idea</span>}
        </div>
        <div style={{ fontSize: 10, color: "#f472b6", fontWeight: 700 }}>P{idea.priority}</div>
      </div>
      {idea.theme && <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{idea.theme}</div>}
      <div style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
        <div style={{ fontSize: 9, padding: "1px 6px", borderRadius: 4, background: cat.color + "22", color: cat.color, fontWeight: 700 }}>
          {cat.label}
        </div>
        <div style={{ fontSize: 9, padding: "1px 6px", borderRadius: 4, color: grant.color, fontWeight: 700, border: `1px solid ${grant.color}44` }}>
          {grant.label}
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
        <div style={{ fontSize: 10, color: "#64748b" }}>
          Confidence: <span style={{ color: idea.confidence >= 70 ? "#4ade80" : idea.confidence >= 40 ? "#facc15" : "#f87171", fontWeight: 700 }}>{idea.confidence}%</span>
        </div>
      </div>
      {idea.notes && <div style={{ fontSize: 10, color: "#475569", marginTop: 5, lineHeight: 1.4 }}>{idea.notes.slice(0, 100)}{idea.notes.length > 100 ? "…" : ""}</div>}
    </div>
  );
}

// ─── Login Screen ─────────────────────────────────────────────────────────────
function PlannerLogin({ onLogin }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const attempt = async () => {
    setLoading(true); setErr("");
    sessionStorage.setItem("planner-pw", pw);
    try {
      const data = await apiFetch("/api/auth");
      if (data.ok) onLogin();
      else { setErr("Incorrect password."); sessionStorage.removeItem("planner-pw"); }
    } catch { setErr("Could not reach server."); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#020617", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <div style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 16, padding: 40, width: "100%", maxWidth: 360, textAlign: "center" }}>
        <div style={{ fontSize: 36, marginBottom: 10 }}>📅</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#f1f5f9", marginBottom: 4 }}>Season Planning Board</div>
        <div style={{ fontSize: 12, color: "#475569", marginBottom: 24 }}>Second Dinner internal use only</div>
        <input type="password" value={pw} onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === "Enter" && attempt()}
          placeholder="Enter password"
          style={{ ...inputStyle, marginBottom: 12, textAlign: "center" }}
          autoFocus />
        {err && <div style={{ color: "#f87171", fontSize: 12, marginBottom: 8 }}>{err}</div>}
        <button onClick={attempt} disabled={loading || !pw} style={{
          width: "100%", padding: 12, borderRadius: 10, border: "none", cursor: "pointer",
          background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff",
          fontWeight: 700, fontSize: 14, opacity: (!pw || loading) ? 0.6 : 1,
        }}>{loading ? "Checking…" : "🔐 Enter Board"}</button>
        <div style={{ marginTop: 16 }}>
          <a href="/" style={{ fontSize: 11, color: "#475569" }}>← Back to Season Generator</a>
        </div>
      </div>
    </div>
  );
}

// ─── Main PlannerBoard ────────────────────────────────────────────────────────
export default function PlannerBoard() {
  const [authed, setAuthed] = useState(false);
  const [seasons, setSeasons] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("timeline"); // "timeline" | "backlog"
  const [editSeason, setEditSeason] = useState(null);
  const [editIdea, setEditIdea] = useState(null);
  const [isNewSeason, setIsNewSeason] = useState(false);
  const [isNewIdea, setIsNewIdea] = useState(false);
  const [ideaSort, setIdeaSort] = useState("priority");
  const [filterCategory, setFilterCategory] = useState("all");

  // Check if already authed in this session
  useEffect(() => {
    const pw = sessionStorage.getItem("planner-pw");
    if (pw) {
      apiFetch("/api/auth").then(d => { if (d.ok) setAuthed(true); }).catch(() => {});
    }
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const d = await apiFetch("/api/planner");
      setSeasons(d.seasons || []);
      setIdeas(d.ideas || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { if (authed) loadData(); }, [authed, loadData]);

  // ── Season CRUD
  const openNewSeason = (monthKey) => {
    setEditSeason(emptySeason(monthKey));
    setIsNewSeason(true);
  };

  const openEditSeason = (season) => {
    setEditSeason({ ...season });
    setIsNewSeason(false);
  };

  const saveSeason = async (form) => {
    if (isNewSeason) {
      const d = await apiFetch("/api/planner/seasons", { method: "POST", body: form });
      setSeasons(prev => [...prev, d.season]);
    } else {
      const d = await apiFetch(`/api/planner/seasons/${form.id}`, { method: "PUT", body: form });
      setSeasons(prev => prev.map(s => s.id === d.season.id ? d.season : s));
    }
  };

  const deleteSeason = async (id) => {
    await apiFetch(`/api/planner/seasons/${id}`, { method: "DELETE" });
    setSeasons(prev => prev.filter(s => s.id !== id));
  };

  // ── Idea CRUD
  const openNewIdea = () => {
    setEditIdea(emptyIdea());
    setIsNewIdea(true);
  };

  const openEditIdea = (idea) => {
    setEditIdea({ ...idea });
    setIsNewIdea(false);
  };

  const saveIdea = async (form) => {
    if (isNewIdea) {
      const d = await apiFetch("/api/planner/ideas", { method: "POST", body: form });
      setIdeas(prev => [...prev, d.idea]);
    } else {
      const d = await apiFetch(`/api/planner/ideas/${form.id}`, { method: "PUT", body: form });
      setIdeas(prev => prev.map(i => i.id === d.idea.id ? d.idea : i));
    }
  };

  const deleteIdea = async (id) => {
    await apiFetch(`/api/planner/ideas/${id}`, { method: "DELETE" });
    setIdeas(prev => prev.filter(i => i.id !== id));
  };

  // Promote idea → new scheduled season
  const promoteIdea = (idea) => {
    setEditIdea(null);
    const s = emptySeason("");
    s.name = idea.name;
    s.theme = idea.theme;
    s.themeCategory = idea.themeCategory;
    s.is383 = idea.is383;
    s.grantViability = idea.grantViability;
    s.confidence = idea.confidence;
    s.notes = idea.notes;
    setEditSeason(s);
    setIsNewSeason(true);
  };

  // ── Conflict detection: same category in adjacent months
  const seasonsByMonth = {};
  seasons.forEach(s => {
    if (s.monthKey) {
      if (!seasonsByMonth[s.monthKey]) seasonsByMonth[s.monthKey] = [];
      seasonsByMonth[s.monthKey].push(s);
    }
  });

  const hasAdjacentConflict = (season) => {
    if (!season.monthKey || season.themeCategory === "other") return false;
    const idx = MONTHS.findIndex(m => m.key === season.monthKey);
    const neighbors = [];
    if (idx > 0) neighbors.push(MONTHS[idx - 1].key);
    if (idx < MONTHS.length - 1) neighbors.push(MONTHS[idx + 1].key);
    return neighbors.some(mk =>
      (seasonsByMonth[mk] || []).some(s => s.id !== season.id && s.themeCategory === season.themeCategory)
    );
  };

  // ── Sorted ideas
  const sortedIdeas = [...ideas].sort((a, b) => {
    if (ideaSort === "priority") return b.priority - a.priority;
    if (ideaSort === "confidence") return b.confidence - a.confidence;
    if (ideaSort === "name") return (a.name || "").localeCompare(b.name || "");
    return 0;
  }).filter(i => filterCategory === "all" || i.themeCategory === filterCategory);

  if (!authed) return <PlannerLogin onLogin={() => setAuthed(true)} />;

  // ── Render
  const totalScheduled = seasons.filter(s => s.monthKey).length;
  const totalLocked = seasons.filter(s => s.status === "locked").length;

  return (
    <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "'Inter','Segoe UI',sans-serif", color: "#f1f5f9" }}>
      {/* Header */}
      <div style={{ background: "#0f172a", borderBottom: "1px solid #1e293b", padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{
            fontSize: 20, fontWeight: 800,
            background: "linear-gradient(90deg,#818cf8,#f472b6,#fb923c)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "inline-block",
          }}>📅 Season Planning Board</div>
          <div style={{ fontSize: 11, color: "#475569", marginTop: 2 }}>
            {totalScheduled} scheduled · {totalLocked} locked · {ideas.length} ideas in backlog
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <a href="/" style={{ fontSize: 12, color: "#475569", textDecoration: "none", padding: "6px 12px", border: "1px solid #334155", borderRadius: 8 }}>
            ← Generator
          </a>
          <button onClick={() => { setView("timeline"); }} style={{
            fontSize: 12, padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontWeight: 600,
            background: view === "timeline" ? "#6366f1" : "none",
            color: view === "timeline" ? "#fff" : "#64748b",
            border: `1px solid ${view === "timeline" ? "#6366f1" : "#334155"}`,
          }}>📅 Timeline</button>
          <button onClick={() => setView("backlog")} style={{
            fontSize: 12, padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontWeight: 600,
            background: view === "backlog" ? "#f472b6" : "none",
            color: view === "backlog" ? "#fff" : "#64748b",
            border: `1px solid ${view === "backlog" ? "#f472b6" : "#334155"}`,
          }}>💡 Backlog ({ideas.length})</button>
        </div>
      </div>

      {/* Legend */}
      <div style={{ background: "#0a0f1e", borderBottom: "1px solid #0f172a", padding: "8px 24px", display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ fontSize: 10, color: "#475569", fontWeight: 700, textTransform: "uppercase" }}>Categories:</div>
        {THEME_CATEGORIES.map(c => (
          <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: c.color }} />
            <div style={{ fontSize: 10, color: "#64748b" }}>{c.label}</div>
          </div>
        ))}
        <div style={{ marginLeft: "auto", fontSize: 10, color: "#475569" }}>
          ⬡ = Marvel 383 &nbsp; ⚠️ = Repeat theme adjacent
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: "center", color: "#475569", padding: 40, fontSize: 13 }}>Loading…</div>
      )}

      {/* ── TIMELINE VIEW ── */}
      {view === "timeline" && !loading && (
        <div style={{ padding: "20px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 0 }}>
            {MONTHS.map((month, idx) => {
              const monthSeasons = (seasonsByMonth[month.key] || []);
              const isCurrentMonth = month.key === new Date().toISOString().slice(0, 7);
              return (
                <div key={month.key} style={{ display: "contents" }}>
                  {/* Month label */}
                  <div style={{
                    padding: "12px 16px 12px 0",
                    borderRight: `2px solid ${isCurrentMonth ? "#6366f1" : "#1e293b"}`,
                    borderBottom: "1px solid #0f172a",
                    display: "flex", alignItems: "flex-start", justifyContent: "flex-end",
                  }}>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: isCurrentMonth ? 13 : 12, fontWeight: isCurrentMonth ? 800 : 600, color: isCurrentMonth ? "#818cf8" : "#475569" }}>
                        {month.label.split(" ")[0]}
                      </div>
                      <div style={{ fontSize: 11, color: isCurrentMonth ? "#6366f1" : "#334155" }}>
                        {month.label.split(" ")[1]}
                      </div>
                      {isCurrentMonth && <div style={{ fontSize: 9, color: "#6366f1", fontWeight: 700 }}>NOW</div>}
                    </div>
                  </div>

                  {/* Season cards for this month */}
                  <div style={{ padding: "10px 0 10px 16px", borderBottom: "1px solid #0f172a", minHeight: 60 }}>
                    {monthSeasons.map(season => (
                      <SeasonCard
                        key={season.id}
                        season={season}
                        onEdit={openEditSeason}
                        adjacentConflict={hasAdjacentConflict(season)}
                      />
                    ))}
                    <button onClick={() => openNewSeason(month.key)} style={{
                      background: "none", border: "1px dashed #1e293b", color: "#334155",
                      borderRadius: 8, padding: "4px 10px", fontSize: 11, cursor: "pointer",
                      width: "100%", textAlign: "left",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "#6366f1"; e.currentTarget.style.color = "#6366f1"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e293b"; e.currentTarget.style.color = "#334155"; }}
                    >
                      + Add season for {month.label}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── BACKLOG VIEW ── */}
      {view === "backlog" && !loading && (
        <div style={{ padding: "20px 24px", maxWidth: 880, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#f1f5f9" }}>💡 Ideas Backlog</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {/* Filter by category */}
              <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} style={{ ...inputStyle, width: "auto", fontSize: 12 }}>
                <option value="all">All Categories</option>
                {THEME_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
              {/* Sort */}
              <select value={ideaSort} onChange={e => setIdeaSort(e.target.value)} style={{ ...inputStyle, width: "auto", fontSize: 12 }}>
                <option value="priority">Sort: Priority</option>
                <option value="confidence">Sort: Confidence</option>
                <option value="name">Sort: Name A–Z</option>
              </select>
              <button onClick={openNewIdea} style={{
                background: "linear-gradient(135deg,#f472b6,#818cf8)", border: "none",
                color: "#fff", borderRadius: 8, padding: "8px 16px", cursor: "pointer",
                fontSize: 12, fontWeight: 700,
              }}>+ New Idea</button>
            </div>
          </div>

          {sortedIdeas.length === 0 ? (
            <div style={{ textAlign: "center", color: "#475569", padding: 60, fontSize: 13 }}>
              No ideas yet. Click <strong style={{ color: "#f472b6" }}>+ New Idea</strong> to add one!
            </div>
          ) : (
            <div style={{ columns: "2 380px", gap: 16 }}>
              {sortedIdeas.map(idea => (
                <div key={idea.id} style={{ breakInside: "avoid", marginBottom: 0 }}>
                  <IdeaCard idea={idea} onEdit={openEditIdea} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Floating add button (timeline) */}
      {view === "timeline" && (
        <button onClick={() => openNewSeason("")} style={{
          position: "fixed", bottom: 24, right: 24,
          background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none",
          color: "#fff", borderRadius: 12, padding: "12px 20px", cursor: "pointer",
          fontSize: 14, fontWeight: 700, boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
        }}>
          + Add Season
        </button>
      )}

      {/* Modals */}
      {editSeason && (
        <SeasonEditModal
          season={editSeason}
          isNew={isNewSeason}
          onSave={saveSeason}
          onDelete={deleteSeason}
          onClose={() => setEditSeason(null)}
        />
      )}
      {editIdea && (
        <IdeaEditModal
          idea={editIdea}
          isNew={isNewIdea}
          onSave={saveIdea}
          onDelete={deleteIdea}
          onClose={() => setEditIdea(null)}
          onPromote={promoteIdea}
        />
      )}
    </div>
  );
}
