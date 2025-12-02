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
        headers: {
          "Content-Type": "application/json",
        },
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
  console.log("messages", messages);

  return (
    <div className="fixed bottom-6 right-6">
      {!open && (
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
          className="bg-black w-12 h-12 rounded-full flex items-center justify-center"
        >
          <LuMessageCircle className="w-4 h-4 text-white" />
        </Button>
      )}

      {open && (
        <div className="sm:w-[350px] w-full h-[480px] border-2 border-[#0000001a] rounded-md flex flex-col bg-white shadow-2xs ">
          <div className="w-full h-12 flex justify-between items-center px-4 border-b">
            <p className="text-foreground text-base font-medium leading-6">
              Chat assistant
            </p>
            <Button
              onClick={() => setOpen(false)}
              className="w-8 h-8 bg-white hover:bg-white border-[#E4E4E7] border-2"
            >
              <IoClose className="text-black" />
            </Button>
          </div>

          <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-[75%] text-sm ${
                    msg.role === "user"
                      ? "bg-[#f4f4f5cc] text-black"
                      : "bg-[#18181be6] text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center space-x-2 text-gray-400">
                <span className="animate-pulse">AI is typing...</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          <div className="w-full flex items-start justify-between px-4 py-2 border-t">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 h-10 border border-input rounded-md px-3 text-sm"
            />
            <Button
              className="w-10 h-10 rounded-full ml-2"
              type="submit"
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
