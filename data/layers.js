// The nine layers, top of the pyramid (8) to the bottom (0).
// governs/governedBy are the only cross-layer edges that carry information
// a sorted stack does not already encode. See App-Spec.
export default [
  {
    id: 8,
    name: "Governance",
    oneLine: "Law, procurement, export control",
    testQuestion: "Can it stop a deployment?",
    explain: "Governments use AI like everyone else, plus procurement, plus the power to stop other people from using it. Export control on chips is the most consequential AI policy instrument in existence, and availability of a given model in a given jurisdiction is political, not technical.",
    governs: [2, 7],
    governedBy: []
  },
  {
    id: 7,
    name: "Applied tools",
    oneLine: "Finished products aimed at one job",
    testQuestion: "Would a non-engineer buy it?",
    explain: "The finished products: video, voice, image, research, jobs, CAD and CAE. Organized by the job you are hiring them for, because the vendor list changes every quarter and the job does not.",
    governs: [],
    governedBy: [8]
  },
  {
    id: 6,
    name: "Tool bus",
    oneLine: "Standardized hands into other software",
    testQuestion: "Does it let the model touch a real app?",
    explain: "A model with no tools can only talk. MCP servers, connectors, and aggregators like Composio are how a chatbot becomes a thing that does your work. Every connection is also code holding your credentials, which is why security lives on this layer.",
    governs: [],
    governedBy: []
  },
  {
    id: 5,
    name: "Configuration",
    oneLine: "Text that changes how a harness behaves",
    testQuestion: "Is it a file, not a program?",
    explain: "A SKILL.md, a CLAUDE.md, a subagent definition, a hook. No code, no deploy, instant behavior change. Most 'new AI tool' noise is this layer dressed up as a model, and it is also where most personal leverage lives, because it is free and it composes.",
    governs: [],
    governedBy: []
  },
  {
    id: 4,
    name: "Harness",
    oneLine: "The program driving the model in a loop",
    testQuestion: "Does it hold a conversation or a task?",
    explain: "The harness holds the loop: send prompt, read output, run the tools the model asked for, feed results back, repeat until done. Claude Code is a harness. So is Cursor. So is the ChatGPT web app, a very simple one. Swap the model, keep the harness.",
    governs: [],
    governedBy: []
  },
  {
    id: 3,
    name: "Access",
    oneLine: "API endpoints, routers, local runtimes",
    testQuestion: "How do bytes reach the weights?",
    explain: "A model is useless until something can send it bytes. Five paths: direct lab APIs, cloud marketplaces, routers, local runtimes, and subscription harnesses. They trade off price, privacy, and lock-in.",
    governs: [],
    governedBy: []
  },
  {
    id: 2,
    name: "Models",
    oneLine: "The weights themselves",
    testQuestion: "Is it a thing you can prompt?",
    explain: "A model is weights. It cannot do anything alone. Labs ship them in tiers: a flagship, a workhorse you actually use all day, and a cheap fast one for bulk work.",
    governs: [],
    governedBy: [8]
  },
  {
    id: 1,
    name: "Labs",
    oneLine: "Organizations that train frontier models",
    testQuestion: "Who paid for the training run?",
    explain: "A lab pays for training runs; a model is the resulting weights. One lab ships many models. China ships more open-weight models than anywhere else, which is why open weights are viable at all.",
    governs: [],
    governedBy: []
  },
  {
    id: 0,
    name: "Silicon and power",
    oneLine: "Chips, fabs, datacenters, electricity",
    testQuestion: "Who physically runs the math?",
    explain: "Every model exists downstream of a wafer allocation decision made 18 months earlier. Leading-edge fab capacity is the binding constraint, not chip design, and grid power is now a first-class constraint rather than a footnote.",
    governs: [],
    governedBy: []
  }
];
