// Bonmot deck export, NOT an app tab. Every card derives from a structural
// fact: derivedFrom holds "layer-N" ids or thing ids whose facts include at
// least one structural entry. check.js enforces this.
export default [
  { id: "def-model", front: "What is a model?", back: "Weights. Claude Opus 5, Kimi, Qwen. It cannot do anything alone.", topic: "taxonomy", derivedFrom: ["layer-2"] },
  { id: "def-harness", front: "What is a harness?", back: "The program running a model in a loop with tools. Claude Code, Cursor, OpenClaw. Swap the model, keep the harness.", topic: "taxonomy", derivedFrom: ["layer-4"] },
  { id: "def-config", front: "What is a configuration?", back: "A text file that changes what a harness does: SKILL.md, CLAUDE.md, a subagent. Zero code, large behavior change.", topic: "taxonomy", derivedFrom: ["layer-5"] },
  { id: "q-layer0", front: "Layer 0 test question", back: "Who physically runs the math? (Silicon and power)", topic: "layers", derivedFrom: ["layer-0"] },
  { id: "q-layer1", front: "Layer 1 test question", back: "Who paid for the training run? (Labs)", topic: "layers", derivedFrom: ["layer-1"] },
  { id: "q-layer2", front: "Layer 2 test question", back: "Is it a thing you can prompt? (Models)", topic: "layers", derivedFrom: ["layer-2"] },
  { id: "q-layer3", front: "Layer 3 test question", back: "How do bytes reach the weights? (Access)", topic: "layers", derivedFrom: ["layer-3"] },
  { id: "q-layer4", front: "Layer 4 test question", back: "Does it hold a conversation or a task? (Harness)", topic: "layers", derivedFrom: ["layer-4"] },
  { id: "q-layer5", front: "Layer 5 test question", back: "Is it a file, not a program? (Configuration)", topic: "layers", derivedFrom: ["layer-5"] },
  { id: "q-layer6", front: "Layer 6 test question", back: "Does it let the model touch a real app? (Tool bus)", topic: "layers", derivedFrom: ["layer-6"] },
  { id: "q-layer7", front: "Layer 7 test question", back: "Would a non-engineer buy it? (Applied tools)", topic: "layers", derivedFrom: ["layer-7"] },
  { id: "q-layer8", front: "Layer 8 test question", back: "Can it stop a deployment? (Governance)", topic: "layers", derivedFrom: ["layer-8"] },
  { id: "chatgpt-not-openai", front: "Is ChatGPT a model?", back: "No. ChatGPT is a harness, OpenAI is the lab, GPT-5.x is the model family. Three different shelves.", topic: "taxonomy", derivedFrom: ["chatgpt"] },
  { id: "mcp-oneline", front: "What is MCP?", back: "The open standard for exposing tools to any AI harness. Write a server once, every MCP-speaking harness can use it. USB-C for AI tools.", topic: "toolbus", derivedFrom: ["mcp"] },
  { id: "prompt-injection", front: "Why is every MCP server a security decision?", back: "It is code holding your credentials, and prompt injection through tool results is a real attack: a webpage or email can carry instructions the agent reads as if you wrote them.", topic: "toolbus", derivedFrom: ["mcp"] },
  { id: "skills-portable", front: "Why are skills not vendor lock-in?", back: "Agent Skills is an open spec (Dec 2025) supported by 30+ platforms. A skills folder is a portable asset; change harness and it carries over.", topic: "config", derivedFrom: ["agent-skills"] },
  { id: "governance-edge", front: "Which layers does governance actually reach down and change?", back: "Models (2) and applied tools (7): a model can be pulled from a jurisdiction or contract for political reasons. Availability is political, so design for provider substitution.", topic: "governance", derivedFrom: ["layer-8"] },
  { id: "fab-capacity", front: "What actually caps GPU output?", back: "Leading-edge fab capacity (TSMC), not chip design. HBM memory supply gates shipments just as hard.", topic: "silicon", derivedFrom: ["tsmc"] },
  { id: "surrogate-idea", front: "What is a CAE surrogate model?", back: "A model trained on simulation data that predicts performance across a design space in seconds instead of solving from scratch in hours: a handful of runs becomes hundreds of evaluated configurations.", topic: "applied", derivedFrom: ["ansys-simai"] },
  { id: "sora-lesson", front: "What did the Sora 2 deprecation teach?", back: "Do not build a production pipeline on a hosted generative model that can be withdrawn under you.", topic: "applied", derivedFrom: ["layer-7"] }
];
