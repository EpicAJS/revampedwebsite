export type TrackKind = "experience" | "project" | "research";

export type Track = {
  id: string;
  title: string;
  org: string;
  role: string;
  kind: TrackKind;
  dates: string;
  /** Sort key, most recent first. */
  start: string;
  /** Months engaged — doubles as the track "duration". */
  months: number;
  summary: string;
  highlights: string[];
  tech: string[];
  award?: string;
  links?: { label: string; href: string }[];
  featured?: boolean;
  /** Two-stop gradient used for generated album art. */
  art: [string, string];
};

export const tracks: Track[] = [
  // ---------------------------------------------------------------- experience
  {
    id: "amazon",
    title: "Stores Foundational AI",
    org: "Amazon",
    role: "Software Development Engineering Intern",
    kind: "experience",
    dates: "September 2026 – Present",
    start: "2026-09-01",
    months: 1,
    summary:
      "Building reinforcement learning infrastructure that cuts GPU spend during large-scale LLM training, plus developer tooling that shortens the path from idea to deployment.",
    highlights: [
      "Building RL as a Sandbox service to optimize GPU allocation and save compute costs during LLM training.",
      "Developing CLI tool integration with Claude Code and Codex to decrease idea-to-deployment times.",
    ],
    tech: ["Reinforcement Learning", "LLM Training", "GPU Scheduling", "CLI Tooling"],
    featured: true,
    art: ["#1f6f4a", "#0b2b1c"],
  },
  {
    id: "draper",
    title: "Machine Intelligence",
    org: "Draper",
    role: "Software Engineering Intern",
    kind: "experience",
    dates: "June 2026 – August 2026",
    start: "2026-06-01",
    months: 3,
    summary:
      "Anomaly detection for guidance systems, plus internal LLM tooling that halved hardware test cycles and measurably improved model reliability.",
    highlights: [
      "Developed scripts for anomaly detection and statistical analysis for guidance systems using PyTorch, NumPy, and Pandas.",
      "Led codebase restructuring for a 7-person agile team; managed sprint planning and tracking in Jira.",
      "Applied an internal LLM tool to automate System-on-a-Chip and hardware-in-the-loop testing by 50%.",
      "Tracked prompt-response pairs, error rates, and usage to debug failure patterns and improve internal LLM reliability by 15%.",
    ],
    tech: ["PyTorch", "NumPy", "Pandas", "LLM Tooling", "Jira"],
    featured: true,
    art: ["#2c4f7c", "#101c2e"],
  },
  {
    id: "earthena",
    title: "Resilience Intelligence",
    org: "Earthena AI",
    role: "AI Engineer",
    kind: "experience",
    dates: "May 2026 – July 2026",
    start: "2026-05-01",
    months: 3,
    summary:
      "A multi-agent LangGraph pipeline for supply chain facility discovery, backed by a Postgres index of 100K+ facilities across 100+ countries.",
    highlights: [
      "Built and deployed via GCP a 3-agent LangGraph pipeline for supply chain facility discovery, reducing research time by 70%.",
      "Engineered a PostgreSQL facility database and cache indexing of 100K+ records across 100+ countries.",
    ],
    tech: ["LangGraph", "GCP", "PostgreSQL", "Multi-Agent Systems", "Python"],
    featured: true,
    art: ["#1d6f6f", "#0a2626"],
  },
  {
    id: "waresport-cto",
    title: "Waresport",
    org: "Waresport",
    role: "Chief Technology Officer",
    kind: "experience",
    dates: "June 2025 – Present",
    start: "2025-06-01",
    months: 16,
    summary:
      "Leading engineering for an AI operating system for sports clubs — from zero to 100+ users with a globally distributed team.",
    highlights: [
      "Directed a global cross-functional team through iterative product development, scaling from 0 to 100+ users.",
      "Led design and implementation of LLM and AI-based scheduling, cutting management time by 90%.",
      "Architected full-stack systems and delivered a custom CMS for dynamic content publishing.",
      "Integrated CI/CD pipelines to streamline deployment.",
    ],
    tech: ["React", "Node.js", "TypeScript", "LLM Integration", "CI/CD", "AWS"],
    featured: true,
    art: ["#7c3f2c", "#2e1510"],
  },
  {
    id: "ups",
    title: "Physical Automation & Robotics",
    org: "UPS",
    role: "Software Engineering Intern",
    kind: "experience",
    dates: "June 2025 – August 2025",
    start: "2025-06-01",
    months: 3,
    summary:
      "Autonomous warehouse navigation on Boston Dynamics Spot, with a control dashboard and a vision model for package overflow detection.",
    highlights: [
      "Implemented boundary detection and real-time control for autonomous warehouse navigation using the Boston Dynamics SDK.",
      "Built a React/Next.js + REST API dashboard to monitor and control Boston Dynamics Spot warehouse operations.",
      "Trained a PyTorch + OpenCV model for real-time package overflow detection, achieving 95% precision.",
      "Presented technical solutions to C-suite executives.",
    ],
    tech: ["Boston Dynamics SDK", "PyTorch", "OpenCV", "React", "Next.js", "REST APIs"],
    featured: true,
    art: ["#7c6a2c", "#2b2510"],
  },
  {
    id: "performance-services",
    title: "Innovation and R&D",
    org: "Performance Services Inc.",
    role: "Software Engineering Intern",
    kind: "experience",
    dates: "March 2024 – August 2024",
    start: "2024-03-01",
    months: 6,
    summary:
      "Internal research tooling and NLP pipelines — a Flask platform for the marketing org and a chatbot that made retrieval dramatically faster.",
    highlights: [
      "Built a Flask research platform for 20+ Marketing and PR members, reducing data aggregation workflows by 75%.",
      "Integrated a CustomGPT chatbot across internal and public web apps, improving retrieval efficiency by 85%.",
      "Re-architected a Python + PyTorch NLP pipeline for machinery tagging, boosting throughput by 150%.",
    ],
    tech: ["Flask", "Python", "PyTorch", "NLP", "Node.js", "FastAPI"],
    art: ["#4a3f7c", "#1a1530"],
  },

  // ------------------------------------------------------------------ projects
  {
    id: "waresport",
    title: "Waresport",
    org: "AI Operating System for Sports Clubs",
    role: "Co-founder & CTO",
    kind: "project",
    dates: "June 2025 – Present",
    start: "2025-06-01",
    months: 16,
    summary:
      "A SaaS platform that runs the operational backbone of sports clubs — scheduling, content, and member management — with an LLM layer on top.",
    highlights: [
      "Built a TypeScript + Python + MongoDB SaaS platform with a 7-person team, scaling to 20+ clients.",
      "Designed a rule-based scheduling algorithm with OpenAI API integration, reducing management time by 90%.",
      "Deployed to production on AWS with GitHub Actions CI/CD and Docker containers.",
    ],
    tech: ["TypeScript", "Python", "MongoDB", "OpenAI API", "AWS", "Docker", "GitHub Actions"],
    links: [{ label: "Visit Waresport", href: "https://waresport.com" }],
    featured: true,
    art: ["#7c3f2c", "#2e1510"],
  },
  {
    id: "surgevue",
    title: "SurgeVue",
    org: "PennApps",
    role: "Team Member",
    kind: "project",
    dates: "PennApps",
    start: "2025-09-01",
    months: 1,
    summary:
      "An AR overlay for MRI tumor detection, pairing real-time frame analysis with a 3D brain tumor model surgeons can explore.",
    highlights: [
      "Achieved 97% tumor detection accuracy by fine-tuning a pretrained model for real-time MRI frame analysis with AR overlay.",
      "Architected a full-stack Firebase web app with an integrated 3D brain tumor modeling system in Matplotlib for exploration.",
    ],
    tech: ["AR/VR", "Computer Vision", "Firebase", "Python", "Matplotlib", "iOS"],
    award: "1st Place AR/VR · 3rd Overall",
    links: [
      { label: "Devpost", href: "https://devpost.com/software/surgikalai" },
    ],
    featured: true,
    art: ["#2c5f7c", "#0f2230"],
  },
  {
    id: "perfectpunch",
    title: "PerfectPunch",
    org: "Hacklytics",
    role: "Team Lead",
    kind: "project",
    dates: "February 2025",
    start: "2025-02-01",
    months: 1,
    summary:
      "Real-time boxing analysis from a single camera — punch classification, injury risk metrics, and an LLM coach, with no wearables required.",
    highlights: [
      "Built a custom RAG pipeline with the Gemini LLM to generate contextual AI coaching insights from real-time fight analytics.",
      "Engineered a low-latency asyncio pipeline processing live video via OpenCV + PyTorch at 95% accuracy.",
      "Surfaced injury prevention insights and concussion risk metrics from biomechanics, hardware-free.",
    ],
    tech: ["Python", "OpenCV", "MediaPipe", "PyTorch", "Gemini API", "Django", "Taipy"],
    award: "2nd Place, Sports Track",
    links: [
      { label: "Devpost", href: "https://devpost.com/software/perfectpunch" },
    ],
    featured: true,
    art: ["#7c2c3f", "#2e1018"],
  },
  {
    id: "haven",
    title: "HAVEN",
    org: "Hazard Alert & Visual Emergency Network",
    role: "Team Member",
    kind: "project",
    dates: "Hackathon",
    start: "2024-11-01",
    months: 1,
    summary:
      "Turns crowdsourced disaster photos into AI-verified incidents on a live map, then routes people to the nearest safe zone.",
    highlights: [
      "Built an AI hazard intelligence platform using Next.js + Flask, converting crowdsourced photos into verified real-time incidents.",
      "Integrated the Google Maps API for dynamic safe-zone routing, computing nearest shelter and evacuation path using A*.",
      "Used multi-source verification so a single bad report can't create a false incident.",
    ],
    tech: ["Next.js", "Flask", "Roboflow", "Google Maps API", "SQLite", "Python"],
    links: [{ label: "Devpost", href: "https://devpost.com/software/haven-rub6ed" }],
    art: ["#7c5a2c", "#2e2010"],
  },
  {
    id: "plan",
    title: "P.L.A.N.",
    org: "NextTech CSforGood",
    role: "Team Member",
    kind: "project",
    dates: "January 2023",
    start: "2023-01-01",
    months: 2,
    summary:
      "Parking Lot App Navigator — computer vision finds open parking spots and a mobile app points drivers straight at them.",
    highlights: [
      "Used OpenCV to detect open parking spots from lot imagery.",
      "Built a mobile app showing live availability, cutting time spent circling for a space.",
    ],
    tech: ["OpenCV", "Python", "Computer Vision", "Mobile"],
    award: "Statewide Winner",
    art: ["#3f7c2c", "#152e10"],
  },
  {
    id: "facecard",
    title: "FaceCard",
    org: "Hackathon",
    role: "Team Member",
    kind: "project",
    dates: "Hackathon",
    start: "2023-06-01",
    months: 1,
    summary:
      "A privacy-first digital identity platform for verification and access, built on Azure and Firebase.",
    highlights: [
      "Designed a secure digital identity flow with privacy-first defaults.",
      "Integrated Azure and Firebase for authentication and storage.",
    ],
    tech: ["React", "Azure", "Node.js", "Firebase"],
    links: [
      { label: "Devpost", href: "https://devpost.com/software/facecard-kcqdgo" },
    ],
    art: ["#2c7c6a", "#102e28"],
  },
  {
    id: "storyquest",
    title: "StoryQuest",
    org: "Hackathon",
    role: "Team Member",
    kind: "project",
    dates: "Hackathon",
    start: "2023-05-01",
    months: 1,
    summary:
      "An interactive storytelling engine where narratives branch from reader choices, generated with Vertex AI.",
    highlights: [
      "Built stories that evolve from user choices using generative AI.",
      "Used Google Vertex AI and NLP to keep branching narratives coherent.",
    ],
    tech: ["GenAI", "Google Vertex AI", "NLP", "Web"],
    links: [
      { label: "Devpost", href: "https://devpost.com/software/storyquest-u63rnd" },
    ],
    art: ["#5a2c7c", "#20102e"],
  },
  {
    id: "rekindlear",
    title: "RekindleAR",
    org: "Hackathon",
    role: "Team Member",
    kind: "project",
    dates: "Hackathon",
    start: "2023-03-01",
    months: 1,
    summary:
      "Augmented reality for memory preservation — revisit places and moments in an immersive 3D space.",
    highlights: [
      "Built AR experiences for memory preservation and reconnection.",
      "Combined SnapAR and Unity with a Python backend.",
    ],
    tech: ["SnapAR", "Unity", "Python", "AR/VR"],
    links: [{ label: "Devpost", href: "https://devpost.com/software/rekindlear" }],
    art: ["#7c2c6a", "#2e1026"],
  },

  // ------------------------------------------------------------------ research
  {
    id: "gt-europe",
    title: "Phoneme-Guided Neural Speech Clarification",
    org: "Georgia Tech Europe",
    role: "Research Team Member",
    kind: "research",
    dates: "January 2026 – Present",
    start: "2026-01-01",
    months: 9,
    summary:
      "Improving hearing aid intelligibility by detecting phonemes a listener struggles with and substituting clearer alternatives.",
    highlights: [
      "Improved transcription clarity by 20% via an ASR and wav2vec2 pipeline that detects and replaces unclear phonemes.",
      "Focused on preserving meaning while raising intelligibility for hearing aid users.",
    ],
    tech: ["Deep Learning", "wav2vec2", "ASR", "PyTorch", "Python", "Speech Processing"],
    featured: true,
    art: ["#2c7c5a", "#102e20"],
  },
  {
    id: "noaa-drought",
    title: "Drought Prediction on NOAA Datasets",
    org: "Independent Research",
    role: "Researcher under a CalTech Ph.D. Candidate",
    kind: "research",
    dates: "July 2023 – Present",
    start: "2023-07-01",
    months: 8,
    summary:
      "Benchmarking state-of-the-art models against NOAA climate data to make drought prediction more accurate and more interpretable.",
    highlights: [
      "Developed and benchmarked state-of-the-art models on NOAA datasets, improving drought prediction accuracy by 18%.",
      "Compared random forest, nonlinear regression, SVM, KNN, and neural networks across local and global scales.",
    ],
    tech: ["Python", "Scikit-Learn", "Neural Networks", "Pandas", "NumPy"],
    art: ["#7c722c", "#2e2a10"],
  },
  {
    id: "project-limbo",
    title: "Project Limbo",
    org: "Medical Robotics @ Georgia Tech",
    role: "Research Team Member",
    kind: "research",
    dates: "February 2025 – Present",
    start: "2025-02-01",
    months: 19,
    summary:
      "Responsible AI for prosthetic safety — real-time EMG classification feeding a feedback control loop that makes prosthetics more responsive.",
    highlights: [
      "Applied responsible AI principles to user safety within real-time feedback control loops.",
      "Built real-time Python ML models for EMG classification, improving prosthetic responsiveness.",
      "Worked across embedded control systems and simulations in an agile research team.",
    ],
    tech: ["Python", "Machine Learning", "Embedded Systems", "Real-time Control", "Simulation"],
    featured: true,
    art: ["#2c3f7c", "#10152e"],
  },
  {
    id: "ag-forecast",
    title: "Agricultural Predictivity Forecast",
    org: "Big Data Big Impact @ Georgia Tech",
    role: "Team Member",
    kind: "research",
    dates: "September 2024 – January 2025",
    start: "2024-09-01",
    months: 5,
    summary:
      "A large-scale crop forecasting pipeline built on satellite time-series data and ML classification.",
    highlights: [
      "Built a large-scale pipeline for crop forecasting using satellite time-series and ML classification.",
      "Improved yield prediction accuracy by 18% through tuning and feature optimization.",
    ],
    tech: ["Python", "Machine Learning", "Satellite Data", "Time-Series", "Feature Engineering"],
    art: ["#5a7c2c", "#202e10"],
  },
  {
    id: "ucsb-soft-robotics",
    title: "Soft Robotics for Coral Reefs",
    org: "UC Santa Barbara Summer Research Academy",
    role: "Research Participant",
    kind: "research",
    dates: "June – July 2022",
    start: "2022-06-01",
    months: 2,
    summary:
      "A soft robot designed to clear microplastics from coral reefs without damaging them, driven by pneumatic artificial muscles.",
    highlights: [
      "Designed a novel soft robot to cleanse coral reefs of microplastics.",
      "Programmed Series Pneumatic Artificial Muscles (SPAMs) with Arduino C.",
      "Presented the work at a UCSB research seminar.",
    ],
    tech: ["Arduino", "C", "Soft Robotics", "Pneumatics"],
    art: ["#2c6f7c", "#102630"],
  },
];

export const tracksById = new Map(tracks.map((track) => [track.id, track]));

export function getTrack(id: string) {
  return tracksById.get(id);
}

export function tracksOfKind(kind: TrackKind) {
  return tracks
    .filter((track) => track.kind === kind)
    .sort((a, b) => (a.start < b.start ? 1 : -1));
}

export const featuredTracks = tracks.filter((track) => track.featured);

/** Months double as minutes so every track gets a plausible runtime. */
export function trackDuration(track: Track) {
  const seconds = (track.id.length * 7) % 60;
  return `${track.months}:${String(seconds).padStart(2, "0")}`;
}
