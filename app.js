// app.js: routes and the header search. Each tab module owns its rendering.
import { root, tabbar, el, esc, go } from "./core.js";
import * as map from "./map.js";
import * as read from "./read.js";
import * as use from "./use.js";
import * as thing from "./thing.js";
import * as sources from "./sources.js";
import THINGS from "./data/things.js";
import LAYERS from "./data/layers.js";

// "stack" is the map; the old list lives on at #/stack/list inside map.open
const ROUTES = { stack: map, read, use, thing, sources };
// which tab button lights up for each route
const TAB_OF = { stack: "stack", read: "read", use: "use", thing: "stack", sources: "stack" };

function route() {
  const h = location.hash.replace(/^#\/?/, "");
  // a hand-mangled hash (a lone %) throws in decodeURIComponent; that is a bad
  // link, not a broken app, so it lands on Stack instead of a white screen
  let parts;
  try {
    parts = h.split("/").map(decodeURIComponent).filter(Boolean);
  } catch (e) {
    go("#/stack");
    return;
  }
  // Unknown tab: rewrite the hash rather than retargeting, so the tab bar can
  // never sit highlighted over a blank page.
  if (parts[0] && !ROUTES[parts[0]]) { go("#/stack"); return; }
  const tab = ROUTES[parts[0]] ? parts[0] : "stack";
  tabbar.querySelectorAll("button").forEach((b) => {
    b.setAttribute("aria-current", b.getAttribute("data-tab") === TAB_OF[tab] ? "true" : "false");
  });
  closeSearch();
  document.body.classList.remove("mapmode");
  root.innerHTML = "";
  window.scrollTo(0, 0);
  ROUTES[tab].open(parts);
}

tabbar.querySelectorAll("button").forEach((b) => {
  b.addEventListener("click", () => go("#/" + b.getAttribute("data-tab")));
});
window.addEventListener("hashchange", route);

// ---------- header search ----------
// Substring over name plus aliases, case-insensitive. "Clawdbot" finds
// OpenClaw; "ChatGPT" finds the layer-4 harness, never the OpenAI lab.
const input = document.getElementById("search");
const panel = document.getElementById("searchresults");
const layerName = {};
LAYERS.forEach((l) => { layerName[l.id] = l.name; });

function closeSearch() {
  panel.hidden = true;
  panel.innerHTML = "";
  if (input.value) input.value = "";
}

function runSearch() {
  const q = input.value.trim().toLowerCase();
  if (!q) { panel.hidden = true; panel.innerHTML = ""; return; }
  const hits = THINGS.filter((t) =>
    t.name.toLowerCase().includes(q) ||
    (t.aliases || []).some((a) => a.toLowerCase().includes(q))
  ).slice(0, 12);
  panel.innerHTML = "";
  if (!hits.length) {
    panel.appendChild(el("div", { class: "noresult" }, "Nothing named that. It may not be on the map yet."));
  } else {
    hits.forEach((t) => {
      const b = el("button", { type: "button", class: "hit" },
        '<span class="hitname">' + esc(t.name) + "</span>" +
        '<span class="hitlayer">' + t.layer + " · " + esc(layerName[t.layer]) + "</span>");
      b.addEventListener("click", () => { closeSearch(); go("#/thing/" + t.id); });
      panel.appendChild(b);
    });
  }
  panel.hidden = false;
}
input.addEventListener("input", runSearch);
input.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeSearch();
  if (e.key === "Enter") {
    const first = panel.querySelector("button.hit");
    if (first) first.click();
  }
});
// tapping anywhere outside the header and the results dismisses the search
document.addEventListener("pointerdown", (e) => {
  if (!panel.hidden && !e.target.closest("#header") && !e.target.closest("#searchresults")) {
    closeSearch();
  }
});

// ---------- boot ----------
if (!location.hash) history.replaceState(null, "", "#/stack");
route();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js");
  // A new SW taking over means the shell on screen is the old one. Reload once,
  // guarded; on the FIRST install there is no controller and nothing is stale.
  const hadController = !!navigator.serviceWorker.controller;
  let reloaded = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (reloaded || !hadController) return;
    reloaded = true;
    location.reload();
  });
}
