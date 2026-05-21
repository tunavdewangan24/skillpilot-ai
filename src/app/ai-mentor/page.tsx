"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";

type Role = "user" | "assistant";

type AttachedFile = {
  id: string;
  name: string;
  size: number;
  type: string;
  kind: "file" | "image" | "video";
  previewText?: string;
};

type ChatMessage = {
  id: string;
  role: Role;
  content: string;
  createdAt: string;
  attachments?: string[];
};

type HistoryItem = {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
};

const STORAGE_KEY = "skillpilot_chat_history_v3";

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isTextReadable(file: File) {
  const readableExtensions = [
    ".txt",
    ".md",
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".json",
    ".html",
    ".css",
    ".py",
    ".java",
    ".csv",
  ];

  return (
    file.type.startsWith("text/") ||
    readableExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))
  );
}

function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve) => {
    if (!isTextReadable(file)) {
      resolve("");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const text = String(reader.result || "");
      resolve(text.slice(0, 6000));
    };

    reader.onerror = () => resolve("");
    reader.readAsText(file);
  });
}

export default function AIMentorPage() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch {
        setHistory([]);
      }
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function saveConversation(updatedMessages: ChatMessage[]) {
    const firstUserMessage =
      updatedMessages.find((msg) => msg.role === "user")?.content || "New Chat";

    const item: HistoryItem = {
      id: Date.now().toString(),
      title:
        firstUserMessage.length > 48
          ? `${firstUserMessage.slice(0, 48)}...`
          : firstUserMessage,
      messages: updatedMessages,
      createdAt: new Date().toLocaleString(),
    };

    const updatedHistory = [item, ...history].slice(0, 15);
    setHistory(updatedHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  }

  async function handleFiles(files: FileList | null) {
    if (!files) return;

    const processedFiles = await Promise.all(
      Array.from(files).map(async (file) => {
        const previewText = await readFileAsText(file);

        const kind: AttachedFile["kind"] = file.type.startsWith("video/")
          ? "video"
          : file.type.startsWith("image/")
          ? "image"
          : "file";

        return {
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          name: file.name,
          size: file.size,
          type: file.type || "unknown",
          kind,
          previewText,
        };
      })
    );

    setAttachedFiles((prev) => [...prev, ...processedFiles]);
  }

  function removeFile(id: string) {
    setAttachedFiles((prev) => prev.filter((file) => file.id !== id));
  }

  function buildAttachmentContext() {
    if (attachedFiles.length === 0) return "";

    return `
Attached files/videos context:
${attachedFiles
  .map((file, index) => {
    return `
Attachment ${index + 1}:
Name: ${file.name}
Type: ${file.type}
Size: ${formatSize(file.size)}
Kind: ${file.kind}
Readable Content:
${file.previewText || "No readable text content. Use file name/type as context only."}
`;
  })
  .join("\n")}
`;
  }

  async function askAI() {
    if ((!question.trim() && attachedFiles.length === 0) || loading) return;

    const userText = question.trim() || "Analyze the attached files/videos.";

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: userText,
      createdAt: new Date().toLocaleString(),
      attachments: attachedFiles.map((file) => file.name),
    };

    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setQuestion("");
    setLoading(true);

    const fullQuestion = `
AUTO-DETECT TASK TYPE HIDDENLY.

Do not show task mode to the user. Internally decide what role is needed:
- If user asks for website/app/code: act as premium developer + UI/UX designer.
- If user asks for full-stack: act as full-stack architect.
- If user asks for error/logs: act as debugging expert.
- If user asks for design: act as UI/UX expert.
- If user asks for resume/GitHub/interview: act as career mentor.
- If user asks for project review: act as product strategist.
- If user writes Hinglish/broken English/spelling mistakes: understand intent and answer normally.

Conversation context:
${nextMessages
  .slice(-6)
  .map((msg) => `${msg.role.toUpperCase()}: ${msg.content}`)
  .join("\n\n")}

Current user request:
${userText}

${buildAttachmentContext()}

Important:
- Do not ask the user to choose a mode.
- Do not mention hidden mode detection.
- If user says "make website", give problem discussion + best version + editable code.
- If user says "full stack banao", give folder structure + backend API + frontend pages + DB models + commands.
- If code is too large, give Phase 1 working code first.
- Be practical, advanced, and build-focused.
`;

    try {
      const res = await fetch("/api/mentor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: fullQuestion,
        }),
      });

      const data = await res.json();

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: res.ok
          ? data.answer
          : data.error || "AI error. Check API key or backend route.",
        createdAt: new Date().toLocaleString(),
      };

      const finalMessages = [...nextMessages, assistantMessage];

      setMessages(finalMessages);
      saveConversation(finalMessages);
      setAttachedFiles([]);
    } catch {
      const errorMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content:
          "Something went wrong. Make sure your /api/mentor route exists and server is running.",
        createdAt: new Date().toLocaleString(),
      };

      const finalMessages = [...nextMessages, errorMessage];
      setMessages(finalMessages);
      saveConversation(finalMessages);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askAI();
    }
  }

  async function copyMessage(id: string, content: string) {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(""), 1400);
  }

  function newChat() {
    setMessages([]);
    setQuestion("");
    setAttachedFiles([]);
    setCopiedId("");
  }

  function clearHistory() {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  }

  function openHistory(item: HistoryItem) {
    setMessages(item.messages);
    setQuestion("");
    setAttachedFiles([]);
  }

  return (
    <main className="flex min-h-screen bg-[#050816] text-white">
      <aside className="hidden w-80 shrink-0 border-r border-white/10 bg-[#070b18] p-4 lg:flex lg:flex-col">
        <div className="mb-4">
          <a href="/" className="text-sm font-semibold text-blue-300">
            ← Back Home
          </a>

          <h1 className="mt-4 text-2xl font-black">SkillPilot AI</h1>
          <p className="mt-1 text-xs text-slate-500">
            Premium AI developer assistant
          </p>
        </div>

        <button
          onClick={newChat}
          className="mb-5 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-left font-bold transition hover:bg-white/15"
        >
          + New Chat
        </button>

        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
            Recent
          </p>

          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="text-xs font-bold text-red-300 hover:text-red-200"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex-1 space-y-2 overflow-auto pr-1">
          {history.length === 0 && (
            <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 p-4 text-sm text-slate-500">
              No recent chats yet.
            </div>
          )}

          {history.map((item) => (
            <button
              key={item.id}
              onClick={() => openHistory(item)}
              className="w-full rounded-2xl border border-white/10 bg-black/25 p-4 text-left transition hover:border-blue-400/50 hover:bg-blue-500/10"
            >
              <p className="text-sm font-bold text-white">{item.title}</p>
              <p className="mt-2 text-[10px] text-slate-500">{item.createdAt}</p>
            </button>
          ))}
        </div>
      </aside>

      <section className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-[#050816]/85 px-5 py-4 backdrop-blur-xl">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black">SkillPilot AI Mentor</h2>
              <p className="text-xs text-slate-500">
                Auto-detects website, full-stack, debugging, UI/UX, resume, GitHub, interview, and project tasks
              </p>
            </div>

            <div className="rounded-full border border-green-400/20 bg-green-500/10 px-4 py-2 text-xs font-bold text-green-200">
              ● Gemini Connected
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto px-5 py-6">
          <div className="mx-auto max-w-5xl space-y-6 pb-44">
            {messages.length === 0 && (
              <div className="flex min-h-[55vh] flex-col items-center justify-center text-center">
                <div className="mb-5 rounded-3xl border border-white/10 bg-white/5 px-6 py-5">
                  <h1 className="text-4xl font-black md:text-5xl">
                    What do you want to build?
                  </h1>
                  <p className="mt-4 max-w-2xl text-slate-400">
                    Ask naturally. SkillPilot will automatically understand whether you need code, full-stack planning, debugging, UI design, resume help, or project review.
                  </p>
                </div>

                <div className="grid max-w-3xl gap-3 text-left md:grid-cols-2">
                  {[
                    "Mujhe ek high-end portfolio website chahiye with editable code",
                    "Build a full-stack e-commerce app with admin panel",
                    "Fix my Next.js localhost error",
                    "Review my project idea and tell me how to improve it",
                  ].map((text) => (
                    <button
                      key={text}
                      onClick={() => setQuestion(text)}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300 hover:border-blue-400/50 hover:bg-blue-500/10"
                    >
                      {text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[90%] rounded-3xl border p-5 md:max-w-[78%] ${
                    msg.role === "user"
                      ? "border-blue-400/20 bg-blue-600/20"
                      : "border-white/10 bg-white/[0.06]"
                  }`}
                >
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                      {msg.role === "user" ? "You" : "SkillPilot AI"}
                    </p>

                    {msg.role === "assistant" && (
                      <button
                        onClick={() => copyMessage(msg.id, msg.content)}
                        className="rounded-lg border border-white/10 bg-black/20 px-3 py-1 text-xs font-bold text-slate-300 hover:bg-white/10"
                      >
                        {copiedId === msg.id ? "Copied" : "Copy"}
                      </button>
                    )}
                  </div>

                  {msg.attachments && msg.attachments.length > 0 && (
                    <div className="mb-3 rounded-2xl border border-white/10 bg-black/20 p-3 text-xs text-slate-400">
                      Files: {msg.attachments.join(", ")}
                    </div>
                  )}

                  <pre className="whitespace-pre-wrap font-sans text-[15px] leading-8 text-slate-100">
                    {msg.content}
                  </pre>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[78%] rounded-3xl border border-white/10 bg-white/[0.06] p-5">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                    SkillPilot AI
                  </p>
                  <div className="space-y-3">
                    <div className="h-4 w-72 animate-pulse rounded-full bg-white/10" />
                    <div className="h-4 w-96 animate-pulse rounded-full bg-white/10" />
                    <div className="h-4 w-80 animate-pulse rounded-full bg-white/10" />
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-[#050816]/90 px-4 py-4 backdrop-blur-xl lg:left-80">
          <div className="mx-auto max-w-5xl">
            {attachedFiles.length > 0 && (
              <div className="mb-3 flex gap-2 overflow-x-auto">
                {attachedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex shrink-0 items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3"
                  >
                    <div>
                      <p className="max-w-48 truncate text-sm font-bold">
                        {file.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {file.kind.toUpperCase()} • {formatSize(file.size)}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFile(file.id)}
                      className="rounded-lg bg-red-500/10 px-2 py-1 text-xs font-bold text-red-200"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="rounded-3xl border border-white/10 bg-white/10 p-3 shadow-2xl">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message SkillPilot AI... Ask for website, full-stack app, debugging, UI, resume, GitHub, interview, anything..."
                className="max-h-40 min-h-16 w-full resize-none bg-transparent px-3 py-3 text-white outline-none placeholder:text-slate-500"
              />

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*,.pdf,.txt,.md,.js,.jsx,.ts,.tsx,.json,.py,.java,.html,.css,.csv"
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                  />

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="rounded-2xl border border-white/10 bg-black/30 px-4 py-2 text-sm font-bold text-slate-300 hover:bg-white/10"
                  >
                    + Files
                  </button>

                  <span className="hidden text-xs text-slate-500 sm:inline">
                    Auto mode enabled
                  </span>
                </div>

                <button
                  onClick={askAI}
                  disabled={loading}
                  className="rounded-2xl bg-white px-5 py-2.5 text-sm font-black text-black transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "..." : "Send"}
                </button>
              </div>
            </div>

            <p className="mt-2 text-center text-xs text-slate-600">
              SkillPilot auto-detects your task type. Test generated code before deployment.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}