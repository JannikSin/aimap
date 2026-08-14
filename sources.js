// sources.js (tab): the #/sources route. Where to hunt, by tier.
import { root, el, esc } from "./core.js";
import SOURCES from "./data/sources.js";

const TIER_NAMES = {
  1: "Tier 1: primary sources, always check",
  2: "Tier 2: community, where things surface first",
  3: "Tier 3: curated digests, for coverage not discovery",
  4: "Tier 4: the somebody-built-something-insane feeds"
};

export function open() {
  root.appendChild(el("h1", {}, "Sources"));
  root.appendChild(el("p", { class: "lede" },
    "Ordered by signal per minute, which is not the same as popularity. No number gets trusted unless it came from a lab's own docs, an independent benchmark site, or a named outlet."));

  [1, 2, 3, 4].forEach((tier) => {
    const rows = SOURCES.filter((s) => s.tier === tier);
    if (!rows.length) return;
    root.appendChild(el("h2", { class: "famhead" }, esc(TIER_NAMES[tier])));
    rows.forEach((s) => {
      const row = el("div", { class: "srcrow" });
      if (s.url) {
        const p = el("p", { class: "srcname" });
        p.appendChild(el("a", { href: s.url, target: "_blank", rel: "noopener" }, esc(s.name)));
        row.appendChild(p);
      } else {
        row.appendChild(el("p", { class: "srcname" }, esc(s.name)));
      }
      row.appendChild(el("p", { class: "srcgives" }, esc(s.gives)));
      root.appendChild(row);
    });
  });
}
