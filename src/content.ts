// All text on the site lives here. Edit this file to update the portfolio.

export const profile = {
  name: "Sukumar Poddar",
  title: "Sukumar Poddar | Founder, Data Scientist & ML Engineer",
  description:
    "Founder of Shryxa Technologies. Data scientist and ML engineer building AI products for small businesses and developers.",
  email: "sukumarpoddar90@gmail.com",
  github: "https://github.com/sukumarpoddar2868",
  linkedin: "https://www.linkedin.com/in/sukumarpoddar",
  company: { name: "Shryxa Technologies", url: "https://shryxa.com" },
  photo: "/portrait.webp",
  photoWidth: 1400,
  photoHeight: 1871,
};

// Hero typewriter. Each part is typed in order; `style` adds an effect.
export const heroLines: { text: string; style?: "highlight" | "mono" }[] = [
  { text: "Entrepreneur, " },
  { text: "data scientist", style: "highlight" },
  { text: " and " },
  { text: "ML", style: "mono" },
  { text: " engineer. I turn " },
  { text: "models", style: "highlight" },
  { text: " into products people use." },
];

export const introStats: { parts: { text: string; strong?: boolean }[] }[] = [
  { parts: [{ text: "4", strong: true }, { text: " products live." }] },
  {
    parts: [
      { text: "Bridging " },
      { text: "data", strong: true },
      { text: " and " },
      { text: "business", strong: true },
      { text: "." },
    ],
  },
  { parts: [{ text: "From research to revenue." }] },
];

export const tagline =
  "From models to markets: building data and AI systems that real businesses pay for.";

export const experience = [
  {
    period: "Jul 2026 – Present",
    role: "Founder, Shryxa Technologies",
    url: "https://shryxa.com",
    text: "Running an AI engineering studio with four products live: Shryxa Ads, Shryxa Chat, Shryxa Review and Lighten. Building end-to-end, from data pipelines and LLM features to billing and deployment, and delivering RAG, AI-agent and ML solutions for clients.",
  },
  {
    period: "Feb 2026 – Jul 2026",
    role: "AI Research Intern, Lightning Leap Analytics",
    url: "https://lightningleapanalytics.com",
    text: "Worked on agentic AI and applied machine learning. Built a WhatsApp procurement agent on Google ADK and Gemini 2.5 Flash with multimodal OCR, tool calling and cross-session memory.",
  },
];

export type Project = {
  name: string;
  org: string;
  description: string;
  impact: string;
  tags: string[];
  status: string;
  url?: string;
  topPick?: boolean;
  // Cover image in /public/projects (Unsplash). Without it, a generated cover is shown.
  image?: string;
};

export const projects: Project[] = [
  {
    name: "Shryxa Ads",
    image: "/projects/shryxa-ads.webp",
    org: "Shryxa Technologies",
    description:
      "Facebook and Instagram ads for local businesses and agencies without Ads Manager. AI-drafted ad copy, PIN-code targeting, a leads inbox and subscription billing.",
    impact: "Live · ₹999/mo",
    tags: ["Next.js", "Meta Ads API", "Groq LLM", "Supabase"],
    status: "Live",
    url: "https://shryxa.com/products/shryxa-ads",
    topPick: true,
  },
  {
    name: "Shryxa Chat",
    image: "/projects/shryxa-chat.webp",
    org: "Shryxa Technologies",
    description:
      "WhatsApp offers and updates for small businesses on Meta's official Cloud API. Opt-in contacts, approved templates, broadcasts and an AI message writer.",
    impact: "Live · ₹199/mo",
    tags: ["Next.js", "WhatsApp Cloud API", "Groq LLM", "Supabase"],
    status: "Live",
    url: "https://shryxa.com/products/shryxa-chat",
    topPick: true,
  },
  {
    name: "Shryxa Review",
    image: "/projects/shryxa-review.webp",
    org: "Shryxa Technologies",
    description:
      "More genuine Google reviews for local businesses. Customers scan a QR code, get AI writing help, and post straight to Google.",
    impact: "Live · ₹199/mo",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Razorpay"],
    status: "Live",
    url: "https://shryxa.com/products/shryxa-review",
    topPick: true,
  },
  {
    name: "Lighten",
    image: "/projects/lighten.webp",
    org: "Shryxa Technologies",
    description:
      "Cuts token usage in long Claude Code sessions. Local hooks shorten noisy tool output before it enters context and carry memory across compactions.",
    impact: "Free · Runs locally",
    tags: ["Python", "LLM Context", "CLI", "Hooks"],
    status: "Live",
    url: "https://shryxa.com/products/lighten",
  },
  {
    name: "PolyAd",
    image: "/projects/polyad.webp",
    org: "Shryxa Technologies",
    description:
      "Campaign tool for running political ads on Meta across 403 Uttar Pradesh constituencies. Constituency maps, team workspaces and AI ad text in Hindi and English.",
    impact: "Internal agency tool",
    tags: ["Next.js", "MapLibre", "Groq LLM", "Supabase"],
    status: "Internal",
  },
  {
    name: "Event QR Scanner",
    image: "/projects/event-qr-scanner.webp",
    org: "Open Source",
    description:
      "Event ticket generator and check-in scanner. Bulk import from Excel, QR codes as ZIP, camera scanning, duplicate check-in protection and live stats.",
    impact: "Works offline",
    tags: ["React", "Vite", "JavaScript", "QR"],
    status: "GitHub",
    url: "https://github.com/sukumarpoddar2868/Event_QR_Scanner",
  },
  {
    name: "Coders of Delhi",
    image: "/projects/coders-of-delhi.webp",
    org: "Open Source",
    description:
      "A mini social network in pure Python. Collects, cleans and structures JSON data, then suggests friends from mutual connections and shared interests.",
    impact: "Zero dependencies",
    tags: ["Python", "JSON", "Data Cleaning", "Jupyter"],
    status: "GitHub",
    url: "https://github.com/sukumarpoddar2868/Coders_of_Delhi",
  },
  {
    name: "Customer Churn Prediction",
    image: "/projects/churn-prediction.webp",
    org: "Major Project",
    description:
      "End-to-end churn prediction and retention analytics. A TensorFlow neural network served by FastAPI, with a Streamlit dashboard for risk scores and customer segments.",
    impact: "Recall-tuned at 0.35",
    tags: ["TensorFlow", "scikit-learn", "FastAPI", "Streamlit"],
    status: "GitHub",
    url: "https://github.com/sukumarpoddar2868/Major_Project_Chrun_prediction_customer_segmentation_and_retention_analysis",
    topPick: true,
  },
  {
    name: "Tally Docker Backup",
    image: "/projects/tally-docker-backup.webp",
    org: "Open Source",
    description:
      "Runs Windows 11 and TallyPrime in Docker on an Ubuntu server, with a separate container that keeps 15-minute and daily backups on the host.",
    impact: "Automated backups",
    tags: ["Docker", "Docker Compose", "Python", "Cron"],
    status: "GitHub",
    url: "https://github.com/sukumarpoddar2868/tally-docker-backup",
  },
  {
    name: "WhatsApp Automate",
    image: "/projects/whatsapp-automate.webp",
    org: "Open Source",
    description:
      "An agent that runs B2B fabric procurement over WhatsApp. Reads RFQs and fabric-tag photos, opens tickets, routes them to vendors and closes the loop.",
    impact: "Live on Render",
    tags: ["Google ADK", "Gemini 2.5", "PostgreSQL", "Agentic AI"],
    status: "GitHub",
    url: "https://github.com/sukumarpoddar2868/whatsapp_automate",
  },
];

// Drifting lines in the "Toolkit" section: [before, highlighted word, after].
export const toolkitLines: [string, string, string][] = [
  ["Training neural nets in ", "TensorFlow", ""],
  ["Shipping APIs with ", "FastAPI", ""],
  ["Full-stack apps on ", "Next.js", ""],
  ["Agents that ", "call tools", " on their own"],
  ["Postgres on ", "Supabase", ""],
  ["Dashboards in ", "Streamlit", ""],
  ["Fast LLM inference with ", "Groq", ""],
  ["Multimodal OCR with ", "Gemini", ""],
  ["Everything in ", "Docker", ""],
  ["Feature scaling with ", "scikit-learn", ""],
  ["Payments through ", "Razorpay", ""],
  ["Ads via the ", "Meta", " Marketing API"],
  ["Fewer tokens, ", "better context", ""],
  ["Clean data ", "first", ", models second"],
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "TypeScript", "JavaScript", "SQL"] },
  {
    group: "ML & Data",
    items: ["TensorFlow", "scikit-learn", "Jupyter", "Streamlit", "Data Cleaning", "Customer Segmentation"],
  },
  {
    group: "AI & Agents",
    items: ["Google ADK", "Gemini", "Groq LLMs", "Agentic AI", "RAG", "Claude Code"],
  },
  {
    group: "Web & APIs",
    items: ["Next.js", "React", "Vite", "FastAPI", "Tailwind CSS", "Zod", "NextAuth"],
  },
  { group: "Databases", items: ["PostgreSQL", "Supabase", "Prisma"] },
  {
    group: "Platforms & Tools",
    items: ["Docker", "Vercel", "Render", "Meta Marketing API", "WhatsApp Cloud API", "Razorpay", "MapLibre", "Git"],
  },
];
