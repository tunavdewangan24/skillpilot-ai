"use client";

import { useEffect, useMemo, useState } from "react";

type TrackKey = "frontend" | "fullstack" | "backend" | "ai";
type ModeKey = "roadmap" | "resume" | "projects" | "interview";

type HistoryItem = {
  id: number;
  title: string;
  output: string;
  date: string;
};

const tracks: Record<
  TrackKey,
  {
    label: string;
    description: string;
    skills: string[];
    projects: string[];
    interview: string[];
  }
> = {
  frontend: {
    label: "Frontend Developer",
    description: "Build modern, responsive and animated user interfaces.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS", "UI/UX"],
    projects: [
      "Premium portfolio with animations",
      "AI landing page builder",
      "Advanced dashboard UI",
    ],
    interview: [
      "What is the difference between props and state?",
      "Explain responsive design.",
      "What is hydration in Next.js?",
      "How do you improve website performance?",
    ],
  },
  fullstack: {
    label: "Full Stack Developer",
    description: "Build complete apps with frontend, backend, database and deployment.",
    skills: ["React", "Next.js", "Node.js", "Express", "MongoDB", "REST API", "Auth"],
    projects: [
      "Task manager with login",
      "E-commerce app with admin panel",
      "AI career dashboard",
    ],
    interview: [
      "What is REST API?",
      "How does authentication work?",
      "Explain middleware in Express.",
      "How do frontend and backend communicate?",
    ],
  },
  backend: {
    label: "Backend Developer",
    description: "Create APIs, authentication, database systems and scalable server logic.",
    skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "JWT", "Redis", "Docker"],
    projects: [
      "Authentication API",
      "Job tracking backend",
      "Payment-ready order system",
    ],
    interview: [
      "What is middleware?",
      "What is JWT?",
      "Explain database indexing.",
      "How do you secure an API?",
    ],
  },
  ai: {
    label: "AI Builder",
    description: "Create AI tools, automation apps and intelligent assistants.",
    skills: ["Python", "AI APIs", "Prompt Engineering", "Automation", "NLP", "Computer Vision"],
    projects: [
      "AI resume reviewer",
      "AI interview coach",
      "Desktop automation assistant",
    ],
    interview: [
      "What is prompt engineering?",
      "How does an AI API work?",
      "What is the difference between rule-based and AI-based systems?",
      "How can AI improve developer productivity?",
    ],
  },
};

const modes: { key: ModeKey; title: string; text: string }[] = [
  {
    key: "roadmap",
    title: "AI Roadmap",
    text: "Generate a learning plan based on your career goal.",
  },
  {
    key: "resume",
    title: "Resume Review",
    text: "Check your resume strength and missing skills.",
  },
  {
    key: "projects",
    title: "Project Ideas",
    text: "Get job-ready project ideas for your selected track.",
  },
  {
    key: "interview",
    title: "Interview Prep",
    text: "Practice important interview questions.",
  },
];

function buildRoadmap(track: TrackKey, level: string, goal: string) {
  const data = tracks[track];

  return [
    `Goal: ${goal || "Become job-ready with strong practical projects."}`,
    `Track: ${data.label}`,
    `Level: ${level}`,
    "",
    "30-Day Skill Plan:",
    `Week 1: Revise basics of ${data.skills.slice(0, 3).join(", ")}.`,
    `Week 2: Practice ${data.skills.slice(3, 5).join(" and ")} with small tasks.`,
    `Week 3: Build one main project: ${data.projects[0]}.`,
    "Week 4: Add README, screenshots, GitHub commits and deploy the project.",
    "",
    "Important Skills:",
    data.skills.map((skill) => `- ${skill}`).join("\n"),
    "",
    "Best Project To Start:",
    `- ${data.projects[0]}`,
  ].join("\n");
}

function reviewResume(resumeText: string, track: TrackKey) {
  const data = tracks[track];
  const text = resumeText.toLowerCase();

  const matched = data.skills.filter((skill) => text.includes(skill.toLowerCase()));
  const missing = data.skills.filter((skill) => !text.includes(skill.toLowerCase()));

  const wordCount = resumeText.trim().split(/\s+/).filter(Boolean).length;
  const score = Math.min(95, 35 + matched.length * 8 + Math.min(20, Math.floor(wordCount / 20)));

  return [
    `Resume Score: ${resumeText.trim() ? score : 0}/100`,
    "",
    "Matched Skills:",
    matched.length ? matched.map((skill) => `- ${skill}`).join("\n") : "- No strong matching skills found yet.",
    "",
    "Missing Skills To Add:",
    missing.length ? missing.slice(0, 5).map((skill) => `- ${skill}`).join("\n") : "- Good coverage for this track.",
    "",
    "Suggestions:",
    "- Add 2-3 strong project descriptions.",
    "- Mention your exact role in each project.",
    "- Add GitHub and live project links.",
    "- Use action words like built, developed, deployed, improved.",
    "- Add measurable impact where possible.",
  ].join("\n");
}

export default function Home() {
  const [track, setTrack] = useState<TrackKey>("fullstack");
  const [mode, setMode] = useState<ModeKey>("roadmap");
  const [level, setLevel] = useState("Beginner");
  const [goal, setGoal] = useState("Get internship-ready in web development");
  const [resumeText, setResumeText] = useState("");
  const [output, setOutput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const selectedTrack = useMemo(() => tracks[track], [track]);

  useEffect(() => {
    const saved = localStorage.getItem("skillpilot-history");
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  function saveHistory(title: string, result: string) {
    const item: HistoryItem = {
      id: Date.now(),
      title,
      output: result,
      date: new Date().toLocaleString(),
    };

    const updated = [item, ...history].slice(0, 6);
    setHistory(updated);
    localStorage.setItem("skillpilot-history", JSON.stringify(updated));
  }

  function handleGenerate() {
    let result = "";

    if (mode === "roadmap") {
      result = buildRoadmap(track, level, goal);
    }

    if (mode === "resume") {
      result = reviewResume(resumeText, track);
    }

    if (mode === "projects") {
      result = [
        "Recommended Job-Ready Projects:",
        "",
        ...selectedTrack.projects.map(
          (project, index) =>
            `${index + 1}. ${project}\n   Why: This project proves your ${selectedTrack.label} skills and can be shown on GitHub/resume.`
        ),
        "",
        "How to make it stronger:",
        "- Add authentication if possible.",
        "- Add database or local storage.",
        "- Add clean README.",
        "- Add screenshots and live link.",
        "- Add GitHub commits daily.",
      ].join("\n");
    }

    if (mode === "interview") {
      result = [
        `${selectedTrack.label} Interview Practice:`,
        "",
        ...selectedTrack.interview.map((q, index) => `${index + 1}. ${q}`),
        "",
        "Practice Tip:",
        "Answer each question using: definition + example + project connection.",
      ].join("\n");
    }

    setOutput(result);
    saveHistory(modes.find((item) => item.key === mode)?.title || "SkillPilot Output", result);
  }

  return (
    <main className="skillpilot-page">
      <section className="hero">
        <nav className="navbar">
          <div className="brand">
            <span className="brand-mark">S</span>
            <span>SkillPilot AI</span>
          </div>

          <div className="nav-links">
            <a href="#tools">Tools</a>
            <a href="#features">Features</a>
            <a href="#history">History</a>
          </div>
        </nav>

        <div className="hero-grid">
          <div className="hero-content">
            <p className="eyebrow">AI Career Operating System</p>
            <h1>Become internship-ready with AI-powered skill guidance.</h1>
            <p className="hero-text">
              SkillPilot AI helps students generate career roadmaps, improve resumes,
              prepare for interviews and build better GitHub projects.
            </p>

            <div className="hero-actions">
              <a href="#tools" className="primary-btn">Start SkillPilot</a>
              <a href="#features" className="secondary-btn">Explore Features</a>
            </div>

            <div className="stats">
              <div>
                <strong>4+</strong>
                <span>AI Tools</span>
              </div>
              <div>
                <strong>30</strong>
                <span>Day Plan</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>Student Focused</span>
              </div>
            </div>
          </div>

          <div className="hero-card">
            <div className="glow"></div>
            <p className="card-label">Current Track</p>
            <h2>{selectedTrack.label}</h2>
            <p>{selectedTrack.description}</p>

            <div className="skill-cloud">
              {selectedTrack.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="section">
        <div className="section-heading">
          <p className="eyebrow">Why SkillPilot?</p>
          <h2>Everything a student needs to become job-ready.</h2>
        </div>

        <div className="feature-grid">
          <article>
            <h3>Personalized Roadmaps</h3>
            <p>Choose your track and level to generate a focused 30-day plan.</p>
          </article>
          <article>
            <h3>Resume Review</h3>
            <p>Paste resume content and get skill gaps with improvement tips.</p>
          </article>
          <article>
            <h3>Project Guidance</h3>
            <p>Get project ideas that are useful for GitHub, resume and interviews.</p>
          </article>
          <article>
            <h3>Interview Prep</h3>
            <p>Practice track-based technical questions with clear preparation direction.</p>
          </article>
        </div>
      </section>

      <section id="tools" className="section tool-section">
        <div className="section-heading">
          <p className="eyebrow">AI Tools</p>
          <h2>Choose your mode and generate career guidance.</h2>
        </div>

        <div className="tool-layout">
          <div className="panel">
            <label>Career Track</label>
            <select value={track} onChange={(e) => setTrack(e.target.value as TrackKey)}>
              <option value="frontend">Frontend Developer</option>
              <option value="fullstack">Full Stack Developer</option>
              <option value="backend">Backend Developer</option>
              <option value="ai">AI Builder</option>
            </select>

            <label>Current Level</label>
            <select value={level} onChange={(e) => setLevel(e.target.value)}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>

            <label>Your Goal</label>
            <input
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Example: Get a frontend internship"
            />

            <div className="mode-grid">
              {modes.map((item) => (
                <button
                  key={item.key}
                  className={mode === item.key ? "mode-card active" : "mode-card"}
                  onClick={() => setMode(item.key)}
                >
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                </button>
              ))}
            </div>

            {mode === "resume" && (
              <>
                <label>Paste Resume Text</label>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your resume content here..."
                />
              </>
            )}

            <button className="generate-btn" onClick={handleGenerate}>
              Generate Result
            </button>
          </div>

          <div className="output-panel">
            <div className="output-header">
              <span>SkillPilot Output</span>
              <small>{selectedTrack.label}</small>
            </div>

            <pre>
              {output ||
                "Your AI-style career guidance will appear here. Select a mode and click Generate Result."}
            </pre>
          </div>
        </div>
      </section>

      <section id="history" className="section">
        <div className="section-heading">
          <p className="eyebrow">Saved Locally</p>
          <h2>Your recent SkillPilot outputs.</h2>
        </div>

        <div className="history-grid">
          {history.length === 0 ? (
            <div className="empty-box">No saved output yet. Generate your first result.</div>
          ) : (
            history.map((item) => (
              <article key={item.id} className="history-card">
                <h3>{item.title}</h3>
                <small>{item.date}</small>
                <p>{item.output.slice(0, 180)}...</p>
              </article>
            ))
          )}
        </div>
      </section>

      <footer className="footer">
        <p>Built by Tunav Dewangan · SkillPilot AI MVP</p>
      </footer>
    </main>
  );
}