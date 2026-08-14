// core.js: the floor every tab stands on. Storage, DOM helpers, the consult
// counter, and local-only personal state. Nothing tab-specific lives here.
// All localStorage keys are aimap.-prefixed: seven apps share this origin.

export const root = document.getElementById("root");
export const tabbar = document.getElementById("tabbar");
export const CONTENT_AS_OF = "2026-08-13";

// ---------- storage ----------
// Returns false when the write did not land (a full quota on iOS throws), so a
// caller that promised something was saved can say otherwise.
export function lsGet(k, fallback) {
  try {
    const v = localStorage.getItem(k);
    return v === null ? fallback : JSON.parse(v);
  } catch (e) {
    return fallback;
  }
}
export function lsSet(k, v) {
  try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; }
}

// ---------- DOM ----------
export function el(tag, attrs, html) {
  const n = document.createElement(tag);
  if (attrs) for (const k in attrs) {
    if (k === "class") n.className = attrs[k];
    else n.setAttribute(k, attrs[k]);
  }
  if (html !== undefined) n.innerHTML = html;
  return n;
}
export function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
export function go(hash) {
  if (location.hash === hash) return;
  location.hash = hash;
}

// ---------- the consult counter ----------
// No button anywhere. Opening any #/thing or #/read route pushes today's date
// into a set. Distinct days are counted from 2026-09-01 so build week cannot
// pad the number. The review procedure is: open the app, read the line.
// LOCAL date, not UTC: an evening train ride must not count as tomorrow,
// because this number is the kill-review metric.
const CONSULT_START = "2026-09-01";
export function localDay() {
  const d = new Date();
  return d.getFullYear() + "-" +
    String(d.getMonth() + 1).padStart(2, "0") + "-" +
    String(d.getDate()).padStart(2, "0");
}
export function consult() {
  const days = lsGet("aimap.consulted", []);
  const today = localDay();
  if (!days.includes(today)) { days.push(today); lsSet("aimap.consulted", days); }
}
export function consultLine() {
  const days = lsGet("aimap.consulted", []).filter((d) => d >= CONSULT_START);
  const n = days.length;
  return "Consulted on " + n + " separate day" + (n === 1 ? "" : "s") +
    " since Sept 1. Checkpoint Sept 30, needs 4. Review Dec 20, needs 10.";
}

// ---------- local-only personal state ----------
// Shipped data carries taxonomy only; what YOU run is device state, seeded
// empty. Three values: "uses", "no" (a deliberate decision not to use), unset.
export function markGet(id) {
  return lsGet("aimap.marks", {})[id] || "";
}
export function markSet(id, status) {
  const m = lsGet("aimap.marks", {});
  if (status) m[id] = status; else delete m[id];
  return lsSet("aimap.marks", m);
}

// ---------- fold state ----------
export function foldGet() { return lsGet("aimap.folds", []); }
export function foldSet(open) { lsSet("aimap.folds", open); }

// ---------- read scroll positions ----------
export function readPosGet(n) { return lsGet("aimap.readpos", {})[n] || 0; }
export function readPosSet(n, y) {
  const p = lsGet("aimap.readpos", {});
  p[n] = y;
  lsSet("aimap.readpos", p);
}

// ---------- which reads have been opened (a tick on the list, local-only) ----------
export function readDone(n) {
  const d = lsGet("aimap.readdone", []);
  if (!d.includes(n)) { d.push(n); lsSet("aimap.readdone", d); }
}
export function readDoneList() { return lsGet("aimap.readdone", []); }
