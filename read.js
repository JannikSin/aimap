// read.js: the long read. Nine pieces, full width, serif, remembered scroll.
import { root, el, esc, go, consult, readPosGet, readPosSet } from "./core.js";
import READS from "./data/reads.js";

let tracking = null;

export function open(parts) {
  stopTracking();
  const n = parts.length > 1 ? parseInt(parts[1], 10) : NaN;
  const piece = READS.find((r) => r.n === n);
  if (piece) { openPiece(piece); return; }

  root.appendChild(el("h1", {}, "The long read"));
  root.appendChild(el("p", { class: "lede" }, "The nine layer essays, in full. They work offline; that is the point."));
  const list = el("div", { class: "readlist" });
  READS.forEach((r) => {
    const b = el("button", { type: "button", class: "readrow" },
      '<span class="readtitle">' + esc(r.title) + "</span>" +
      '<span class="readmeta">' + r.minutes + " min</span>");
    b.addEventListener("click", () => go("#/read/" + r.n));
    list.appendChild(b);
  });
  root.appendChild(list);
}

function openPiece(piece) {
  consult();
  const art = el("article", { class: "prose" }, piece.html);
  root.appendChild(art);
  const back = el("button", { type: "button", class: "backbtn" }, "All reads");
  back.addEventListener("click", () => go("#/read"));
  root.appendChild(back);

  const y = readPosGet(piece.n);
  if (y) requestAnimationFrame(() => window.scrollTo(0, y));
  // remember scroll position, throttled
  let t = null;
  const onScroll = () => {
    if (t) return;
    t = setTimeout(() => { t = null; readPosSet(piece.n, window.scrollY); }, 400);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  tracking = onScroll;
}

function stopTracking() {
  if (tracking) { window.removeEventListener("scroll", tracking); tracking = null; }
}
