// check.js: run `node check.js` before every deploy. Plain node, no deps.
// Asserts the data contract the app and the handoff rely on.
import LAYERS from "./data/layers.js";
import THINGS from "./data/things.js";
import JOBS from "./data/jobs.js";
import SOURCES from "./data/sources.js";
import READS from "./data/reads.js";
import CARDS from "./data/cards.js";

let fails = 0;
const fail = (msg) => { fails++; console.error("FAIL: " + msg); };

// URLs that genuinely appear in the source notes. Nothing else may ship.
const ALLOWED_URLS = new Set([
  "https://artificialanalysis.ai/",
  "https://lmarena.ai/",
  "https://www.swebench.com/",
  "https://huggingface.co/models?sort=trending",
  "https://blog.modelcontextprotocol.io/",
  "https://platform.claude.com/docs",
  "https://platform.openai.com/docs/changelog",
  "https://ai.google.dev",
  "https://docs.x.ai",
]);

// ---- layers ----
const layerIds = new Set(LAYERS.map((l) => l.id));
if (layerIds.size !== 9) fail("expected 9 layers, got " + layerIds.size);
LAYERS.forEach((l) => {
  if (l.id < 0 || l.id > 8) fail("layer id out of range: " + l.id);
  [...l.governs, ...l.governedBy].forEach((n) => {
    if (!layerIds.has(n)) fail("layer " + l.id + " references missing layer " + n);
  });
});

// ---- things ----
const thingIds = new Set();
THINGS.forEach((t) => {
  if (thingIds.has(t.id)) fail("duplicate thing id: " + t.id);
  thingIds.add(t.id);
  if (!layerIds.has(t.layer)) fail(t.id + " sits on missing layer " + t.layer);
  if (t.body && !(t.facts && t.facts.some((f) => f.noted))) {
    fail(t.id + " has a body but no noted fact");
  }
  (t.facts || []).forEach((f) => {
    if (!f.noted) fail(t.id + " fact '" + f.label + "' missing noted date");
    if (!["structural", "perishable"].includes(f.durability))
      fail(t.id + " fact '" + f.label + "' bad durability: " + f.durability);
    if (f.source && !ALLOWED_URLS.has(f.source))
      fail(t.id + " fact source URL not in corpus allowlist: " + f.source);
  });
  // public-repo rule: no personal fields may ever ship
  ["davidStatus", "davidNote", "lanes", "lane"].forEach((k) => {
    if (k in t) fail(t.id + " ships forbidden personal field: " + k);
  });
});

// ---- jobs ----
const jobIds = new Set();
JOBS.forEach((j) => {
  if (jobIds.has(j.id)) fail("duplicate job id: " + j.id);
  jobIds.add(j.id);
  j.thingIds.forEach((id) => {
    if (!thingIds.has(id)) fail("job " + j.id + " references missing thing " + id);
  });
});

// ---- sources ----
const srcIds = new Set();
SOURCES.forEach((s) => {
  if (srcIds.has(s.id)) fail("duplicate source id: " + s.id);
  srcIds.add(s.id);
  if (s.url && !ALLOWED_URLS.has(s.url)) fail("source URL not in corpus allowlist: " + s.url);
});

// ---- reads ----
const readNs = new Set();
READS.forEach((r) => {
  if (readNs.has(r.n)) fail("duplicate read n: " + r.n);
  readNs.add(r.n);
  if (!layerIds.has(r.layer)) fail("read " + r.n + " on missing layer " + r.layer);
  // every internal link inside prose must resolve
  const links = [...r.html.matchAll(/href="#\/thing\/([^"]+)"/g)].map((m) => m[1]);
  links.forEach((id) => {
    if (!thingIds.has(id)) fail("read " + r.n + " links to missing thing " + id);
  });
  // no external URL outside the allowlist
  const urls = [...r.html.matchAll(/href="(https?:[^"]+)"/g)].map((m) => m[1]);
  urls.forEach((u) => {
    if (!ALLOWED_URLS.has(u)) fail("read " + r.n + " ships non-corpus URL: " + u);
  });
  // the word that must not appear: nothing here was verified by a human
  if (/verified/i.test(r.html)) {
    // "Verified" as part of a proper noun (SWE-bench Verified) is legitimate
    const stripped = r.html.replace(/SWE-bench Verified/g, "");
    if (/verified/i.test(stripped)) fail("read " + r.n + " claims 'verified'");
  }
});

// ---- cards: every card derives from a structural fact ----
const structuralThings = new Set(
  THINGS.filter((t) => (t.facts || []).some((f) => f.durability === "structural")).map((t) => t.id)
);
const cardIds = new Set();
CARDS.forEach((c) => {
  if (cardIds.has(c.id)) fail("duplicate card id: " + c.id);
  cardIds.add(c.id);
  c.derivedFrom.forEach((ref) => {
    const m = /^layer-(\d)$/.exec(ref);
    if (m) {
      if (!layerIds.has(parseInt(m[1], 10))) fail("card " + c.id + " derives from missing " + ref);
    } else if (!structuralThings.has(ref)) {
      fail("card " + c.id + " derivedFrom '" + ref + "' is not a thing with a structural fact");
    }
  });
});

// ---- things: no 'verified' language in shipped prose ----
THINGS.forEach((t) => {
  const text = (t.body || "") + (t.facts || []).map((f) => f.label + " " + f.value).join(" ");
  if (/\bverified\b/i.test(text.replace(/SWE-bench Verified/g, ""))) {
    fail(t.id + " uses the word 'verified'");
  }
});

if (fails) {
  console.error(fails + " check(s) failed");
  process.exit(1);
}
console.log("check.js: all checks passed. " +
  THINGS.length + " things, " + THINGS.filter((t) => t.body).length + " with bodies, " +
  JOBS.length + " jobs, " + READS.length + " reads, " + CARDS.length + " cards, " +
  SOURCES.length + " sources.");
