// ─────────────────────────────────────────────────────────────
// CHANGE 1 — generate() in the main App component
// Replace the direct Anthropic URL with your Railway proxy:
// ─────────────────────────────────────────────────────────────

// ❌ BROKEN (V2 — calls Anthropic directly from browser → CORS error)
const res = await fetch("https://api.anthropic.com/v1/messages", {
  method:"POST", headers:{ "Content-Type":"application/json" },
  body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:4500, system:SYSTEM_PROMPT, messages:[{ role:"user", content:buildUserPrompt(theme) }] })
});

// ✅ FIXED (matches V1 — routes through your Railway backend)
const res = await fetch("/api/generate", {
  method:"POST", headers:{ "Content-Type":"application/json" },
  body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:4500, system:SYSTEM_PROMPT, messages:[{ role:"user", content:buildUserPrompt(theme) }] })
});


// ─────────────────────────────────────────────────────────────
// CHANGE 2 — sendToSlack()
// Replace the direct Anthropic URL with a new /api/slack endpoint:
// ─────────────────────────────────────────────────────────────

// ❌ BROKEN (calls Anthropic + MCP directly from browser → CORS error)
async function sendToSlack(result, theme, confidence) {
  const message = buildSlackMessage(result, theme, confidence);
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      mcp_servers: [{ type: "url", url: "https://mcp.slack.com/mcp", name: "slack" }],
      messages: [{ role: "user", content: `Send this exact message to Slack channel C07EXLBDDNE ...\n\n${message}` }]
    })
  });
  const json = await res.json();
  if (json.error) throw new Error(json.error.message);
  return true;
}

// ✅ FIXED (routes through Railway backend — add /api/slack endpoint, see server patch below)
async function sendToSlack(result, theme, confidence) {
  const message = buildSlackMessage(result, theme, confidence);
  const res = await fetch("/api/slack", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Slack send failed");
  return true;
}