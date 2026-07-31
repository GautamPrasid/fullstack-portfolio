"use client";

import React, { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Inbox, Mail, CheckCircle2, Trash2, Calendar, User } from "lucide-react";

interface MessageItem {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  isRead: boolean;
}

const initialMessages: MessageItem[] = [
  {
    id: "m1",
    name: "Subash Sharma",
    email: "subash@example.com",
    message: "Hi Prasid, loved your StudyBuddy desktop project! Would love to collaborate on a JavaFX project.",
    date: "2026-07-30 14:20",
    isRead: false,
  },
  {
    id: "m2",
    name: "Anita Adhikari",
    email: "anita@example.com",
    message: "Impressed by your Next.js 16 portfolio performance. Are you available for freelance full-stack work?",
    date: "2026-07-29 09:45",
    isRead: false,
  },
  {
    id: "m3",
    name: "Rohan Gurung",
    email: "rohan@example.com",
    message: "Great work on the Bank Management C program. Keep building in public!",
    date: "2026-07-25 18:10",
    isRead: true,
  },
];

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<MessageItem[]>(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<MessageItem | null>(initialMessages[0]);

  const toggleReadStatus = (id: string) => {
    setMessages(
      messages.map((m) => (m.id === id ? { ...m, isRead: !m.isRead } : m))
    );
  };

  const handleDelete = (id: string) => {
    setMessages(messages.filter((m) => m.id !== id));
    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <AdminHeader
        title="Contact Messages Inbox"
        subtitle="View and manage form submissions sent via /api/contact"
      />

      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Messages List Column */}
          <div className="lg:col-span-5 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => {
                  setSelectedMessage(msg);
                  if (!msg.isRead) toggleReadStatus(msg.id);
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedMessage?.id === msg.id
                    ? "bg-purple-600/15 border-purple-500/40"
                    : msg.isRead
                    ? "bg-slate-900/40 border-white/5 opacity-70"
                    : "bg-slate-900/80 border-purple-500/30"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    {!msg.isRead && <span className="w-2 h-2 rounded-full bg-purple-400" />}
                    {msg.name}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{msg.date}</span>
                </div>
                <p className="text-xs text-purple-300 font-mono mb-2">{msg.email}</p>
                <p className="text-xs text-slate-400 line-clamp-2 leading-snug">{msg.message}</p>
              </div>
            ))}
          </div>

          {/* Message Content Detail Column */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/40 border border-white/10 space-y-6">
            {selectedMessage ? (
              <>
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <User className="w-4 h-4 text-purple-400" />
                      <span>{selectedMessage.name}</span>
                    </h3>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="text-xs font-mono text-purple-300 hover:underline"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleReadStatus(selectedMessage.id)}
                      className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white"
                      title={selectedMessage.isRead ? "Mark as unread" : "Mark as read"}
                    >
                      <CheckCircle2 className={`w-4 h-4 ${selectedMessage.isRead ? "text-emerald-400" : ""}`} />
                    </button>
                    <button
                      onClick={() => handleDelete(selectedMessage.id)}
                      className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-rose-400"
                      title="Delete message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Submitted: {selectedMessage.date}
                  </span>
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 text-xs text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                    {selectedMessage.message}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-end">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re:%20Portfolio%20Inquiry`}
                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Reply via Email</span>
                  </a>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-slate-500 text-xs">
                Select a message to view full text
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
