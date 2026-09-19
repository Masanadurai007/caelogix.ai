import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, X, Send, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "../lib/api.js";

function getSessionId() {
  let id = sessionStorage.getItem("caelogix_session_id");
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("caelogix_session_id", id);
  }
  return id;
}

const GREETING = {
  role: "assistant",
  content:
    "Hi, I'm the Caelogix AI assistant. Ask me about our services, or tell me what you're trying to build and I'll help point you in the right direction.",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [escalate, setEscalate] = useState(false);
  const scrollRef = useRef(null);
  const sessionId = useRef(getSessionId());

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await api.sendChatMessage({
        session_id: sessionId.current,
        message: text,
      });
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.reply },
      ]);
      if (res.escalate) setEscalate(true);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm having trouble reaching our systems right now. You can reach our team directly using the contact form instead.",
        },
      ]);
      setEscalate(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating launcher — recognizable "chat bot" glyph, business-standard style */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={
          open
            ? "Close chat with Caelogix AI assistant"
            : "Open chat with Caelogix AI assistant"
        }
        aria-expanded={open}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-navy-800 text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-teal"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0 }}
            >
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="bot"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <Bot size={24} />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute right-0 top-0 flex h-3 w-3 -translate-y-0.5 translate-x-0.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-teal" />
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            role="dialog"
            aria-label="Caelogix AI assistant chat window"
            className="fixed bottom-24 right-6 z-50 flex h-[32rem] w-[22rem] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-xl border border-navy-100 bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between bg-navy-800 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <img
                  src="/logo-icon.png"
                  alt=""
                  className="h-6 w-6 rounded-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextSibling.style.display = "inline-flex";
                  }}
                />
                <span className="hidden h-6 w-6 items-center justify-center rounded-full bg-teal text-white">
                  <Sparkles size={13} />
                </span>
                <span className="text-sm font-semibold text-white">
                  Caelogix Assistant
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="text-navy-200 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "ml-auto bg-teal text-white"
                      : "mr-auto bg-navy-50 text-navy-800"
                  }`}
                >
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="mr-auto flex items-center gap-1 rounded-lg bg-navy-50 px-3 py-2.5">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-navy-400 [animation-delay:-0.2s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-navy-400 [animation-delay:-0.1s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-navy-400" />
                </div>
              )}
              {escalate && (
                <div className="mr-auto max-w-[90%] rounded-lg border border-teal-200 bg-teal-50 px-3 py-2 text-xs text-teal-800">
                  Want to talk to our team directly?{" "}
                  <Link
                    to="/contact"
                    className="font-semibold underline"
                    onClick={() => setOpen(false)}
                  >
                    Contact us
                  </Link>
                </div>
              )}
            </div>

            <form
              onSubmit={handleSend}
              className="flex items-center gap-2 border-t border-navy-100 p-3"
            >
              <label htmlFor="chat-input" className="sr-only">
                Message
              </label>
              <input
                id="chat-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our services..."
                className="min-w-0 flex-1 rounded-md border border-navy-200 px-3 py-2 text-sm focus:border-teal"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-teal text-white transition-colors hover:bg-teal-600 disabled:opacity-40"
              >
                <Send size={16} />
              </button>
            </form>
            <p className="border-t border-navy-100 bg-navy-50 px-4 py-1.5 text-center text-[11px] text-navy-400">
              Powered by Caelogix AI
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
