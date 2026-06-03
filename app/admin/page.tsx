"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

type Change = { path: string; description: string };
type Message = {
  role: "user" | "assistant";
  content: string;
  changes?: Change[];
  error?: boolean;
};

const EXAMPLES = [
  "Cambia el título principal del hero a 'Viajá diferente con Yaguaréte'",
  "Add a new trip style card for luxury travelers focused on fine dining and private villas",
  "Actualiza la descripción del viaje de naturaleza para mencionar el Pantanal",
  "Change the WhatsApp number in the footer to +54 9 11 0000-0000",
];

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("ytadmin");
    if (saved) setAuthed(true);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function adjustTextarea() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  }

  async function login(e: React.FormEvent) {
    e.preventDefault();
    if (!password) return;
    sessionStorage.setItem("ytadmin", password);
    setAuthed(true);
    setAuthError("");
  }

  async function send(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 55000);

    try {
      const res = await fetch("/api/admin/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          password: sessionStorage.getItem("ytadmin"),
        }),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (res.status === 401) {
        sessionStorage.removeItem("ytadmin");
        setAuthed(false);
        setAuthError("Contraseña incorrecta.");
        return;
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply ?? "Sin respuesta.",
          changes: data.changes,
          error: !res.ok || data.error,
        },
      ]);
    } catch (err) {
      clearTimeout(timeout);
      const isTimeout = err instanceof Error && err.name === "AbortError";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: isTimeout
            ? "La solicitud tardó demasiado. Por favor intentá de nuevo."
            : "Error de conexión. Por favor intentá de nuevo.",
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  // ── Password gate ────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
        <div className="w-full max-w-xs">
          <div className="mb-10 text-center">
            <div className="relative h-12 w-40 mx-auto mb-5">
              <Image
                src="/logo.png"
                alt="Yaguaréte Travels"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="font-serif text-2xl text-stone-900 mb-1">
              Panel de administración
            </h1>
            <p className="text-stone-500 text-sm">
              Ingresá tu contraseña para continuar
            </p>
          </div>
          <form onSubmit={login} className="space-y-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full h-12 px-4 border border-stone-200 rounded-sm bg-white text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:border-stone-500"
              autoFocus
            />
            {authError && (
              <p className="text-red-500 text-sm text-center">{authError}</p>
            )}
            <button
              type="submit"
              disabled={!password}
              className="w-full h-12 bg-stone-900 text-white text-sm font-medium rounded-sm hover:bg-stone-700 disabled:opacity-40 transition-colors"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Chat UI ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-stone-200 px-4 py-3 flex items-center justify-between">
        <div className="relative h-8 w-32">
          <Image
            src="/logo.png"
            alt="Yaguaréte Travels"
            fill
            className="object-contain object-left"
          />
        </div>
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-stone-400">
          Admin
        </span>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-8 pb-36">
        <div className="max-w-xl mx-auto space-y-5">
          {/* Welcome state */}
          {messages.length === 0 && (
            <div className="pt-2 pb-4">
              <p className="font-serif text-3xl text-stone-900 mb-2">
                Hola, Ile 👋
              </p>
              <p className="text-stone-500 text-sm leading-relaxed mb-8 max-w-sm">
                Describí el cambio que querés hacer al sitio, en español o en
                inglés. Los cambios se guardan automáticamente y el sitio se
                actualiza en 1–2 minutos.
              </p>
              <p className="text-xs font-medium uppercase tracking-widest text-stone-400 mb-3">
                Ejemplos
              </p>
              <div className="space-y-2">
                {EXAMPLES.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => {
                      setInput(ex);
                      textareaRef.current?.focus();
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-stone-600 bg-white border border-stone-200 rounded-sm hover:border-stone-400 transition-colors"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message bubbles */}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="max-w-[88%]">
                <div
                  className={`px-4 py-3 rounded-sm text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-stone-900 text-white"
                      : msg.error
                      ? "bg-red-50 border border-red-200 text-red-700"
                      : "bg-white border border-stone-200 text-stone-700"
                  }`}
                >
                  {msg.content}
                </div>

                {/* File change indicators */}
                {msg.changes && msg.changes.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {msg.changes.map((c, j) => (
                      <div
                        key={j}
                        className="flex items-start gap-2 px-3 py-2 bg-amber-50 border border-amber-100 rounded-sm text-xs"
                      >
                        <span className="text-amber-600 shrink-0 mt-px font-medium">
                          ✓
                        </span>
                        <div className="min-w-0">
                          <span className="font-mono text-amber-800 break-all">
                            {c.path}
                          </span>
                          {c.description && (
                            <span className="text-stone-500 ml-1">
                              — {c.description}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                    <p className="text-[11px] text-stone-400 px-1 pt-0.5">
                      Guardado · el sitio se actualiza en ~2 min
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-stone-200 px-4 py-3 rounded-sm">
                <div className="flex gap-1 items-center h-4">
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-4 py-3 safe-area-bottom">
        <form
          onSubmit={send}
          className="max-w-xl mx-auto flex gap-2 items-end"
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              adjustTextarea();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="¿Qué querés cambiar? / What to change?"
            rows={1}
            className="flex-1 px-4 py-3 border border-stone-200 rounded-sm text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-500 resize-none leading-relaxed overflow-hidden"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="h-11 w-11 flex items-center justify-center bg-stone-900 text-white rounded-sm hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0 text-lg"
          >
            ↑
          </button>
        </form>
        <p className="text-[10px] text-stone-400 text-center mt-2 max-w-xl mx-auto">
          Enter para enviar · Shift+Enter para nueva línea
        </p>
      </div>
    </div>
  );
}
