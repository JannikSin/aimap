// stack.js: the home tab. The three-line thesis, nine collapsible bands
// (8 down to 0), the consult line, and the sources link.
import { root, el, esc, go, foldGet, foldSet, consultLine, CONTENT_AS_OF } from "./core.js";
import LAYERS from "./data/layers.js";
import THINGS from "./data/things.js";

const byLayer = {};
THINGS.forEach((t) => { (byLayer[t.layer] = byLayer[t.layer] || []).push(t); });
const layerName = {};
LAYERS.forEach((l) => { layerName[l.id] = l.name; });

export function open(parts) {
  const deepLayer = parts.length > 1 ? parseInt(parts[1], 10) : NaN;
  const openSet = new Set(isNaN(deepLayer) ? foldGet() : [deepLayer]);

  const thesis = el("div", { class: "thesis" },
    "<p>A <strong>model</strong> is weights. It cannot do anything alone.</p>" +
    "<p>A <strong>harness</strong> is the program running a model in a loop with tools.</p>" +
    "<p>A <strong>configuration</strong> is a text file that changes what the harness does.</p>");
  root.appendChild(thesis);

  const stackBox = el("div", { class: "stack" });
  LAYERS.forEach((l) => {
    const band = el("section", { class: "band", "data-layer": l.id });
    const head = el("button", {
      type: "button", class: "bandhead",
      "aria-expanded": openSet.has(l.id) ? "true" : "false"
    },
      '<span class="bandnum">' + l.id + "</span>" +
      '<span class="bandname">' + esc(l.name) + "</span>" +
      '<span class="bandq">' + esc(l.testQuestion) + "</span>");
    const body = el("div", { class: "bandbody" });
    body.hidden = !openSet.has(l.id);
    if (openSet.has(l.id)) fillBand(body, l);

    head.addEventListener("click", () => {
      const now = body.hidden;
      body.hidden = !now;
      head.setAttribute("aria-expanded", now ? "true" : "false");
      if (now && !body.childNodes.length) fillBand(body, l);
      const opens = [];
      stackBox.querySelectorAll(".band").forEach((s) => {
        if (!s.querySelector(".bandbody").hidden) opens.push(parseInt(s.getAttribute("data-layer"), 10));
      });
      foldSet(opens);
    });
    band.appendChild(head);
    band.appendChild(body);
    stackBox.appendChild(band);
  });
  root.appendChild(stackBox);

  const foot = el("div", { class: "stackfoot" },
    '<p class="consult">' + esc(consultLine()) + "</p>" +
    '<p class="asof">Content as of ' + CONTENT_AS_OF + '. <a href="#/sources">Sources</a></p>');
  root.appendChild(foot);
}

function fillBand(body, l) {
  body.appendChild(el("p", { class: "bandline" }, esc(l.oneLine)));
  body.appendChild(el("p", { class: "bandexplain" }, esc(l.explain)));

  // the two governance edges: non-adjacent, so they carry real information
  if (l.governs.length) {
    const p = el("p", { class: "edges" }, "governs: ");
    l.governs.forEach((n) => {
      const b = el("button", { type: "button", class: "edgechip" }, n + " " + esc(layerName[n]));
      b.addEventListener("click", (e) => { e.stopPropagation(); go("#/stack/" + n); });
      p.appendChild(b);
    });
    body.appendChild(p);
  }
  if (l.governedBy.length) {
    const p = el("p", { class: "edges" }, "governed by: ");
    l.governedBy.forEach((n) => {
      const b = el("button", { type: "button", class: "edgechip" }, n + " " + esc(layerName[n]));
      b.addEventListener("click", (e) => { e.stopPropagation(); go("#/stack/" + n); });
      p.appendChild(b);
    });
    body.appendChild(p);
  }

  const chips = el("div", { class: "chips" });
  (byLayer[l.id] || []).forEach((t) => {
    const c = el("button", { type: "button", class: "chip" + (t.body ? " haswrite" : "") }, esc(t.name));
    c.addEventListener("click", () => go("#/thing/" + t.id));
    chips.appendChild(c);
  });
  body.appendChild(chips);
}
