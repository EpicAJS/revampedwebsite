export const site = {
  name: "Abhijay Salvi",
  shortName: "AJS",
  tagline: "Placeholder tagline — swap this for your real one.",
  bio: "Placeholder bio. A couple sentences about who you are, what you build, and what you're into. Replace this with your real story.",
  location: "Atlanta, GA",
  email: "hello@abhijaysalvi.com",
  socials: {
    github: "https://github.com/EpicAJS",
    linkedin: "https://linkedin.com/in/replace-me",
    twitter: "https://x.com/replace_me",
    resume: "/resume.pdf",
  },
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  repo?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "project-one",
    title: "Placeholder Project One",
    description:
      "A short one or two sentence description of what this project does and why it exists. Replace with a real project.",
    tags: ["TypeScript", "React", "API"],
    link: "https://example.com",
    repo: "https://github.com/EpicAJS",
    featured: true,
  },
  {
    slug: "project-two",
    title: "Placeholder Project Two",
    description:
      "Another placeholder project description. Talk about the problem it solves and the stack behind it.",
    tags: ["Python", "ML", "Automation"],
    repo: "https://github.com/EpicAJS",
    featured: true,
  },
  {
    slug: "project-three",
    title: "Placeholder Project Three",
    description:
      "Third placeholder project. Great spot for a hackathon build, a side project, or something you shipped at work.",
    tags: ["Next.js", "Postgres"],
    link: "https://example.com",
  },
  {
    slug: "project-four",
    title: "Placeholder Project Four",
    description:
      "Fourth placeholder project slot. Swap in real details whenever you're ready.",
    tags: ["Go", "Systems"],
    repo: "https://github.com/EpicAJS",
  },
];

export type SkillCategory = {
  category: string;
  items: string[];
};

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    items: ["TypeScript", "Python", "Java", "C++", "Go"],
  },
  {
    category: "Frameworks & Libraries",
    items: ["React", "Next.js", "Node.js", "Tailwind CSS"],
  },
  {
    category: "Tools & Platforms",
    items: ["Git", "Docker", "AWS", "Vercel"],
  },
  {
    category: "Currently Exploring",
    items: ["Rust", "Distributed Systems"],
  },
];
