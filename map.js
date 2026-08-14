// map.js: the Stack tab as a zoomable atlas. Nine strata, governance at the
// surface, silicon at bedrock. One-finger pan, two-finger pinch, wheel zoom,
// double-tap to dive, momentum, remembered camera. The old list survives at
// #/stack/list as the accessible/fallback view.
import { root, el, esc, go, lsGet, lsSet, consultLine, markGet, wanderNext, CONTENT_AS_OF } from "./core.js";
import LAYERS from "./data/layers.js";
import THINGS from "./data/things.js";
import * as list from "./stack.js";

// ---------- world geometry (world units are CSS px at scale 1) ----------
const WORLD_W = 2600;   // wide bands + right rail for the governance bore
const RAIL_X = 2450;

// presentational clustering; ids absent from every group fall into ""
const GROUPS = {
  8: [["United States", ["gsa-usai", "palantir", "anduril", "scale-ai", "booz-allen", "leidos", "doe-labs", "nasa"]],
      ["Rules and treaties", ["eu-ai-act", "china-agent-rules", "export-control", "bangkok-declaration", "uk-aisi"]]],
  7: [["Speech", ["whisper", "whisper-cpp", "faster-whisper", "assemblyai", "speechmatics", "deepgram"]],
      ["Video", ["veo", "runway", "kling", "sora", "luma", "pika", "higgsfield", "descript", "opus-clip", "vizard", "capcut", "topaz"]],
      ["Image", ["midjourney", "nano-banana-pro", "flux", "ideogram", "gpt-image"]],
      ["Voice and music", ["elevenlabs", "suno", "udio", "cartesia", "playht"]],
      ["Research", ["perplexity", "notebooklm", "elicit", "consensus", "alphaxiv", "semantic-scholar", "scispace", "scholarcy"]],
      ["Jobs", ["teal", "jobscan", "resume-worded", "simplify", "final-round", "interview-warmup"]],
      ["Engineering and CAE", ["ansys-simai", "ansys-geomai", "luminary-cloud", "ntop", "physicsx", "physicsnemo", "neural-concept", "simscale", "colab-cae"]],
      ["Everyday", ["granola", "otter", "gamma", "napkin", "excalidraw"]]],
  6: [["Protocols", ["mcp", "a2a"]],
      ["Aggregators and automation", ["composio", "arcade", "pipedream", "n8n", "zapier", "make"]],
      ["Browser control", ["claude-in-chrome", "browser-use"]],
      ["Search and scrape", ["exa", "firecrawl", "tavily", "brave-search"]],
      ["Local servers", ["context7", "desktop-commander", "agent-reach"]]],
  5: [],
  4: [["Terminal", ["claude-code", "codex-cli", "gemini-cli", "opencode", "aider", "goose", "qwen-code", "kilo-cli"]],
      ["IDE and editor", ["cursor", "windsurf", "github-copilot", "zed", "jetbrains-junie", "cline", "roo", "antigravity"]],
      ["Chat", ["chatgpt", "claude-ai", "le-chat"]],
      ["Cloud agents", ["claude-code-web", "codex-cloud", "jules", "devin"]],
      ["Personal agents", ["openclaw", "hermes-agent"]]],
  3: [["Cloud marketplaces", ["bedrock", "vertex", "microsoft-foundry"]],
      ["Routers and hosted inference", ["openrouter", "together", "fireworks", "groq", "cloudflare-workers-ai"]],
      ["Local runtimes", ["llama-cpp", "mlx", "ollama", "lm-studio", "vllm"]]],
  2: [["Claude", ["claude-fable-5", "claude-opus-5", "claude-sonnet-5", "claude-haiku"]],
      ["Closed frontier", ["gpt-5", "gemini", "grok"]],
      ["Open weights", ["qwen", "deepseek-models", "kimi", "glm", "llama", "gemma", "mistral-models", "gpt-oss"]],
      ["Small and cheap", ["phi", "nova"]]],
  1: [["Western frontier", ["anthropic", "openai", "google-deepmind", "spacexai", "meta", "mistral", "microsoft", "amazon", "apple"]],
      ["China", ["deepseek", "moonshot", "alibaba", "zhipu", "minimax", "bytedance", "baidu", "tencent", "stepfun", "baichuan", "01ai"]]],
  0: [["Lithography and fabs", ["asml", "tsmc"]],
      ["Memory (HBM)", ["sk-hynix", "samsung", "micron"]],
      ["Accelerators", ["nvidia", "google-tpu", "aws-trainium", "amd", "broadcom", "cerebras", "huawei-ascend"]],
      ["Clouds and neoclouds", ["coreweave", "nebius", "lambda"]],
      ["Hard limits", ["grid-power"]]]
};

const byId = {};
THINGS.forEach((t) => { byId[t.id] = t; });
const byLayer = {};
THINGS.forEach((t) => { (byLayer[t.layer] = byLayer[t.layer] || []).push(t); });

// ---------- camera ----------
const S_MIN = 0.06, S_MAX = 2.2;
let view = { x: 0, y: 0, s: 0.3 };
let vp = null, world = null, raf = 0, saveTimer = 0;
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

// rotation or a window resize changes the stage; re-clamp so the world cannot
// be stranded outside the new viewport. Registered once, guarded by liveness.
window.addEventListener("resize", () => { if (vp && vp.isConnected) apply(); });

function clampView() {
  view.s = Math.min(S_MAX, Math.max(S_MIN, view.s));
  const vw = vp.clientWidth, vh = vp.clientHeight;
  const ws = WORLD_W * view.s, hs = world.offsetHeight * view.s;
  view.x = Math.min(vw * 0.75, Math.max(vw * 0.25 - ws, view.x));
  view.y = Math.min(vh * 0.75, Math.max(vh * 0.25 - hs, view.y));
}
function apply() {
  clampView();
  world.style.transform = "translate(" + view.x + "px," + view.y + "px) scale(" + view.s + ")";
  vp.dataset.zoom = view.s < 0.22 ? "far" : view.s < 0.55 ? "mid" : "near";
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => lsSet("aimap.view", view), 300);
}
function zoomAt(cx, cy, factor) {
  const s2 = Math.min(S_MAX, Math.max(S_MIN, view.s * factor));
  const k = s2 / view.s;
  view.x = cx - (cx - view.x) * k;
  view.y = cy - (cy - view.y) * k;
  view.s = s2;
  apply();
}
// visible region between the translucent chrome bars
function stage() {
  const head = document.getElementById("header").offsetHeight;
  const tabs = document.getElementById("tabbar").offsetHeight;
  return { x: 12, y: head + 12, w: vp.clientWidth - 24, h: vp.clientHeight - head - tabs - 24 };
}
function viewFor(rx, ry, rw, rh) {
  const st = stage();
  const s = Math.min(S_MAX, Math.max(S_MIN, Math.min(st.w / rw, st.h / rh)));
  return { s, x: st.x + (st.w - rw * s) / 2 - rx * s, y: st.y + (st.h - rh * s) / 2 - ry * s };
}
function animateTo(target) {
  cancelAnimationFrame(raf);
  if (reducedMotion) { view = target; apply(); return; }
  const from = { ...view }, t0 = performance.now(), D = 420;
  const tick = (t) => {
    if (!vp.isConnected) return;
    const p = Math.min(1, (t - t0) / D), e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
    view = { x: from.x + (target.x - from.x) * e, y: from.y + (target.y - from.y) * e, s: from.s + (target.s - from.s) * e };
    apply();
    if (p < 1) raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
}
function fitWorld() { animateTo(viewFor(0, 0, WORLD_W, world.offsetHeight)); }
function fitStratum(n) {
  const sec = world.querySelector('[data-layer="' + n + '"]');
  if (sec) animateTo(viewFor(0, sec.offsetTop - 30, WORLD_W, sec.offsetHeight + 60));
}

// ---------- build ----------
export function open(parts) {
  if (parts[1] === "list") { list.open(parts.slice(1)); return; }
  document.body.classList.add("mapmode");

  vp = el("div", { class: "mapvp" });
  world = el("div", { class: "world" });
  vp.appendChild(world);
  root.appendChild(vp);

  // thesis cartouche
  world.appendChild(el("div", { class: "plaque thesis" },
    '<p class="plaquetitle">The AI Map</p>' +
    "<p>A <strong>model</strong> is weights. It cannot do anything alone.</p>" +
    "<p>A <strong>harness</strong> is the program running a model in a loop with tools.</p>" +
    "<p>A <strong>configuration</strong> is a text file that changes what the harness does.</p>" +
    '<p class="plaquefoot">Surface to bedrock: law down to silicon. Pinch, drag, dive.</p>'));

  LAYERS.forEach((l) => {
    const sec = el("section", { class: "stratum", "data-layer": l.id });
    const head = el("div", { class: "strathead" });
    head.appendChild(el("span", { class: "stratnum", "aria-hidden": "true" }, String(l.id)));
    const tt = el("div", { class: "strattitle" });
    const nameBtn = el("button", { type: "button", class: "stratname" }, esc(l.name));
    nameBtn.addEventListener("click", () => fitStratum(l.id));
    tt.appendChild(nameBtn);
    tt.appendChild(el("p", { class: "stratq" }, esc(l.testQuestion)));
    head.appendChild(tt);
    sec.appendChild(head);
    sec.appendChild(el("p", { class: "stratexplain" }, esc(l.oneLine) + ". " + esc(l.explain)));

    const grouped = new Set();
    const groups = (GROUPS[l.id] || []).map(([label, ids]) => {
      ids.forEach((id) => grouped.add(id));
      return [label, ids.map((id) => byId[id]).filter(Boolean)];
    });
    const rest = (byLayer[l.id] || []).filter((t) => !grouped.has(t.id));
    if (rest.length) groups.push(["", rest]);

    const clusters = el("div", { class: "clusters" });
    groups.forEach(([label, things]) => {
      if (!things.length) return;
      const g = el("div", { class: "cluster" });
      if (label) g.appendChild(el("p", { class: "clusterlabel" }, esc(label)));
      const row = el("div", { class: "clusternodes" });
      things.forEach((t) => {
        // personal marks (device-only) surface on the map: ✓ ring for
        // "I use this", dimmed strike for a deliberate no
        const m = markGet(t.id);
        const cls = "node" + (t.body ? " big" : "") + (m === "uses" ? " mine" : m === "no" ? " nope" : "");
        const n = el("button", { type: "button", class: cls },
          (m === "uses" ? "✓ " : "") + esc(t.name));
        n.addEventListener("click", () => go("#/thing/" + t.id));
        row.appendChild(n);
      });
      g.appendChild(row);
      clusters.appendChild(g);
    });
    sec.appendChild(clusters);
    world.appendChild(sec);
  });

  // legend cartouche
  const legend = el("div", { class: "plaque legend" },
    '<p class="plaquetitle">Legend</p>' +
    '<p><span class="node big demo">Written up</span> has a full page. <span class="node demo">Listed</span> carries a shorter note.</p>' +
    '<p><span class="node mine demo">✓ Yours</span> and <span class="node nope demo">declined</span> are marks you set on a thing’s page. They live on this device only.</p>' +
    '<p class="plaquefoot">' + esc(consultLine()) + "</p>" +
    '<p class="plaquefoot">Content as of ' + CONTENT_AS_OF + "</p>");
  const lrow = el("p", { class: "plaquelinks" });
  const srcBtn = el("button", { type: "button", class: "plaquebtn" }, "Sources");
  srcBtn.addEventListener("click", () => go("#/sources"));
  const listBtn = el("button", { type: "button", class: "plaquebtn" }, "Browse as a list");
  listBtn.addEventListener("click", () => go("#/stack/list"));
  lrow.appendChild(srcBtn);
  lrow.appendChild(listBtn);
  legend.appendChild(lrow);
  world.appendChild(legend);

  // controls overlay (screen-space, not world-space)
  const ctl = el("div", { class: "mapctl" });
  [["+", () => zoomAt(vp.clientWidth / 2, vp.clientHeight / 2, 1.45), "Zoom in"],
   ["−", () => zoomAt(vp.clientWidth / 2, vp.clientHeight / 2, 1 / 1.45), "Zoom out"],
   ["⛶", fitWorld, "Fit the whole map"],
   ["⚄", () => go("#/thing/" + wanderNext(null)), "Wander: open something worth reading"]].forEach(([label, fn, title]) => {
    const b = el("button", { type: "button", class: "ctlbtn", title, "aria-label": title }, label);
    b.addEventListener("click", fn);
    ctl.appendChild(b);
  });
  vp.appendChild(ctl);

  wireGestures();

  // measure, draw the governance bore, aim the camera.
  // Default is fit-width at the surface: you arrive at governance and descend.
  requestAnimationFrame(() => {
    if (!vp.isConnected) return;
    drawEdges();
    const n = parseInt(parts[1], 10);
    const saved = lsGet("aimap.view", null);
    if (!isNaN(n)) fitStratum(n);
    else if (saved && typeof saved.s === "number") { view = saved; apply(); }
    else {
      const st = stage();
      const s = Math.min(S_MAX, Math.max(S_MIN, st.w / WORLD_W));
      view = { s, x: st.x, y: st.y };
      apply();
    }
  });
}

// the two non-adjacent governance edges, drawn as a bore down the right rail
function drawEdges() {
  const h = world.offsetHeight;
  const mid = (n) => {
    const s = world.querySelector('[data-layer="' + n + '"]');
    return s ? s.offsetTop + s.offsetHeight / 2 : 0;
  };
  const y8 = mid(8), y7 = mid(7), y2 = mid(2);
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "edges");
  svg.setAttribute("width", WORLD_W);
  svg.setAttribute("height", h);
  svg.setAttribute("viewBox", "0 0 " + WORLD_W + " " + h);
  const path = (yTo) =>
    "M " + (RAIL_X - 40) + " " + y8 +
    " C " + (RAIL_X + 60) + " " + y8 + ", " + (RAIL_X + 60) + " " + yTo + ", " + (RAIL_X - 28) + " " + yTo;
  svg.innerHTML =
    '<defs><marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">' +
    '<path d="M 0 0 L 10 5 L 0 10 z" class="edgehead"/></marker></defs>' +
    '<path class="edgepath" d="' + path(y7) + '" marker-end="url(#arr)"/>' +
    '<path class="edgepath" d="' + path(y2) + '" marker-end="url(#arr)"/>' +
    '<text class="edgetext" x="' + (RAIL_X + 44) + '" y="' + ((y8 + y2) / 2) + '" transform="rotate(90 ' + (RAIL_X + 44) + " " + ((y8 + y2) / 2) + ')">governs</text>';
  world.insertBefore(svg, world.firstChild);
}

// ---------- gestures ----------
function wireGestures() {
  const pointers = new Map();
  let mode = "", last = null, pinch = null, moved = 0;
  let vx = 0, vy = 0, lastT = 0;
  let tapT = 0, tapX = 0, tapY = 0;

  const stopMomentum = () => cancelAnimationFrame(raf);

  vp.addEventListener("pointerdown", (e) => {
    vp.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    stopMomentum();
    if (pointers.size === 1) {
      mode = "pan"; moved = 0; vx = vy = 0;
      last = { x: e.clientX, y: e.clientY }; lastT = e.timeStamp;
    } else if (pointers.size === 2) {
      mode = "pinch";
      const [a, b] = [...pointers.values()];
      pinch = {
        d: Math.hypot(a.x - b.x, a.y - b.y),
        wx: ((a.x + b.x) / 2 - view.x) / view.s,
        wy: ((a.y + b.y) / 2 - view.y) / view.s,
        s: view.s
      };
    }
  });

  vp.addEventListener("pointermove", (e) => {
    if (!pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (mode === "pan" && pointers.size === 1) {
      const dx = e.clientX - last.x, dy = e.clientY - last.y;
      moved += Math.abs(dx) + Math.abs(dy);
      const dt = Math.max(1, e.timeStamp - lastT);
      vx = 0.8 * vx + 0.2 * (dx / dt) * 16;
      vy = 0.8 * vy + 0.2 * (dy / dt) * 16;
      last = { x: e.clientX, y: e.clientY }; lastT = e.timeStamp;
      view.x += dx; view.y += dy; apply();
    } else if (mode === "pinch" && pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      view.s = Math.min(S_MAX, Math.max(S_MIN, pinch.s * (d / pinch.d)));
      view.x = mx - pinch.wx * view.s;
      view.y = my - pinch.wy * view.s;
      moved = 99;
      apply();
    }
  });

  const lift = (e) => {
    pointers.delete(e.pointerId);
    if (mode === "pinch" && pointers.size === 1) {
      const [p] = [...pointers.values()];
      mode = "pan"; last = { x: p.x, y: p.y }; lastT = e.timeStamp; vx = vy = 0;
      return;
    }
    if (pointers.size) return;
    if (mode === "pan" && moved <= 6) {
      // a clean tap: double-tap on the background dives, on empty ground
      const onButton = e.target.closest("button");
      if (!onButton) {
        const now = e.timeStamp;
        if (now - tapT < 320 && Math.hypot(e.clientX - tapX, e.clientY - tapY) < 44) {
          zoomAt(e.clientX, e.clientY, view.s > 1.1 ? 0.35 : 2.1);
          tapT = 0;
        } else {
          // zoomed far out the nodes are texture, so one tap on the whole
          // stratum is the dive. Lives here, not on the sections, so it owns
          // the tap state and cannot race the double-tap above. e.target is
          // vp (pointer capture retargets), so hit-test the point instead.
          const under = vp.dataset.zoom === "far" && document.elementFromPoint(e.clientX, e.clientY);
          const strat = under && !under.closest("button") && under.closest(".stratum");
          if (strat) { fitStratum(strat.dataset.layer); tapT = 0; }
          else { tapT = now; tapX = e.clientX; tapY = e.clientY; }
        }
      }
    } else if (mode === "pan" && !reducedMotion && (Math.abs(vx) > 0.5 || Math.abs(vy) > 0.5)) {
      const glide = () => {
        if (!vp.isConnected) return;
        vx *= 0.92; vy *= 0.92;
        view.x += vx; view.y += vy; apply();
        if (Math.abs(vx) > 0.3 || Math.abs(vy) > 0.3) raf = requestAnimationFrame(glide);
      };
      raf = requestAnimationFrame(glide);
    }
    mode = "";
  };
  vp.addEventListener("pointerup", lift);
  vp.addEventListener("pointercancel", lift);

  // a drag must not end as a click on whatever was under the finger
  vp.addEventListener("click", (e) => {
    if (moved > 6) { e.stopPropagation(); e.preventDefault(); moved = 0; }
  }, true);

  vp.addEventListener("wheel", (e) => {
    e.preventDefault();
    stopMomentum();
    if (e.ctrlKey || Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.0022));
    } else { view.x -= e.deltaX; apply(); }
  }, { passive: false });

  // no dblclick handler on purpose: lift's double-tap branch above already
  // fires for mouse pointers too, and having both meant desktop double-click
  // zoomed twice (2.1 * 2.1) per gesture.

  // belt and braces against Safari's own pinch handling
  ["gesturestart", "gesturechange", "gestureend"].forEach((n) =>
    vp.addEventListener(n, (e) => e.preventDefault(), { passive: false }));
}
