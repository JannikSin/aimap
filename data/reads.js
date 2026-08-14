// The nine long-form reads, converted from the source notes to HTML once, at
// author time. No markdown parser ships in the app.
// Public-repo scrub applied per the handoff: personal inventory tables, key
// status, schedules and vault links were removed; the domain prose is intact.
export default [
  {
    n: 1, layer: 0, title: "Silicon, Fabs, and Power", minutes: 4,
    html: `
<h2>Layer 0: Silicon, Fabs, and Power</h2>
<p><a href="#/thing/nvidia">NVIDIA</a> and <a href="#/thing/tsmc">TSMC</a> are pivotal, and it is worth being precise about why: <strong>NVIDIA designs, TSMC manufactures, and neither can be routed around quickly.</strong> Every model on layer 2 exists downstream of a wafer allocation decision made 18 months earlier. When you read "compute constrained," that is what it means.</p>
<h3>The chain</h3>
<p><a href="#/thing/asml">ASML</a> (the only maker of EUV lithography machines) feeds TSMC, which fabricates nearly all leading-edge AI silicon. TSMC's wafers become NVIDIA GPUs and the alternatives: <a href="#/thing/google-tpu">Google's TPU</a>, <a href="#/thing/aws-trainium">AWS Trainium</a>, <a href="#/thing/amd">AMD's MI series</a>, and <a href="#/thing/broadcom">Broadcom's</a> custom co-designs. Those chips flow to the hyperscalers and to the <em>neoclouds</em> (<a href="#/thing/coreweave">CoreWeave</a>, <a href="#/thing/nebius">Nebius</a>, <a href="#/thing/lambda">Lambda</a>), which together supply the frontier labs. Two hard limits sit alongside the chain: <a href="#/thing/grid-power">grid power and cooling</a>, and <a href="#/thing/sk-hynix">HBM stacked memory</a>, whose supply gates GPU shipments as hard as wafers do.</p>
<h3>Who does what</h3>
<div class="tablewrap"><table>
<tr><th>Player</th><th>Role</th><th>Why it matters</th></tr>
<tr><td><a href="#/thing/tsmc">TSMC</a></td><td>Makes nearly all leading-edge AI silicon (N3, N2). Taiwan-concentrated</td><td>The single hardest bottleneck in the whole stack. Capacity, not design, caps GPU output</td></tr>
<tr><td><a href="#/thing/nvidia">NVIDIA</a></td><td>GPU design plus CUDA plus NVLink plus networking. Sells systems, not chips</td><td>Also a heavy internal AI user: chip floorplanning, verification, and its own physics-AI stack (Omniverse, <a href="#/thing/physicsnemo">PhysicsNeMo</a>, Modulus)</td></tr>
<tr><td><a href="#/thing/asml">ASML</a></td><td>Only maker of EUV lithography machines</td><td>Upstream of TSMC. Export-controlled, geopolitically load-bearing</td></tr>
<tr><td><a href="#/thing/sk-hynix">SK Hynix</a> / <a href="#/thing/samsung">Samsung</a> / <a href="#/thing/micron">Micron</a></td><td>HBM stacked memory</td><td>HBM supply gates GPU shipments as hard as wafers do</td></tr>
<tr><td><a href="#/thing/google-tpu">Google TPU</a></td><td>Designed in-house, made at TSMC/Broadcom</td><td>The only serious vertically-integrated alternative to NVIDIA at scale</td></tr>
<tr><td><a href="#/thing/aws-trainium">AWS Trainium / Inferentia</a></td><td>Amazon's own accelerators</td><td>Cheap capacity for Bedrock, why Claude runs there</td></tr>
<tr><td><a href="#/thing/amd">AMD</a></td><td>MI-series GPUs</td><td>The real second source, still software-limited versus CUDA</td></tr>
<tr><td><a href="#/thing/broadcom">Broadcom</a></td><td>Custom accelerator co-design for hyperscalers</td><td>The quiet giant of "not NVIDIA" silicon</td></tr>
<tr><td><a href="#/thing/cerebras">Cerebras</a> / <a href="#/thing/groq">Groq</a></td><td>Non-GPU inference silicon (wafer-scale, LPU)</td><td>Extreme token throughput, niche but real</td></tr>
<tr><td><a href="#/thing/huawei-ascend">Huawei Ascend</a></td><td>China's domestic accelerator</td><td>The whole reason Chinese labs optimize so hard for efficiency</td></tr>
</table></div>
<h3>The 2026 state of play</h3>
<ul>
<li><strong>The Blackwell-to-Rubin transition is the story of the year.</strong> Blackwell shipments fall off through 2026 while Rubin (R200, on TSMC N3, HBM4, NVLink 6) ramps in the second half. The durable point: 2026 Rubin volume is small relative to demand and the real ramp is 2027, because leading-edge fab capacity is the ceiling, not NVIDIA's order book. Unit-count estimates are deliberately absent here; they were analyst guesses that would read as facts a month later.</li>
<li><strong>Power is now a first-class constraint,</strong> not a footnote. Site selection is driven by grid interconnect queues.</li>
<li><strong>Space-based compute stopped being a joke.</strong> SpaceX's acquisition of xAI in February 2026 was justified publicly in large part on orbital datacenters, using launch cadence plus Starlink as the moat. Whether it works is open. That it is being funded is not.</li>
<li><strong>Neoclouds are a real tier.</strong> CoreWeave, Nebius, Lambda and peers rent GPU capacity to labs that cannot get enough from the big three.</li>
</ul>
<h3>What this layer changes for you</h3>
<ol>
<li><strong>Cost of tokens is a hardware story.</strong> When a model's price drops 5x, it is usually a hardware or serving-efficiency change, not generosity. Budget API spend against that trend; do not lock in long contracts.</li>
<li><strong>Engineering relevance.</strong> NVIDIA's physics-AI stack and Rubin-class hardware are what make CFD surrogate models tractable. This is the layer where simulation work and the AI industry actually touch.</li>
<li><strong>Interview relevance.</strong> "How does compute supply shape which models exist" is a genuinely good answer to have in an aerospace or deep-tech interview, because it is a systems answer rather than a hype answer.</li>
</ol>`
  },
  {
    n: 2, layer: 1, title: "Labs and Models", minutes: 6,
    html: `
<h2>Layers 1 and 2: Labs and Models</h2>
<p>A <strong>lab</strong> is an organization that pays for training runs. A <strong>model</strong> is the resulting weights. One lab ships many models, in tiers: a flagship (expensive, smartest), a workhorse (the one you actually use all day), and a cheap fast one for bulk.</p>
<p class="note">Version numbers rot in weeks. The taxonomy is durable; the version columns are a snapshot dated 2026-08-13. Before betting money on a model choice, check Artificial Analysis and the lab's own docs.</p>
<h3>Western frontier labs</h3>
<div class="tablewrap"><table>
<tr><th>Lab</th><th>Flagship line</th><th>Character</th></tr>
<tr><td><a href="#/thing/anthropic">Anthropic</a></td><td>Claude Fable 5, Opus 5, Sonnet 5, Haiku 4.5</td><td>Agentic coding and long-running agents. Strongest tool-use discipline. Safety-forward</td></tr>
<tr><td><a href="#/thing/openai">OpenAI</a></td><td>GPT-5.x family</td><td>Broadest product surface, strongest consumer distribution, deep enterprise push</td></tr>
<tr><td><a href="#/thing/google-deepmind">Google DeepMind</a></td><td>Gemini 3.x (Pro / Flash)</td><td>Best price-performance at scale, native long context, embedded in everything Google owns</td></tr>
<tr><td><a href="#/thing/spacexai">SpaceXAI</a> (ex-xAI)</td><td>Grok 4.x</td><td>Real-time X data, large context, fastest-moving and least predictable. Folded into SpaceX Feb 2026</td></tr>
<tr><td><a href="#/thing/meta">Meta</a></td><td>Llama plus newer closed work</td><td>Was the open-weight anchor of the West; strategy has drifted toward closed frontier work</td></tr>
<tr><td><a href="#/thing/mistral">Mistral</a></td><td>Mistral Large / Small, open releases</td><td>Europe's champion, sovereignty play, genuinely good small models</td></tr>
<tr><td><a href="#/thing/microsoft">Microsoft</a></td><td>Phi (small), MAI (in-house)</td><td>Hedging its OpenAI dependence</td></tr>
<tr><td><a href="#/thing/amazon">Amazon</a></td><td>Nova</td><td>Cheap, Bedrock-native, not a frontier contender</td></tr>
<tr><td><a href="#/thing/apple">Apple</a></td><td>On-device foundation models</td><td>Small, private, on your phone and Mac. Not competing on frontier</td></tr>
</table></div>
<h3>The Anthropic lineup (from the lab's own docs, 2026-08-13)</h3>
<div class="tablewrap"><table>
<tr><th>Model</th><th>Context</th><th>Max out</th><th>Price in / out per Mtok</th><th>Use it for</th></tr>
<tr><td><a href="#/thing/claude-fable-5">Claude Fable 5</a></td><td>1M</td><td>128k</td><td>$10 / $50</td><td>Highest capability, long-running agents</td></tr>
<tr><td><a href="#/thing/claude-opus-5">Claude Opus 5</a></td><td>1M</td><td>128k</td><td>$5 / $25</td><td>Complex agentic coding, the default heavy pick</td></tr>
<tr><td><a href="#/thing/claude-sonnet-5">Claude Sonnet 5</a></td><td>1M</td><td>128k</td><td>$2 / $10</td><td>Speed plus intelligence, the daily driver</td></tr>
<tr><td><a href="#/thing/claude-haiku">Claude Haiku 4.5</a></td><td>200k</td><td>64k</td><td>$1 / $5</td><td>Fastest, bulk and mechanical work</td></tr>
</table></div>
<p>Note the tokenizer change introduced with Opus 4.7: the same text produces roughly 30 percent more tokens than on older models, so old cost estimates understate current spend.</p>
<h3>Chinese labs</h3>
<p>This is not a footnote. China ships more open-weight models than anywhere else, and the price-performance is why open weights are viable at all.</p>
<div class="tablewrap"><table>
<tr><th>Lab</th><th>Model line</th><th>Why it matters</th></tr>
<tr><td><a href="#/thing/deepseek">DeepSeek</a></td><td>V-series, R-series reasoning</td><td>The efficiency shock. Open weights, aggressive pricing, self-hostable</td></tr>
<tr><td><a href="#/thing/moonshot">Moonshot AI</a></td><td>Kimi K-series</td><td>Agentic and long-context specialist, an open-weight leader on several boards</td></tr>
<tr><td><a href="#/thing/alibaba">Alibaba</a></td><td>Qwen (Qwen3, Qwen3-Coder, Qwen-Max)</td><td>The most permissively licensed and most useful family for local work. Best small-model lineup anywhere</td></tr>
<tr><td><a href="#/thing/zhipu">Zhipu AI</a></td><td>GLM series</td><td>Strong coding models at low cost. Listed in Hong Kong in 2026</td></tr>
<tr><td><a href="#/thing/minimax">MiniMax</a></td><td>M-series</td><td>Cheapest capable tier. Also listed in 2026</td></tr>
<tr><td><a href="#/thing/bytedance">ByteDance</a></td><td>Doubao / Seed</td><td>Enormous domestic consumer distribution</td></tr>
<tr><td><a href="#/thing/baidu">Baidu</a></td><td>ERNIE</td><td>Incumbent, less relevant outside China</td></tr>
<tr><td><a href="#/thing/tencent">Tencent</a></td><td>Hunyuan</td><td>Strong on video and 3D generation</td></tr>
<tr><td><a href="#/thing/stepfun">StepFun</a>, <a href="#/thing/baichuan">Baichuan</a>, <a href="#/thing/01ai">01.AI</a></td><td>various</td><td>The rest of the "Six Tigers," diverging in strategy</td></tr>
</table></div>
<p>Practical read: <strong><a href="#/thing/qwen">Qwen</a> for anything you run locally, DeepSeek or GLM for cheap API bulk work, Kimi when the job is agentic.</strong> All three are worth having a key for even if Claude does your real work.</p>
<h3>Open weights versus open source</h3>
<p>Almost nothing here is open source in the strict sense. <strong>Open weights</strong> means you can download and run the parameters, usually under a custom license, without the training data or code. That is enough for everything you would want to do:</p>
<ul>
<li>Run it on your own hardware with no network, no per-token cost, no data leaving the house.</li>
<li>Fine-tune it on your own material.</li>
<li>Guarantee it never changes under you, unlike a hosted model that gets silently updated.</li>
</ul>
<p>The tradeoff is capability. The gap between the best open weights and the best closed model is real but narrowing, and for <strong>specific narrow jobs</strong> (classification, extraction, structured rewriting, embedding, transcription cleanup) an open model on your own hardware is already the right answer.</p>
<h3>How to pick a model, once, without agonizing</h3>
<ol>
<li><strong>Is the job hard reasoning, multi-file code, or a long agent run?</strong> Claude Opus 5, or Fable 5 if it is genuinely at the edge.</li>
<li><strong>Is it ordinary work you will do a thousand times?</strong> Sonnet 5, or Gemini Flash if cost dominates.</li>
<li><strong>Is it bulk mechanical transformation?</strong> Haiku, or an open model you host.</li>
<li><strong>Does the data have to not leave the building?</strong> Local open weights. No exceptions, no "but the API is probably fine."</li>
<li><strong>Is it images, video, audio, or transcription?</strong> None of the above. That is layer 7.</li>
</ol>`
  },
  {
    n: 3, layer: 3, title: "Access, APIs, and Routers", minutes: 4,
    html: `
<h2>Layer 3: Access, APIs, and Routers</h2>
<p>A model is useless until something can send it bytes. There are five ways that happens, and they trade off price, privacy, and lock-in.</p>
<h3>The five access paths</h3>
<div class="tablewrap"><table>
<tr><th>Path</th><th>What it is</th><th>When it wins</th><th>Watch out for</th></tr>
<tr><td>Direct lab API</td><td>Key from Anthropic / OpenAI / Google</td><td>Newest features first, best docs, prompt caching</td><td>One key per lab, one bill per lab</td></tr>
<tr><td>Cloud marketplace</td><td><a href="#/thing/bedrock">Bedrock</a>, <a href="#/thing/vertex">Vertex</a>, <a href="#/thing/microsoft-foundry">Microsoft Foundry</a></td><td>Enterprise compliance, data residency, existing cloud credit</td><td>Lags direct API on new features</td></tr>
<tr><td>Router / aggregator</td><td><a href="#/thing/openrouter">OpenRouter</a>, <a href="#/thing/together">Together</a>, <a href="#/thing/fireworks">Fireworks</a>, <a href="#/thing/groq">Groq</a></td><td>One key, hundreds of models, instant A/B, automatic failover</td><td>Adds a hop and a margin. Read the privacy terms</td></tr>
<tr><td>Local runtime</td><td><a href="#/thing/ollama">Ollama</a>, <a href="#/thing/lm-studio">LM Studio</a>, <a href="#/thing/llama-cpp">llama.cpp</a>, <a href="#/thing/mlx">MLX</a>, <a href="#/thing/vllm">vLLM</a></td><td>Zero marginal cost, zero data egress, works offline</td><td>You buy the hardware once instead of tokens forever</td></tr>
<tr><td>Subscription harness</td><td>Claude Code Max, ChatGPT Plus/Pro</td><td>Flat cost, no metering anxiety, the thing you actually use daily</td><td>Not callable from your own code</td></tr>
</table></div>
<h3>The router is the cheapest gap most setups have</h3>
<p>If you run a subscription harness plus maybe one cloud key, the missing piece is a <strong>router</strong>. One key, and every model on the map becomes one HTTP call away: Claude, GPT, Gemini, Grok, Qwen, DeepSeek, Kimi, GLM, Llama, plus free tiers on some open models. It speaks the OpenAI-compatible schema, so almost every tool already supports it. Concretely this unlocks:</p>
<ul>
<li><strong>Bulk jobs at open-weight prices</strong> without buying six accounts: listing generation, transcript cleanup, batch classification.</li>
<li><strong>Honest comparison.</strong> Same prompt, five models, one script, real numbers instead of leaderboard vibes.</li>
<li><strong>Failover.</strong> When one provider is down at 11pm, the pipeline does not stop.</li>
</ul>
<p>Cost to try: a few dollars of credit.</p>
<h3>Prompt caching is the biggest cost lever most people never turn on</h3>
<p>If you send the same large prefix repeatedly (a system prompt, a codebase, a long document), caching it cuts the input cost dramatically and speeds up the response. Every major provider supports some version of it. Anything you build that reuses context should use it from day one, not as an optimization later.</p>
<h3>Structural things worth knowing</h3>
<ul>
<li><strong>OpenAI-compatible is the de facto wire format.</strong> Most providers expose it, so tools are portable across providers even when the models are not.</li>
<li><strong>Batch APIs</strong> give a large discount for work that can wait. Any overnight job should use one.</li>
<li><strong>Rate limits are tier-based and they bite at the worst time.</strong> Check them before designing a pipeline, not after.</li>
<li><strong>Free tiers end.</strong> Gemini CLI's free serving ended mid-2026. Never architect around a free tier you do not control.</li>
</ul>`
  },
  {
    n: 4, layer: 4, title: "Harnesses and Configuration", minutes: 6,
    html: `
<h2>Layers 4 and 5: Harnesses and Configuration</h2>
<p>Two layers that get conflated constantly, and they behave differently.</p>
<ul>
<li><strong>Layer 4, the harness</strong>, is a program. It holds the loop: send prompt, read model output, run the tools the model asked for, feed results back, repeat until done. <a href="#/thing/claude-code">Claude Code</a> is a harness. So is <a href="#/thing/cursor">Cursor</a>. So is the <a href="#/thing/chatgpt">ChatGPT</a> web app, a very simple one.</li>
<li><strong>Layer 5, the configuration</strong>, is text files the harness reads. A <a href="#/thing/agent-skills">SKILL.md</a>, a <a href="#/thing/claude-md">CLAUDE.md</a>, a <a href="#/thing/subagents">subagent</a> definition, a <a href="#/thing/hooks">hook</a>. No code, no deploy, instant behavior change.</li>
</ul>
<p><a href="#/thing/hermes-agent">Hermes Agent</a> and <a href="#/thing/openclaw">OpenClaw</a> are <strong>layer 4</strong>, full harnesses, not configurations. A council skill or a review skill is layer 5.</p>
<h3>Terminal agents (the serious tier)</h3>
<div class="tablewrap"><table>
<tr><th>Harness</th><th>Who</th><th>Notes</th></tr>
<tr><td><a href="#/thing/claude-code">Claude Code</a></td><td>Anthropic</td><td>Skills, subagents, hooks, plugins, MCP, per-subagent model control. Also runs in desktop, web, and IDE extensions</td></tr>
<tr><td><a href="#/thing/codex-cli">Codex CLI</a></td><td>OpenAI</td><td>Rust, strong OS-level sandboxing, the safety-first pick</td></tr>
<tr><td><a href="#/thing/gemini-cli">Gemini CLI</a></td><td>Google</td><td>Free tier ended June 2026, still strong on huge-context repo work</td></tr>
<tr><td><a href="#/thing/opencode">opencode</a></td><td>open source (MIT)</td><td>The most-starred open agent, 75+ providers, model-agnostic</td></tr>
<tr><td><a href="#/thing/aider">Aider</a></td><td>open source</td><td>The original git-native pair programmer. Small, sharp, still excellent</td></tr>
<tr><td><a href="#/thing/goose">Goose</a></td><td>Block</td><td>Open, extension-based, good MCP support</td></tr>
</table></div>
<h3>IDE and editor agents</h3>
<p><a href="#/thing/cursor">Cursor</a>, <a href="#/thing/windsurf">Windsurf</a>, <a href="#/thing/github-copilot">GitHub Copilot</a> (agent mode), <a href="#/thing/zed">Zed</a>, <a href="#/thing/jetbrains-junie">JetBrains Junie</a>, <a href="#/thing/cline">Cline</a> and <a href="#/thing/roo">Roo</a>, <a href="#/thing/antigravity">Antigravity</a>. These are the same loop with a file tree and a diff view attached.</p>
<h3>Chat interfaces</h3>
<p><a href="#/thing/claude-ai">claude.ai</a>, <a href="#/thing/chatgpt">ChatGPT</a>, Gemini, Grok, <a href="#/thing/perplexity">Perplexity</a>, <a href="#/thing/le-chat">Le Chat</a>. Lowest capability per prompt, highest convenience.</p>
<h3>Cloud and autonomous agents</h3>
<p><a href="#/thing/claude-code-web">Claude Code on the web</a>, <a href="#/thing/codex-cloud">Codex cloud</a>, <a href="#/thing/jules">Jules</a>, <a href="#/thing/devin">Devin</a>. You hand over a task and a repo and come back later. Good for parallel grunt work, unreliable for anything requiring taste.</p>
<h3>Personal-life agents (the newest category, and the one to watch)</h3>
<p><strong><a href="#/thing/openclaw">OpenClaw</a></strong> is an open-source personal agent by Peter Steinberger, formerly Clawdbot, then Moltbot, renamed after an Anthropic trademark challenge. It runs on your machine and lives in WhatsApp, Telegram, Slack, Discord, iMessage or Signal, with shell, browser, files, calendar and email access and persistent memory. Genuinely the most interesting thing in this category. Also a serious security surface: a text-message-triggered agent with shell access and your inbox is exactly the thing that gets you owned. It needs a hard security review and a sandbox before it touches real accounts.</p>
<p><strong><a href="#/thing/hermes-agent">Hermes Agent</a></strong> is an open-source agent by Nous Research, released February 2026. Self-hosted, no telemetry, single-command install. Its distinctive idea: it builds persistent memory of successes and failures and generates its own reusable skills from patterns. If you maintain a skills folder by hand, that self-improving loop is the one mechanism worth studying even if you never run it. The honest question these agents pose to anyone with an existing assistant setup is never "should I switch"; it is <strong>"what one mechanism should mine steal."</strong></p>
<h3>Layer 5: the configuration layer</h3>
<p>This is where personal leverage lives, and it costs nothing but attention.</p>
<div class="tablewrap"><table>
<tr><th>Primitive</th><th>File</th><th>What it does</th></tr>
<tr><td>Project memory</td><td><a href="#/thing/claude-md">CLAUDE.md</a>, <a href="#/thing/agents-md">AGENTS.md</a></td><td>Standing instructions read every session</td></tr>
<tr><td>Skill</td><td><a href="#/thing/agent-skills">SKILL.md</a></td><td>Packaged expertise, loaded on demand when the description matches</td></tr>
<tr><td>Subagent</td><td><a href="#/thing/subagents">agent definition</a></td><td>A forked instance with its own context, own model, own tools</td></tr>
<tr><td>Hook</td><td><a href="#/thing/hooks">settings entry</a></td><td>Deterministic shell command on a lifecycle event. The harness runs it, not the model</td></tr>
<tr><td>Plugin</td><td><a href="#/thing/plugins">plugin bundle</a></td><td>Skills plus agents plus hooks plus MCP servers, distributed as one unit</td></tr>
</table></div>
<p>Two standards matter:</p>
<ul>
<li><strong><a href="#/thing/agents-md">AGENTS.md</a></strong> is the cross-tool open standard, now Linux Foundation stewarded and read natively by Codex, Cursor, Copilot, Gemini CLI, Aider, Windsurf, and Zed. CLAUDE.md is Anthropic's richer layered version.</li>
<li><strong><a href="#/thing/agent-skills">Agent Skills</a></strong> was published as an open specification in December 2025 and is now supported by 30-plus platforms. <strong>That is the actionable one:</strong> a folder of skills is not a single-vendor asset. Change harness, and the thing you built carries over.</li>
</ul>
<h3>When to reach for which primitive</h3>
<ul>
<li>Behavior needed <strong>every time, everywhere</strong>: CLAUDE.md</li>
<li>Expertise needed <strong>sometimes, on a recognizable trigger</strong>: a skill</li>
<li>Work that would <strong>pollute your context</strong> or needs a different model: a subagent</li>
<li>Something that must happen <strong>deterministically, model or not</strong>: a hook</li>
<li>Access to <strong>an external system</strong>: an MCP server</li>
<li><strong>All of the above shipped together</strong>: a plugin</li>
</ul>`
  },
  {
    n: 5, layer: 6, title: "MCP, Connectors, and the Tool Bus", minutes: 5,
    html: `
<h2>Layer 6: MCP, Connectors, and the Tool Bus</h2>
<p>A model with no tools can only talk. This layer is how it touches real software: <strong>the tool bus is where "a chatbot" becomes "a thing that does your work."</strong></p>
<h3>MCP, in one paragraph</h3>
<p>The <strong><a href="#/thing/mcp">Model Context Protocol</a></strong> is an open standard, originally from Anthropic, for exposing tools, resources, and prompts to any AI harness. Write an MCP server once, and Claude Code, Cursor, Codex, goose, and anything else that speaks MCP can use it. It is USB-C for AI tools: the point is not any single connector, it is that you stop writing one integration per client. The registry has grown from about 100 servers at launch in late 2024 into the thousands, and the 2026-07-28 spec revision moved toward a stateless architecture specifically so servers deploy at scale without sticky sessions.</p>
<h3>Three shapes of connection</h3>
<div class="tablewrap"><table>
<tr><th>Shape</th><th>Example</th><th>Use when</th></tr>
<tr><td>Local MCP server</td><td>filesystem, <a href="#/thing/desktop-commander">desktop-commander</a>, sqlite</td><td>The data is on your machine and should stay there</td></tr>
<tr><td>Remote MCP server</td><td>Cloudflare, Stripe, GitHub, Linear</td><td>The vendor runs it, you authenticate, no install</td></tr>
<tr><td>Aggregator / gateway</td><td><a href="#/thing/composio">Composio</a>, <a href="#/thing/arcade">Arcade</a>, <a href="#/thing/pipedream">Pipedream</a></td><td>You want fifty apps without fifty OAuth dances</td></tr>
</table></div>
<h3>The aggregators, compared honestly</h3>
<div class="tablewrap"><table>
<tr><th>Platform</th><th>Scale</th><th>The actual differentiator</th></tr>
<tr><td><a href="#/thing/composio">Composio</a></td><td>500+ integrations, native MCP, gateway with enterprise SSO</td><td>Handles <strong>authentication</strong> for you, plus code-based "modifiers" that reshape tool schemas so a bloated API becomes three clean parameters. Tool-schema noise is a top cause of agents picking the wrong tool</td></tr>
<tr><td><a href="#/thing/arcade">Arcade.dev</a></td><td>~112 integrations</td><td>Handles <strong>authorization</strong>, not just auth: every tool call is a permissioned action tied to a specific user identity. The right pick when an agent acts on behalf of someone else</td></tr>
<tr><td><a href="#/thing/pipedream">Pipedream</a></td><td>2,700+ apps, 10,000+ tools, acquired by Workday late 2025</td><td>Widest catalog, per-invocation pricing, visual builder plus real code</td></tr>
<tr><td><a href="#/thing/zapier">Zapier</a> / <a href="#/thing/make">Make</a> / <a href="#/thing/n8n">n8n</a></td><td>thousands of apps</td><td>The classic automation platforms, all now with MCP surfaces. <strong>n8n is the one to care about</strong>: self-hosted, open, visual, runs on your own box</td></tr>
</table></div>
<p>Rule of thumb: <strong>Composio when the constraint is breadth plus auth, Arcade when the constraint is per-user permission, n8n when the constraint is control and cost.</strong></p>
<h3>Adjacent protocols worth knowing</h3>
<ul>
<li><strong><a href="#/thing/a2a">A2A</a></strong>: agents talking to other agents rather than to tools. Earlier in its life than MCP.</li>
<li><strong>Computer use / browser control</strong>: the model drives a real browser or desktop. <a href="#/thing/claude-in-chrome">Claude in Chrome</a>, <a href="#/thing/browser-use">Browser Use</a> (open source, strong WebVoyager numbers). The fallback when no API exists.</li>
<li><strong>Search and scrape APIs</strong>: <a href="#/thing/exa">Exa</a> (semantic), <a href="#/thing/firecrawl">Firecrawl</a> (search plus scrape in one call, LLM-clean output), <a href="#/thing/tavily">Tavily</a>, <a href="#/thing/brave-search">Brave</a>, Perplexity Sonar. Every serious research agent needs one of these, and a plain web-search tool alone is not it.</li>
</ul>
<h3>Security, said once and meant</h3>
<p>Every MCP server you add is code with your credentials. Prompt injection through tool results is a real and demonstrated attack: a webpage or an email can carry instructions that your agent reads as if you wrote them. Rules: install from sources you can identify, prefer read-only scopes, never give an agent standing write access to money or email without a confirmation step, and put anything unfamiliar through a hard security review first. The convenience is worth it; the carelessness is not.</p>`
  },
  {
    n: 6, layer: 7, title: "Applied Tools, by Job", minutes: 7,
    html: `
<h2>Layer 7: Applied Tools, by Job</h2>
<p>The finished products. Organized by <strong>the job you are hiring them for</strong>, not by vendor, because the vendor list changes every quarter and the job does not.</p>
<h3>Speech to text</h3>
<div class="tablewrap"><table>
<tr><th>Tool</th><th>Shape</th><th>Notes</th></tr>
<tr><td><a href="#/thing/whisper">Whisper</a></td><td>Open weights + API</td><td>Free to self-host, cheap hosted, batch only. Still the default because it is free and multilingual</td></tr>
<tr><td><a href="#/thing/whisper-cpp">whisper.cpp</a> / <a href="#/thing/faster-whisper">faster-whisper</a></td><td>Local</td><td>Real-time or better on a desktop. Zero cost, zero upload</td></tr>
<tr><td><a href="#/thing/assemblyai">AssemblyAI</a></td><td>API</td><td>Leads on accuracy and speech understanding, real-time available</td></tr>
<tr><td><a href="#/thing/speechmatics">Speechmatics</a></td><td>API</td><td>Best aggregate word error rate in independent tests</td></tr>
<tr><td><a href="#/thing/deepgram">Deepgram</a></td><td>API</td><td>Sub-300ms latency, owns its models, also does TTS</td></tr>
<tr><td><a href="#/thing/elevenlabs">ElevenLabs Scribe</a></td><td>API</td><td>Real-time, in the same account as voice generation</td></tr>
</table></div>
<p><strong>The pick for an archive you own:</strong> local faster-whisper. Hours of footage, zero marginal cost, no upload. For one-off videos with no captions, hosted Whisper behind a free-tier <a href="#/thing/groq">Groq</a> key takes ten minutes to set up.</p>
<h3>Video generation and editing</h3>
<div class="tablewrap"><table>
<tr><th>Tool</th><th>Job</th></tr>
<tr><td><a href="#/thing/veo">Google Veo</a></td><td>Realistic motion with native audio. Strongest prompt comprehension for cinematic language</td></tr>
<tr><td><a href="#/thing/runway">Runway</a></td><td>The working creative platform, not just a model. Credit-based, predictable cost, real editing controls</td></tr>
<tr><td><a href="#/thing/kling">Kling</a></td><td>Cheapest premium tier, strong multi-shot cinematic sequences with subject consistency</td></tr>
<tr><td><a href="#/thing/sora">Sora</a></td><td>Narrative multi-shot. <strong>Sora 2 was deprecated April 2026 with API shutdown September 2026. Do not build a pipeline on it</strong></td></tr>
<tr><td><a href="#/thing/luma">Luma</a>, <a href="#/thing/pika">Pika</a>, <a href="#/thing/higgsfield">Higgsfield</a></td><td>Fast iteration, effects, motion presets</td></tr>
<tr><td><a href="#/thing/descript">Descript</a></td><td>Edit video by editing the transcript. The highest-leverage editing tool for a narration channel</td></tr>
<tr><td><a href="#/thing/opus-clip">Opus Clip</a> / <a href="#/thing/vizard">Vizard</a></td><td>Long video into Shorts, auto-captioned and reframed</td></tr>
<tr><td><a href="#/thing/capcut">CapCut</a></td><td>Free, fast, good auto-captions</td></tr>
<tr><td><a href="#/thing/topaz">Topaz Video AI</a></td><td>Upscale and denoise. Not generative, still essential</td></tr>
</table></div>
<p><strong>The shape of a sane video pipeline:</strong> Descript for the narration edit, CapCut or Opus Clip for Shorts cutdowns, Topaz for archival footage. Generative video (Veo, Runway, Kling) is for <strong>B-roll you cannot film</strong>. Given the Sora deprecation, do not standardize on any one generator; the spine should be real footage, with generation as seasoning.</p>
<h3>Image</h3>
<p><a href="#/thing/midjourney">Midjourney</a> for aesthetics, <a href="#/thing/nano-banana-pro">Nano Banana Pro</a> for photorealism and fast multi-subject scenes, <a href="#/thing/flux">FLUX</a> for open weights you can run yourself, <a href="#/thing/ideogram">Ideogram</a> for text-in-image, <a href="#/thing/gpt-image">GPT Image</a> for instruction-following. For recurring jobs like thumbnails: FLUX locally, free after the hardware, iterating without a meter.</p>
<h3>Voice and music</h3>
<p><a href="#/thing/elevenlabs">ElevenLabs</a> for text to speech and voice cloning, the quality leader. <a href="#/thing/suno">Suno</a> for full songs with vocals, <a href="#/thing/udio">Udio</a> for instrumental and electronic. <a href="#/thing/cartesia">Cartesia</a> and <a href="#/thing/playht">PlayHT</a> for low-latency voice agents.</p>
<h3>Research and reading</h3>
<div class="tablewrap"><table>
<tr><th>Tool</th><th>Job</th></tr>
<tr><td><a href="#/thing/perplexity">Perplexity</a></td><td>Cited answers, good for company research before an interview</td></tr>
<tr><td><a href="#/thing/exa">Exa</a></td><td>Semantic web search built for agents, not humans</td></tr>
<tr><td><a href="#/thing/firecrawl">Firecrawl</a></td><td>Search plus scrape in one call, LLM-clean output</td></tr>
<tr><td><a href="#/thing/notebooklm">NotebookLM</a></td><td>Grounded Q&amp;A over documents you supply, plus audio overviews</td></tr>
<tr><td><a href="#/thing/elicit">Elicit</a> / <a href="#/thing/consensus">Consensus</a> / <a href="#/thing/alphaxiv">alphaXiv</a> / <a href="#/thing/semantic-scholar">Semantic Scholar</a></td><td>Literature search and screening</td></tr>
<tr><td><a href="#/thing/scispace">SciSpace</a>, <a href="#/thing/scholarcy">Scholarcy</a></td><td>Paper explanation and summarizing</td></tr>
</table></div>
<p>NotebookLM is worth trying for any hard course: drop the PDFs in and interrogate them.</p>
<h3>Jobs, resume, and interview</h3>
<div class="tablewrap"><table>
<tr><th>Tool</th><th>Honest read</th></tr>
<tr><td><a href="#/thing/teal">Teal</a>, <a href="#/thing/jobscan">Jobscan</a>, <a href="#/thing/resume-worded">Resume Worded</a></td><td>ATS keyword matching and resume scoring. Useful as a <strong>checker</strong>, not a writer</td></tr>
<tr><td><a href="#/thing/simplify">Simplify</a> and peers</td><td>Autofill and bulk apply. <strong>Use with care:</strong> bulk application is exactly the behavior technical recruiters filter against</td></tr>
<tr><td><a href="#/thing/final-round">Final Round AI</a>, <a href="#/thing/interview-warmup">Interview Warmup</a></td><td>Mock interviews with feedback</td></tr>
</table></div>
<p><strong>The real recommendation: mostly none of them.</strong> A tailoring workflow built on your actual resume that refuses to fabricate beats every commercial writer. The one genuinely useful outside addition is an ATS scoring check as a second opinion before a big-company portal, because those parsers are quirky in ways worth catching.</p>
<h3>Engineering, CAE, and simulation</h3>
<p>The section almost nobody outside engineering knows exists.</p>
<div class="tablewrap"><table>
<tr><th>Tool</th><th>What it does</th></tr>
<tr><td><a href="#/thing/ansys-simai">Ansys SimAI</a></td><td>Trains on your historical 3D simulation data and predicts new designs in minutes, including continuous field predictions across topology changes. Split into SimAI Pro (local) and SimAI Premium (cloud-scale)</td></tr>
<tr><td><a href="#/thing/ansys-geomai">Ansys GeomAI</a></td><td>Generative geometry variation for design-of-experiments</td></tr>
<tr><td><a href="#/thing/luminary-cloud">Luminary Cloud</a></td><td>GPU-native CFD solver plus a "physics AI factory" for training and deploying surrogate models</td></tr>
<tr><td><a href="#/thing/ntop">nTop</a></td><td>Computational and implicit geometry. The geometry bottleneck is the real blocker on AI-accelerated design, and this attacks it. Partnered with both Luminary and PhysicsX</td></tr>
<tr><td><a href="#/thing/physicsx">PhysicsX</a></td><td>End-to-end physics AI platform, aerospace and energy focused</td></tr>
<tr><td><a href="#/thing/physicsnemo">NVIDIA PhysicsNeMo / Modulus</a></td><td>Open framework for physics-informed neural networks and neural operators. The research-grade layer under the commercial tools</td></tr>
<tr><td><a href="#/thing/neural-concept">Neural Concept</a></td><td>Deep-learning surrogates for CFD-heavy design</td></tr>
<tr><td><a href="#/thing/simscale">SimScale</a>, <a href="#/thing/colab-cae">CoLab</a></td><td>Cloud CAE and AI design review</td></tr>
</table></div>
<p><strong>The idea in one line:</strong> a surrogate model trained on simulation data predicts performance across a design space in seconds instead of solving it from scratch in hours, which turns a handful of runs into hundreds of evaluated configurations.</p>
<p><strong>The highest-value move on this whole page,</strong> for anyone who already owns parameter-sweep simulation data: build even a small surrogate over your own runs and honestly report where it fails. It is a genuine design-test-iterate loop, a rare portfolio artifact, and free with PhysicsNeMo or plain PyTorch.</p>
<h3>Everyday productivity</h3>
<p><a href="#/thing/granola">Granola</a> or <a href="#/thing/otter">Otter</a> for meeting notes, <a href="#/thing/gamma">Gamma</a> for slides, <a href="#/thing/napkin">Napkin</a> for diagrams, <a href="#/thing/excalidraw">Excalidraw</a> plus AI for sketches, Cursor or Claude Code for code, Obsidian plus Claude for notes.</p>`
  },
  {
    n: 7, layer: 3, title: "Local Models on Apple Silicon", minutes: 4,
    html: `
<h2>Local Models on Apple Silicon</h2>
<h3>Why local at all, in one paragraph</h3>
<p>Three reasons, and only three. <strong>Cost:</strong> at product scale, per-token frontier pricing can be the whole margin, and an open Apache-2.0 base you fine-tune is the escape. <strong>Privacy:</strong> some data (family, health, finances) should not leave the house, and "the API is probably fine" is not a policy. <strong>Independence:</strong> a hosted model can change under you overnight, a local one cannot. Speed is not on the list. A frontier API is usually faster and always smarter.</p>
<h3>Hardware reality</h3>
<p>On high-memory Apple Silicon (M3 Ultra class, 819 GB/s), <strong>memory bandwidth is the wall, not capacity.</strong> Generation runs roughly 60 to 100 tokens per second on a well-fitted MXFP4 120B-class model. The consequence for model selection: <strong>prefer mixture-of-experts models with small active parameter counts.</strong> A 120B MoE with a few billion active parameters reads far faster than a dense 70B, because bandwidth is spent on active weights. That single rule explains most of the shortlist.</p>
<h3>The open-weight field (2026-08-13 snapshot)</h3>
<div class="tablewrap"><table>
<tr><th>Model family</th><th>Shape</th><th>Why it is on the list</th></tr>
<tr><td><a href="#/thing/gpt-oss">gpt-oss-120b</a></td><td>MoE, MXFP4, ~59GB</td><td>The reference pick: Apache-2.0, tool-calling native, fits comfortably</td></tr>
<tr><td><a href="#/thing/qwen">Qwen3 family</a> (30B-A3B and up)</td><td>MoE, permissive license</td><td>The best small-and-mid local family anywhere; Qwen3-Coder class is the practical local coding pick, Qwen3-VL the vision option</td></tr>
<tr><td><a href="#/thing/deepseek-models">DeepSeek V4 / Flash</a></td><td>MoE</td><td>Best price-performance and the self-hosting favorite; large quants need very high memory</td></tr>
<tr><td><a href="#/thing/glm">GLM-5.x</a></td><td>MoE</td><td>Strong low-cost coding, the long-context bet</td></tr>
<tr><td><a href="#/thing/kimi">Kimi K-series</a></td><td>MoE, very large</td><td>Agentic specialist, sized for datacenters more than a desktop. Watch, do not plan</td></tr>
<tr><td><a href="#/thing/gemma">Gemma</a></td><td>Dense</td><td>Good quality; dense means slower per byte on bandwidth-limited hardware</td></tr>
<tr><td><a href="#/thing/mistral-models">Mistral small models</a></td><td>Dense/MoE</td><td>Excellent European option, permissive, small enough to be fast</td></tr>
<tr><td><a href="#/thing/flux">FLUX</a></td><td>Image</td><td>The open image model: free thumbnails and art</td></tr>
<tr><td><a href="#/thing/faster-whisper">faster-whisper</a> / <a href="#/thing/whisper-cpp">whisper.cpp</a></td><td>Speech</td><td>Free transcription of an entire archive with nothing uploaded</td></tr>
</table></div>
<h3>The runtime layer</h3>
<div class="tablewrap"><table>
<tr><th>Runtime</th><th>Use it for</th></tr>
<tr><td><a href="#/thing/llama-cpp">llama.cpp</a></td><td>The conservative serving layer: broadest quant support, correct tool-call templating (llama-server with --jinja). Pin the version</td></tr>
<tr><td><a href="#/thing/mlx">MLX / mlx_lm</a></td><td>Apple-native, roughly 10 to 20 percent faster on newer silicon; watch the tool-call channel-leak bug history before trusting it in production</td></tr>
<tr><td><a href="#/thing/ollama">Ollama</a></td><td>Easiest to run, thinnest control. Fine for experiments, not for a production path</td></tr>
<tr><td><a href="#/thing/lm-studio">LM Studio</a></td><td>GUI, good for a quick "does this model feel right" test before committing</td></tr>
<tr><td><a href="#/thing/vllm">vLLM</a></td><td>The serious server runtime, but a Linux/CUDA story, not Apple Silicon</td></tr>
</table></div>
<h3>What a periodic check should actually ask</h3>
<ol>
<li>Has anything shipped that beats the incumbent at under 70GB with native tool calling and an Apache-style license? Most releases fail the license or the tool-calling test, so this is usually a ten-second no.</li>
<li>Have the runtime bugs that matter (tool-call correctness) been fixed, making a faster runtime worth one bake-off afternoon?</li>
<li>Is there a better local speech or vision model for archive work? Separate question from the text brain, pure upside.</li>
</ol>
<p>Everything else is hype management: judge releases against your own gate questions, never against launch-day noise.</p>`
  },
  {
    n: 8, layer: 8, title: "Government, Defense, and Policy", minutes: 5,
    html: `
<h2>Layer 8: Government, Defense, and Policy</h2>
<p>What do governments use AI for? <strong>The same things everyone else does, plus procurement, plus the power to stop other people from doing it.</strong> That last part is what makes this a layer rather than a footnote, and it matters directly to anyone applying into defense-adjacent aerospace.</p>
<h3>United States</h3>
<p><strong><a href="#/thing/gsa-usai">GSA's USAi</a></strong> is the central platform: agencies get access to frontier models from Google, Meta, Anthropic and OpenAI in one evaluated, secured environment. Launched free, with about 15 agencies on it and a waiting list, moving to a cost-recoverable model in fiscal 2027. Alongside it, the major labs cut deliberately symbolic pricing deals in 2025: roughly $1 per agency per year from OpenAI and Anthropic, $0.47 for Gemini for Government under the OneGov strategy. Land-grab prices, not sustainable ones.</p>
<p><strong>The Anthropic federal situation is genuinely unresolved.</strong> A federal directive to stop using Claude was preliminarily enjoined by a judge in March 2026 and GSA restored Anthropic to USAi and the schedules; a subsequent action set an August 2026 date to remove system integrations. Treat any single headline here as a snapshot of live litigation, not a settled outcome. The practical read: <strong>do not assume a given model is available in a given federal context.</strong> That is exactly the kind of constraint a defense contractor lives with, and it is a clean example of layer 8 reaching down and changing layer 2.</p>
<p><strong>What agencies use it for:</strong> document and records processing at scale, FOIA, translation, cyber defense, procurement analysis, intelligence triage, logistics and maintenance prediction, and simulation. In defense specifically: autonomy, targeting decision support (with human-in-loop policy), predictive maintenance, and wargaming.</p>
<p><strong>The companies in that room:</strong> <a href="#/thing/palantir">Palantir</a>, <a href="#/thing/anduril">Anduril</a>, <a href="#/thing/scale-ai">Scale AI</a>, <a href="#/thing/booz-allen">Booz Allen</a>, <a href="#/thing/leidos">Leidos</a>, plus the frontier labs through their government arms. Anduril is an AI-first defense company, which means its interviews assume you understand autonomy and sensor fusion at least conversationally.</p>
<p><strong>National labs and NASA:</strong> the <a href="#/thing/doe-labs">DOE labs</a> (Oak Ridge, Argonne, Livermore, Los Alamos, Sandia) run some of the largest scientific AI programs on earth: materials discovery, fusion plasma control, climate, and surrogate modeling of exactly the kind described on layer 7. The AI-adjacent work inside those labs is surrogate modeling of physical systems, which is a specific pitch, not a generic one. <a href="#/thing/nasa">NASA</a> uses AI for autonomous navigation, anomaly detection on spacecraft telemetry, Earth observation, and design optimization.</p>
<h3>Export control, the quiet lever</h3>
<p>The most consequential AI policy instrument is not a law about chatbots, it is <strong><a href="#/thing/export-control">who can buy which chips</a></strong>. Restrictions on advanced accelerators and the equipment to make them shape which countries can train frontier models at all. This is why Chinese labs are so aggressively efficient: constraint produced optimization. Any AI capability forecast that ignores semiconductor policy is guessing.</p>
<h3>Europe</h3>
<p>The <strong><a href="#/thing/eu-ai-act">EU AI Act</a></strong> is the world's most comprehensive framework and became fully enforceable through 2026, with high-risk obligations hitting a hard milestone in August 2026. It is risk-tiered: unacceptable, high, limited, minimal. Practical effect: anything touching employment, education, credit, biometrics, or safety-critical systems carries documentation and conformity duties. The rules apply to services offered in the EU, not just to EU companies; "just ship it" is a US-shaped instinct. Europe is simultaneously running a sovereignty play, with Mistral as the national champion and sovereign compute buildouts.</p>
<h3>China</h3>
<p>State-directed, sovereignty-focused, and fast. <strong><a href="#/thing/china-agent-rules">China's Implementation Opinions on intelligent agents</a>, effective 15 July 2026, is the first national framework anywhere to regulate AI agents as their own category</strong> rather than as an extension of model rules. Requirements center on content compliance, data localization, and national security review. The paradox worth holding: the most tightly regulated large AI market is also the most prolific publisher of open-weight models.</p>
<h3>The rest of the world</h3>
<p>Over 100 countries signed the <strong><a href="#/thing/bangkok-declaration">Bangkok Declaration</a></strong> in February 2026 committing to AI sovereignty: national compute, national models, national data rules. Expect more national LLMs, more data-residency requirements, more fragmentation. The <a href="#/thing/uk-aisi">UK AI Safety Institute</a> and its international counterparts do pre-deployment evaluation of frontier models.</p>
<h3>What to take from this layer</h3>
<ol>
<li><strong>Availability is political.</strong> A model you rely on can become unavailable in a jurisdiction or a contract for reasons that have nothing to do with quality. Design for provider substitution: the same argument layer 3 makes for a router.</li>
<li><strong>Defense-adjacent employers assume baseline literacy here.</strong> Being able to talk about autonomy and export control without flinching is table stakes.</li>
</ol>`
  },
  {
    n: 9, layer: 8, title: "The Watchlist: Where to Hunt", minutes: 4,
    html: `
<h2>The Watchlist: Where to Hunt</h2>
<p>Where something is actually new, ordered by signal per minute, which is not the same as popularity. Most AI content is people restating a press release.</p>
<h3>Tier 1: primary sources, always check</h3>
<ul>
<li><strong>Lab changelogs and docs.</strong> The only non-rumor version numbers.</li>
<li><strong>Artificial Analysis.</strong> Independent intelligence, price, speed, plus an Openness Index for open weights.</li>
<li><strong>LMArena.</strong> Blind human preference Elo.</li>
<li><strong>SWE-bench Verified.</strong> Real GitHub issues, the coding standard. Terminal-Bench and OSWorld for agentic terminal and computer use.</li>
<li><strong>Hugging Face trending.</strong> New open weights the hour they land.</li>
<li><strong>The MCP registry and spec blog.</strong> Protocol changes, new servers.</li>
</ul>
<p>The full list with links lives on the <a href="#/sources">Sources</a> page.</p>
<h3>Tier 2: community, where things surface first</h3>
<ul>
<li><strong>r/LocalLLaMA</strong>: the single highest-signal AI community that exists. Quantization, hardware, local serving, honest benchmarks.</li>
<li><strong>r/MachineLearning</strong>: research and criticism, not launch chatter.</li>
<li><strong>Hacker News</strong>: the Show HN and Ask HN posts, not the front-page discourse.</li>
<li><strong>GitHub Trending</strong>: where new harnesses and tools appear before anyone writes about them.</li>
<li><strong>X</strong>: fastest, worst signal-to-noise. Follow lab accounts and individual researchers only, never the hype accounts.</li>
</ul>
<h3>Tier 3: curated digests, for coverage not discovery</h3>
<ul>
<li><strong>TLDR AI</strong>: densest daily scan, least promotional, engineer-oriented.</li>
<li><strong>AlphaSignal</strong>: weekly, research grade, includes trending repos.</li>
<li><strong>The Batch</strong>: Andrew Ng's weekly letter plus a categorized roundup.</li>
<li><strong>Import AI</strong> (Jack Clark), <strong>The Rundown</strong>, <strong>Ben's Bites</strong>: policy and general coverage.</li>
<li><strong>Simon Willison's blog</strong>: the best single individual writer on practical LLM use. If he writes about a tool, read it.</li>
</ul>
<h3>Tier 4: the "somebody built something insane" feeds</h3>
<ul>
<li><strong>awesome-mcp-servers, awesome-claude-code, awesome-llm-apps</strong> on GitHub, and their commit histories, which show what got added this month.</li>
<li>The <strong>Claude Code plugin and skill marketplaces</strong>, plus any repo of shared SKILL.md files.</li>
<li><strong>n8n and Zapier template galleries</strong> for automation patterns worth stealing.</li>
<li><strong>r/LocalLLaMA weekly megathreads</strong> and HN "what are you building" threads.</li>
</ul>
<h3>The slop problem, and the rule that handles it</h3>
<p>A large share of "best AI tools" pages are machine-generated affiliate content that confidently invents version numbers, benchmark scores, and release dates. Two of them will contradict each other and both will sound certain. <strong>The rule: no version number, price, or benchmark figure gets written down unless it came from the lab's own documentation, an independent benchmark site, or a named news outlet.</strong> Everything else gets written as a category, not a claim. Where a number is uncertain, say so rather than laundering it into fact.</p>
<h3>Five standing questions for any deliberate sweep</h3>
<ol>
<li>Did anything change what I should use for my daily work?</li>
<li>Did anything appear that closes a known gap in my own setup?</li>
<li>Did anything I depend on get deprecated, repriced, or restricted? Deprecations are the expensive surprise, not new releases.</li>
<li>Did the open-weight field move enough to matter for my local hardware, judged against my own gate questions rather than hype?</li>
<li>Is there one workflow or configuration idea worth stealing this month? Exactly one, named. Not a list of ten.</li>
</ol>
<p>A sweep that only lists new toys is a failed sweep.</p>`
  }
];
