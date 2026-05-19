import {
  Brain,
  Briefcase,
  Code2,
  FileText,
  GraduationCap,
  LineChart,
  Rocket,
  Sparkles,
  Target,
  MessageSquare,
  CheckCircle2,
  Zap,
  Shield,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Career Mentor",
    desc: "Ask career, coding, internship, resume, and project questions with personalized AI answers.",
  },
  {
    icon: Rocket,
    title: "Project Idea Generator",
    desc: "Generate advanced full-stack project ideas with problem statements, features, APIs, and database models.",
  },
  {
    icon: FileText,
    title: "Resume Improver",
    desc: "Convert weak project descriptions into professional recruiter-ready resume points.",
  },
  {
    icon: Briefcase,
    title: "Internship Tracker",
    desc: "Track applications, rejection reasons, interview status, follow-ups, and AI improvement tips.",
  },
  {
    icon: Code2,
    title: "GitHub Analyzer",
    desc: "Analyze repositories, README quality, live demo status, project polish, and coding profile strength.",
  },
  {
    icon: GraduationCap,
    title: "Learning Roadmaps",
    desc: "Create personalized 7-day, 30-day, and 60-day learning plans for any technology skill.",
  },
];

const stats = [
  { label: "Career Score", value: "82%" },
  { label: "Projects Planned", value: "12" },
  { label: "Applications Tracked", value: "38" },
  { label: "Interview Readiness", value: "74%" },
];

const roadmap = [
  "Improve GitHub README with screenshots",
  "Add live demo links to projects",
  "Prepare React + Node.js interview answers",
  "Apply to 10 targeted internships",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
      <section className="relative px-6 py-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-20 top-10 h-72 w-72 rounded-full bg-blue-600/30 blur-3xl" />
          <div className="absolute right-20 top-24 h-72 w-72 rounded-full bg-purple-600/30 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        </div>

        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                SkillPilot AI
              </h1>
              <p className="text-xs text-slate-400">
                Career Operating System
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#features" className="hover:text-white">
              Features
            </a>
            <a href="#dashboard" className="hover:text-white">
              Dashboard
            </a>
            <a href="#mentor" className="hover:text-white">
              AI Mentor
            </a>
          </div>

          <button className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-slate-200">
            Start Building
          </button>
        </nav>

        <div className="mx-auto grid max-w-7xl items-center gap-12 py-20 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-200">
              <Sparkles className="h-4 w-4" />
              AI-powered career workspace for students and developers
            </div>

            <h2 className="max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
              Build skills. Track internships. Get{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                AI career guidance.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              SkillPilot AI helps students generate project ideas, improve
              resumes, prepare for interviews, track internship applications,
              analyze GitHub, and create personalized learning roadmaps using AI.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button className="group flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 px-7 py-4 font-bold shadow-2xl shadow-blue-500/25 transition hover:scale-105">
                Launch AI Mentor
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </button>
              <button className="rounded-2xl border border-white/15 bg-white/10 px-7 py-4 font-bold backdrop-blur-xl transition hover:bg-white/15">
                View Dashboard
              </button>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
                >
                  <p className="text-2xl font-black">{item.value}</p>
                  <p className="mt-1 text-xs text-slate-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="dashboard" className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-2xl" />

            <div className="relative rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-2xl">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">
                    Today&apos;s AI Recommendation
                  </p>
                  <h3 className="text-2xl font-bold">
                    Improve GitHub README
                  </h3>
                </div>
                <div className="rounded-2xl bg-green-400/10 p-3 text-green-300">
                  <Target className="h-6 w-6" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="mb-4 flex items-center gap-3">
                    <LineChart className="text-cyan-300" />
                    <h4 className="font-bold">Career Score</h4>
                  </div>
                  <div className="text-5xl font-black">82%</div>
                  <p className="mt-2 text-sm text-slate-400">
                    Strong profile. Improve README screenshots and live demo
                    links.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="mb-4 flex items-center gap-3">
                    <Code2 className="text-purple-300" />
                    <h4 className="font-bold">Next Project</h4>
                  </div>
                  <p className="text-lg font-semibold">AI Interview Coach</p>
                  <p className="mt-2 text-sm text-slate-400">
                    Build mock interviews with AI feedback and scoring.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5 md:col-span-2">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="font-bold">Internship Pipeline</h4>
                    <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs text-blue-200">
                      38 Applications
                    </span>
                  </div>

                  <div className="space-y-3">
                    {[
                      "Applied",
                      "Assignment",
                      "Interview",
                      "Rejected Analysis",
                    ].map((step, index) => (
                      <div key={step} className="flex items-center gap-3">
                        <div className="h-2 flex-1 rounded-full bg-white/10">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
                            style={{ width: `${85 - index * 15}%` }}
                          />
                        </div>
                        <span className="w-32 text-sm text-slate-300">
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5 md:col-span-2">
                  <div className="mb-4 flex items-center gap-3">
                    <Zap className="text-yellow-300" />
                    <h4 className="font-bold">Next Best Actions</h4>
                  </div>

                  <div className="space-y-3">
                    {roadmap.map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-300" />
                        <p className="text-sm text-slate-300">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-300">
            Advanced Features
          </p>
          <h2 className="mt-4 text-4xl font-black md:text-5xl">
            Everything a student needs to become internship-ready
          </h2>
          <p className="mt-5 text-slate-300">
            Not a basic task manager. This is a full AI career system with real
            features recruiters can understand.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition hover:-translate-y-2 hover:bg-white/[0.07]"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-200">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="mt-3 leading-7 text-slate-400">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="mentor" className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 p-8 backdrop-blur-xl md:p-12">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <div className="mb-5 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm text-slate-200">
                AI Mentor Preview
              </div>
              <h2 className="text-4xl font-black">
                Ask questions that directly improve your career.
              </h2>
              <p className="mt-5 leading-8 text-slate-300">
                Users can ask why they are getting rejected, how to improve
                projects, what to learn next, how to write README files, and how
                to prepare for interviews.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <MessageSquare className="mb-3 h-7 w-7 text-blue-300" />
                  <h3 className="font-bold">AI Answers</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    Career, coding, resume, project, and interview answers.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <Shield className="mb-3 h-7 w-7 text-purple-300" />
                  <h3 className="font-bold">Personal Guidance</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    Practical suggestions based on student career problems.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
              <div className="mb-4 rounded-2xl bg-white/10 p-4">
                <p className="text-sm text-slate-400">User</p>
                <p className="mt-1">
                  Why am I getting rejected from web development internships?
                </p>
              </div>

              <div className="rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-4">
                <p className="text-sm text-blue-200">SkillPilot AI</p>
                <p className="mt-2 leading-7 text-slate-100">
                  Your projects show effort, but recruiters need stronger proof:
                  live demos, screenshots, polished README files, clear problem
                  statements, and measurable features. Start by improving your
                  GitHub presentation before applying again.
                </p>
              </div>

              <div className="mt-4 rounded-2xl bg-white/10 p-4">
                <p className="text-sm text-slate-400">User</p>
                <p className="mt-1">
                  Give me one advanced project idea for internship selection.
                </p>
              </div>

              <div className="mt-4 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-4">
                <p className="text-sm text-cyan-200">SkillPilot AI</p>
                <p className="mt-2 leading-7 text-slate-100">
                  Build an AI Interview Coach with mock interviews, scoring,
                  feedback, resume-based questions, progress tracking, and a
                  recruiter-ready dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-6 py-10 text-center text-sm text-slate-500">
        Built as a professional AI career platform for students and developers.
      </footer>
    </main>
  );
}