import { useState, useEffect, useCallback } from "react";

// ─── Theme categories with colors ────────────────────────────────────────────
const THEME_CATEGORIES = [
  { id: "spider",    label: "Spider-Man",             color: "#dc2626" },
  { id: "xmen",      label: "X-Men / Mutants",        color: "#7c3aed" },
  { id: "avengers",  label: "Avengers",               color: "#1d4ed8" },
  { id: "cosmic",    label: "Cosmic / Space",          color: "#0891b2" },
  { id: "magic",     label: "Magic / Mystical",        color: "#9333ea" },
  { id: "street",    label: "Street Level",            color: "#15803d" },
  { id: "villain",   label: "Villains",                color: "#b91c1c" },
  { id: "horror",    label: "Horror / Dark",           color: "#92400e" },
  { id: "scifi",     label: "Sci-Fi / Tech",           color: "#0369a1" },
  { id: "classic",   label: "Classic Marvel",          color: "#a16207" },
  { id: "event",     label: "Events / Crossover",      color: "#be185d" },
  { id: "marvel383", label: "Marvel 383 (SNAP Original)", color: "#4f46e5" },
  { id: "other",     label: "Other",                   color: "#475569" },
];

const STATUS_OPTIONS = [
  { id: "idea",          label: "💡 Idea",          color: "#475569", bg: "#1e293b" },
  { id: "brainstorming", label: "🔍 Brainstorming", color: "#0891b2", bg: "#0c2533" },
  { id: "locked",        label: "✅ Locked",         color: "#16a34a", bg: "#052e16" },
  { id: "archived",      label: "📦 Archived",       color: "#64748b", bg: "#0f172a" },
];

const GRANT_OPTIONS = [
  { id: "in_grant",     label: "✅ In-Grant",      color: "#4ade80" },
  { id: "pending",      label: "⏳ Pending Grant", color: "#facc15" },
  { id: "not_feasible", label: "🚫 Not Feasible",  color: "#f87171" },
  { id: "tbd",          label: "❓ TBD",           color: "#94a3b8" },
];

// Generate 36 months starting from Jan 2025
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

// ─── API helpers ──────────────────────────────────────────────────────────────
const getPlannerPw = () => sessionStorage.getItem("planner-edit-pw") || "";

async function apiFetch(path, opts = {}) {
  const pw = getPlannerPw();
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
function getStatusInfo(id)  { return STATUS_OPTIONS.find(s => s.id === id) || STATUS_OPTIONS[0]; }
function getGrantInfo(id)   { return GRANT_OPTIONS.find(g => g.id === id) || GRANT_OPTIONS[GRANT_OPTIONS.length - 1]; }

// ─── Empty templates ──────────────────────────────────────────────────────────
function emptySeason(monthKey) {
  return {
    monthKey: monthKey || "",
    name: "", theme: "", themeCategory: "other", is383: false,
    status: "idea", grantViability: "tbd",
    characters: "", seasonPass: "",
    aiConfidence: null, confidenceOverride: null,
    recognizability: 50,
    slackUrl: "", notes: "",
    deadlines: { brainstorming: "", characterFinalization: "", seasonLock: "" },
  };
}
function emptyIdea() {
  return {
    name: "", theme: "", themeCategory: "other", is383: false,
    grantViability: "tbd",
    aiConfidence: null, confidenceOverride: null,
    priority: 50, notes: "", characters: "", seasonPass: "",
  };
}

// Effective confidence value
function effectiveConfidence(item) {
  if (item.confidenceOverride !== null && item.confidenceOverride !== undefined) return item.confidenceOverride;
  if (item.aiConfidence !== null && item.aiConfidence !== undefined) return item.aiConfidence;
  return 50;
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const inputStyle = {
  width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #334155",
  background: "#1e293b", color: "#f1f5f9", fontSize: 13, outline: "none",
  boxSizing: "border-box", fontFamily: "inherit",
};
const labelStyle = {
  display: "block", marginBottom: 6, fontSize: 11, fontWeight: 600,
  color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em",
};

function FormRow({ label, children, half }) {
  return (
    <div style={{ marginBottom: 14, ...(half ? { flex: 1, minWidth: 0 } : {}) }}>
      {label && <label style={labelStyle}>{label}</label>}
      {children}
    </div>
  );
}
function FormGrid({ children }) { return <div style={{ display: "flex", gap: 12 }}>{children}</div>; }

// ─── Modal ────────────────────────────────────────────────────────────────────
function Modal({ title, onClose, children, wide }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
    }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        background: "#0f172a", border: "1px solid #334155", borderRadius: 16,
        padding: 28, width: "100%", maxWidth: wide ? 800 : 680, maxHeight: "92vh",
        overflowY: "auto", position: "relative",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ fontWeight: 800, fontSize: 18, color: "#f1f5f9" }}>{title}</div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#64748b", fontSize: 20, cursor: "pointer" }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Confidence field (AI ref + manual override) ──────────────────────────────
function ConfidenceField({ aiConfidence, confidenceOverride, onChange }) {
  const hasAi       = aiConfidence !== null && aiConfidence !== undefined;
  const isOverridden = confidenceOverride !== null && confidenceOverride !== undefined;
  const displayVal  = isOverridden ? confidenceOverride : (hasAi ? aiConfidence : 50);

  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <label style={labelStyle}>
          Confidence: <span style={{
            color: displayVal >= 70 ? "#4ade80" : displayVal >= 40 ? "#facc15" : "#f87171",
            fontWeight: 800, fontSize: 13,
          }}>{displayVal}%</span>
          {isOverridden && <span style={{ color: "#f472b6", fontSize: 10, marginLeft: 6 }}>✏️ Override</span>}
          {hasAi && !isOverridden && <span style={{ color: "#818cf8", fontSize: 10, marginLeft: 6 }}>🤖 AI</span>}
        </label>
        <div style={{ display: "flex", gap: 6 }}>
          {hasAi && (
            <div style={{ fontSize: 10, color: "#64748b" }}>
              🤖 AI suggested: <span style={{ color: "#818cf8", fontWeight: 700 }}>{aiConfidence}%</span>
            </div>
          )}
          {isOverridden && (
            <button onClick={() => onChange({ confidenceOverride: null })} style={{
              background: "none", border: "1px solid #334155", color: "#94a3b8",
              borderRadius: 4, padding: "1px 7px", cursor: "pointer", fontSize: 10,
            }}>↩ Reset to AI</button>
          )}
        </div>
      </div>
      <input type="range" min={0} max={100}
        value={displayVal}
        onChange={e => onChange({ confidenceOverride: +e.target.value })}
        style={{ width: "100%", accentColor: "#6366f1" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "#334155", marginTop: 2 }}>
        <span>Low</span><span>Medium</span><span>High</span>
      </div>
    </div>
  );
}

// ─── Import from Season Generator section ────────────────────────────────────
function ImportFromGenerator({ onImport }) {
  const [open, setOpen] = useState(false);
  const [raw, setRaw] = useState("");
  const [err, setErr] = useState("");

  const parse = () => {
    setErr("");
    try {
      const data = JSON.parse(raw.trim());
      // Extract fields from Season Generator output
      const chars = [
        ...(data.series5 || []).map(c => c.name),
        ...(data.series4 || []).map(c => c.name),
      ].join(", ");
      const ai = typeof data.confidence === "number" ? data.confidence : null;
      onImport({
        name:             data.seasonName    || "",
        theme:            data.theme         || "",
        seasonPass:       data.seasonPass?.name || "",
        characters:       chars,
        aiConfidence:     ai,
        confidenceOverride: null,
        notes:            data.pitch         || "",
      });
      setOpen(false);
      setRaw("");
    } catch {
      setErr("Could not parse JSON — paste the raw output from the Season Generator.");
    }
  };

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} style={{
        width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px dashed #334155",
        background: "none", color: "#64748b", fontSize: 12, cursor: "pointer", marginBottom: 14,
        textAlign: "left",
      }}>
        📥 Import data from Season Generator (paste JSON)
      </button>
    );
  }

  return (
    <div style={{ marginBottom: 16, background: "#0a1628", border: "1px solid #1e3a5f", borderRadius: 10, padding: 14 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#38bdf8", marginBottom: 8 }}>
        📥 Import from Season Generator
      </div>
      <div style={{ fontSize: 11, color: "#64748b", marginBottom: 8 }}>
        In the Season Generator, use <strong style={{ color: "#94a3b8" }}>⬇ CSV</strong> then copy the JSON from the browser console, or use the browser dev tools to copy the result object. Paste it below.
      </div>
      <textarea value={raw} onChange={e => setRaw(e.target.value)} placeholder='Paste Season Generator JSON here…'
        style={{ ...inputStyle, minHeight: 90, resize: "vertical", fontSize: 11, fontFamily: "monospace" }} />
      {err && <div style={{ color: "#f87171", fontSize: 11, marginTop: 4 }}>{err}</div>}
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button onClick={parse} disabled={!raw.trim()} style={{
          padding: "6px 14px", borderRadius: 6, border: "none", cursor: "pointer",
          background: "#0891b2", color: "#fff", fontSize: 12, fontWeight: 600,
          opacity: raw.trim() ? 1 : 0.5,
        }}>Parse & Fill Form</button>
        <button onClick={() => { setOpen(false); setRaw(""); setErr(""); }} style={{
          padding: "6px 12px", borderRadius: 6, border: "1px solid #334155",
          background: "none", color: "#64748b", fontSize: 12, cursor: "pointer",
        }}>Cancel</button>
      </div>
    </div>
  );
}

// ─── Season Edit Modal ────────────────────────────────────────────────────────
function SeasonEditModal({ season, onSave, onDelete, onClose, isNew }) {
  const [form, setForm] = useState(season);
  const [saving, setSaving] = useState(false);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const setDeadline = (key, val) => setForm(f => ({ ...f, deadlines: { ...f.deadlines, [key]: val } }));
  const handleImport = (fields) => setForm(f => ({ ...f, ...fields }));

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
    <Modal title={isNew ? "➕ Add Season" : "✏️ Edit Season"} onClose={onClose} wide>
      {/* Import helper */}
      <ImportFromGenerator onImport={handleImport} />

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

      {/* Confidence with AI ref + override */}
      <ConfidenceField
        aiConfidence={form.aiConfidence}
        confidenceOverride={form.confidenceOverride}
        onChange={delta => setForm(f => ({ ...f, ...delta }))}
      />

      <FormRow label={`Recognizability: ${form.recognizability}%`}>
        <input type="range" min={0} max={100} value={form.recognizability}
          onChange={e => set("recognizability", +e.target.value)}
          style={{ width: "100%", accentColor: "#f472b6" }} />
      </FormRow>

      <FormRow label="Season Pass Character">
        <input style={inputStyle} value={form.seasonPass} onChange={e => set("seasonPass", e.target.value)} placeholder="e.g. Star-Lord" />
      </FormRow>

      <FormRow label="Character List (comma or newline separated)">
        <textarea style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
          value={form.characters} onChange={e => set("characters", e.target.value)}
          placeholder="Gamora, Drax, Nebula, Rocket..." />
      </FormRow>

      <div style={{ fontSize: 12, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10, marginTop: 4 }}>Deadlines</div>
      <FormGrid>
        <FormRow label="Brainstorming Meeting" half>
          <input type="date" style={inputStyle} value={form.deadlines?.brainstorming || ""} onChange={e => setDeadline("brainstorming", e.target.value)} />
        </FormRow>
        <FormRow label="Character Finalization" half>
          <input type="date" style={inputStyle} value={form.deadlines?.characterFinalization || ""} onChange={e => setDeadline("characterFinalization", e.target.value)} />
        </FormRow>
      </FormGrid>
      <FormRow label="Season Lock Date">
        <input type="date" style={{ ...inputStyle, maxWidth: 200 }} value={form.deadlines?.seasonLock || ""} onChange={e => setDeadline("seasonLock", e.target.value)} />
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

      <ConfidenceField
        aiConfidence={form.aiConfidence}
        confidenceOverride={form.confidenceOverride}
        onChange={delta => setForm(f => ({ ...f, ...delta }))}
      />

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

// ─── Edit Mode Password Dialog ────────────────────────────────────────────────
function EditModeDialog({ onSuccess, onClose }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const attempt = async () => {
    setBusy(true); setErr("");
    sessionStorage.setItem("planner-edit-pw", pw);
    try {
      const res = await fetch("/api/planner-auth", { headers: { "x-app-password": pw } });
      const data = await res.json();
      if (data.ok) { onSuccess(); }
      else { setErr("Incorrect password."); sessionStorage.removeItem("planner-edit-pw"); }
    } catch { setErr("Could not reach server."); }
    finally { setBusy(false); }
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center",
    }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 14, padding: 28, width: 340, textAlign: "center" }}>
        <div style={{ fontSize: 28, marginBottom: 10 }}>🔐</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#f1f5f9", marginBottom: 6 }}>Enter Edit Mode</div>
        <div style={{ fontSize: 12, color: "#475569", marginBottom: 18 }}>A password is required to add or edit seasons and ideas.</div>
        <input type="password" value={pw} onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === "Enter" && pw && attempt()}
          placeholder="Edit password"
          autoFocus
          style={{ ...inputStyle, textAlign: "center", marginBottom: 10 }} />
        {err && <div style={{ color: "#f87171", fontSize: 12, marginBottom: 8 }}>{err}</div>}
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: 10, borderRadius: 8, border: "1px solid #334155",
            background: "none", color: "#94a3b8", fontSize: 13, cursor: "pointer",
          }}>Cancel</button>
          <button onClick={attempt} disabled={busy || !pw} style={{
            flex: 1, padding: 10, borderRadius: 8, border: "none",
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff",
            fontSize: 13, fontWeight: 700, cursor: "pointer", opacity: (!pw || busy) ? 0.6 : 1,
          }}>{busy ? "Checking…" : "Unlock"}</button>
        </div>
      </div>
    </div>
  );
}

// ─── Deadline Dots ────────────────────────────────────────────────────────────
function DeadlineDots({ deadlines }) {
  if (!deadlines) return null;
  const today = new Date().toISOString().slice(0, 10);
  const items = [
    { key: "brainstorming",         label: "Brainstorm",  color: "#38bdf8" },
    { key: "characterFinalization", label: "Char. Final.", color: "#fb923c" },
    { key: "seasonLock",            label: "Season Lock",  color: "#f87171" },
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
            background: isPast ? "#1e293b" : isSoon ? d.color + "22" : "#1e293b",
            color: isPast ? "#334155" : isSoon ? d.color : "#475569",
            border: `1px solid ${isPast ? "#1e293b" : d.color + "44"}`,
          }}>
            {isSoon && "⚡ "}{d.label.split(" ")[0]}
          </div>
        );
      })}
    </div>
  );
}

// ─── Season Card ──────────────────────────────────────────────────────────────
function SeasonCard({ season, onEdit, adjacentConflict, editable }) {
  const cat   = getCategoryInfo(season.themeCategory);
  const stat  = getStatusInfo(season.status);
  const grant = getGrantInfo(season.grantViability);
  const chars = season.characters ? season.characters.split(/[,\n]+/).map(s => s.trim()).filter(Boolean) : [];
  const conf  = effectiveConfidence(season);

  return (
    <div onClick={() => editable && onEdit(season)} style={{
      background: "#0f172a",
      border: `1px solid ${season.status === "locked" ? "#16a34a" : "#1e293b"}`,
      borderLeft: `3px solid ${cat.color}`,
      borderRadius: 10, padding: "10px 12px",
      cursor: editable ? "pointer" : "default",
      marginBottom: 8, transition: "background 0.15s",
      boxShadow: season.status === "locked" ? "0 0 0 1px #052e16" : "none",
    }}
      onMouseEnter={e => editable && (e.currentTarget.style.background = "#1e293b")}
      onMouseLeave={e => (e.currentTarget.style.background = "#0f172a")}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: "#f1f5f9", lineHeight: 1.3 }}>
            {season.is383 && <span title="Marvel 383" style={{ color: "#818cf8", marginRight: 4 }}>⬡</span>}
            {season.name || <span style={{ color: "#475569" }}>Unnamed Season</span>}
          </div>
          {season.theme && <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{season.theme}</div>}
        </div>
        <div style={{ fontSize: 10, padding: "2px 6px", borderRadius: 4, background: stat.bg, color: stat.color, fontWeight: 700, flexShrink: 0 }}>
          {stat.label}
        </div>
      </div>

      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 6, alignItems: "center" }}>
        <div style={{ fontSize: 9, padding: "1px 6px", borderRadius: 4, background: cat.color + "22", color: cat.color, fontWeight: 700, border: `1px solid ${cat.color}44` }}>
          {cat.label}
        </div>
        <div style={{ fontSize: 9, padding: "1px 6px", borderRadius: 4, color: grant.color, fontWeight: 700, border: `1px solid ${grant.color}44` }}>
          {grant.label}
        </div>
        {adjacentConflict && <div title="Adjacent season has same theme!" style={{ fontSize: 10, color: "#fb923c" }}>⚠️ Repeat Theme</div>}
      </div>

      {season.seasonPass && (
        <div style={{ fontSize: 10, color: "#f59e0b", marginTop: 5 }}>
          🌟 <span style={{ color: "#fcd34d" }}>{season.seasonPass}</span>
        </div>
      )}

      {chars.length > 0 && (
        <div style={{ marginTop: 5, display: "flex", flexWrap: "wrap", gap: 3 }}>
          {chars.slice(0, 8).map((c, i) => (
            <div key={i} style={{ fontSize: 9, padding: "1px 5px", background: "#1e293b", border: "1px solid #334155", borderRadius: 4, color: "#94a3b8" }}>{c}</div>
          ))}
          {chars.length > 8 && <div style={{ fontSize: 9, color: "#475569" }}>+{chars.length - 8} more</div>}
        </div>
      )}

      <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
        <div style={{ fontSize: 10, color: "#64748b" }}>
          Confidence: <span style={{ color: conf >= 70 ? "#4ade80" : conf >= 40 ? "#facc15" : "#f87171", fontWeight: 700 }}>
            {conf}%
          </span>
          {season.confidenceOverride !== null && season.confidenceOverride !== undefined && (
            <span style={{ color: "#f472b6", fontSize: 9, marginLeft: 4 }}>✏️</span>
          )}
          {season.aiConfidence !== null && season.aiConfidence !== undefined &&
           (season.confidenceOverride === null || season.confidenceOverride === undefined) && (
            <span style={{ color: "#818cf8", fontSize: 9, marginLeft: 4 }}>🤖</span>
          )}
        </div>
        <div style={{ fontSize: 10, color: "#64748b" }}>
          Recognizability: <span style={{ color: "#818cf8", fontWeight: 700 }}>{season.recognizability ?? 50}%</span>
        </div>
      </div>

      <DeadlineDots deadlines={season.deadlines} />

      {season.slackUrl && (
        <div style={{ marginTop: 5 }}>
          <a href={season.slackUrl} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
            style={{ fontSize: 10, color: "#6366f1" }}>💬 Slack Thread</a>
        </div>
      )}
    </div>
  );
}

// ─── Idea Card ────────────────────────────────────────────────────────────────
function IdeaCard({ idea, onEdit, editable }) {
  const cat   = getCategoryInfo(idea.themeCategory);
  const grant = getGrantInfo(idea.grantViability);
  const conf  = effectiveConfidence(idea);

  return (
    <div onClick={() => editable && onEdit(idea)} style={{
      background: "#0f172a", border: "1px solid #1e293b", borderLeft: `3px solid ${cat.color}`,
      borderRadius: 10, padding: "10px 12px", cursor: editable ? "pointer" : "default", marginBottom: 8,
    }}
      onMouseEnter={e => editable && (e.currentTarget.style.background = "#1e293b")}
      onMouseLeave={e => (e.currentTarget.style.background = "#0f172a")}
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
        <div style={{ fontSize: 9, padding: "1px 6px", borderRadius: 4, background: cat.color + "22", color: cat.color, fontWeight: 700 }}>{cat.label}</div>
        <div style={{ fontSize: 9, padding: "1px 6px", borderRadius: 4, color: grant.color, fontWeight: 700, border: `1px solid ${grant.color}44` }}>{grant.label}</div>
      </div>
      <div style={{ fontSize: 10, color: "#64748b", marginTop: 6 }}>
        Confidence: <span style={{ color: conf >= 70 ? "#4ade80" : conf >= 40 ? "#facc15" : "#f87171", fontWeight: 700 }}>{conf}%</span>
        {idea.aiConfidence !== null && idea.aiConfidence !== undefined && <span style={{ color: "#818cf8", fontSize: 9, marginLeft: 4 }}>🤖</span>}
        {idea.confidenceOverride !== null && idea.confidenceOverride !== undefined && <span style={{ color: "#f472b6", fontSize: 9, marginLeft: 4 }}>✏️</span>}
      </div>
      {idea.notes && <div style={{ fontSize: 10, color: "#475569", marginTop: 5, lineHeight: 1.4 }}>{idea.notes.slice(0, 100)}{idea.notes.length > 100 ? "…" : ""}</div>}
    </div>
  );
}

// ─── Main PlannerBoard ────────────────────────────────────────────────────────
export default function PlannerBoard() {
  const [seasons, setSeasons]   = useState([]);
  const [ideas, setIdeas]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const [view, setView]           = useState("timeline");
  const [editSeason, setEditSeason] = useState(null);
  const [editIdea, setEditIdea]   = useState(null);
  const [isNewSeason, setIsNewSeason] = useState(false);
  const [isNewIdea, setIsNewIdea] = useState(false);
  const [ideaSort, setIdeaSort]   = useState("priority");
  const [filterCategory, setFilterCategory] = useState("all");

  // Load data immediately — no auth needed
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const d = await fetch("/api/planner").then(r => r.json());
      setSeasons(d.seasons || []);
      setIdeas(d.ideas || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  // Check if edit pw is already stored
  useEffect(() => {
    const pw = sessionStorage.getItem("planner-edit-pw");
    if (pw) {
      fetch("/api/planner-auth", { headers: { "x-app-password": pw } })
        .then(r => r.json()).then(d => { if (d.ok) setEditMode(true); })
        .catch(() => {});
    }
  }, []);

  const requireEdit = (fn) => {
    if (!editMode) { setShowEditDialog(true); return; }
    fn();
  };

  // ── Season CRUD
  const openNewSeason = (monthKey) => requireEdit(() => {
    setEditSeason(emptySeason(monthKey));
    setIsNewSeason(true);
  });

  const openEditSeason = (season) => requireEdit(() => {
    setEditSeason({ ...season });
    setIsNewSeason(false);
  });

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
  const openNewIdea  = () => requireEdit(() => { setEditIdea(emptyIdea()); setIsNewIdea(true); });
  const openEditIdea = (idea) => requireEdit(() => { setEditIdea({ ...idea }); setIsNewIdea(false); });

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

  const promoteIdea = (idea) => {
    const s = emptySeason("");
    s.name = idea.name; s.theme = idea.theme; s.themeCategory = idea.themeCategory;
    s.is383 = idea.is383; s.grantViability = idea.grantViability;
    s.aiConfidence = idea.aiConfidence; s.confidenceOverride = idea.confidenceOverride;
    s.notes = idea.notes; s.characters = idea.characters || ""; s.seasonPass = idea.seasonPass || "";
    setEditIdea(null);
    setEditSeason(s);
    setIsNewSeason(true);
  };

  // ── Adjacent conflict detection
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
  const sortedIdeas = [...ideas]
    .filter(i => filterCategory === "all" || i.themeCategory === filterCategory)
    .sort((a, b) => {
      if (ideaSort === "priority")    return b.priority - a.priority;
      if (ideaSort === "confidence")  return effectiveConfidence(b) - effectiveConfidence(a);
      if (ideaSort === "name")        return (a.name || "").localeCompare(b.name || "");
      return 0;
    });

  const totalScheduled = seasons.filter(s => s.monthKey).length;
  const totalLocked    = seasons.filter(s => s.status === "locked").length;

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
            {editMode && <span style={{ color: "#4ade80", marginLeft: 8 }}>✏️ Edit Mode</span>}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <a href="/" style={{ fontSize: 12, color: "#475569", textDecoration: "none", padding: "6px 12px", border: "1px solid #334155", borderRadius: 8 }}>
            ← Generator
          </a>
          {editMode ? (
            <button onClick={() => { setEditMode(false); sessionStorage.removeItem("planner-edit-pw"); }} style={{
              fontSize: 12, padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontWeight: 600,
              background: "#052e16", color: "#4ade80", border: "1px solid #16a34a",
            }}>✏️ Edit Mode: ON</button>
          ) : (
            <button onClick={() => setShowEditDialog(true)} style={{
              fontSize: 12, padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontWeight: 600,
              background: "none", color: "#64748b", border: "1px solid #334155",
            }}>🔐 Edit Mode</button>
          )}
          <button onClick={() => setView("timeline")} style={{
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

      {/* Read-only banner */}
      {!editMode && (
        <div style={{ background: "#0a0f1e", borderBottom: "1px solid #1e293b", padding: "7px 24px", fontSize: 11, color: "#334155", textAlign: "center" }}>
          👁 View-only mode — click <button onClick={() => setShowEditDialog(true)} style={{ background: "none", border: "none", color: "#6366f1", cursor: "pointer", fontSize: 11, fontWeight: 700, padding: 0 }}>🔐 Edit Mode</button> in the header to make changes
        </div>
      )}

      {/* Legend */}
      <div style={{ background: "#0a0f1e", borderBottom: "1px solid #0f172a", padding: "7px 24px", display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ fontSize: 10, color: "#334155", fontWeight: 700, textTransform: "uppercase" }}>Categories:</div>
        {THEME_CATEGORIES.map(c => (
          <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: c.color }} />
            <div style={{ fontSize: 10, color: "#475569" }}>{c.label}</div>
          </div>
        ))}
        <div style={{ marginLeft: "auto", fontSize: 10, color: "#334155" }}>
          ⬡ = Marvel 383 &nbsp;⚠️ = Repeat adjacent &nbsp;🤖 = AI score &nbsp;✏️ = Manual override
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: "center", color: "#475569", padding: 60, fontSize: 13 }}>Loading…</div>
      )}

      {/* ── TIMELINE VIEW ── */}
      {view === "timeline" && !loading && (
        <div style={{ padding: "20px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "155px 1fr", gap: 0 }}>
            {MONTHS.map((month) => {
              const monthSeasons = (seasonsByMonth[month.key] || []);
              const isCurrentMonth = month.key === new Date().toISOString().slice(0, 7);
              return (
                <div key={month.key} style={{ display: "contents" }}>
                  <div style={{
                    padding: "12px 14px 12px 0",
                    borderRight: `2px solid ${isCurrentMonth ? "#6366f1" : "#1e293b"}`,
                    borderBottom: "1px solid #0a0f1e",
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
                  <div style={{ padding: "10px 0 10px 14px", borderBottom: "1px solid #0a0f1e", minHeight: 54 }}>
                    {monthSeasons.map(season => (
                      <SeasonCard key={season.id} season={season} onEdit={openEditSeason}
                        adjacentConflict={hasAdjacentConflict(season)} editable={editMode} />
                    ))}
                    {editMode && (
                      <button onClick={() => openNewSeason(month.key)} style={{
                        background: "none", border: "1px dashed #1e293b", color: "#334155",
                        borderRadius: 8, padding: "4px 10px", fontSize: 11, cursor: "pointer", width: "100%", textAlign: "left",
                      }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "#6366f1"; e.currentTarget.style.color = "#6366f1"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e293b"; e.currentTarget.style.color = "#334155"; }}
                      >+ Add season for {month.label}</button>
                    )}
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
              <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} style={{ ...inputStyle, width: "auto", fontSize: 12 }}>
                <option value="all">All Categories</option>
                {THEME_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
              <select value={ideaSort} onChange={e => setIdeaSort(e.target.value)} style={{ ...inputStyle, width: "auto", fontSize: 12 }}>
                <option value="priority">Sort: Priority</option>
                <option value="confidence">Sort: Confidence</option>
                <option value="name">Sort: Name A–Z</option>
              </select>
              {editMode && (
                <button onClick={openNewIdea} style={{
                  background: "linear-gradient(135deg,#f472b6,#818cf8)", border: "none",
                  color: "#fff", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 12, fontWeight: 700,
                }}>+ New Idea</button>
              )}
            </div>
          </div>

          {sortedIdeas.length === 0 ? (
            <div style={{ textAlign: "center", color: "#475569", padding: 60, fontSize: 13 }}>
              {ideas.length === 0
                ? <>No ideas yet.{editMode ? <> Click <strong style={{ color: "#f472b6" }}>+ New Idea</strong> to add one!</> : " Enter edit mode to add ideas."}</>
                : "No ideas match the current filter."
              }
            </div>
          ) : (
            <div style={{ columns: "2 380px", gap: 16 }}>
              {sortedIdeas.map(idea => (
                <div key={idea.id} style={{ breakInside: "avoid", marginBottom: 0 }}>
                  <IdeaCard idea={idea} onEdit={openEditIdea} editable={editMode} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Floating add button (edit mode, timeline) */}
      {view === "timeline" && editMode && (
        <button onClick={() => openNewSeason("")} style={{
          position: "fixed", bottom: 24, right: 24,
          background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none",
          color: "#fff", borderRadius: 12, padding: "12px 20px", cursor: "pointer",
          fontSize: 14, fontWeight: 700, boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
        }}>+ Add Season</button>
      )}

      {/* Edit mode dialog */}
      {showEditDialog && (
        <EditModeDialog
          onSuccess={() => { setEditMode(true); setShowEditDialog(false); }}
          onClose={() => setShowEditDialog(false)}
        />
      )}

      {/* Season modal */}
      {editSeason && (
        <SeasonEditModal season={editSeason} isNew={isNewSeason}
          onSave={saveSeason} onDelete={deleteSeason} onClose={() => setEditSeason(null)} />
      )}

      {/* Idea modal */}
      {editIdea && (
        <IdeaEditModal idea={editIdea} isNew={isNewIdea}
          onSave={saveIdea} onDelete={deleteIdea} onClose={() => setEditIdea(null)} onPromote={promoteIdea} />
      )}
    </div>
  );
}
