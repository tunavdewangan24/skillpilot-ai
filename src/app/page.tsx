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
    short: string;
    description: string;
    skills: string[];
    projects: string[];
    questions: string[];
  }
> = {
  frontend: {
    label: "Frontend Developer",
    short: "React + UI + UX",
    description:
      "Build modern, responsive, animated and production-ready user interfaces.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind", "UI/UX"],
    projects: [
      "Premium Portfolio Website",
      "AI Landing Page Builder",
      "Analytics Dashboard UI",
    ],
    questions: [
      "What is the difference between props and state?",
      "What is hydration in Next.js?",
      "How do you improve frontend performance?",
      "What is responsive design?",
    ],
  },
  fullstack: {
    label: "Full Stack Developer",
    short: "Frontend + Backend + DB",
    description:
      "Build complete apps with frontend, backend, authentication, database and deployment.",
    skills: ["React", "Next.js", "Node.js", "Express", "MongoDB", "JWT", "REST API"],
    projects: [
      "Task Manager SaaS",
      "E-commerce Web Application",
      "AI Career Dashboard",
    ],
    questions: [
      "What is REST API?",
      "How does JWT authentication work?",
      "What is middleware in Express?",
      "How do frontend and backend communicate?",
    ],
  },
  backend: {
    label: "Backend Developer",
    short: "APIs + DB + Security",
    description:
      "Create APIs, authentication systems, database logic and secure server architecture.",
    skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Redis", "Docker", "Security"],
    projects: [
      "Authentication API System",
      "Job Tracker Backend",
      "Order Management API",
    ],
    questions: [
      "What is middleware?",
      "What is database indexing?",
      "How do you secure an API?",
      "What is rate limiting?",
    ],
  },
  ai: {
    label: "AI Builder",
    short: "AI Tools + Automation",
    description:
      "Build AI-powered tools, automation systems, assistants and intelligent workflows.",
    skills: ["Python", "AI APIs", "Prompting", "Automation", "NLP", "Computer Vision", "Agents"],
    projects: [
      "AI Resume Reviewer",
      "AI Interview Coach",
      "Desktop AI Assistant",
    ],
    questions: [
      "What is prompt engineering?",
      "How does an AI API work?",
      "What is RAG?",
      "How can AI improve developer productivity?",
    ],
  },
};

const modes: { key: ModeKey; title: string; desc: string }[] = [
  { key: "roadmap", title: "Roadmap", desc: "30-day learning plan" },
  { key: "resume", title: "Resume Audit", desc: "Find missing skills" },
  { key: "projects", title: "Project Ideas", desc: "GitHub-ready builds" },
  { key: "interview", title: "Interview Prep", desc: "Practice questions" },
];

function makeRoadmap(track: TrackKey, level: string, goal: string) {
  const data = tracks[track];

  return [
    `MISSION: ${goal || "Become internship-ready"}`,
    `TRACK: ${data.label}`,
    `LEVEL: ${level}`,
    "",
    "30-DAY EXECUTION PLAN",
    "",
    "WEEK 1 — FOUNDATION",
    `• Learn/revise ${data.skills.slice(0, 3).join(", ")}`,
    "• Build small practice components or API tasks",
    "• Push daily GitHub commits",
    "",
    "WEEK 2 — PRACTICAL SKILLS",
    `• Practice ${data.skills.slice(3, 5).join(" + ")}`,
    "• Build one mini project",
    "• Add README, screenshots and clean commit messages",
    "",
    "WEEK 3 — MAIN PROJECT",
    `• Build: ${data.projects[0]}`,
    "• Add premium UI, real data flow and error handling",
    "• Make it resume-worthy",
    "",
    "WEEK 4 — DEPLOYMENT + INTERVIEW",
    "• Deploy project",
    "• Add live link to GitHub README",
    "• Prepare project explanation",
    "• Apply for internships",
    "",
    "CORE SKILLS TO SHOW",
    ...data.skills.map((skill) => `• ${skill}`),
  ].join("\n");
}

function auditResume(resume: string, track: TrackKey) {
  const data = tracks[track];
  const text = resume.toLowerCase();

  const matched = data.skills.filter((skill) =>
    text.includes(skill.toLowerCase())
  );

  const missing = data.skills.filter(
    (skill) => !text.includes(skill.toLowerCase())
  );

  const score = resume.trim() ? Math.min(96, 38 + matched.length * 8) : 0;

  return [
    `RESUME SCORE: ${score}/100`,
    "",
    "MATCHED SKILLS",
    matched.length
      ? matched.map((skill) => `• ${skill}`).join("\n")
      : "• No strong matching skills found yet",
    "",
    "MISSING SKILLS",
    missing.length
      ? missing.slice(0, 6).map((skill) => `• ${skill}`).join("\n")
      : "• Good coverage for this track",
    "",
    "IMPROVEMENT PLAN",
    "• Add 2-3 strong projects",
    "• Add GitHub and live project links",
    "• Mention your exact role in every project",
    "• Use action words: built, developed, deployed, improved",
    "• Add measurable impact wherever possible",
  ].join("\n");
}

function generateModeResult(
  mode: ModeKey,
  track: TrackKey,
  level: string,
  goal: string,
  resume: string
) {
  const data = tracks[track];

  if (mode === "roadmap") {
    return makeRoadmap(track, level, goal);
  }

  if (mode === "resume") {
    return auditResume(resume, track);
  }

  if (mode === "projects") {
    return [
      "PROJECTS YOU SHOULD BUILD",
      "",
      ...data.projects.map(
        (project, index) =>
          `${index + 1}. ${project}\n   Why: This proves your ${data.label} skills and looks strong on GitHub.`
      ),
      "",
      "MAKE IT PREMIUM",
      "• Add dashboard UI",
      "• Add dark/light mode",
      "• Add local storage or database",
      "• Add authentication if possible",
      "• Add README, screenshots and live link",
      "• Add clean GitHub commits",
    ].join("\n");
  }

  return [
    `${data.label.toUpperCase()} INTERVIEW PREP`,
    "",
    ...data.questions.map((question, index) => `${index + 1}. ${question}`),
    "",
    "ANSWER FORMAT",
    "Definition → Example → Project connection",
    "",
    "Example:",
    "I used this concept in my project when I built the dashboard/API/user flow.",
  ].join("\n");
}

function answerAnyQuestion(question: string, track: TrackKey) {
  const data = tracks[track];
  const q = question.toLowerCase();

  if (!question.trim()) {
    return "Ask anything about skills, resume, projects, interview, GitHub, deployment, roadmap or career growth.";
  }

  if (q.includes("resume") || q.includes("cv")) {
    return [
      "RESUME IMPROVEMENT GUIDE",
      "",
      "1. Add a strong 2-line summary.",
      "2. Add your best 3 projects with GitHub/live links.",
      "3. Mention technologies clearly.",
      "4. Use action words like built, developed, deployed and improved.",
      "5. Add measurable impact if possible.",
      "",
      `For your ${data.label} track, add these skills:`,
      ...data.skills.map((skill) => `• ${skill}`),
    ].join("\n");
  }

  if (q.includes("project") || q.includes("idea")) {
    return [
      "PROJECT IDEAS FOR YOU",
      "",
      ...data.projects.map((project, index) => `${index + 1}. ${project}`),
      "",
      "Make these projects stronger by adding:",
      "• Premium UI",
      "• Authentication",
      "• Database or local storage",
      "• README",
      "• Screenshots",
      "• Live deployment link",
    ].join("\n");
  }

  if (q.includes("interview") || q.includes("question")) {
    return [
      "INTERVIEW PREPARATION",
      "",
      ...data.questions.map((item, index) => `${index + 1}. ${item}`),
      "",
      "Best answer format:",
      "Definition → Example → Your project connection",
    ].join("\n");
  }

  if (q.includes("github") || q.includes("commit")) {
    return [
      "GITHUB IMPROVEMENT PLAN",
      "",
      "1. Add a professional README.md.",
      "2. Add screenshots of your project.",
      "3. Add live demo link.",
      "4. Add meaningful commits daily.",
      "5. Keep clean commit messages.",
      "",
      "Good commit examples:",
      "• feat: add SkillPilot question search bar",
      "• docs: improve project README",
      "• style: enhance SkillPilot dashboard UI",
      "• fix: improve responsive layout",
    ].join("\n");
  }

  if (
    q.includes("deploy") ||
    q.includes("vercel") ||
    q.includes("hosting") ||
    q.includes("live")
  ) {
    return [
      "DEPLOYMENT GUIDE",
      "",
      "Best option for Next.js: Vercel",
      "",
      "Steps:",
      "1. Push your project to GitHub.",
      "2. Open Vercel.",
      "3. Import your GitHub repository.",
      "4. Add environment variables if needed.",
      "5. Click Deploy.",
      "",
      "After deployment, add the live link in your README.",
    ].join("\n");
  }

  if (
    q.includes("roadmap") ||
    q.includes("learn") ||
    q.includes("skill") ||
    q.includes("career")
  ) {
    return makeRoadmap(track, "Beginner", question);
  }

  return [
    "SKILLPILOT ANSWER",
    "",
    `You asked: ${question}`,
    "",
    `Selected track: ${data.label}`,
    "",
    "Recommended action:",
    "1. Learn the core skills.",
    "2. Build one strong project.",
    "3. Push it to GitHub.",
    "4. Add README and screenshots.",
    "5. Improve your resume.",
    "6. Prepare interview answers from your own project.",
    "",
    "Relevant skills:",
    ...data.skills.map((skill) => `• ${skill}`),
  ].join("\n");
}

export default function Home() {
  const [track, setTrack] = useState<TrackKey>("fullstack");
  const [mode, setMode] = useState<ModeKey>("roadmap");
  const [level, setLevel] = useState("Beginner");
  const [goal, setGoal] = useState("Become internship-ready in web development");
  const [resume, setResume] = useState("");
  const [question, setQuestion] = useState("");
  const [output, setOutput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const selected = useMemo(() => tracks[track], [track]);

  useEffect(() => {
    const saved = localStorage.getItem("skillpilot-history-final");
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

    const updated = [item, ...history].slice(0, 5);
    setHistory(updated);
    localStorage.setItem("skillpilot-history-final", JSON.stringify(updated));
  }

  function runSkillPilot() {
    const result = generateModeResult(mode, track, level, goal, resume);
    setOutput(result);
    saveHistory(modes.find((item) => item.key === mode)?.title || "SkillPilot", result);
  }

  function askSkillPilot() {
    const result = answerAnyQuestion(question, track);
    setOutput(result);
    saveHistory("Ask SkillPilot", result);
  }

  return (
    <main className="skillpilot-app">
      <div className="grid-bg" />
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="orb orb-c" />

      <nav className="nav">
        <div className="brand">
          <div className="logo">S</div>
          <div>
            <strong>SkillPilot AI</strong>
            <span>Career Operating System</span>
          </div>
        </div>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#pilot">AI Tools</a>
          <a href="#history">History</a>
        </div>

        <a href="#pilot" className="nav-btn">Launch</a>
      </nav>

      <section className="hero">
        <div className="hero-left">
          <div className="pill">
            <span />
            AI Career Co-Pilot
          </div>

          <h1>
            Build skills, projects, resumes and interviews with one AI dashboard.
          </h1>

          <p>
            SkillPilot AI helps students become internship-ready with personalized
            roadmaps, resume checks, project ideas, interview prep and a smart question
            search bar.
          </p>

          <div className="ask-bar">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") askSkillPilot();
              }}
              placeholder="Ask anything: resume, projects, GitHub, interview, deployment..."
            />
            <button onClick={askSkillPilot}>Ask AI</button>
          </div>

          <div className="hero-actions">
            <a href="#pilot" className="primary">Start SkillPilot</a>
            <a href="#features" className="secondary">Explore Features</a>
          </div>

          <div className="stats">
            <div>
              <strong>4</strong>
              <span>AI Modes</span>
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
          <div className="hero-card-top">
            <span>Command Center</span>
            <small>Online</small>
          </div>

          <div className="ai-orbit">
            <div className="ring ring-1" />
            <div className="ring ring-2" />
            <div className="ai-core">AI</div>
            <div className="chip chip-1">Resume</div>
            <div className="chip chip-2">Roadmap</div>
            <div className="chip chip-3">Projects</div>
            <div className="chip chip-4">Interview</div>
          </div>

          <div className="terminal">
            <div className="dots">
              <span />
              <span />
              <span />
            </div>
            <p>&gt; scanning career goal...</p>
            <p>&gt; generating roadmap...</p>
            <p>&gt; improving GitHub profile...</p>
            <p>&gt; preparing interview strategy...</p>
          </div>
        </div>
      </section>

      <section id="features" className="section">
        <div className="section-title">
          <span>Premium Toolkit</span>
          <h2>Everything a student needs to become job-ready.</h2>
        </div>

        <div className="bento">
          <article className="bento-card big">
            <small>01</small>
            <h3>AI Roadmap Generator</h3>
            <p>
              Get a practical 30-day plan based on your track, current level and career goal.
            </p>
          </article>

          <article className="bento-card">
            <small>02</small>
            <h3>Resume Audit</h3>
            <p>
              Paste resume text and find missing skills, weak points and improvements.
            </p>
          </article>

          <article className="bento-card">
            <small>03</small>
            <h3>Project Engine</h3>
            <p>
              Generate project ideas that are useful for GitHub, resume and interviews.
            </p>
          </article>

          <article className="bento-card wide">
            <small>04</small>
            <h3>Interview Mode</h3>
            <p>
              Practice role-based questions and learn how to connect answers with your projects.
            </p>
          </article>
        </div>
      </section>

      <section id="pilot" className="section">
        <div className="section-title">
          <span>AI Workspace</span>
          <h2>Choose your track and generate your next move.</h2>
        </div>

        <div className="workspace">
          <div className="control">
            <div className="panel-head">
              <h3>Control Panel</h3>
              <p>Select track, mode and goal.</p>
            </div>

            <label>Career Track</label>
            <div className="track-grid">
              {(Object.keys(tracks) as TrackKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setTrack(key)}
                  className={track === key ? "track active" : "track"}
                >
                  <strong>{tracks[key].label}</strong>
                  <span>{tracks[key].short}</span>
                </button>
              ))}
            </div>

            <label>Current Level</label>
            <select value={level} onChange={(e) => setLevel(e.target.value)}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>

            <label>Your Goal</label>
            <input value={goal} onChange={(e) => setGoal(e.target.value)} />

            <label>AI Mode</label>
            <div className="mode-grid">
              {modes.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setMode(item.key)}
                  className={mode === item.key ? "mode active" : "mode"}
                >
                  <strong>{item.title}</strong>
                  <span>{item.desc}</span>
                </button>
              ))}
            </div>

            {mode === "resume" && (
              <>
                <label>Paste Resume Text</label>
                <textarea
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  placeholder="Paste your resume text here..."
                />
              </>
            )}

            <button className="generate" onClick={runSkillPilot}>
              Generate SkillPilot Result
            </button>
          </div>

          <div className="result">
            <div className="result-head">
              <div>
                <span>Output</span>
                <h3>{selected.label}</h3>
              </div>
              <small>{mode.toUpperCase()}</small>
            </div>

            <pre>
              {output ||
                "Ask a question from the top search bar or generate a result from the control panel. Your SkillPilot AI output will appear here."}
            </pre>
          </div>
        </div>
      </section>

      <section id="history" className="section">
        <div className="section-title">
          <span>Local History</span>
          <h2>Your recent outputs.</h2>
        </div>

        <div className="history">
          {history.length === 0 ? (
            <div className="empty">No output yet. Ask a question or generate a result.</div>
          ) : (
            history.map((item) => (
              <article key={item.id} className="history-card">
                <small>{item.date}</small>
                <h3>{item.title}</h3>
                <p>{item.output.slice(0, 180)}...</p>
              </article>
            ))
          )}
        </div>
      </section>

      <footer>
        Built by Tunav Dewangan · SkillPilot AI MVP
      </footer>

      <style>{`
        :root {
          --bg: #030712;
          --panel: rgba(15, 23, 42, 0.72);
          --line: rgba(255, 255, 255, 0.13);
          --text: #f8fafc;
          --muted: #94a3b8;
          --cyan: #22d3ee;
          --blue: #3b82f6;
          --violet: #8b5cf6;
          --pink: #ec4899;
          --green: #22c55e;
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: var(--bg);
          color: var(--text);
          font-family: Arial, Helvetica, sans-serif;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button,
        input,
        select,
        textarea {
          font: inherit;
        }

        button {
          border: 0;
        }

        .skillpilot-app {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          background:
            radial-gradient(circle at 16% 12%, rgba(59, 130, 246, 0.32), transparent 30rem),
            radial-gradient(circle at 84% 10%, rgba(236, 72, 153, 0.23), transparent 28rem),
            radial-gradient(circle at 50% 100%, rgba(34, 211, 238, 0.2), transparent 30rem),
            linear-gradient(180deg, #030712 0%, #07101f 45%, #030712 100%);
        }

        .grid-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: 0.08;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.09) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.09) 1px, transparent 1px);
          background-size: 42px 42px;
          mask-image: linear-gradient(to bottom, black, transparent 85%);
        }

        .orb {
          position: absolute;
          border-radius: 999px;
          filter: blur(20px);
          opacity: 0.5;
          animation: drift 9s ease-in-out infinite alternate;
        }

        .orb-a {
          width: 260px;
          height: 260px;
          left: -90px;
          top: 170px;
          background: rgba(59, 130, 246, 0.45);
        }

        .orb-b {
          width: 340px;
          height: 340px;
          right: -130px;
          top: 440px;
          background: rgba(139, 92, 246, 0.38);
          animation-delay: 1s;
        }

        .orb-c {
          width: 230px;
          height: 230px;
          left: 42%;
          bottom: 10%;
          background: rgba(34, 211, 238, 0.3);
          animation-delay: 2s;
        }

        @keyframes drift {
          from {
            transform: translate3d(0, 0, 0) scale(1);
          }
          to {
            transform: translate3d(32px, -34px, 0) scale(1.08);
          }
        }

        .nav {
          position: relative;
          z-index: 10;
          width: min(1180px, calc(100% - 36px));
          margin: 22px auto 0;
          padding: 14px 16px;
          border: 1px solid var(--line);
          border-radius: 28px;
          background: rgba(2, 6, 23, 0.64);
          backdrop-filter: blur(22px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 24px 100px rgba(0, 0, 0, 0.24);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo {
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          border-radius: 16px;
          background: linear-gradient(135deg, var(--cyan), var(--violet), var(--pink));
          font-weight: 900;
          box-shadow: 0 0 40px rgba(34, 211, 238, 0.45);
        }

        .brand strong {
          display: block;
          letter-spacing: -0.04em;
        }

        .brand span {
          display: block;
          color: var(--muted);
          font-size: 12px;
          margin-top: 2px;
        }

        .nav-links {
          display: flex;
          gap: 22px;
          color: #cbd5e1;
          font-size: 14px;
        }

        .nav-links a:hover {
          color: white;
        }

        .nav-btn {
          padding: 11px 17px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid var(--line);
          font-weight: 900;
        }

        .hero {
          position: relative;
          z-index: 2;
          width: min(1180px, calc(100% - 36px));
          margin: 82px auto 0;
          min-height: 640px;
          display: grid;
          grid-template-columns: 1.04fr 0.96fr;
          gap: 32px;
          align-items: center;
        }

        .pill {
          width: fit-content;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 14px;
          border-radius: 999px;
          color: #dffbff;
          background: rgba(34, 211, 238, 0.12);
          border: 1px solid rgba(34, 211, 238, 0.25);
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.04em;
        }

        .pill span {
          width: 9px;
          height: 9px;
          border-radius: 999px;
          background: var(--green);
          box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.8);
          animation: pulse 1.7s infinite;
        }

        @keyframes pulse {
          70% {
            box-shadow: 0 0 0 12px rgba(34, 197, 94, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
          }
        }

        .hero-left h1 {
          margin: 18px 0;
          font-size: clamp(48px, 7vw, 88px);
          line-height: 0.92;
          letter-spacing: -0.085em;
          max-width: 830px;
        }

        .hero-left p {
          max-width: 700px;
          color: #cbd5e1;
          font-size: 18px;
          line-height: 1.75;
        }

        .ask-bar {
          margin-top: 28px;
          width: min(720px, 100%);
          display: flex;
          gap: 10px;
          padding: 10px;
          border-radius: 999px;
          background: rgba(2, 6, 23, 0.76);
          border: 1px solid rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          box-shadow: 0 20px 70px rgba(0, 0, 0, 0.28);
        }

        .ask-bar input {
          flex: 1;
          border: 0;
          outline: none;
          color: white;
          background: transparent;
          padding: 0 16px;
          min-width: 0;
        }

        .ask-bar input::placeholder {
          color: #94a3b8;
        }

        .ask-bar button {
          cursor: pointer;
          padding: 13px 22px;
          border-radius: 999px;
          color: white;
          font-weight: 1000;
          background: linear-gradient(135deg, var(--cyan), var(--blue), var(--violet));
          box-shadow: 0 12px 35px rgba(59, 130, 246, 0.34);
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 28px;
        }

        .primary,
        .secondary {
          padding: 15px 22px;
          border-radius: 999px;
          font-weight: 1000;
        }

        .primary {
          background: linear-gradient(135deg, var(--cyan), var(--blue), var(--violet));
          box-shadow: 0 18px 65px rgba(59, 130, 246, 0.42);
        }

        .secondary {
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid var(--line);
          color: #e2e8f0;
        }

        .stats {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 36px;
        }

        .stats div {
          min-width: 128px;
          padding: 17px;
          border-radius: 24px;
          background: rgba(15, 23, 42, 0.56);
          border: 1px solid var(--line);
          backdrop-filter: blur(18px);
        }

        .stats strong {
          display: block;
          font-size: 34px;
          letter-spacing: -0.05em;
        }

        .stats span {
          color: var(--muted);
          font-size: 13px;
        }

        .hero-card {
          position: relative;
          min-height: 590px;
          padding: 22px;
          border-radius: 40px;
          background:
            linear-gradient(145deg, rgba(255, 255, 255, 0.11), rgba(255, 255, 255, 0.025)),
            rgba(15, 23, 42, 0.66);
          border: 1px solid rgba(255, 255, 255, 0.16);
          box-shadow:
            0 50px 130px rgba(0, 0, 0, 0.45),
            inset 0 1px 0 rgba(255, 255, 255, 0.14);
          backdrop-filter: blur(24px);
          overflow: hidden;
        }

        .hero-card::before {
          content: "";
          position: absolute;
          inset: -2px;
          background:
            radial-gradient(circle at top right, rgba(34, 211, 238, 0.28), transparent 30%),
            radial-gradient(circle at bottom left, rgba(236, 72, 153, 0.22), transparent 30%);
          pointer-events: none;
        }

        .hero-card-top {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: space-between;
          font-weight: 1000;
        }

        .hero-card-top small {
          color: #86efac;
          padding: 5px 10px;
          border-radius: 999px;
          background: rgba(34, 197, 94, 0.12);
          border: 1px solid rgba(34, 197, 94, 0.25);
        }

        .ai-orbit {
          position: relative;
          z-index: 2;
          height: 360px;
          margin-top: 34px;
          display: grid;
          place-items: center;
        }

        .ring {
          position: absolute;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.14);
        }

        .ring-1 {
          width: 280px;
          height: 280px;
          animation: spin 14s linear infinite;
          box-shadow: 0 0 80px rgba(34, 211, 238, 0.16);
        }

        .ring-2 {
          width: 210px;
          height: 210px;
          animation: spin 10s linear infinite reverse;
          border-style: dashed;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .ai-core {
          width: 150px;
          height: 150px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background:
            radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.85), transparent 12%),
            linear-gradient(135deg, rgba(34, 211, 238, 0.92), rgba(139, 92, 246, 0.88), rgba(236, 72, 153, 0.82));
          box-shadow:
            0 0 80px rgba(34, 211, 238, 0.35),
            0 0 120px rgba(139, 92, 246, 0.26);
          font-size: 44px;
          font-weight: 1000;
          letter-spacing: -0.08em;
        }

        .chip {
          position: absolute;
          padding: 12px 15px;
          border-radius: 999px;
          background: rgba(2, 6, 23, 0.72);
          border: 1px solid rgba(255, 255, 255, 0.14);
          font-weight: 900;
          backdrop-filter: blur(16px);
          box-shadow: 0 18px 50px rgba(0, 0, 0, 0.25);
          animation: floaty 3s ease-in-out infinite alternate;
        }

        .chip-1 {
          top: 36px;
          left: 70px;
        }

        .chip-2 {
          top: 96px;
          right: 44px;
          animation-delay: 0.4s;
        }

        .chip-3 {
          bottom: 54px;
          left: 48px;
          animation-delay: 0.8s;
        }

        .chip-4 {
          bottom: 82px;
          right: 72px;
          animation-delay: 1.2s;
        }

        @keyframes floaty {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-12px);
          }
        }

        .terminal {
          position: relative;
          z-index: 2;
          padding: 18px;
          border-radius: 26px;
          background: rgba(2, 6, 23, 0.74);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .dots {
          display: flex;
          gap: 7px;
          margin-bottom: 14px;
        }

        .dots span {
          width: 10px;
          height: 10px;
          border-radius: 99px;
          background: #64748b;
        }

        .dots span:nth-child(1) {
          background: #ef4444;
        }

        .dots span:nth-child(2) {
          background: #f59e0b;
        }

        .dots span:nth-child(3) {
          background: #22c55e;
        }

        .terminal p {
          margin: 7px 0;
          color: #bfdbfe;
          font-family: "Courier New", monospace;
          font-size: 14px;
        }

        .section {
          position: relative;
          z-index: 2;
          width: min(1180px, calc(100% - 36px));
          margin: 0 auto;
          padding: 78px 0;
        }

        .section-title {
          max-width: 780px;
          margin-bottom: 30px;
        }

        .section-title span {
          color: var(--cyan);
          font-size: 12px;
          font-weight: 1000;
          text-transform: uppercase;
          letter-spacing: 0.18em;
        }

        .section-title h2 {
          margin: 12px 0 0;
          font-size: clamp(34px, 5vw, 58px);
          line-height: 0.98;
          letter-spacing: -0.07em;
        }

        .bento {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr 0.8fr;
          gap: 16px;
        }

        .bento-card {
          min-height: 220px;
          padding: 24px;
          border-radius: 34px;
          background:
            linear-gradient(145deg, rgba(255, 255, 255, 0.105), rgba(255, 255, 255, 0.035)),
            rgba(15, 23, 42, 0.68);
          border: 1px solid var(--line);
          backdrop-filter: blur(20px);
          box-shadow: 0 24px 100px rgba(0, 0, 0, 0.24);
          position: relative;
          overflow: hidden;
        }

        .bento-card::after {
          content: "";
          position: absolute;
          width: 160px;
          height: 160px;
          right: -60px;
          bottom: -60px;
          background: rgba(34, 211, 238, 0.14);
          border-radius: 50%;
          filter: blur(4px);
        }

        .bento-card.big {
          grid-row: span 2;
          min-height: 456px;
          background:
            radial-gradient(circle at top right, rgba(139, 92, 246, 0.22), transparent 24rem),
            linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.035)),
            rgba(15, 23, 42, 0.68);
        }

        .bento-card.wide {
          grid-column: span 2;
        }

        .bento-card small {
          display: inline-grid;
          place-items: center;
          width: 44px;
          height: 44px;
          border-radius: 16px;
          background: rgba(34, 211, 238, 0.14);
          border: 1px solid rgba(34, 211, 238, 0.25);
          color: #a5f3fc;
          font-weight: 1000;
        }

        .bento-card h3 {
          margin: 24px 0 10px;
          font-size: 28px;
          letter-spacing: -0.045em;
        }

        .bento-card p {
          color: #cbd5e1;
          line-height: 1.65;
          max-width: 520px;
        }

        .workspace {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 18px;
        }

        .control,
        .result,
        .history-card,
        .empty {
          background:
            linear-gradient(145deg, rgba(255, 255, 255, 0.095), rgba(255, 255, 255, 0.025)),
            rgba(15, 23, 42, 0.68);
          border: 1px solid var(--line);
          border-radius: 34px;
          backdrop-filter: blur(20px);
          box-shadow: 0 24px 90px rgba(0, 0, 0, 0.26);
        }

        .control,
        .result {
          padding: 22px;
        }

        .panel-head h3 {
          margin: 0;
          font-size: 28px;
          letter-spacing: -0.04em;
        }

        .panel-head p {
          margin: 6px 0 20px;
          color: var(--muted);
        }

        .control label {
          display: block;
          margin: 17px 0 9px;
          color: #e2e8f0;
          font-size: 13px;
          font-weight: 1000;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .track-grid,
        .mode-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .track,
        .mode {
          cursor: pointer;
          color: white;
          text-align: left;
          border: 1px solid var(--line);
          background: rgba(2, 6, 23, 0.42);
          transition: 0.25s ease;
        }

        .track {
          padding: 14px;
          border-radius: 22px;
        }

        .mode {
          padding: 13px;
          border-radius: 20px;
        }

        .track strong,
        .track span,
        .mode strong,
        .mode span {
          display: block;
        }

        .track span,
        .mode span {
          color: var(--muted);
          font-size: 12px;
          margin-top: 5px;
        }

        .track:hover,
        .mode:hover {
          transform: translateY(-2px);
          border-color: rgba(34, 211, 238, 0.45);
        }

        .track.active,
        .mode.active {
          border-color: rgba(34, 211, 238, 0.9);
          background:
            radial-gradient(circle at top right, rgba(34, 211, 238, 0.22), transparent 10rem),
            rgba(14, 165, 233, 0.12);
          box-shadow: 0 0 40px rgba(34, 211, 238, 0.12);
        }

        .control input,
        .control select,
        .control textarea {
          width: 100%;
          color: white;
          background: rgba(2, 6, 23, 0.68);
          border: 1px solid var(--line);
          border-radius: 18px;
          padding: 14px 15px;
          outline: none;
        }

        .control textarea {
          min-height: 130px;
          resize: vertical;
        }

        .control input:focus,
        .control select:focus,
        .control textarea:focus {
          border-color: rgba(34, 211, 238, 0.72);
          box-shadow: 0 0 0 4px rgba(34, 211, 238, 0.08);
        }

        .generate {
          width: 100%;
          margin-top: 22px;
          padding: 16px 20px;
          border-radius: 999px;
          color: white;
          cursor: pointer;
          font-weight: 1000;
          background: linear-gradient(135deg, var(--cyan), var(--blue), var(--violet));
          box-shadow: 0 18px 60px rgba(59, 130, 246, 0.36);
        }

        .result-head {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          align-items: start;
          margin-bottom: 16px;
        }

        .result-head span {
          color: var(--cyan);
          font-size: 12px;
          font-weight: 1000;
          text-transform: uppercase;
          letter-spacing: 0.16em;
        }

        .result-head h3 {
          margin: 5px 0 0;
          font-size: 30px;
          letter-spacing: -0.05em;
        }

        .result-head small {
          padding: 8px 11px;
          border-radius: 999px;
          background: rgba(139, 92, 246, 0.15);
          border: 1px solid rgba(139, 92, 246, 0.28);
          color: #ddd6fe;
          font-weight: 900;
        }

        .result pre {
          min-height: 620px;
          margin: 0;
          padding: 22px;
          border-radius: 26px;
          color: #dbeafe;
          white-space: pre-wrap;
          line-height: 1.75;
          background:
            linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            rgba(2, 6, 23, 0.74);
          background-size: 100% 34px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          font-family: "Courier New", monospace;
          overflow: auto;
        }

        .history {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
        }

        .history-card,
        .empty {
          padding: 20px;
        }

        .history-card small {
          color: var(--cyan);
        }

        .history-card h3 {
          margin: 10px 0;
          letter-spacing: -0.035em;
        }

        .history-card p,
        .empty {
          color: #cbd5e1;
          line-height: 1.6;
        }

        .empty {
          grid-column: 1 / -1;
        }

        footer {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 38px 18px;
          color: var(--muted);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        @media (max-width: 980px) {
          .hero,
          .workspace {
            grid-template-columns: 1fr;
          }

          .hero-card {
            min-height: 520px;
          }

          .bento {
            grid-template-columns: 1fr 1fr;
          }

          .bento-card.big,
          .bento-card.wide {
            grid-column: span 1;
            grid-row: span 1;
            min-height: 240px;
          }

          .history {
            grid-template-columns: 1fr 1fr;
          }

          .nav-links {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .nav {
            width: min(100% - 24px, 1180px);
          }

          .nav-btn {
            display: none;
          }

          .hero,
          .section {
            width: min(100% - 24px, 1180px);
          }

          .hero {
            margin-top: 50px;
          }

          .hero-left h1 {
            font-size: 46px;
          }

          .hero-left p {
            font-size: 16px;
          }

          .ask-bar {
            border-radius: 24px;
            flex-direction: column;
          }

          .ask-bar input {
            padding: 12px 14px;
          }

          .ask-bar button {
            width: 100%;
          }

          .stats,
          .hero-actions {
            flex-direction: column;
          }

          .bento,
          .track-grid,
          .mode-grid,
          .history {
            grid-template-columns: 1fr;
          }

          .hero-card {
            min-height: 480px;
            padding: 16px;
          }

          .ai-orbit {
            height: 310px;
          }

          .ring-1 {
            width: 230px;
            height: 230px;
          }

          .ring-2 {
            width: 175px;
            height: 175px;
          }

          .ai-core {
            width: 125px;
            height: 125px;
          }

          .chip {
            font-size: 12px;
            padding: 9px 11px;
          }

          .chip-1 {
            left: 20px;
          }

          .chip-2 {
            right: 12px;
          }

          .chip-3 {
            left: 18px;
          }

          .chip-4 {
            right: 18px;
          }
        }
      `}</style>
    </main>
  );
}