// Every entity on the map. Two prose tiers:
//   body — full write-up (renders bold on the map). Requires a noted fact.
//   note — short honest paragraph so no page is ever blank. Written at the
//          category level: no versions, prices, dates, or benchmark figures
//          beyond what the source notes carried. Where the notes were thin,
//          the note says so instead of inventing.
// Rules (see the handoff): never invent a URL, never invent a number.
// `noted` means "a model wrote it down on this date", not "a human verified it".
// durability: "structural" survives quarters; "perishable" rots in weeks.
const D = "2026-08-13";
const D2 = "2026-08-14";
export default [

  // ---------- Layer 0: silicon and power ----------
  {
    id: "tsmc", name: "TSMC", aliases: [], layer: 0,
    oneLine: "Makes nearly all leading-edge AI silicon (N3, N2); Taiwan-concentrated",
    body: "The single hardest bottleneck in the whole stack. Nearly every leading-edge AI chip, whatever the logo on it, is fabricated by TSMC, and its capacity, not anyone's chip design, is what caps GPU output. Every model on layer 2 exists downstream of a wafer allocation decision made roughly eighteen months earlier; when you read 'compute constrained,' this is what it means. The concentration in Taiwan is also why export control and geopolitics sit directly on top of this layer.",
    facts: [
      { label: "Why it matters", value: "The single hardest bottleneck in the whole stack. Fab capacity, not chip design, caps GPU output.", durability: "structural", noted: D, source: null }
    ]
  },
  {
    id: "nvidia", name: "NVIDIA", aliases: [], layer: 0,
    oneLine: "GPU design plus CUDA plus NVLink plus networking; sells systems, not chips",
    body: "Designs the GPUs, but the moat is the whole system: CUDA software, NVLink interconnect, and networking, sold as racks rather than chips. It is also a heavy internal AI user (chip floorplanning, verification) and owns the physics-AI stack (Omniverse, PhysicsNeMo, Modulus) that touches engineering simulation directly. NVIDIA designs and TSMC manufactures, and neither can be routed around quickly.",
    facts: [
      { label: "Also", value: "A heavy internal AI user (chip floorplanning, verification) and owner of a physics-AI stack: Omniverse, PhysicsNeMo, Modulus.", durability: "structural", noted: D, source: null },
      { label: "2026 transition", value: "Blackwell shipments fall off through 2026 while Rubin (R200, TSMC N3, HBM4, NVLink 6) ramps in the second half; the real volume ramp is 2027 because fab capacity is the ceiling.", durability: "perishable", noted: D, source: null }
    ]
  },
  {
    id: "asml", name: "ASML", aliases: [], layer: 0,
    oneLine: "Only maker of EUV lithography machines; export-controlled and geopolitically load-bearing",
    body: "The one company in the world that builds EUV lithography machines, which are the tools TSMC needs to make leading-edge chips. That makes it the most upstream point in the entire stack and one of the most export-controlled objects in world trade: restricting who can buy these machines is how chip policy is actually enforced.",
    facts: [
      { label: "Position", value: "Sole supplier of EUV lithography, upstream of every leading-edge fab", durability: "structural", noted: D2, source: null }
    ]
  },
  { id: "sk-hynix", name: "SK Hynix", aliases: [], layer: 0,
    oneLine: "HBM stacked memory; HBM supply gates GPU shipments as hard as wafers do",
    note: "One of the three suppliers of HBM, the stacked high-bandwidth memory packaged directly onto AI accelerators. The reason memory makers matter on this map: HBM supply gates GPU shipments as hard as wafer capacity does, so a memory shortage is a compute shortage." },
  { id: "samsung", name: "Samsung", aliases: [], layer: 0,
    oneLine: "HBM memory supplier alongside SK Hynix and Micron",
    note: "One of the three HBM suppliers, alongside SK Hynix and Micron. Stacked memory is co-packaged with the accelerator, so these three quietly co-decide how many AI chips ship in a given year." },
  { id: "micron", name: "Micron", aliases: [], layer: 0,
    oneLine: "The third HBM supplier",
    note: "The third of the three HBM suppliers, and the US-based one. Same structural point as its two rivals: high-bandwidth memory supply gates accelerator shipments as hard as fab capacity." },
  {
    id: "google-tpu", name: "Google TPU", aliases: ["TPU"], layer: 0,
    oneLine: "In-house accelerator, made at TSMC with Broadcom; the only serious vertically-integrated alternative to NVIDIA at scale",
    body: "Google's in-house accelerator line, co-designed with Broadcom and fabricated at TSMC. It is the only serious vertically-integrated alternative to NVIDIA at scale: Google trains and serves its own frontier models on its own silicon, which is a structural cost and supply advantage no other lab fully has.",
    facts: [
      { label: "Position", value: "The one at-scale vertical alternative to NVIDIA; Gemini trains and serves on it", durability: "structural", noted: D2, source: null }
    ]
  },
  { id: "aws-trainium", name: "AWS Trainium / Inferentia", aliases: ["Trainium", "Inferentia"], layer: 0,
    oneLine: "Amazon's own accelerators; cheap capacity for Bedrock, why Claude runs there",
    note: "Amazon's in-house training and inference chips. Their strategic job is cheap capacity for Bedrock, and they are part of why Claude serves on AWS. Not a frontier-design story; a supply-and-cost story." },
  { id: "amd", name: "AMD", aliases: [], layer: 0,
    oneLine: "MI-series GPUs; the real second source, still software-limited versus CUDA",
    note: "The MI-series GPUs are the real second source for AI compute, and the hardware is credible. The limiter is software: CUDA's ecosystem lock is the actual moat being competed against, and closing that gap has proven slower than shipping silicon." },
  { id: "broadcom", name: "Broadcom", aliases: [], layer: 0,
    oneLine: "Custom accelerator co-design for hyperscalers; the quiet giant of not-NVIDIA silicon",
    note: "Co-designs custom accelerators for hyperscalers, including Google's TPU line. Most of the world's non-NVIDIA AI silicon has Broadcom somewhere in its design chain, which makes it the quiet giant of the category." },
  { id: "cerebras", name: "Cerebras", aliases: [], layer: 0,
    oneLine: "Wafer-scale inference silicon; extreme token throughput, niche but real",
    note: "Builds a processor the size of an entire wafer instead of dicing it into chips, trading everything for on-chip bandwidth. The result is extreme token throughput for inference. Niche, but genuinely differentiated rather than a marketing niche." },
  { id: "huawei-ascend", name: "Huawei Ascend", aliases: ["Ascend"], layer: 0,
    oneLine: "China's domestic accelerator; the whole reason Chinese labs optimize so hard for efficiency",
    body: "China's domestic AI accelerator line, developed under export controls that block access to leading-edge NVIDIA parts and to the fabs that make them. It is the hardware half of a structural story: constrained compute is the whole reason Chinese labs optimize so aggressively for efficiency, and that constraint-bred efficiency is why their open-weight models are so cheap to run.",
    facts: [
      { label: "Structural point", value: "Export-control constraint produced the efficiency focus that defines Chinese model releases", durability: "structural", noted: D2, source: null }
    ]
  },
  { id: "coreweave", name: "CoreWeave", aliases: [], layer: 0,
    oneLine: "Neocloud: rents GPU capacity to labs that cannot get enough from the big three",
    note: "The largest name in the neocloud tier: companies whose entire business is renting GPU capacity to labs and startups that cannot get enough from AWS, Azure, or GCP. The tier exists because demand for accelerators outruns what the hyperscalers will allocate." },
  { id: "nebius", name: "Nebius", aliases: [], layer: 0,
    oneLine: "Neocloud GPU capacity provider",
    note: "A neocloud: rents GPU capacity to labs and AI companies. Same structural role as CoreWeave and Lambda; the tier exists because accelerator demand outruns hyperscaler allocation." },
  { id: "lambda", name: "Lambda", aliases: ["Lambda Labs"], layer: 0,
    oneLine: "Neocloud GPU capacity provider",
    note: "A neocloud: GPU capacity for rent, aimed at ML teams. Same tier as CoreWeave and Nebius. If a lab's model exists but the big three would not sell it enough compute, one of these companies is usually why." },
  { id: "grid-power", name: "Grid power", aliases: ["power", "datacenter power"], layer: 0,
    oneLine: "Now a first-class constraint; datacenter site selection is driven by grid interconnect queues",
    note: "Electricity is now a first-class constraint on AI, not a footnote. Datacenter site selection is driven by grid interconnect queues, and power availability increasingly decides where compute gets built at all. Any capacity forecast that ignores the grid is guessing." },

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
    oneLine: "GPT-5.x family; broadest product surface, strongest consumer distribution, deep enterprise push",
    note: "Ships the GPT-5.x family and owns the broadest product surface in the field, with ChatGPT as the strongest consumer distribution channel anyone has. Character: breadth and enterprise push rather than a single specialty. Runs on its own API and on Azure. Keep the layers straight: OpenAI is the lab, GPT-5.x is the model family, ChatGPT is a harness." },
  { id: "google-deepmind", name: "Google DeepMind", aliases: ["DeepMind", "Google"], layer: 1,
    oneLine: "Gemini 3.x; best price-performance at scale, native long context, embedded in everything Google owns",
    note: "Ships the Gemini line in Pro and Flash tiers. Character: the best price-performance at scale, native long context, and distribution through everything Google owns, from search to Android to Workspace. The vertical TPU stack underneath is a structural cost advantage no other lab fully has." },
  { id: "spacexai", name: "SpaceXAI", aliases: ["xAI"], layer: 1,
    oneLine: "Grok 4.x; real-time X data, large context, fastest-moving and least predictable. Folded into SpaceX Feb 2026",
    note: "Formerly xAI, folded into SpaceX in February 2026, a deal publicly justified in part on orbital datacenters using launch cadence plus Starlink as the moat. Ships Grok, whose differentiator is real-time X data and large context. Fastest-moving and least predictable of the frontier labs." },
  { id: "meta", name: "Meta", aliases: [], layer: 1,
    oneLine: "Llama line plus newer closed work; was the open-weight anchor of the West, strategy drifting toward closed frontier work",
    note: "Was the open-weight anchor of the West with the Llama line; strategy has since drifted toward closed frontier work. The historical contribution stands regardless: Llama is a large part of why an open-weight ecosystem exists at all." },
  { id: "mistral", name: "Mistral", aliases: [], layer: 1,
    oneLine: "Europe's champion and sovereignty play; genuinely good small models, open-weight releases",
    note: "Europe's national-champion lab and the centerpiece of the EU's AI sovereignty play. Ships both closed flagships and open-weight releases, and its small models are genuinely good rather than politically good. Runs on La Plateforme and EU clouds." },
  { id: "microsoft", name: "Microsoft", aliases: [], layer: 1,
    oneLine: "Phi small models and MAI in-house work; hedging its OpenAI dependence",
    note: "A lab almost by obligation: the Phi small-model line and in-house MAI work exist largely to hedge its deep OpenAI dependence. Its real power on this map is on other layers, as OpenAI's compute provider and as a distribution channel through Azure and Copilot." },
  { id: "amazon", name: "Amazon", aliases: [], layer: 1,
    oneLine: "Nova: cheap, Bedrock-native, not a frontier contender",
    note: "Ships the Nova models: cheap, Bedrock-native, not frontier contenders. Like Microsoft, its real weight is elsewhere on the map: Trainium silicon on layer 0 and the Bedrock marketplace on layer 3, where other labs' models (including Claude) serve." },
  { id: "apple", name: "Apple", aliases: [], layer: 1,
    oneLine: "On-device foundation models: small, private, on your phone and Mac. Not competing on frontier",
    note: "Runs its own small foundation models on-device, private by architecture, and deliberately does not compete on frontier capability. The bet is that most everyday AI belongs on the phone in your pocket rather than in a datacenter." },
  { id: "deepseek", name: "DeepSeek", aliases: [], layer: 1,
    oneLine: "The efficiency shock: open weights, aggressive pricing, self-hostable. V-series plus R-series reasoning",
    body: "The lab whose releases reset expectations for what open weights can cost: the efficiency shock of the field. Ships the V-series and the R-series reasoning models as open weights with aggressive pricing, all self-hostable. Its efficiency focus is the direct product of compute constraint under export controls, and it is a large part of why 'cheap API bulk work' is a real category at all.",
    facts: [
      { label: "Structural point", value: "Open weights plus extreme efficiency made self-hosting economically viable for narrow jobs", durability: "structural", noted: D2, source: null }
    ]
  },
  { id: "moonshot", name: "Moonshot AI", aliases: ["Moonshot"], layer: 1,
    oneLine: "Kimi K-series; agentic and long-context specialist, an open-weight leader on several boards",
    note: "Ships the Kimi K-series: the agentic and long-context specialist among Chinese labs, and an open-weight leader on several boards at the time of writing. When the job is agentic and the budget matters, Kimi is the name that keeps coming up." },
  { id: "alibaba", name: "Alibaba", aliases: [], layer: 1,
    oneLine: "Qwen: the most permissively licensed and most useful family for local work, best small-model lineup anywhere",
    note: "Ships Qwen, the most permissively licensed of the major model families and the best small-model lineup anywhere. For anything run locally, Qwen is the practical default, which makes Alibaba arguably the most important lab for self-hosters regardless of what the frontier boards say." },
  { id: "zhipu", name: "Zhipu AI", aliases: ["Zhipu"], layer: 1,
    oneLine: "GLM series; strong coding models at low cost. Listed in Hong Kong in 2026",
    note: "Ships the GLM series: strong coding models at low cost, and one of the Chinese labs that went public in 2026 (listed in Hong Kong). The practical read from the source notes: GLM is a cheap-API-bulk-work candidate alongside DeepSeek." },
  { id: "minimax", name: "MiniMax", aliases: [], layer: 1,
    oneLine: "M-series; the cheapest capable tier. Also listed in 2026",
    note: "Ships the M-series and occupies the cheapest-capable slot in the market. Also went public in 2026. The category lesson it embodies: the floor price of competent intelligence keeps falling, and it falls from China first." },
  { id: "bytedance", name: "ByteDance", aliases: [], layer: 1,
    oneLine: "Doubao / Seed; enormous domestic consumer distribution in China",
    note: "Ships Doubao and the Seed research line. Its distinguishing asset is distribution: an enormous domestic consumer base through its apps, which makes it the closest Chinese analogue to OpenAI's consumer reach." },
  { id: "baidu", name: "Baidu", aliases: [], layer: 1,
    oneLine: "ERNIE; incumbent, less relevant outside China",
    note: "The incumbent of Chinese AI with the ERNIE line. The source notes' honest read: less relevant outside China than the newer labs, but still a fixture of the domestic market." },
  { id: "tencent", name: "Tencent", aliases: [], layer: 1,
    oneLine: "Hunyuan; strong on video and 3D generation",
    note: "Ships Hunyuan, with particular strength in video and 3D generation rather than text. Like ByteDance, its distribution through domestic platforms is the structural asset." },
  { id: "stepfun", name: "StepFun", aliases: [], layer: 1,
    oneLine: "One of China's Six Tigers, diverging in strategy",
    note: "One of the group of Chinese startups nicknamed the Six Tigers, whose strategies have been diverging. The source notes record the placement and little else; treat anything more specific as unresearched." },
  { id: "baichuan", name: "Baichuan", aliases: [], layer: 1,
    oneLine: "One of China's Six Tigers, diverging in strategy",
    note: "One of China's Six Tigers. The source notes record the placement and little else; treat anything more specific as unresearched." },
  { id: "01ai", name: "01.AI", aliases: [], layer: 1,
    oneLine: "One of China's Six Tigers, diverging in strategy",
    note: "One of China's Six Tigers, founded by Kai-Fu Lee. The source notes record the placement and little else; treat anything more specific as unresearched." },

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
    oneLine: "OpenAI's flagship family",
    note: "OpenAI's flagship model family, served through the OpenAI API and Azure. The layer lesson it anchors: GPT-5.x is the weights, OpenAI is the lab that paid for the run, ChatGPT is the program most people meet it through. Version specifics rot too fast to carry here; check the lab's own docs before deciding anything." },
  { id: "gemini", name: "Gemini 3.x", aliases: ["Gemini"], layer: 2,
    oneLine: "Google's flagship line (Pro / Flash); Flash is the cost-dominant workhorse pick",
    note: "Google's flagship line, shipped in Pro and Flash tiers. Flash is the answer-sheet alternative when ordinary work is dominated by cost rather than peak capability. Native long context and Google-wide embedding are the structural traits." },
  { id: "grok", name: "Grok 4.x", aliases: ["Grok"], layer: 2,
    oneLine: "SpaceXAI's model line; real-time X data, large context",
    note: "SpaceXAI's model line. Differentiators per the source notes: real-time access to X data and large context. Ships through grok.com, X, and an API." },
  {
    id: "qwen", name: "Qwen", aliases: ["Qwen3", "Qwen3-Coder", "Qwen-Max"], layer: 2,
    oneLine: "The best open-weight family for local work: permissive licenses, best small-model lineup anywhere",
    body: "Alibaba's open-weight family, and the practical answer for most local work. Mixture-of-experts variants with small active parameter counts (the 30B-A3B class) read fast on bandwidth-limited hardware, and the licensing is the most permissive of the major families. Qwen3-Coder-class models are the practical local coding pick; Qwen3-VL is a real local vision option.",
    facts: [
      { label: "Rule of thumb", value: "Qwen for anything you run locally; DeepSeek or GLM for cheap API bulk work; Kimi when the job is agentic", durability: "structural", noted: D, source: null }
    ]
  },
  { id: "deepseek-models", name: "DeepSeek V / R series", aliases: ["DeepSeek V4", "V4 Flash"], layer: 2,
    oneLine: "Best price-performance and the self-hosting favorite; V4-class quants are large enough to need serious memory",
    note: "The V-series (general) and R-series (reasoning) open weights: the best price-performance in the field and the self-hosting community's favorite. The practical catch from the source notes: V4-class quantizations are large enough that only very high-memory machines can host them, so for most local setups the smaller families win by default." },
  { id: "kimi", name: "Kimi K-series", aliases: ["Kimi"], layer: 2,
    oneLine: "Moonshot's agentic specialist; sized for datacenters more than a desktop",
    note: "Moonshot's open-weight line and the agentic specialist of the field. Sized for datacenters more than desktops, so the source notes' verdict for local use was watch, do not plan. For hosted agentic bulk work it is a serious pick." },
  { id: "glm", name: "GLM", aliases: ["GLM-5"], layer: 2,
    oneLine: "Zhipu's line: strong low-cost coding, the long-context bet",
    note: "Zhipu's model line: strong low-cost coding and a bet on long context. The source notes flagged it as worth a local bake-off slot if it quantizes well, and as a cheap-API bulk-work candidate alongside DeepSeek." },
  { id: "llama", name: "Llama", aliases: [], layer: 2,
    oneLine: "Meta's open-weight line, formerly the Western anchor of the field",
    note: "Meta's open-weight line and the family that made Western open weights a real ecosystem. Meta's strategy has drifted toward closed frontier work, but the installed base, tooling, and fine-tune culture built on Llama persist." },
  { id: "gemma", name: "Gemma", aliases: [], layer: 2,
    oneLine: "Google's open family; good quality, dense architecture means slower per byte than MoE peers",
    note: "Google's open-weight family. Good quality, but dense architectures spend memory bandwidth on every parameter, so on bandwidth-limited local hardware a dense Gemma reads slower per byte than mixture-of-experts peers. That single architectural fact decides most local shortlists." },
  { id: "mistral-models", name: "Mistral models", aliases: ["Mistral Large", "Mistral Small"], layer: 2,
    oneLine: "Excellent European option: permissive, small enough to be fast",
    note: "Mistral's model line, spanning closed flagships and permissively licensed open releases. The open small models are the European entry on any local shortlist: permissive, small enough to be fast, and genuinely competent." },
  {
    id: "gpt-oss", name: "gpt-oss-120b", aliases: ["gpt-oss"], layer: 2,
    oneLine: "Apache-2.0 open-weight MoE with native tool calling; fits comfortably on a 128GB-class machine",
    body: "The reference open-weight pick for serious local agent work: Apache-2.0 licensed, mixture-of-experts, tool-calling native, and around 59GB in MXFP4, which fits comfortably on high-memory Apple Silicon. The bar any newer local model has to clear: beat it at under 70GB with native tool calling and an Apache-style license.",
    facts: [
      { label: "Shape", value: "MoE, MXFP4 quant around 59GB, Apache-2.0, native tool calling", durability: "structural", noted: D, source: null }
    ]
  },
  { id: "phi", name: "Phi", aliases: [], layer: 2,
    oneLine: "Microsoft's small-model line",
    note: "Microsoft's small-model research line, part of its hedge against OpenAI dependence. The category it represents: small models trained carefully on curated data, punching above their size on narrow tasks." },
  { id: "nova", name: "Nova", aliases: [], layer: 2,
    oneLine: "Amazon's cheap Bedrock-native models",
    note: "Amazon's own model line: cheap, Bedrock-native, aimed at cost-sensitive enterprise workloads rather than the frontier. Its existence is mostly a pricing lever inside Bedrock." },

  // ---------- Layer 3: access ----------
  { id: "bedrock", name: "Amazon Bedrock", aliases: ["Bedrock"], layer: 3,
    oneLine: "AWS model marketplace: enterprise compliance, data residency, existing cloud credit. Lags direct APIs on new features",
    note: "The AWS model marketplace: many labs' models (Claude included) behind one enterprise surface. When it wins: compliance, data residency, and existing cloud credit. The standing tradeoff: cloud marketplaces lag the labs' direct APIs on new features, so the newest capability always arrives at the direct key first." },
  { id: "vertex", name: "Google Vertex AI", aliases: ["Vertex"], layer: 3,
    oneLine: "Google Cloud's model marketplace",
    note: "Google Cloud's model marketplace, serving Gemini and third-party models (Claude included) behind GCP's enterprise controls. Same category logic as Bedrock: compliance and cloud credit in exchange for lagging the direct APIs." },
  { id: "microsoft-foundry", name: "Microsoft Foundry", aliases: ["Azure AI Foundry"], layer: 3,
    oneLine: "Microsoft's model marketplace on Azure",
    note: "Microsoft's model marketplace on Azure, one of the four places Claude officially serves. Same marketplace tradeoff as Bedrock and Vertex: enterprise integration over feature freshness." },
  {
    id: "openrouter", name: "OpenRouter", aliases: [], layer: 3,
    oneLine: "One key, hundreds of models: instant A/B testing, automatic failover, open-weight prices",
    body: "The router. One API key and every major model becomes one HTTP call away: Claude, GPT, Gemini, Grok, Qwen, DeepSeek, Kimi, GLM, Llama, with free tiers on some open models. It speaks the OpenAI-compatible schema, so almost every tool already supports it. What a router buys you: bulk jobs at open-weight prices without six accounts, honest same-prompt comparison across models instead of leaderboard vibes, and failover when one provider is down at 11pm. The tradeoff: it adds a hop and a margin, and you should read the privacy terms.",
    facts: [
      { label: "Category", value: "Router / aggregator; OpenAI-compatible wire format", durability: "structural", noted: D, source: null }
    ]
  },
  { id: "together", name: "Together", aliases: ["Together AI"], layer: 3,
    oneLine: "Router / hosted inference for open-weight models",
    note: "Hosted inference and routing for open-weight models: one of the places an open model becomes an API call without you owning hardware. Same category as Fireworks; the differences between them rot faster than this map, so compare live when it matters." },
  { id: "fireworks", name: "Fireworks", aliases: [], layer: 3,
    oneLine: "Router / hosted inference for open-weight models",
    note: "Hosted inference for open-weight models, competing with Together in the same slot: fast serving of open models behind an OpenAI-compatible API. Category placement from the source notes; specifics unresearched." },
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
    oneLine: "Apple-native runtime, roughly 10 to 20 percent faster on newer silicon; had an open tool-call channel-leak bug that fabricated tool results",
    note: "Apple's native ML runtime, roughly 10 to 20 percent faster than llama.cpp on newer silicon per the source notes. The reason it is not the default anyway: an open tool-call channel-leak bug that silently fabricated tool results, which is disqualifying for agent serving until fixed. Speed never outranks a correctness bug in the tool channel." },
  { id: "ollama", name: "Ollama", aliases: [], layer: 3,
    oneLine: "Easiest local runtime to run, thinnest control. Fine for experiments, not a production path",
    note: "The easiest way to run a local model, and the thinnest control surface over how it runs. The source notes' verdict: fine for experiments, not the production path, because serious serving needs the quantization and templating control that llama.cpp exposes." },
  { id: "lm-studio", name: "LM Studio", aliases: [], layer: 3,
    oneLine: "GUI runtime, good for a quick does-this-model-feel-right test before committing",
    note: "A GUI for downloading and chatting with local models. Its honest job: a quick does-this-model-feel-right test before committing to a proper serving setup. Not a serving layer." },
  { id: "vllm", name: "vLLM", aliases: [], layer: 3,
    oneLine: "The serious server runtime, but a Linux/CUDA story, not Apple Silicon",
    note: "The serious open-source serving runtime for production inference at scale: batching, paging, throughput. The catch for this map's local context: it is a Linux/CUDA story, not an Apple Silicon one." },
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
    oneLine: "OpenAI's terminal agent: Rust, strong OS-level sandboxing, the safety-first pick",
    note: "OpenAI's terminal agent, written in Rust with strong OS-level sandboxing. The source notes' one-line character: the safety-first pick of the terminal tier. Reads AGENTS.md natively, which is part of why that standard matters." },
  { id: "gemini-cli", name: "Gemini CLI", aliases: [], layer: 4,
    oneLine: "Google's terminal agent; free tier ended June 2026, still strong on huge-context repo work",
    note: "Google's terminal agent, still strong on huge-context repo work. It also carries a standing lesson from the source notes: its free serving tier ended in June 2026, which is the canonical recent example of why you never architect around a free tier you do not control." },
  {
    id: "opencode", name: "opencode", aliases: [], layer: 4,
    oneLine: "The most-starred open-source agent: MIT, 75+ providers, model-agnostic",
    body: "The most-starred open-source coding agent: MIT licensed, model-agnostic across 75-plus providers. Its significance on the map is what it proves about the layer split: the harness is a commodity you can own outright, and the model behind it is a swappable part. If you ever need to demonstrate that skills and configuration outlive any one vendor, this is the harness you would demonstrate it on.",
    facts: [
      { label: "Shape", value: "MIT-licensed, model-agnostic, 75+ providers", durability: "structural", noted: D, source: null }
    ]
  },
  { id: "aider", name: "Aider", aliases: [], layer: 4,
    oneLine: "The original git-native pair programmer. Small, sharp, still excellent",
    note: "The original git-native AI pair programmer, predating most of the category. Small, sharp, and still excellent per the source notes: it edits your repo through commits, which keeps every change inspectable. Reads AGENTS.md." },
  { id: "goose", name: "Goose", aliases: [], layer: 4,
    oneLine: "Block's open harness: extension-based, good MCP support",
    note: "Block's open-source harness: extension-based architecture with good MCP support, and one of the platforms that supports Agent Skills. Part of the evidence that the configuration layer is portable across harnesses." },
  { id: "qwen-code", name: "Qwen Code", aliases: [], layer: 4,
    oneLine: "Model-vendor variant of the terminal-agent idea",
    note: "Alibaba's own terminal agent for the Qwen models: a model vendor shipping the harness for its weights. The source notes record it as a variant of the terminal-agent idea rather than a differentiated tool." },
  { id: "kilo-cli", name: "Kilo CLI", aliases: [], layer: 4,
    oneLine: "Open variant of the terminal-agent idea",
    note: "An open variant of the terminal-agent idea. The source notes record the placement and little else; treat anything more specific as unresearched." },
  { id: "cursor", name: "Cursor", aliases: [], layer: 4,
    oneLine: "IDE agent: the same loop with a file tree and a diff view attached",
    note: "The best-known IDE agent: the same send-prompt, run-tools, repeat loop as the terminal tier, wrapped in an editor with a file tree and a diff view. Reads AGENTS.md and supports Agent Skills, which is exactly why configuration built elsewhere carries over." },
  { id: "windsurf", name: "Windsurf", aliases: [], layer: 4,
    oneLine: "IDE agent",
    note: "An IDE agent in the same slot as Cursor: the agent loop embedded in an editor. Reads AGENTS.md. The source notes carry the category, not a comparison; try both on a real repo if choosing." },
  { id: "github-copilot", name: "GitHub Copilot", aliases: ["Copilot"], layer: 4,
    oneLine: "IDE agent (agent mode) plus the Workspace cloud variant",
    note: "The distribution giant of the category: completion turned into a full agent mode inside the editor, plus the Workspace cloud variant for hand-off tasks. Reads AGENTS.md. Its structural advantage is being already installed where developers already are." },
  { id: "zed", name: "Zed", aliases: [], layer: 4,
    oneLine: "Editor with native agent support; reads AGENTS.md",
    note: "A fast editor with native agent support rather than an agent bolted onto an editor. Reads AGENTS.md natively. The source notes record it as part of the cross-tool standard's proof of adoption." },
  { id: "jetbrains-junie", name: "JetBrains Junie", aliases: ["Junie"], layer: 4,
    oneLine: "JetBrains' IDE agent",
    note: "JetBrains' agent across its IDE family, and one of the platforms supporting Agent Skills. For anyone living in IntelliJ-family tools, it is the native path into the agent loop." },
  { id: "cline", name: "Cline", aliases: [], layer: 4,
    oneLine: "VS Code extension agent",
    note: "An open-source VS Code extension agent, sibling of Roo. The category it represents: the agent loop as an extension inside the editor you already run, with your own API key behind it." },
  { id: "roo", name: "Roo", aliases: ["Roo Code"], layer: 4,
    oneLine: "VS Code extension agent",
    note: "A VS Code extension agent, forked lineage shared with Cline. Same category: bring-your-own-key agent loop inside the editor. The source notes record the placement, not a comparison." },
  { id: "antigravity", name: "Antigravity", aliases: ["Google Antigravity"], layer: 4,
    oneLine: "Google's agent-first IDE",
    note: "Google's agent-first IDE: the editor built around the agent loop rather than the other way around. The source notes record the placement and little else." },
  {
    id: "chatgpt", name: "ChatGPT", aliases: [], layer: 4,
    oneLine: "OpenAI's chat interface. A harness, not a model, and not the same thing as OpenAI",
    body: "The most-used chat interface in the world, and the cleanest example of why the layer distinction matters: ChatGPT is a harness (a program running models in a loop), OpenAI is the lab, and GPT-5.x is the model family. Saying 'ChatGPT' when you mean any of the other two is the exact conflation this map exists to correct.",
    facts: [
      { label: "Layer lesson", value: "ChatGPT is a harness; OpenAI is a lab; GPT-5.x is a model family. Three different shelves.", durability: "structural", noted: D, source: null }
    ]
  },
  { id: "le-chat", name: "Le Chat", aliases: [], layer: 4,
    oneLine: "Mistral's chat interface",
    note: "Mistral's chat surface: the European entry in the chat-interface tier. Same category economics as every chat app: lowest capability per prompt, highest convenience." },
  { id: "claude-code-web", name: "Claude Code on the web", aliases: [], layer: 4,
    oneLine: "Cloud agent: hand over a task and a repo, come back later",
    note: "Claude Code running in the cloud: hand over a task and a repo, come back later. The source notes' honest read of the whole cloud-agent tier applies: good for parallel grunt work, unreliable for anything requiring taste, so review what comes back." },
  { id: "codex-cloud", name: "Codex cloud", aliases: [], layer: 4,
    oneLine: "OpenAI's cloud agent",
    note: "OpenAI's cloud agent tier: asynchronous task hand-off against a repo. Same category read as its peers: parallel grunt work yes, taste no." },
  { id: "jules", name: "Jules", aliases: [], layer: 4,
    oneLine: "Google's cloud agent",
    note: "Google's asynchronous coding agent: hand it a task and a repo, collect a diff later. Same tier and same caveat as the other cloud agents." },
  { id: "devin", name: "Devin", aliases: [], layer: 4,
    oneLine: "The original autonomous-software-engineer pitch; good for parallel grunt work, unreliable for taste",
    note: "The product that launched the autonomous-software-engineer pitch, and the source notes' verdict on the whole category it created: useful for parallel grunt work, unreliable for anything requiring taste. Its real historical contribution is proving the demand exists." },
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
  {
    id: "claude-md", name: "CLAUDE.md", aliases: ["project memory"], layer: 5,
    oneLine: "Standing instructions read every session; Anthropic's richer layered version of AGENTS.md",
    body: "Project memory: a plain text file of standing instructions the harness reads at the start of every session. Layered (user-level, project-level, directory-level), so global rules and per-repo rules compose. The when-to-use rule from the source notes: behavior needed every time, everywhere, belongs here; behavior needed only sometimes belongs in a skill. It is Anthropic's richer version of the cross-tool AGENTS.md standard.",
    facts: [
      { label: "When to use", value: "Behavior needed every time, everywhere. On-demand expertise goes in a skill instead.", durability: "structural", noted: D2, source: null }
    ]
  },
  {
    id: "agents-md", name: "AGENTS.md", aliases: [], layer: 5,
    oneLine: "The cross-tool open standard for project instructions, Linux Foundation stewarded, read natively by Codex, Cursor, Copilot, Gemini CLI, Aider, Windsurf, and Zed",
    body: "The cross-tool open standard for project instructions, now stewarded by the Linux Foundation and read natively by Codex, Cursor, Copilot, Gemini CLI, Aider, Windsurf, and Zed. One file in the repo, and every major harness picks up the same standing instructions. Its existence is half the proof that the configuration layer is portable rather than vendor-locked; Agent Skills is the other half.",
    facts: [
      { label: "Stewardship", value: "Linux Foundation; read natively across the major harnesses", durability: "structural", noted: D, source: null }
    ]
  },
  {
    id: "agent-skills", name: "Agent Skills", aliases: ["SKILL.md", "skills"], layer: 5,
    oneLine: "Packaged expertise loaded on demand; an open spec supported by 30-plus platforms",
    body: "A SKILL.md is packaged expertise a harness loads when the task matches its description. The load-bearing fact: Agent Skills was published as an open specification in December 2025 and is now supported by 30-plus platforms including Codex, Cursor, Gemini CLI, JetBrains Junie, and Block's goose. A folder of skills is therefore a portable asset, not a single-vendor one; change harness and the thing you built carries over. For anyone who invests seriously in configuration, this is the highest-leverage fact on the map.",
    facts: [
      { label: "Spec status", value: "Open specification since December 2025, 30+ supporting platforms", durability: "structural", noted: D, source: null }
    ]
  },
  {
    id: "subagents", name: "Subagents", aliases: [], layer: 5,
    oneLine: "A forked agent instance with its own context, own model, own tools; used to isolate work or run perspectives in parallel",
    body: "A subagent is a forked agent instance defined in a text file: its own context window, its own model choice, its own tool permissions. Two jobs justify one: work that would pollute the main context (bulk searching, long reading), and work that needs genuine independence, like parallel reviewers who must not see each other's conclusions before writing their own. The per-subagent model choice is also the practical routing lever: heavy judgment to a heavy model, mechanical sweeps to a fast one.",
    facts: [
      { label: "When to use", value: "Work that would pollute your context, needs a different model, or must run in isolation", durability: "structural", noted: D2, source: null }
    ]
  },
  {
    id: "hooks", name: "Hooks", aliases: [], layer: 5,
    oneLine: "Deterministic shell commands on harness lifecycle events; the harness runs them, not the model",
    body: "A hook is a shell command bound to a harness lifecycle event: before a tool runs, after a session starts, when the agent stops. The defining property: the harness executes it deterministically, the model never decides. That makes hooks the right primitive for anything that must happen every time regardless of what the model thinks, which is exactly what instructions and skills cannot guarantee.",
    facts: [
      { label: "Defining property", value: "Deterministic: the harness runs it on the event, the model has no say", durability: "structural", noted: D2, source: null }
    ]
  },
  {
    id: "plugins", name: "Plugins", aliases: [], layer: 5,
    oneLine: "Skills plus agents plus hooks plus MCP servers, distributed as one unit",
    body: "The distribution unit of the configuration layer: skills, subagents, hooks, and MCP server wiring bundled together and installed as one thing. When a workflow is worth sharing or reusing across machines, a plugin is how all its parts travel together instead of being reassembled by hand.",
    facts: [
      { label: "Role", value: "Bundles the other layer-5 primitives for distribution", durability: "structural", noted: D2, source: null }
    ]
  },

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
    oneLine: "Authorization, not just auth: every tool call is a permissioned action tied to a specific user identity",
    note: "The aggregator whose differentiator is authorization rather than just authentication: around 112 integrations where every tool call is a permissioned action tied to a specific user identity. The right pick when an agent acts on behalf of someone else and 'which human allowed this' has to be answerable per call." },
  { id: "pipedream", name: "Pipedream", aliases: [], layer: 6,
    oneLine: "Widest catalog (2,700+ apps), per-invocation pricing; acquired by Workday in late 2025",
    note: "The widest catalog in the category: 2,700-plus apps and over ten thousand tools, per-invocation pricing, a visual builder plus real code, acquired by Workday in late 2025. When the constraint is 'does it connect to this obscure thing,' Pipedream usually does." },
  {
    id: "n8n", name: "n8n", aliases: [], layer: 6,
    oneLine: "Self-hosted, open, visual automation that runs on your own box",
    body: "The automation platform to care about if the constraint is control and cost: self-hosted, open, visual, with an MCP surface. Its structural advantage over a pile of scripts and scheduled tasks is visibility: the same jobs, but you can see when they fail, which is exactly the failure mode that silently bites cron-style automation.",
    facts: [
      { label: "Category rule", value: "n8n when the constraint is control and cost; Composio for breadth+auth; Arcade for per-user permission", durability: "structural", noted: D, source: null }
    ]
  },
  { id: "zapier", name: "Zapier", aliases: [], layer: 6,
    oneLine: "Classic automation platform, thousands of apps, now with an MCP surface",
    note: "The classic no-code automation platform, thousands of app integrations, now exposing an MCP surface so agents can drive the same connections. Its template gallery is also a standing catalog of automation patterns worth stealing." },
  { id: "make", name: "Make", aliases: [], layer: 6,
    oneLine: "Classic automation platform, now with an MCP surface",
    note: "The visual automation platform formerly known as Integromat, same category as Zapier, now with an MCP surface. Category placement from the source notes; pick between the classic platforms on price and the specific apps you need." },
  { id: "a2a", name: "A2A", aliases: ["Agent-to-Agent"], layer: 6,
    oneLine: "Agents talking to other agents rather than to tools. Earlier in its life than MCP",
    note: "A protocol for agents talking to other agents rather than to tools: the inter-agent counterpart to MCP's agent-to-tool job. The source notes' placement: real, but earlier in its life than MCP, so watch rather than build on it." },
  {
    id: "claude-in-chrome", name: "Claude in Chrome", aliases: [], layer: 6,
    oneLine: "Claude drives a real browser tab: the fallback when no API exists",
    body: "Browser control as a tool bus: the model drives a real Chrome tab, clicking, typing, and reading pages. It is the fallback for anything gated behind a login or rendered as an app, where no API exists. Same security frame as the rest of the layer: a browsing agent reads untrusted pages, and untrusted pages can carry instructions.",
    facts: [
      { label: "Category", value: "Computer use / browser control", durability: "structural", noted: D, source: null }
    ]
  },
  { id: "browser-use", name: "Browser Use", aliases: [], layer: 6,
    oneLine: "Open-source browser control with strong WebVoyager numbers",
    note: "The open-source entry in browser control, with strong WebVoyager benchmark results per the source notes. Same job and same security frame as Claude in Chrome: the model drives a real browser, and every page it reads is untrusted input." },
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
    oneLine: "Search API for agents",
    note: "A search API built for agent pipelines, in the same category as Exa and Firecrawl. The source notes record the placement; compare on retrieval quality for your actual queries if choosing." },
  { id: "brave-search", name: "Brave Search API", aliases: ["Brave"], layer: 6,
    oneLine: "Independent-index search API",
    note: "A search API backed by Brave's own independent index rather than a rebrand of someone else's. Independence of index is its structural differentiator in the agent-search category." },
  { id: "context7", name: "context7", aliases: [], layer: 6,
    oneLine: "MCP server serving current library documentation to coding agents",
    note: "An MCP server that feeds coding agents current library documentation instead of letting them rely on training-data memory of APIs. The category problem it solves is real and permanent: model knowledge of fast-moving libraries is always stale." },
  { id: "desktop-commander", name: "desktop-commander", aliases: [], layer: 6,
    oneLine: "Local MCP server: files, processes, terminal on your own machine",
    note: "A local MCP server giving an agent files, processes, and a terminal on your own machine. Powerful and therefore worth scoping deliberately: it is the general-purpose local hands of the tool bus, and broad local power deserves the same security thinking as any credentialed server." },
  { id: "agent-reach", name: "agent-reach", aliases: [], layer: 6,
    oneLine: "No-cookie retrieval toolkit: YouTube transcripts, clean article text, RSS",
    note: "A no-cookie retrieval toolkit: YouTube transcripts, clean article text, and RSS without logged-in sessions. Its design point is doing retrieval without holding credentials, which makes it the low-risk end of the tool-bus security spectrum." },

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
    oneLine: "Local Whisper at real-time or better; zero cost, zero upload",
    note: "The C++ port that made Whisper run locally at real-time or better on ordinary hardware. Zero cost, zero upload: with faster-whisper, it is why transcribing your own archive should never involve a hosted API." },
  {
    id: "faster-whisper", name: "faster-whisper", aliases: [], layer: 7,
    oneLine: "The local transcription pick: real-time or better on a desktop, nothing uploaded",
    body: "Local Whisper reimplemented for speed: real-time or better on ordinary desktop hardware. For transcribing an archive you own (hours of footage), it is the whole answer: zero marginal cost, zero upload, run it overnight.",
    facts: [
      { label: "Why it wins for archives", value: "Hours of footage, zero marginal cost, nothing leaves the machine", durability: "structural", noted: D, source: null }
    ]
  },
  { id: "assemblyai", name: "AssemblyAI", aliases: [], layer: 7,
    oneLine: "Leads on accuracy and speech understanding; real-time available",
    note: "The hosted transcription API that leads on accuracy and speech understanding per the source notes, with real-time available. The category question it answers: when free local Whisper is not accurate enough or you need streaming, who do you pay." },
  { id: "speechmatics", name: "Speechmatics", aliases: [], layer: 7,
    oneLine: "Best aggregate word error rate in independent tests",
    note: "Hosted speech-to-text whose claim to the map is the best aggregate word error rate in independent tests, per the source notes. Same category as AssemblyAI and Deepgram: paid accuracy above the free local floor." },
  { id: "deepgram", name: "Deepgram", aliases: [], layer: 7,
    oneLine: "Sub-300ms latency, owns its models, also does TTS",
    note: "The latency specialist of hosted speech: sub-300ms per the source notes, on models it owns, with text-to-speech in the same account. The pick when speech recognition has to feel instant, like live agents and dictation." },
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
    oneLine: "Fast video iteration, effects, motion presets",
    note: "Part of the fast-iteration tier of video generation: quick results, effects, and motion presets rather than premium cinematic output. The tier's job is exploring an idea cheaply before spending premium credits on it." },
  { id: "pika", name: "Pika", aliases: [], layer: 7,
    oneLine: "Fast video iteration and effects",
    note: "Fast-iteration video generation with an effects bent, same tier as Luma and Higgsfield. Category placement from the source notes; the tier turns over too fast for specifics to be worth carrying here." },
  { id: "higgsfield", name: "Higgsfield", aliases: [], layer: 7,
    oneLine: "Video effects and motion presets",
    note: "Video effects and motion presets, the preset-driven end of the fast-iteration video tier. The source notes record the placement and little else." },
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
    oneLine: "Long video into Shorts, same category as Opus Clip",
    note: "Long-form video into auto-captioned, reframed Shorts: the same job as Opus Clip. The source notes record it as the category peer, not a ranked alternative." },
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
    oneLine: "The aesthetics pick for image generation",
    note: "The aesthetics pick of image generation: when the goal is an image that looks striking rather than one that follows instructions to the letter, this is the category leader the source notes recorded." },
  { id: "nano-banana-pro", name: "Nano Banana Pro", aliases: ["Nano Banana"], layer: 7,
    oneLine: "Google's image model: photorealism and fast multi-subject scenes",
    note: "Google's image model, recorded in the source notes for photorealism and fast multi-subject scenes. Part of the same picker logic as the rest of the image row: choose by the job (aesthetics, realism, text, instruction-following), not by brand." },
  {
    id: "flux", name: "FLUX", aliases: [], layer: 7,
    oneLine: "The open-weight image model: run it yourself, iterate without a meter",
    body: "The open-weight image family you can run on your own hardware. For recurring image jobs like thumbnails and channel art, local FLUX is free after the hardware and iterates without a meter running, which changes how willing you are to explore.",
    facts: [
      { label: "Why local wins for thumbnails", value: "Zero marginal cost per iteration once the hardware exists", durability: "structural", noted: D, source: null }
    ]
  },
  { id: "ideogram", name: "Ideogram", aliases: [], layer: 7,
    oneLine: "The text-in-image specialist",
    note: "The text-in-image specialist: when the image needs legible words in it (posters, labels, thumbnails with titles), this is the tool the category picker points at." },
  { id: "gpt-image", name: "GPT Image", aliases: [], layer: 7,
    oneLine: "OpenAI's image model: instruction-following",
    note: "OpenAI's image model, recorded for instruction-following: the pick when the prompt is a precise spec rather than a mood. Same picker logic as the rest of the image row." },
  {
    id: "elevenlabs", name: "ElevenLabs", aliases: ["ElevenLabs Scribe"], layer: 7,
    oneLine: "Text to speech and voice cloning, the quality leader; Scribe adds real-time transcription",
    body: "The quality leader in generated voice: text to speech and voice cloning, with Scribe adding real-time transcription in the same account. The use case that justifies it for a creator: a consistent narrator voice across episodes without recording sessions.",
    facts: [
      { label: "Position", value: "Quality leader in TTS and voice cloning", durability: "perishable", noted: D, source: null }
    ]
  },
  { id: "suno", name: "Suno", aliases: [], layer: 7,
    oneLine: "Full songs with vocals",
    note: "Generates full songs with vocals from a prompt. For a channel, the practical angle from the source notes: royalty-free generated music beds beat licensing hassle." },
  { id: "udio", name: "Udio", aliases: [], layer: 7,
    oneLine: "Instrumental and electronic music generation",
    note: "Music generation with a strength in instrumental and electronic tracks: the background-bed side of the category, where Suno leans toward full songs with vocals." },
  { id: "cartesia", name: "Cartesia", aliases: [], layer: 7,
    oneLine: "Low-latency voice for real-time agents",
    note: "Low-latency voice generation for real-time agents: the category where a voice must respond conversationally fast rather than render beautifully in batch. Peer of PlayHT in the source notes." },
  { id: "playht", name: "PlayHT", aliases: [], layer: 7,
    oneLine: "Low-latency voice for real-time agents",
    note: "Low-latency text-to-speech for live voice agents, same slot as Cartesia. The source notes record the category placement and little else." },
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
    oneLine: "Literature search and screening",
    note: "Literature search and screening for research workflows: finding and filtering papers systematically rather than by keyword luck. Category peer of Consensus in the source notes." },
  { id: "consensus", name: "Consensus", aliases: [], layer: 7,
    oneLine: "Literature search with claim-level evidence summaries",
    note: "Literature search that summarizes evidence at the claim level: what do papers collectively say about X. Same screening category as Elicit, with the claim-level angle as its recorded differentiator." },
  {
    id: "alphaxiv", name: "alphaXiv", aliases: [], layer: 7,
    oneLine: "Paper search and reading over the arXiv corpus, wired straight into an agent",
    body: "Paper discovery and reading over millions of arXiv papers, available as a connector so an agent can search, save and interrogate papers directly. If it is wired in, it is the paper-search answer; adding a second literature tool on top of it is redundancy, not coverage.",
    facts: [
      { label: "Corpus", value: "arXiv: CS, math, physics, stats, quantitative biology and finance, EE", durability: "structural", noted: D, source: null }
    ]
  },
  { id: "semantic-scholar", name: "Semantic Scholar", aliases: [], layer: 7,
    oneLine: "Open scholarly search and citation graph",
    note: "The open scholarly search engine and citation graph from the Allen Institute: free infrastructure under many other research tools. On this map as the open baseline of the literature-search category." },
  { id: "scispace", name: "SciSpace", aliases: [], layer: 7,
    oneLine: "Paper explanation and summarizing",
    note: "Paper explanation and summarizing: the read-and-digest end of the research-tool category, distinct from the search-and-screen end where Elicit and Consensus sit." },
  { id: "scholarcy", name: "Scholarcy", aliases: [], layer: 7,
    oneLine: "Paper summarizing",
    note: "Paper summarizing, same digest category as SciSpace. The source notes record the placement and little else." },
  { id: "teal", name: "Teal", aliases: [], layer: 7,
    oneLine: "ATS keyword matching and resume scoring; a checker, not a writer",
    note: "ATS keyword matching and resume scoring. The category rule from the source notes applies to it fully: useful as a checker, never as a writer, because resume-writing tools will happily fabricate experience." },
  {
    id: "jobscan", name: "Jobscan", aliases: [], layer: 7,
    oneLine: "ATS resume scoring; useful as a second opinion before a big-company portal, never as a writer",
    body: "ATS keyword matching and resume scoring. The honest read on the whole resume-AI category: use a scorer as a checker, never as a writer, because commercial resume writers will happily fabricate experience. The one genuinely useful job is an ATS sanity check before submitting to a big-company portal, whose parsers are quirky in ways worth catching.",
    facts: [
      { label: "Role", value: "Second-opinion ATS scorer, not a resume writer", durability: "structural", noted: D, source: null }
    ]
  },
  { id: "resume-worded", name: "Resume Worded", aliases: [], layer: 7,
    oneLine: "Resume scoring, same category as Jobscan",
    note: "Resume and LinkedIn scoring, same category as Jobscan and Teal, and the same rule: a second-opinion checker before a big-company portal, never a writer." },
  { id: "simplify", name: "Simplify", aliases: [], layer: 7,
    oneLine: "Autofill and bulk apply. Use with care: bulk application is exactly what technical recruiters filter against",
    note: "Application autofill and bulk-apply tooling. The source notes' warning is the whole entry: bulk application is exactly the behavior technical recruiters filter against, so the tool's core feature is the thing to be most careful with." },
  { id: "final-round", name: "Final Round AI", aliases: [], layer: 7,
    oneLine: "Mock interviews with feedback",
    note: "AI mock interviews with feedback. The category is real (deliberate interview practice works); whether any tool beats a question bank plus recording yourself is the open question the source notes leave open." },
  { id: "interview-warmup", name: "Interview Warmup", aliases: [], layer: 7,
    oneLine: "Google's mock interview practice tool",
    note: "Google's free interview practice tool: answer questions out loud, get pattern feedback. The free baseline of the mock-interview category." },
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
    oneLine: "Meeting notes",
    note: "AI meeting notes that ride along on real calls: notes that write themselves while you talk. Category peer of Otter in the everyday-productivity row." },
  { id: "otter", name: "Otter", aliases: [], layer: 7,
    oneLine: "Meeting notes and transcription",
    note: "Meeting transcription and notes, the long-standing incumbent of the category Granola competes in. Same everyday job: talk, and have the record write itself." },
  { id: "gamma", name: "Gamma", aliases: [], layer: 7,
    oneLine: "AI slides",
    note: "First-draft slide decks from an outline. The honest scope: it gets a deck to eighty percent fast; the last twenty percent of a deck that matters is still you." },
  { id: "napkin", name: "Napkin", aliases: [], layer: 7,
    oneLine: "Text into diagrams",
    note: "Turns written text into diagrams: the fastest path from a paragraph to a visual. Category peer of Excalidraw's AI assist for sketch-grade visuals." },
  { id: "excalidraw", name: "Excalidraw", aliases: [], layer: 7,
    oneLine: "Sketching, now with AI assist",
    note: "The hand-drawn-style sketching tool, now with AI assist. Its enduring value is the aesthetic honesty: a sketch that looks like a sketch invites correction, which polished diagrams discourage." },

  // ---------- Layer 8: governance ----------
  {
    id: "gsa-usai", name: "GSA USAi", aliases: ["USAi"], layer: 8,
    oneLine: "The US government's central platform for agency access to frontier models",
    body: "The US General Services Administration's central platform for giving federal agencies access to frontier models from Google, Meta, Anthropic and OpenAI in one evaluated, secured environment. Launched free with a waiting list and moving to a cost-recoverable model in fiscal 2027. Alongside it, the labs cut deliberately symbolic OneGov-era pricing deals: roughly a dollar per agency per year. Land-grab prices, not sustainable ones, and the clearest example of procurement as an instrument of AI policy.",
    facts: [
      { label: "Role", value: "Central evaluated environment for federal frontier-model access; symbolic OneGov pricing era", durability: "structural", noted: D2, source: null },
      { label: "Live litigation", value: "The Anthropic federal directive fight is unresolved: enjoined March 2026, restored to USAi, later action targeting integrations. Treat headlines as snapshots.", durability: "perishable", noted: D, source: null }
    ]
  },
  { id: "palantir", name: "Palantir", aliases: [], layer: 8,
    oneLine: "Government and defense AI integrator",
    note: "The best-known government and defense AI integrator: the layer where models become deployed systems inside agencies and militaries. On this map as the archetype of the companies in that room." },
  {
    id: "anduril", name: "Anduril", aliases: [], layer: 8,
    oneLine: "AI-first defense company; its interviews assume conversational literacy in autonomy and sensor fusion",
    body: "The AI-first defense company: built from the start around autonomy and sensor fusion rather than retrofitting AI onto legacy platforms. The practical note the source notes carry: its interviews assume you can talk about autonomy and export control at least conversationally, which is exactly the literacy this layer of the map exists to provide.",
    facts: [
      { label: "Character", value: "AI-first defense: autonomy and sensor fusion as the founding premise", durability: "structural", noted: D2, source: null }
    ]
  },
  { id: "scale-ai", name: "Scale AI", aliases: ["Scale"], layer: 8,
    oneLine: "Data and evaluation infrastructure, deep government work",
    note: "Data labeling and evaluation infrastructure with deep government work: the unglamorous layer that decides how good training data and model evaluations actually are. On the governance stratum because so much of its weight is federal." },
  { id: "booz-allen", name: "Booz Allen", aliases: [], layer: 8,
    oneLine: "Federal AI consulting and integration",
    note: "One of the two big federal consulting and integration names on the map (Leidos is the other): how AI actually arrives inside most agencies, as a services contract rather than a product." },
  { id: "leidos", name: "Leidos", aliases: [], layer: 8,
    oneLine: "Federal AI consulting and integration",
    note: "Federal AI consulting and integration at prime-contractor scale, same category as Booz Allen. The source notes record the category; the pair stands for the services channel of government AI." },
  {
    id: "doe-labs", name: "DOE national labs", aliases: ["Sandia", "Los Alamos", "Oak Ridge", "Argonne", "Livermore"], layer: 8,
    oneLine: "Some of the largest scientific AI programs on earth",
    body: "The Department of Energy's national labs (Oak Ridge, Argonne, Livermore, Los Alamos, Sandia) run some of the largest scientific AI programs on earth: materials discovery, fusion plasma control, climate modeling, and surrogate modeling of physical systems, which is exactly the CAE-AI category on layer 7 at national scale. For engineers, that last one is the specific intersection: the AI-adjacent work inside these labs is surrogate modeling of physical systems, which is a different and sharper pitch than a generic lab application.",
    facts: [
      { label: "AI focus", value: "Materials, fusion control, climate, and surrogate modeling of physical systems", durability: "structural", noted: D2, source: null }
    ]
  },
  {
    id: "nasa", name: "NASA", aliases: [], layer: 8,
    oneLine: "AI for autonomous navigation, telemetry anomaly detection, Earth observation, design optimization",
    body: "NASA's AI use is the applied catalog of this whole map pointed at space: autonomous navigation, anomaly detection on spacecraft telemetry, Earth observation at scale, and design optimization. Notable for engineers because every one of those is a physical-systems problem, the same family as the CAE-AI tools on layer 7.",
    facts: [
      { label: "AI focus", value: "Autonomy, telemetry anomaly detection, Earth observation, design optimization", durability: "structural", noted: D2, source: null }
    ]
  },
  {
    id: "eu-ai-act", name: "EU AI Act", aliases: [], layer: 8,
    oneLine: "The world's most comprehensive AI framework, risk-tiered, fully enforceable through 2026",
    body: "The world's most comprehensive AI regulatory framework, fully enforceable through 2026 with high-risk obligations hitting a hard milestone in August 2026. It is risk-tiered: unacceptable, high, limited, minimal. Practical effect: anything touching employment, education, credit, biometrics, or safety-critical systems carries documentation and conformity duties. Two things worth holding: it applies to services offered in the EU, not just to EU companies, and 'just ship it' is a US-shaped instinct that stops at the EU border.",
    facts: [
      { label: "Structure", value: "Risk-tiered: unacceptable, high, limited, minimal; applies to services offered in the EU regardless of company origin", durability: "structural", noted: D2, source: null },
      { label: "Milestone", value: "High-risk obligations hit a hard milestone in August 2026", durability: "perishable", noted: D, source: null }
    ]
  },
  {
    id: "china-agent-rules", name: "China agent rules", aliases: ["Implementation Opinions"], layer: 8,
    oneLine: "The first national framework anywhere to regulate AI agents as their own category",
    body: "China's Implementation Opinions on intelligent agents, effective 15 July 2026: the first national framework anywhere to regulate AI agents as their own category rather than as an extension of model rules. Requirements center on content compliance, data localization, and national security review. The paradox worth holding: the most tightly regulated large AI market is also the most prolific publisher of open-weight models.",
    facts: [
      { label: "First of its kind", value: "Regulates agents as their own category, effective 15 July 2026", durability: "structural", noted: D, source: null }
    ]
  },
  {
    id: "export-control", name: "Export control", aliases: [], layer: 8,
    oneLine: "The quiet lever: who can buy which chips shapes which countries can train frontier models at all",
    body: "The most consequential AI policy instrument is not a law about chatbots, it is who can buy which chips. Restrictions on advanced accelerators and on the equipment to make them (ASML's machines above all) shape which countries can train frontier models at all. It is also the map's best example of a governance edge reaching down the stack: constraint at layer 0 produced the efficiency culture of China's labs at layer 1, which produced the cheap open weights at layer 2. Any AI capability forecast that ignores semiconductor policy is guessing.",
    facts: [
      { label: "Mechanism", value: "Controls on accelerators and lithography equipment decide who can train frontier models", durability: "structural", noted: D2, source: null }
    ]
  },
  {
    id: "bangkok-declaration", name: "Bangkok Declaration", aliases: [], layer: 8,
    oneLine: "100+ countries committing to AI sovereignty in February 2026",
    body: "Over 100 countries signed the Bangkok Declaration in February 2026, committing to AI sovereignty: national compute, national models, national data rules. The practical forecast it encodes: more national LLMs, more data-residency requirements, and more fragmentation. Design for provider substitution, because availability of any given model in any given place is political.",
    facts: [
      { label: "Signal", value: "Sovereignty as the global default: expect national models, residency rules, fragmentation", durability: "structural", noted: D2, source: null }
    ]
  },
  { id: "uk-aisi", name: "UK AI Safety Institute", aliases: ["AISI"], layer: 8,
    oneLine: "Pre-deployment evaluation of frontier models, with international counterparts",
    note: "The UK's frontier-model evaluation body, doing pre-deployment testing of new frontier models, with international counterparts doing the same. The institutional form of the question this layer asks: can it stop a deployment." }
];
