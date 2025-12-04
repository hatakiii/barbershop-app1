"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LuMessageCircle, LuSend } from "react-icons/lu";
import { IoClose } from "react-icons/io5";

export const GeminiChat = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<
    { role: "user" | "ai"; text: string }[]
  >([]);

  const onSendChat = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: input }]);
    const userMessage = input;
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage }),
      });

      const data = await response.json();
      if (data?.text) {
        setMessages((prev) => [...prev, { role: "ai", text: data.text }]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Error fetching response" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!open && (
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
          className="w-14 h-14 rounded-full flex items-center justify-center 
          bg-black dark:bg-white 
          text-white dark:text-black 
          border-2 border-[#D4AF37] shadow-lg hover:scale-105 transition"
        >
          <LuMessageCircle className="w-6 h-6" />
        </Button>
      )}

      {open && (
        <div
          className="sm:w-[360px] w-[92vw] h-[480px] rounded-xl 
          shadow-xl border border-[#D4AF37]
          bg-white dark:bg-[#111] text-black dark:text-white 
          flex flex-col"
        >
          {/* Header */}
          <div
            className="flex justify-between items-center px-4 h-12 
          bg-[#D4AF37] text-black dark:text-white rounded-t-xl"
          >
            <p className="font-semibold">Barber Chat</p>
            <button
              onClick={() => setOpen(false)}
              className="p-1 bg-transparent"
            >
              <IoClose className="w-6 h-6" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-[#D4AF37] dark:scrollbar-thumb-[#444]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-[75%] text-sm shadow-md 
                  ${
                    msg.role === "user"
                      ? "bg-[#D4AF37] text-black"
                      : "bg-black dark:bg-[#222] text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="text-[#D4AF37] text-sm animate-pulse">
                ✂ AI is styling your reply...
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex items-center gap-2 px-4 py-3 border-t border-[#D4AF37]">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask hairstyle suggestions..."
              className="flex-1 h-10 px-3 rounded-md border border-[#D4AF37] 
              bg-transparent text-sm placeholder-gray-400 focus:outline-none"
            />
            <Button
              className="w-10 h-10 rounded-full bg-[#D4AF37] text-black hover:opacity-90"
              onClick={onSendChat}
              disabled={loading}
            >
              <LuSend />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
