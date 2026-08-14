// thing.js: the detail route. Name, layer badge, aliases, one line, body only
// if the corpus wrote one ("listed, not written up" is an honest state), typed
// facts with plain noted dates, and local-only personal status.
import { root, el, esc, go, consult, markGet, markSet } from "./core.js";
import THINGS from "./data/things.js";
import LAYERS from "./data/layers.js";
import READS from "./data/reads.js";

const layerName = {};
LAYERS.forEach((l) => { layerName[l.id] = l.name; });
// which long-read covers each layer (layers 1+2 and 4+5 share an essay)
const READ_OF_LAYER = { 0: 1, 1: 2, 2: 2, 3: 3, 4: 4, 5: 4, 6: 5, 7: 6, 8: 8 };

export function open(parts) {
  const id = parts[1];
  const t = THINGS.find((x) => x.id === id);
  if (!t) { go("#/stack"); return; }
  consult();

  const head = el("header", { class: "thinghead" });
  head.appendChild(el("h1", {}, esc(t.name)));
  const badge = el("button", { type: "button", class: "layerbadge" },
    t.layer + " · " + esc(layerName[t.layer]));
  badge.addEventListener("click", () => go("#/stack/" + t.layer));
  head.appendChild(badge);
  if (t.aliases && t.aliases.length) {
    head.appendChild(el("p", { class: "aliases" }, "also: " + esc(t.aliases.join(", "))));
  }
  root.appendChild(head);

  if (t.oneLine) root.appendChild(el("p", { class: "oneline" }, esc(t.oneLine)));

  if (t.body) {
    root.appendChild(el("div", { class: "prose thingbody" }, "<p>" + esc(t.body) + "</p>"));
  } else {
    root.appendChild(el("p", { class: "notwritten" },
      "Listed, not written up. It sits on layer " + t.layer + ", " + esc(layerName[t.layer]) + "."));
  }

  if (t.facts && t.facts.length) {
    const box = el("div", { class: "facts" });
    t.facts.forEach((f) => {
      const row = el("div", { class: "fact" });
      row.appendChild(el("p", { class: "factlabel" }, esc(f.label)));
      row.appendChild(el("p", { class: "factvalue" }, esc(f.value)));
      let meta = "noted " + esc(f.noted) + " · " + esc(f.durability);
      row.appendChild(el("p", { class: "factmeta" }, meta));
      if (f.source) {
        const p = el("p", { class: "factsrc" });
        p.appendChild(el("a", { href: f.source, target: "_blank", rel: "noopener" }, "source"));
        row.appendChild(p);
      } else {
        row.appendChild(el("p", { class: "factsrc muted" }, "from the map's own notes, unverified"));
      }
      box.appendChild(row);
    });
    root.appendChild(box);
  }

  // local-only status: uses / deliberate no / unset. Never leaves the device.
  const markBox = el("div", { class: "markbox" });
  markBox.appendChild(el("p", { class: "marklabel" }, "On this device only:"));
  const states = [["uses", "I use this"], ["no", "Deliberate no"]];
  const current = markGet(t.id);
  states.forEach(([val, label]) => {
    const b = el("button", {
      type: "button",
      class: "markbtn" + (current === val ? " on" : ""),
      "aria-pressed": current === val ? "true" : "false"
    }, (current === val ? "✓ " : "") + label);
    b.addEventListener("click", () => {
      markSet(t.id, markGet(t.id) === val ? "" : val);
      root.innerHTML = "";
      window.scrollTo(0, 0);
      open(parts);
    });
    markBox.appendChild(b);
  });
  root.appendChild(markBox);

  const readN = READ_OF_LAYER[t.layer];
  const readPiece = READS.find((r) => r.n === readN);
  if (readPiece) {
    const essay = el("button", { type: "button", class: "backbtn" },
      "Read the layer essay: " + esc(readPiece.title));
    essay.addEventListener("click", () => go("#/read/" + readN));
    root.appendChild(essay);
  }

  const back = el("button", { type: "button", class: "backbtn" }, "Back to the map");
  back.addEventListener("click", () => go("#/stack/" + t.layer));
  root.appendChild(back);
}
