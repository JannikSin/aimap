// use.js: the answer sheet. For this job, use this, because. Grouped by
// family. A row with no resolvable entity renders non-tappable, never as a
// dead tap.
import { root, el, esc, go } from "./core.js";
import JOBS from "./data/jobs.js";
import THINGS from "./data/things.js";

const thingById = {};
THINGS.forEach((t) => { thingById[t.id] = t; });

export function open() {
  root.appendChild(el("h1", {}, "What to use, by job"));
  root.appendChild(el("p", { class: "lede" }, "One screen, no reading required. Tap a pick for the full write-up."));

  const families = [];
  JOBS.forEach((j) => { if (!families.includes(j.family)) families.push(j.family); });

  families.forEach((fam) => {
    root.appendChild(el("h2", { class: "famhead" }, esc(fam)));
    JOBS.filter((j) => j.family === fam).forEach((j) => {
      const row = el("div", { class: "userow" });
      row.appendChild(el("p", { class: "usejob" }, esc(j.job)));
      const pickLine = el("p", { class: "usepick" }, esc(j.pick));
      row.appendChild(pickLine);
      if (j.thingIds.length) {
        const chips = el("div", { class: "chips" });
        j.thingIds.forEach((id) => {
          const t = thingById[id];
          if (!t) return;
          const c = el("button", { type: "button", class: "chip haswrite" }, esc(t.name));
          c.addEventListener("click", () => go("#/thing/" + id));
          chips.appendChild(c);
        });
        row.appendChild(chips);
      }
      row.appendChild(el("p", { class: "usewhy" }, esc(j.why)));
      root.appendChild(row);
    });
  });
}
