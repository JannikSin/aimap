// Every entity on the map. Body prose exists ONLY where the source notes had
// real prose (about 40 of them); everything else is a chip: name, layer,
// aliases, one line. "Listed, not written up" is an honest state, not a bug.
// Rules (see the handoff): never invent a URL, never invent a number.
// `noted` means "a model wrote it down on this date", not "a human verified it".
// durability: "structural" survives quarters; "perishable" rots in weeks.
const D = "2026-08-13";
export default [

  // ---------- Layer 0: silicon and power ----------
  {
    id: "tsmc", name: "TSMC", aliases: [], layer: 0,
    oneLine: "Makes nearly all leading-edge AI silicon (N3, N2); Taiwan-concentrated",
    facts: [
      { label: "Why it matters", value: "The single hardest bottleneck in the whole stack. Fab capacity, not chip design, caps GPU output.", durability: "structural", noted: D, source: null }
    ]
  },
  {
    id: "nvidia", name: "NVIDIA", aliases: [], layer: 0,
    oneLine: "GPU design plus CUDA plus NVLink plus networking; sells systems, not chips",
    facts: [
      { label: "Also", value: "A heavy internal AI user (chip floorplanning, verification) and owner of a physics-AI stack: Omniverse, PhysicsNeMo, Modulus.", durability: "structural", noted: D, source: null },
      { label: "2026 transition", value: "Blackwell shipments fall off through 2026 while Rubin (R200, TSMC N3, HBM4, NVLink 6) ramps in the second half; the real volume ramp is 2027 because fab capacity is the ceiling.", durability: "perishable", noted: D, source: null }
    ]
  },
  { id: "asml", name: "ASML", aliases: [], layer: 0,
    oneLine: "Only maker of EUV lithography machines; export-controlled and geopolitically load-bearing" },
  { id: "sk-hynix", name: "SK Hynix", aliases: [], layer: 0,
    oneLine: "HBM stacked memory; HBM supply gates GPU shipments as hard as wafers do" },
  { id: "samsung", name: "Samsung", aliases: [], layer: 0,
    oneLine: "HBM memory supplier alongside SK Hynix and Micron" },
  { id: "micron", name: "Micron", aliases: [], layer: 0,
    oneLine: "The third HBM supplier" },
  { id: "google-tpu", name: "Google TPU", aliases: ["TPU"], layer: 0,
    oneLine: "In-house accelerator, made at TSMC with Broadcom; the only serious vertically-integrated alternative to NVIDIA at scale" },
  { id: "aws-trainium", name: "AWS Trainium / Inferentia", aliases: ["Trainium", "Inferentia"], layer: 0,
    oneLine: "Amazon's own accelerators; cheap capacity for Bedrock, why Claude runs there" },
  { id: "amd", name: "AMD", aliases: [], layer: 0,
    oneLine: "MI-series GPUs; the real second source, still software-limited versus CUDA" },
  { id: "broadcom", name: "Broadcom", aliases: [], layer: 0,
    oneLine: "Custom accelerator co-design for hyperscalers; the quiet giant of not-NVIDIA silicon" },
  { id: "cerebras", name: "Cerebras", aliases: [], layer: 0,
    oneLine: "Wafer-scale inference silicon; extreme token throughput, niche but real" },
  { id: "huawei-ascend", name: "Huawei Ascend", aliases: ["Ascend"], layer: 0,
    oneLine: "China's domestic accelerator; the whole reason Chinese labs optimize so hard for efficiency" },
  { id: "coreweave", name: "CoreWeave", aliases: [], layer: 0,
    oneLine: "Neocloud: rents GPU capacity to labs that cannot get enough from the big three" },
  { id: "nebius", name: "Nebius", aliases: [], layer: 0,
    oneLine: "Neocloud GPU capacity provider" },
  { id: "lambda", name: "Lambda", aliases: ["Lambda Labs"], layer: 0,
    oneLine: "Neocloud GPU capacity provider" },
  { id: "grid-power", name: "Grid power", aliases: ["power", "datacenter power"], layer: 0,
    oneLine: "Now a first-class constraint; datacenter site selection is driven by grid interconnect queues" },

  // ---------- Layer 1: labs ----------
  {
    id: "anthropic", name: "Anthropic", aliases: [], layer: 1,
    oneLine: "Claude. Agentic coding and long-running agents, strongest tool-use discipline, safety-forward",
    body: "Ships the Claude family: a frontier tier (Fable 5, Opus 5), the daily workhorse (Sonnet 5), and a fast cheap tier (Haiku 4.5). Character: strongest at agentic coding and long-running agent work, with safety-forward positioning. Runs on the Claude API, Bedrock, Vertex, and Microsoft Foundry. One durable technical note: the tokenizer changed with Opus 4.7 and later models, so the same text produces roughly 30 percent more tokens than on older models, and old cost estimates understate current spend.",
    facts: [
      { label: "Where it runs", value: "Claude API, Amazon Bedrock, Google Vertex, Microsoft Foundry", durability: "structural", noted: D, source: null },
      { label: "Tokenizer", value: "From Opus 4.7 onward, roughly 30 percent more tokens for the same text than older Claude models", durability: "structural", noted: D, source: "https://platform.claude.com/docs" }
    ]
  },
  { id: "openai", name: "OpenAI", aliases: [], layer: 1,
    oneLine: "GPT-5.x family; broadest product surface, strongest consumer distribution, deep enterprise push" },
  { id: "google-deepmind", name: "Google DeepMind", aliases: ["DeepMind", "Google"], layer: 1,
    oneLine: "Gemini 3.x; best price-performance at scale, native long context, embedded in everything Google owns" },
  { id: "spacexai", name: "SpaceXAI", aliases: ["xAI"], layer: 1,
    oneLine: "Grok 4.x; real-time X data, large context, fastest-moving and least predictable. Folded into SpaceX Feb 2026" },
  { id: "meta", name: "Meta", aliases: [], layer: 1,
    oneLine: "Llama line plus newer closed work; was the open-weight anchor of the West, strategy drifting toward closed frontier work" },
  { id: "mistral", name: "Mistral", aliases: [], layer: 1,
    oneLine: "Europe's champion and sovereignty play; genuinely good small models, open-weight releases" },
  { id: "microsoft", name: "Microsoft", aliases: [], layer: 1,
    oneLine: "Phi small models and MAI in-house work; hedging its OpenAI dependence" },
  { id: "amazon", name: "Amazon", aliases: [], layer: 1,
    oneLine: "Nova: cheap, Bedrock-native, not a frontier contender" },
  { id: "apple", name: "Apple", aliases: [], layer: 1,
    oneLine: "On-device foundation models: small, private, on your phone and Mac. Not competing on frontier" },
  { id: "deepseek", name: "DeepSeek", aliases: [], layer: 1,
    oneLine: "The efficiency shock: open weights, aggressive pricing, self-hostable. V-series plus R-series reasoning" },
  { id: "moonshot", name: "Moonshot AI", aliases: ["Moonshot"], layer: 1,
    oneLine: "Kimi K-series; agentic and long-context specialist, an open-weight leader on several boards" },
  { id: "alibaba", name: "Alibaba", aliases: [], layer: 1,
    oneLine: "Qwen: the most permissively licensed and most useful family for local work, best small-model lineup anywhere" },
  { id: "zhipu", name: "Zhipu AI", aliases: ["Zhipu"], layer: 1,
    oneLine: "GLM series; strong coding models at low cost. Listed in Hong Kong in 2026" },
  { id: "minimax", name: "MiniMax", aliases: [], layer: 1,
    oneLine: "M-series; the cheapest capable tier. Also listed in 2026" },
  { id: "bytedance", name: "ByteDance", aliases: [], layer: 1,
    oneLine: "Doubao / Seed; enormous domestic consumer distribution in China" },
  { id: "baidu", name: "Baidu", aliases: [], layer: 1,
    oneLine: "ERNIE; incumbent, less relevant outside China" },
  { id: "tencent", name: "Tencent", aliases: [], layer: 1,
    oneLine: "Hunyuan; strong on video and 3D generation" },
  { id: "stepfun", name: "StepFun", aliases: [], layer: 1,
    oneLine: "One of China's Six Tigers, diverging in strategy" },
  { id: "baichuan", name: "Baichuan", aliases: [], layer: 1,
    oneLine: "One of China's Six Tigers, diverging in strategy" },
  { id: "01ai", name: "01.AI", aliases: [], layer: 1,
    oneLine: "One of China's Six Tigers, diverging in strategy" },

  // ---------- Layer 2: models ----------
  {
    id: "claude-fable-5", name: "Claude Fable 5", aliases: ["Fable 5", "Fable"], layer: 2,
    oneLine: "Anthropic's highest-capability tier, for long-running agents and work at the edge",
    body: "The top of the Claude lineup. Use it when a job is genuinely at the edge of what models can do; for the common heavy case, Opus 5 is the default pick.",
    facts: [
      { label: "Model id", value: "claude-fable-5", durability: "perishable", noted: D, source: "https://platform.claude.com/docs" },
      { label: "Context / max out", value: "1M context, 128k max output", durability: "perishable", noted: D, source: "https://platform.claude.com/docs" },
      { label: "Price per Mtok", value: "$10 in / $50 out", durability: "perishable", noted: D, source: "https://platform.claude.com/docs" }
    ]
  },
  {
    id: "claude-opus-5", name: "Claude Opus 5", aliases: ["Opus 5", "Opus"], layer: 2,
    oneLine: "The default heavy pick: hard reasoning, multi-file code, long agent runs",
    body: "The default answer for complex agentic coding and hard reasoning. When a task is multi-file, long-horizon, or expensive to get wrong, this is the pick; escalate to Fable 5 only when the job is genuinely at the frontier.",
    facts: [
      { label: "Model id", value: "claude-opus-5", durability: "perishable", noted: D, source: "https://platform.claude.com/docs" },
      { label: "Context / max out", value: "1M context, 128k max output", durability: "perishable", noted: D, source: "https://platform.claude.com/docs" },
      { label: "Price per Mtok", value: "$5 in / $25 out", durability: "perishable", noted: D, source: "https://platform.claude.com/docs" }
    ]
  },
  {
    id: "claude-sonnet-5", name: "Claude Sonnet 5", aliases: ["Sonnet 5", "Sonnet"], layer: 2,
    oneLine: "Speed plus intelligence: the daily driver for ordinary work done a thousand times",
    facts: [
      { label: "Model id", value: "claude-sonnet-5", durability: "perishable", noted: D, source: "https://platform.claude.com/docs" },
      { label: "Context / max out", value: "1M context, 128k max output", durability: "perishable", noted: D, source: "https://platform.claude.com/docs" },
      { label: "Price per Mtok", value: "$2 in / $10 out", durability: "perishable", noted: D, source: "https://platform.claude.com/docs" }
    ],
    body: "The workhorse tier: ordinary work you will do a thousand times, where speed and cost matter as much as peak intelligence."
  },
  {
    id: "claude-haiku", name: "Claude Haiku 4.5", aliases: ["Haiku"], layer: 2,
    oneLine: "Fastest and cheapest Claude: bulk and mechanical work",
    body: "The bulk tier. When the job is mechanical transformation at volume, cost dominates and this is the Claude pick; an open model you host yourself is the other legitimate answer.",
    facts: [
      { label: "Model id", value: "claude-haiku-4-5", durability: "perishable", noted: D, source: "https://platform.claude.com/docs" },
      { label: "Context / max out", value: "200k context, 64k max output", durability: "perishable", noted: D, source: "https://platform.claude.com/docs" },
      { label: "Price per Mtok", value: "$1 in / $5 out", durability: "perishable", noted: D, source: "https://platform.claude.com/docs" }
    ]
  },
  { id: "gpt-5", name: "GPT-5.x", aliases: ["GPT-5"], layer: 2,
    oneLine: "OpenAI's flagship family" },
  { id: "gemini", name: "Gemini 3.x", aliases: ["Gemini"], layer: 2,
    oneLine: "Google's flagship line (Pro / Flash); Flash is the cost-dominant workhorse pick" },
  { id: "grok", name: "Grok 4.x", aliases: ["Grok"], layer: 2,
    oneLine: "SpaceXAI's model line; real-time X data, large context" },
  {
    id: "qwen", name: "Qwen", aliases: ["Qwen3", "Qwen3-Coder", "Qwen-Max"], layer: 2,
    oneLine: "The best open-weight family for local work: permissive licenses, best small-model lineup anywhere",
    body: "Alibaba's open-weight family, and the practical answer for most local work. Mixture-of-experts variants with small active parameter counts (the 30B-A3B class) read fast on bandwidth-limited hardware, and the licensing is the most permissive of the major families. Qwen3-Coder-class models are the practical local coding pick; Qwen3-VL is a real local vision option.",
    facts: [
      { label: "Rule of thumb", value: "Qwen for anything you run locally; DeepSeek or GLM for cheap API bulk work; Kimi when the job is agentic", durability: "structural", noted: D, source: null }
    ]
  },
  { id: "deepseek-models", name: "DeepSeek V / R series", aliases: ["DeepSeek V4", "V4 Flash"], layer: 2,
    oneLine: "Best price-performance and the self-hosting favorite; V4-class quants are large enough to need serious memory" },
  { id: "kimi", name: "Kimi K-series", aliases: ["Kimi"], layer: 2,
    oneLine: "Moonshot's agentic specialist; sized for datacenters more than a desktop" },
  { id: "glm", name: "GLM", aliases: ["GLM-5"], layer: 2,
    oneLine: "Zhipu's line: strong low-cost coding, the long-context bet" },
  { id: "llama", name: "Llama", aliases: [], layer: 2,
    oneLine: "Meta's open-weight line, formerly the Western anchor of the field" },
  { id: "gemma", name: "Gemma", aliases: [], layer: 2,
    oneLine: "Google's open family; good quality, dense architecture means slower per byte than MoE peers" },
  { id: "mistral-models", name: "Mistral models", aliases: ["Mistral Large", "Mistral Small"], layer: 2,
    oneLine: "Excellent European option: permissive, small enough to be fast" },
  {
    id: "gpt-oss", name: "gpt-oss-120b", aliases: ["gpt-oss"], layer: 2,
    oneLine: "Apache-2.0 open-weight MoE with native tool calling; fits comfortably on a 128GB-class machine",
    body: "The reference open-weight pick for serious local agent work: Apache-2.0 licensed, mixture-of-experts, tool-calling native, and around 59GB in MXFP4, which fits comfortably on high-memory Apple Silicon. The bar any newer local model has to clear: beat it at under 70GB with native tool calling and an Apache-style license.",
    facts: [
      { label: "Shape", value: "MoE, MXFP4 quant around 59GB, Apache-2.0, native tool calling", durability: "structural", noted: D, source: null }
    ]
  },
  { id: "phi", name: "Phi", aliases: [], layer: 2,
    oneLine: "Microsoft's small-model line" },
  { id: "nova", name: "Nova", aliases: [], layer: 2,
    oneLine: "Amazon's cheap Bedrock-native models" },

  // ---------- Layer 3: access ----------
  { id: "bedrock", name: "Amazon Bedrock", aliases: ["Bedrock"], layer: 3,
    oneLine: "AWS model marketplace: enterprise compliance, data residency, existing cloud credit. Lags direct APIs on new features" },
  { id: "vertex", name: "Google Vertex AI", aliases: ["Vertex"], layer: 3,
    oneLine: "Google Cloud's model marketplace" },
  { id: "microsoft-foundry", name: "Microsoft Foundry", aliases: ["Azure AI Foundry"], layer: 3,
    oneLine: "Microsoft's model marketplace on Azure" },
  {
    id: "openrouter", name: "OpenRouter", aliases: [], layer: 3,
    oneLine: "One key, hundreds of models: instant A/B testing, automatic failover, open-weight prices",
    body: "The router. One API key and every major model becomes one HTTP call away: Claude, GPT, Gemini, Grok, Qwen, DeepSeek, Kimi, GLM, Llama, with free tiers on some open models. It speaks the OpenAI-compatible schema, so almost every tool already supports it. What a router buys you: bulk jobs at open-weight prices without six accounts, honest same-prompt comparison across models instead of leaderboard vibes, and failover when one provider is down at 11pm. The tradeoff: it adds a hop and a margin, and you should read the privacy terms.",
    facts: [
      { label: "Category", value: "Router / aggregator; OpenAI-compatible wire format", durability: "structural", noted: D, source: null }
    ]
  },
  { id: "together", name: "Together", aliases: ["Together AI"], layer: 3,
    oneLine: "Router / hosted inference for open-weight models" },
  { id: "fireworks", name: "Fireworks", aliases: [], layer: 3,
    oneLine: "Router / hosted inference for open-weight models" },
  {
    id: "groq", name: "Groq", aliases: [], layer: 3,
    oneLine: "LPU-based inference: extreme token throughput, hosted Whisper, free-tier viable",
    body: "Inference on its own non-GPU LPU silicon, giving extreme token throughput. Practically useful as the cheapest way to get hosted Whisper transcription running: a free-tier key takes about ten minutes to set up and unlocks transcription for videos with no captions.",
    facts: [
      { label: "Silicon", value: "Runs its own LPU inference chips rather than GPUs", durability: "structural", noted: D, source: null }
    ]
  },
  {
    id: "llama-cpp", name: "llama.cpp", aliases: ["llama-server"], layer: 3,
    oneLine: "The reference local serving layer: broadest quant support, correct tool-call templating",
    body: "The local runtime with the broadest quantization support and correct tool-call templating (run llama-server with --jinja). The conservative production pick for local serving on Apple Silicon; pin the version you deploy.",
    facts: [
      { label: "Role", value: "Local serving layer of record for open-weight models", durability: "structural", noted: D, source: null }
    ]
  },
  { id: "mlx", name: "MLX", aliases: ["mlx_lm", "mlx_vlm"], layer: 3,
    oneLine: "Apple-native runtime, roughly 10 to 20 percent faster on newer silicon; had an open tool-call channel-leak bug that fabricated tool results" },
  { id: "ollama", name: "Ollama", aliases: [], layer: 3,
    oneLine: "Easiest local runtime to run, thinnest control. Fine for experiments, not a production path" },
  { id: "lm-studio", name: "LM Studio", aliases: [], layer: 3,
    oneLine: "GUI runtime, good for a quick does-this-model-feel-right test before committing" },
  { id: "vllm", name: "vLLM", aliases: [], layer: 3,
    oneLine: "The serious server runtime, but a Linux/CUDA story, not Apple Silicon" },
  {
    id: "cloudflare-workers-ai", name: "Cloudflare Workers AI", aliases: ["Workers AI"], layer: 3,
    oneLine: "Open-weight models served at the edge, callable from Workers with one binding",
    body: "Cloudflare's hosted inference: open-weight models served from its edge, callable from a Worker with one binding and no separate GPU bill. A practical way to put a small AI layer behind a web app without standing up any infrastructure.",
    facts: [
      { label: "Shape", value: "Serverless inference bound directly into Cloudflare Workers", durability: "structural", noted: D, source: null }
    ]
  },

  // ---------- Layer 4: harnesses ----------
  {
    id: "claude-code", name: "Claude Code", aliases: [], layer: 4,
    oneLine: "Anthropic's terminal agent: skills, subagents, hooks, plugins, MCP, per-subagent model control",
    body: "The reference terminal harness. It holds the full agent loop with tools, and exposes every configuration primitive on layer 5: project memory (CLAUDE.md), skills, subagents with their own context and model, deterministic hooks, and plugins that bundle all of the above. Also runs as a desktop app, on the web, and inside IDE extensions. The reason the harness-versus-model distinction matters: everything you build here as configuration is text, and much of it is portable to other harnesses.",
    facts: [
      { label: "Surfaces", value: "CLI, desktop app, web, VS Code and JetBrains extensions", durability: "structural", noted: D, source: null }
    ]
  },
  {
    id: "claude-ai", name: "claude.ai", aliases: ["Claude web"], layer: 4,
    oneLine: "Anthropic's chat interface; lowest friction surface for Claude with connectors and artifacts",
    body: "The chat-app surface for Claude. Like all chat interfaces it is the lowest capability per prompt but the highest convenience, and with hosted connectors wired in it doubles as a light agent surface.",
    facts: [
      { label: "Category", value: "Chat interface over the Claude models", durability: "structural", noted: D, source: null }
    ]
  },
  { id: "codex-cli", name: "Codex CLI", aliases: ["Codex"], layer: 4,
    oneLine: "OpenAI's terminal agent: Rust, strong OS-level sandboxing, the safety-first pick" },
  { id: "gemini-cli", name: "Gemini CLI", aliases: [], layer: 4,
    oneLine: "Google's terminal agent; free tier ended June 2026, still strong on huge-context repo work" },
  { id: "opencode", name: "opencode", aliases: [], layer: 4,
    oneLine: "The most-starred open-source agent: MIT, 75+ providers, model-agnostic" },
  { id: "aider", name: "Aider", aliases: [], layer: 4,
    oneLine: "The original git-native pair programmer. Small, sharp, still excellent" },
  { id: "goose", name: "Goose", aliases: [], layer: 4,
    oneLine: "Block's open harness: extension-based, good MCP support" },
  { id: "qwen-code", name: "Qwen Code", aliases: [], layer: 4,
    oneLine: "Model-vendor variant of the terminal-agent idea" },
  { id: "kilo-cli", name: "Kilo CLI", aliases: [], layer: 4,
    oneLine: "Open variant of the terminal-agent idea" },
  { id: "cursor", name: "Cursor", aliases: [], layer: 4,
    oneLine: "IDE agent: the same loop with a file tree and a diff view attached" },
  { id: "windsurf", name: "Windsurf", aliases: [], layer: 4,
    oneLine: "IDE agent" },
  { id: "github-copilot", name: "GitHub Copilot", aliases: ["Copilot"], layer: 4,
    oneLine: "IDE agent (agent mode) plus the Workspace cloud variant" },
  { id: "zed", name: "Zed", aliases: [], layer: 4,
    oneLine: "Editor with native agent support; reads AGENTS.md" },
  { id: "jetbrains-junie", name: "JetBrains Junie", aliases: ["Junie"], layer: 4,
    oneLine: "JetBrains' IDE agent" },
  { id: "cline", name: "Cline", aliases: [], layer: 4,
    oneLine: "VS Code extension agent" },
  { id: "roo", name: "Roo", aliases: ["Roo Code"], layer: 4,
    oneLine: "VS Code extension agent" },
  { id: "antigravity", name: "Antigravity", aliases: ["Google Antigravity"], layer: 4,
    oneLine: "Google's agent-first IDE" },
  {
    id: "chatgpt", name: "ChatGPT", aliases: [], layer: 4,
    oneLine: "OpenAI's chat interface. A harness, not a model, and not the same thing as OpenAI",
    body: "The most-used chat interface in the world, and the cleanest example of why the layer distinction matters: ChatGPT is a harness (a program running models in a loop), OpenAI is the lab, and GPT-5.x is the model family. Saying 'ChatGPT' when you mean any of the other two is the exact conflation this map exists to correct.",
    facts: [
      { label: "Layer lesson", value: "ChatGPT is a harness; OpenAI is a lab; GPT-5.x is a model family. Three different shelves.", durability: "structural", noted: D, source: null }
    ]
  },
  { id: "le-chat", name: "Le Chat", aliases: [], layer: 4,
    oneLine: "Mistral's chat interface" },
  { id: "claude-code-web", name: "Claude Code on the web", aliases: [], layer: 4,
    oneLine: "Cloud agent: hand over a task and a repo, come back later" },
  { id: "codex-cloud", name: "Codex cloud", aliases: [], layer: 4,
    oneLine: "OpenAI's cloud agent" },
  { id: "jules", name: "Jules", aliases: [], layer: 4,
    oneLine: "Google's cloud agent" },
  { id: "devin", name: "Devin", aliases: [], layer: 4,
    oneLine: "The original autonomous-software-engineer pitch; good for parallel grunt work, unreliable for taste" },
  {
    id: "openclaw", name: "OpenClaw", aliases: ["Clawdbot", "Moltbot"], layer: 4,
    oneLine: "Open-source personal agent that lives in your chat apps",
    body: "An open-source personal agent by Peter Steinberger, formerly Clawdbot, then Moltbot, renamed after an Anthropic trademark challenge. It runs on your own machine and lives in WhatsApp, Telegram, Slack, Discord, iMessage or Signal, with shell, browser, file, calendar and email access and persistent memory. Genuinely the most interesting thing in the personal-agent category, and also a serious security surface: a text-message-triggered agent with shell access and your inbox is exactly the shape of thing that gets you owned. It deserves a sandbox and a hard security review before it touches real accounts.",
    facts: [
      { label: "Author", value: "Peter Steinberger", durability: "structural", noted: D, source: null },
      { label: "Renames", value: "Clawdbot, then Moltbot, then OpenClaw after an Anthropic trademark challenge", durability: "structural", noted: D, source: null },
      { label: "Security shape", value: "Message-triggered agent with shell, browser, files, calendar, email. Treat as a high-value attack surface.", durability: "structural", noted: D, source: null }
    ]
  },
  {
    id: "hermes-agent", name: "Hermes Agent", aliases: ["Hermes"], layer: 4,
    oneLine: "Nous Research's self-hosted personal agent that writes its own skills",
    body: "An open-source agent by Nous Research, released February 2026. Self-hosted, no telemetry, single-command install on Linux, macOS or WSL2. Its distinctive idea: it builds persistent memory of successes and failures and generates its own reusable skill files from patterns it notices. That self-improving-skills loop is the one mechanism worth studying even if you never run it, because it is what a hand-maintained skills folder does by hand.",
    facts: [
      { label: "Author", value: "Nous Research, released February 2026", durability: "structural", noted: D, source: null },
      { label: "Distinctive mechanism", value: "Generates its own reusable skill files from observed success patterns", durability: "structural", noted: D, source: null }
    ]
  },

  // ---------- Layer 5: configuration ----------
  { id: "claude-md", name: "CLAUDE.md", aliases: ["project memory"], layer: 5,
    oneLine: "Standing instructions read every session; Anthropic's richer layered version of AGENTS.md" },
  { id: "agents-md", name: "AGENTS.md", aliases: [], layer: 5,
    oneLine: "The cross-tool open standard for project instructions, Linux Foundation stewarded, read natively by Codex, Cursor, Copilot, Gemini CLI, Aider, Windsurf, and Zed" },
  {
    id: "agent-skills", name: "Agent Skills", aliases: ["SKILL.md", "skills"], layer: 5,
    oneLine: "Packaged expertise loaded on demand; an open spec supported by 30-plus platforms",
    body: "A SKILL.md is packaged expertise a harness loads when the task matches its description. The load-bearing fact: Agent Skills was published as an open specification in December 2025 and is now supported by 30-plus platforms including Codex, Cursor, Gemini CLI, JetBrains Junie, and Block's goose. A folder of skills is therefore a portable asset, not a single-vendor one; change harness and the thing you built carries over. For anyone who invests seriously in configuration, this is the highest-leverage fact on the map.",
    facts: [
      { label: "Spec status", value: "Open specification since December 2025, 30+ supporting platforms", durability: "structural", noted: D, source: null }
    ]
  },
  { id: "subagents", name: "Subagents", aliases: [], layer: 5,
    oneLine: "A forked agent instance with its own context, own model, own tools; used to isolate work or run perspectives in parallel" },
  { id: "hooks", name: "Hooks", aliases: [], layer: 5,
    oneLine: "Deterministic shell commands on harness lifecycle events; the harness runs them, not the model" },
  { id: "plugins", name: "Plugins", aliases: [], layer: 5,
    oneLine: "Skills plus agents plus hooks plus MCP servers, distributed as one unit" },

  // ---------- Layer 6: tool bus ----------
  {
    id: "mcp", name: "MCP", aliases: ["Model Context Protocol"], layer: 6,
    oneLine: "The open standard for exposing tools to any AI harness. USB-C for AI tools",
    body: "The Model Context Protocol is an open standard, originally from Anthropic, for exposing tools, resources and prompts to any AI harness. Write an MCP server once and Claude Code, Cursor, Codex, goose, and anything else that speaks MCP can use it; the point is not any single connector but that you stop writing one integration per client. The registry has grown from about 100 servers at launch in late 2024 into the thousands, and the 2026-07-28 spec revision moved toward a stateless architecture so servers deploy at scale without sticky sessions. The standing warning that goes with the whole layer: every MCP server is code holding your credentials, and prompt injection through tool results is a real, demonstrated attack. A webpage or an email can carry instructions your agent reads as if you wrote them. Install from sources you can identify, prefer read-only scopes, and never give an agent standing write access to money or email without a confirmation step.",
    facts: [
      { label: "Origin", value: "Open standard, originally from Anthropic, late 2024", durability: "structural", noted: D, source: null },
      { label: "2026-07-28 revision", value: "Moved toward stateless architecture for scale deployment", durability: "structural", noted: D, source: "https://blog.modelcontextprotocol.io/" },
      { label: "Security", value: "Prompt injection through tool results is real: any content an agent reads can carry instructions. Read-only scopes and confirmation steps are the mitigations.", durability: "structural", noted: D, source: null }
    ]
  },
  {
    id: "composio", name: "Composio", aliases: [], layer: 6,
    oneLine: "500+ integrations behind one MCP gateway; handles authentication and reshapes noisy tool schemas",
    body: "The breadth-plus-auth aggregator: 500-plus integrations, native MCP, and an MCP Gateway with enterprise SSO. Its real differentiator is not the catalog, it is that it handles authentication for you and offers code-based modifiers that reshape tool schemas, so a bloated API becomes three clean parameters. That matters more than it sounds, because tool-schema noise is a top cause of agents picking the wrong tool. Rule of thumb for the category: Composio when the constraint is breadth plus auth, Arcade when the constraint is per-user permission, n8n when the constraint is control and cost.",
    facts: [
      { label: "Differentiator", value: "Auth handled for you; schema modifiers that de-noise tools", durability: "structural", noted: D, source: null }
    ]
  },
  { id: "arcade", name: "Arcade.dev", aliases: ["Arcade"], layer: 6,
    oneLine: "Authorization, not just auth: every tool call is a permissioned action tied to a specific user identity" },
  { id: "pipedream", name: "Pipedream", aliases: [], layer: 6,
    oneLine: "Widest catalog (2,700+ apps), per-invocation pricing; acquired by Workday in late 2025" },
  {
    id: "n8n", name: "n8n", aliases: [], layer: 6,
    oneLine: "Self-hosted, open, visual automation that runs on your own box",
    body: "The automation platform to care about if the constraint is control and cost: self-hosted, open, visual, with an MCP surface. Its structural advantage over a pile of scripts and scheduled tasks is visibility: the same jobs, but you can see when they fail, which is exactly the failure mode that silently bites cron-style automation.",
    facts: [
      { label: "Category rule", value: "n8n when the constraint is control and cost; Composio for breadth+auth; Arcade for per-user permission", durability: "structural", noted: D, source: null }
    ]
  },
  { id: "zapier", name: "Zapier", aliases: [], layer: 6,
    oneLine: "Classic automation platform, thousands of apps, now with an MCP surface" },
  { id: "make", name: "Make", aliases: [], layer: 6,
    oneLine: "Classic automation platform, now with an MCP surface" },
  { id: "a2a", name: "A2A", aliases: ["Agent-to-Agent"], layer: 6,
    oneLine: "Agents talking to other agents rather than to tools. Earlier in its life than MCP" },
  {
    id: "claude-in-chrome", name: "Claude in Chrome", aliases: [], layer: 6,
    oneLine: "Claude drives a real browser tab: the fallback when no API exists",
    body: "Browser control as a tool bus: the model drives a real Chrome tab, clicking, typing, and reading pages. It is the fallback for anything gated behind a login or rendered as an app, where no API exists. Same security frame as the rest of the layer: a browsing agent reads untrusted pages, and untrusted pages can carry instructions.",
    facts: [
      { label: "Category", value: "Computer use / browser control", durability: "structural", noted: D, source: null }
    ]
  },
  { id: "browser-use", name: "Browser Use", aliases: [], layer: 6,
    oneLine: "Open-source browser control with strong WebVoyager numbers" },
  { id: "exa", name: "Exa", aliases: [], layer: 6,
    oneLine: "Semantic web search built for agents, not humans",
    body: "Search built for agents rather than people: semantic retrieval that returns what a pipeline needs instead of ten blue links. Every serious research agent needs a real search or scrape API behind it, and a plain web-search tool alone is not it.",
    facts: [
      { label: "Category", value: "Agent-grade search API", durability: "structural", noted: D, source: null }
    ]
  },
  {
    id: "firecrawl", name: "Firecrawl", aliases: [], layer: 6,
    oneLine: "Search plus scrape in one call, LLM-clean output",
    body: "Search and scrape in a single call with LLM-clean output, which removes the fetch-and-hope step from research pipelines. The practical upgrade for any recurring research or sweep workflow that currently chains a search tool and a page fetch.",
    facts: [
      { label: "Category", value: "Agent-grade search + scrape API", durability: "structural", noted: D, source: null }
    ]
  },
  { id: "tavily", name: "Tavily", aliases: [], layer: 6,
    oneLine: "Search API for agents" },
  { id: "brave-search", name: "Brave Search API", aliases: ["Brave"], layer: 6,
    oneLine: "Independent-index search API" },
  { id: "context7", name: "context7", aliases: [], layer: 6,
    oneLine: "MCP server serving current library documentation to coding agents" },
  { id: "desktop-commander", name: "desktop-commander", aliases: [], layer: 6,
    oneLine: "Local MCP server: files, processes, terminal on your own machine" },
  { id: "agent-reach", name: "agent-reach", aliases: [], layer: 6,
    oneLine: "No-cookie retrieval toolkit: YouTube transcripts, clean article text, RSS" },

  // ---------- Layer 7: applied ----------
  {
    id: "whisper", name: "Whisper", aliases: [], layer: 7,
    oneLine: "OpenAI's open-weight speech-to-text; free to self-host, the multilingual default",
    body: "The default speech-to-text: open weights, free to self-host, multilingual, with a cheap hosted API (batch only, no streaming). Its openness spawned the local family (whisper.cpp, faster-whisper) that makes transcription effectively free on your own hardware.",
    facts: [
      { label: "Shape", value: "Open weights + hosted API; batch, not streaming", durability: "structural", noted: D, source: null }
    ]
  },
  { id: "whisper-cpp", name: "whisper.cpp", aliases: [], layer: 7,
    oneLine: "Local Whisper at real-time or better; zero cost, zero upload" },
  {
    id: "faster-whisper", name: "faster-whisper", aliases: [], layer: 7,
    oneLine: "The local transcription pick: real-time or better on a desktop, nothing uploaded",
    body: "Local Whisper reimplemented for speed: real-time or better on ordinary desktop hardware. For transcribing an archive you own (hours of footage), it is the whole answer: zero marginal cost, zero upload, run it overnight.",
    facts: [
      { label: "Why it wins for archives", value: "Hours of footage, zero marginal cost, nothing leaves the machine", durability: "structural", noted: D, source: null }
    ]
  },
  { id: "assemblyai", name: "AssemblyAI", aliases: [], layer: 7,
    oneLine: "Leads on accuracy and speech understanding; real-time available" },
  { id: "speechmatics", name: "Speechmatics", aliases: [], layer: 7,
    oneLine: "Best aggregate word error rate in independent tests" },
  { id: "deepgram", name: "Deepgram", aliases: [], layer: 7,
    oneLine: "Sub-300ms latency, owns its models, also does TTS" },
  {
    id: "veo", name: "Google Veo", aliases: ["Veo"], layer: 7,
    oneLine: "Realistic motion with native audio; strongest prompt comprehension for cinematic language",
    body: "Google's video generator: realistic motion with native audio and the strongest comprehension of cinematic prompt language. For a real channel, generative video is seasoning, not spine: B-roll you cannot film, historical reconstruction shots, never the whole episode.",
    facts: [
      { label: "Category note", value: "Do not standardize a pipeline on any one video generator yet; the field turns over too fast", durability: "structural", noted: D, source: null }
    ]
  },
  {
    id: "runway", name: "Runway", aliases: ["Gen-4"], layer: 7,
    oneLine: "The working creative platform, not just a model: credit-based, predictable cost, real editing controls",
    facts: [
      { label: "Shape", value: "Platform with editing controls around its Gen-4.x models", durability: "structural", noted: D, source: null }
    ],
    body: "Less a model than a working creative platform: credit-based and predictable in cost, with real editing controls around its generation models. One of the three sane picks for B-roll you cannot film."
  },
  {
    id: "kling", name: "Kling", aliases: ["Kuaishou Kling"], layer: 7,
    oneLine: "Cheapest premium tier; strong multi-shot cinematic sequences with subject consistency",
    facts: [
      { label: "Maker", value: "Kuaishou", durability: "structural", noted: D, source: null }
    ],
    body: "Kuaishou's video generator: the cheapest premium tier, strong at multi-shot cinematic sequences with subject consistency. The third of the three sane B-roll picks alongside Veo and Runway."
  },
  {
    id: "sora", name: "Sora", aliases: ["Sora 2"], layer: 7,
    oneLine: "OpenAI's narrative multi-shot video model. Deprecated: do not build a pipeline on it",
    body: "OpenAI's narrative multi-shot video generator, and the field's standing lesson in platform risk: Sora 2 was deprecated in April 2026 with API shutdown in September 2026. Whatever replaces it, the rule it teaches is durable: do not build a production pipeline on a video model that can be withdrawn under you.",
    facts: [
      { label: "Deprecation", value: "Sora 2 deprecated April 2026; API shutdown September 2026", durability: "perishable", noted: D, source: null }
    ]
  },
  { id: "luma", name: "Luma", aliases: [], layer: 7,
    oneLine: "Fast video iteration, effects, motion presets" },
  { id: "pika", name: "Pika", aliases: [], layer: 7,
    oneLine: "Fast video iteration and effects" },
  { id: "higgsfield", name: "Higgsfield", aliases: [], layer: 7,
    oneLine: "Video effects and motion presets" },
  {
    id: "descript", name: "Descript", aliases: [], layer: 7,
    oneLine: "Edit video by editing the transcript; the highest-leverage editing tool for narration channels",
    body: "Edit video by editing the transcript: delete a sentence of text and the corresponding footage is cut. For a talking-head or narration-driven channel it is the highest-leverage editing tool that exists, because the edit happens at the speed of reading, not scrubbing.",
    facts: [
      { label: "Best for", value: "Narration and talking-head editing workflows", durability: "structural", noted: D, source: null }
    ]
  },
  {
    id: "opus-clip", name: "Opus Clip", aliases: [], layer: 7,
    oneLine: "Long video into Shorts, auto-captioned and reframed",
    body: "Turns a long video into short-form clips automatically: picks moments, reframes to vertical, adds captions. One of the two sane picks (with CapCut) for cutting Shorts from long episodes without doing it by hand.",
    facts: [
      { label: "Job", value: "Long-form to Shorts cutdowns", durability: "structural", noted: D, source: null }
    ]
  },
  { id: "vizard", name: "Vizard", aliases: [], layer: 7,
    oneLine: "Long video into Shorts, same category as Opus Clip" },
  {
    id: "capcut", name: "CapCut", aliases: [], layer: 7,
    oneLine: "Free, fast, good auto-captions",
    body: "The free fast editor with good auto-captions. For Shorts cutdowns and quick vertical edits it is the zero-cost answer, and being free means it earns a place in a pipeline without a purchase decision.",
    facts: [
      { label: "Cost", value: "Free tier covers the Shorts-cutdown job", durability: "perishable", noted: D, source: null }
    ]
  },
  {
    id: "topaz", name: "Topaz Video AI", aliases: ["Topaz"], layer: 7,
    oneLine: "Upscale and denoise. Not generative, still essential",
    body: "Upscaling and denoising for real footage. Not generative at all, which is exactly why it stays essential: archival and old footage cleanup is a restoration job, not a generation job.",
    facts: [
      { label: "Job", value: "Archival footage cleanup: upscale, denoise, deinterlace", durability: "structural", noted: D, source: null }
    ]
  },
  { id: "midjourney", name: "Midjourney", aliases: [], layer: 7,
    oneLine: "The aesthetics pick for image generation" },
  { id: "nano-banana-pro", name: "Nano Banana Pro", aliases: ["Nano Banana"], layer: 7,
    oneLine: "Google's image model: photorealism and fast multi-subject scenes" },
  {
    id: "flux", name: "FLUX", aliases: [], layer: 7,
    oneLine: "The open-weight image model: run it yourself, iterate without a meter",
    body: "The open-weight image family you can run on your own hardware. For recurring image jobs like thumbnails and channel art, local FLUX is free after the hardware and iterates without a meter running, which changes how willing you are to explore.",
    facts: [
      { label: "Why local wins for thumbnails", value: "Zero marginal cost per iteration once the hardware exists", durability: "structural", noted: D, source: null }
    ]
  },
  { id: "ideogram", name: "Ideogram", aliases: [], layer: 7,
    oneLine: "The text-in-image specialist" },
  { id: "gpt-image", name: "GPT Image", aliases: [], layer: 7,
    oneLine: "OpenAI's image model: instruction-following" },
  {
    id: "elevenlabs", name: "ElevenLabs", aliases: ["ElevenLabs Scribe"], layer: 7,
    oneLine: "Text to speech and voice cloning, the quality leader; Scribe adds real-time transcription",
    body: "The quality leader in generated voice: text to speech and voice cloning, with Scribe adding real-time transcription in the same account. The use case that justifies it for a creator: a consistent narrator voice across episodes without recording sessions.",
    facts: [
      { label: "Position", value: "Quality leader in TTS and voice cloning", durability: "perishable", noted: D, source: null }
    ]
  },
  { id: "suno", name: "Suno", aliases: [], layer: 7,
    oneLine: "Full songs with vocals" },
  { id: "udio", name: "Udio", aliases: [], layer: 7,
    oneLine: "Instrumental and electronic music generation" },
  { id: "cartesia", name: "Cartesia", aliases: [], layer: 7,
    oneLine: "Low-latency voice for real-time agents" },
  { id: "playht", name: "PlayHT", aliases: [], layer: 7,
    oneLine: "Low-latency voice for real-time agents" },
  {
    id: "perplexity", name: "Perplexity", aliases: ["Perplexity Sonar"], layer: 7,
    oneLine: "Cited answers fast; the company-research-before-an-interview tool",
    body: "Search-native answers with citations. Its sweet spot is fast grounded research where you need sources you can check: company research before an interview is the canonical case. Sonar is the same capability exposed as an API for pipelines.",
    facts: [
      { label: "Job", value: "Cited, fast research answers", durability: "structural", noted: D, source: null }
    ]
  },
  {
    id: "notebooklm", name: "NotebookLM", aliases: [], layer: 7,
    oneLine: "Grounded Q&A over documents you supply, plus audio overviews",
    body: "Google's grounded reading tool: drop in your own documents and interrogate them, with answers grounded in what you supplied rather than the open web. The natural fit is course material: load the PDFs for a hard class and ask it questions.",
    facts: [
      { label: "Job", value: "Q&A grounded strictly in documents you provide", durability: "structural", noted: D, source: null }
    ]
  },
  { id: "elicit", name: "Elicit", aliases: [], layer: 7,
    oneLine: "Literature search and screening" },
  { id: "consensus", name: "Consensus", aliases: [], layer: 7,
    oneLine: "Literature search with claim-level evidence summaries" },
  {
    id: "alphaxiv", name: "alphaXiv", aliases: [], layer: 7,
    oneLine: "Paper search and reading over the arXiv corpus, wired straight into an agent",
    body: "Paper discovery and reading over millions of arXiv papers, available as a connector so an agent can search, save and interrogate papers directly. If it is wired in, it is the paper-search answer; adding a second literature tool on top of it is redundancy, not coverage.",
    facts: [
      { label: "Corpus", value: "arXiv: CS, math, physics, stats, quantitative biology and finance, EE", durability: "structural", noted: D, source: null }
    ]
  },
  { id: "semantic-scholar", name: "Semantic Scholar", aliases: [], layer: 7,
    oneLine: "Open scholarly search and citation graph" },
  { id: "scispace", name: "SciSpace", aliases: [], layer: 7,
    oneLine: "Paper explanation and summarizing" },
  { id: "scholarcy", name: "Scholarcy", aliases: [], layer: 7,
    oneLine: "Paper summarizing" },
  { id: "teal", name: "Teal", aliases: [], layer: 7,
    oneLine: "ATS keyword matching and resume scoring; a checker, not a writer" },
  {
    id: "jobscan", name: "Jobscan", aliases: [], layer: 7,
    oneLine: "ATS resume scoring; useful as a second opinion before a big-company portal, never as a writer",
    body: "ATS keyword matching and resume scoring. The honest read on the whole resume-AI category: use a scorer as a checker, never as a writer, because commercial resume writers will happily fabricate experience. The one genuinely useful job is an ATS sanity check before submitting to a big-company portal, whose parsers are quirky in ways worth catching.",
    facts: [
      { label: "Role", value: "Second-opinion ATS scorer, not a resume writer", durability: "structural", noted: D, source: null }
    ]
  },
  { id: "resume-worded", name: "Resume Worded", aliases: [], layer: 7,
    oneLine: "Resume scoring, same category as Jobscan" },
  { id: "simplify", name: "Simplify", aliases: [], layer: 7,
    oneLine: "Autofill and bulk apply. Use with care: bulk application is exactly what technical recruiters filter against" },
  { id: "final-round", name: "Final Round AI", aliases: [], layer: 7,
    oneLine: "Mock interviews with feedback" },
  { id: "interview-warmup", name: "Interview Warmup", aliases: [], layer: 7,
    oneLine: "Google's mock interview practice tool" },

  // Engineering and CAE: full bodies, per the handoff
  {
    id: "ansys-simai", name: "Ansys SimAI", aliases: ["SimAI"], layer: 7,
    oneLine: "Trains on your historical simulation data, predicts new designs in minutes",
    body: "Trains on your historical 3D simulation data and predicts new designs in minutes, including continuous field predictions across topology changes. Split into SimAI Pro (local, component-level) and SimAI Premium (cloud-scale). The idea underneath the whole category in one line: a surrogate model trained on simulation data predicts performance across a design space in seconds instead of solving from scratch in hours, turning a handful of runs into hundreds of evaluated configurations.",
    facts: [
      { label: "Editions", value: "SimAI Pro (local, component-level) and SimAI Premium (cloud-scale)", durability: "perishable", noted: D, source: null },
      { label: "Category idea", value: "Surrogates turn hours-per-solve into seconds-per-prediction across a design space", durability: "structural", noted: D, source: null }
    ]
  },
  {
    id: "ansys-geomai", name: "Ansys GeomAI", aliases: ["GeomAI"], layer: 7,
    oneLine: "Generative geometry variation for design-of-experiments",
    body: "Ansys' generative geometry tool: produces geometry variations for design-of-experiments studies, feeding the surrogate loop with the design-space samples it needs.",
    facts: [
      { label: "Job", value: "Geometry variation for DoE studies", durability: "structural", noted: D, source: null }
    ]
  },
  {
    id: "luminary-cloud", name: "Luminary Cloud", aliases: ["Luminary"], layer: 7,
    oneLine: "GPU-native CFD solver plus a physics-AI factory for training and deploying surrogates",
    body: "A GPU-native CFD solver paired with a 'physics AI factory' for training and deploying surrogate models. Automates the unglamorous blockers: geometry healing, meshing, orchestration. Partnered with nTop on the geometry side.",
    facts: [
      { label: "Shape", value: "GPU-native solver + surrogate training/deployment platform", durability: "structural", noted: D, source: null }
    ]
  },
  {
    id: "ntop", name: "nTop", aliases: [], layer: 7,
    oneLine: "Computational and implicit geometry; attacks the geometry bottleneck that blocks AI-accelerated design",
    body: "Computational and implicit geometry. The under-appreciated point: the geometry bottleneck, not the solver, is the real blocker on AI-accelerated design, and nTop is the tool that attacks it directly. Partnered with both Luminary Cloud and PhysicsX.",
    facts: [
      { label: "Partnerships", value: "Luminary Cloud and PhysicsX", durability: "perishable", noted: D, source: null }
    ]
  },
  {
    id: "physicsx", name: "PhysicsX", aliases: [], layer: 7,
    oneLine: "End-to-end physics AI platform, aerospace and energy focused",
    body: "An end-to-end physics-AI platform focused on aerospace and energy: surrogate modeling and design optimization as a service rather than a framework you assemble yourself.",
    facts: [
      { label: "Focus", value: "Aerospace and energy physics AI", durability: "structural", noted: D, source: null }
    ]
  },
  {
    id: "physicsnemo", name: "NVIDIA PhysicsNeMo", aliases: ["Modulus", "PhysicsNeMo"], layer: 7,
    oneLine: "Open framework for physics-informed neural networks and neural operators",
    body: "NVIDIA's open framework (with Modulus as its lineage) for physics-informed neural networks and neural operators: the research-grade layer underneath the commercial surrogate tools. If you already own parameter-sweep simulation data, PhysicsNeMo or plain PyTorch is the zero-license-cost way to build a surrogate over it, and honestly reporting where the surrogate fails is itself a genuine design-test-iterate loop and a rare portfolio artifact.",
    facts: [
      { label: "Position", value: "Open, research-grade foundation under commercial CAE-AI tools", durability: "structural", noted: D, source: null }
    ]
  },
  {
    id: "neural-concept", name: "Neural Concept", aliases: [], layer: 7,
    oneLine: "Deep-learning surrogates for CFD-heavy design",
    body: "Deep-learning surrogates aimed at CFD-heavy design workflows: same surrogate idea as SimAI and Luminary, packaged for engineering teams.",
    facts: [
      { label: "Category", value: "Commercial CFD surrogate platform", durability: "structural", noted: D, source: null }
    ]
  },
  {
    id: "simscale", name: "SimScale", aliases: [], layer: 7,
    oneLine: "Cloud CAE with AI features",
    body: "Cloud-native CAE: browser-based simulation with AI-assisted features. The low-friction end of the professional simulation spectrum.",
    facts: [
      { label: "Shape", value: "Browser-based cloud CAE", durability: "structural", noted: D, source: null }
    ]
  },
  {
    id: "colab-cae", name: "CoLab", aliases: [], layer: 7,
    oneLine: "AI design review for engineering teams",
    body: "AI-assisted design review: engineering drawing and CAD review workflows for teams, the collaboration end of the CAE-AI category.",
    facts: [
      { label: "Job", value: "Design and drawing review", durability: "structural", noted: D, source: null }
    ]
  },
  { id: "granola", name: "Granola", aliases: [], layer: 7,
    oneLine: "Meeting notes" },
  { id: "otter", name: "Otter", aliases: [], layer: 7,
    oneLine: "Meeting notes and transcription" },
  { id: "gamma", name: "Gamma", aliases: [], layer: 7,
    oneLine: "AI slides" },
  { id: "napkin", name: "Napkin", aliases: [], layer: 7,
    oneLine: "Text into diagrams" },
  { id: "excalidraw", name: "Excalidraw", aliases: [], layer: 7,
    oneLine: "Sketching, now with AI assist" },

  // ---------- Layer 8: governance ----------
  { id: "gsa-usai", name: "GSA USAi", aliases: ["USAi"], layer: 8,
    oneLine: "The US government's central platform for agency access to frontier models; OneGov-era pricing deals were symbolic land-grabs, not sustainable prices" },
  { id: "palantir", name: "Palantir", aliases: [], layer: 8,
    oneLine: "Government and defense AI integrator" },
  { id: "anduril", name: "Anduril", aliases: [], layer: 8,
    oneLine: "AI-first defense company; its interviews assume conversational literacy in autonomy and sensor fusion" },
  { id: "scale-ai", name: "Scale AI", aliases: ["Scale"], layer: 8,
    oneLine: "Data and evaluation infrastructure, deep government work" },
  { id: "booz-allen", name: "Booz Allen", aliases: [], layer: 8,
    oneLine: "Federal AI consulting and integration" },
  { id: "leidos", name: "Leidos", aliases: [], layer: 8,
    oneLine: "Federal AI consulting and integration" },
  { id: "doe-labs", name: "DOE national labs", aliases: ["Sandia", "Los Alamos", "Oak Ridge", "Argonne", "Livermore"], layer: 8,
    oneLine: "Some of the largest scientific AI programs on earth: materials discovery, fusion plasma control, climate, and surrogate modeling of physical systems" },
  { id: "nasa", name: "NASA", aliases: [], layer: 8,
    oneLine: "AI for autonomous navigation, spacecraft telemetry anomaly detection, Earth observation, design optimization" },
  { id: "eu-ai-act", name: "EU AI Act", aliases: [], layer: 8,
    oneLine: "The world's most comprehensive AI framework, risk-tiered, fully enforceable through 2026 with a hard high-risk milestone in August 2026" },
  { id: "china-agent-rules", name: "China agent rules", aliases: ["Implementation Opinions"], layer: 8,
    oneLine: "China's Implementation Opinions on intelligent agents, effective 15 July 2026: the first national framework anywhere to regulate AI agents as their own category" },
  { id: "export-control", name: "Export control", aliases: [], layer: 8,
    oneLine: "The quiet lever: who can buy which chips shapes which countries can train frontier models at all" },
  { id: "bangkok-declaration", name: "Bangkok Declaration", aliases: [], layer: 8,
    oneLine: "100+ countries committing to AI sovereignty in February 2026: national compute, national models, national data rules" },
  { id: "uk-aisi", name: "UK AI Safety Institute", aliases: ["AISI"], layer: 8,
    oneLine: "Pre-deployment evaluation of frontier models, with international counterparts" }
];
