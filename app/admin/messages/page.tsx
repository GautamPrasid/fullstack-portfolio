"use client";

import React, { useEffect, useState, useTransition } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Mail, Check, Trash2, Loader2, Eye, EyeOff, Reply } from "lucide-react";
import { fetchAdminMessages, toggleMessageRead, deleteMessage } from "./actions";
import type { ContactMessageRecord } from "./actions";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessageRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchAdminMessages();
    setMessages(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    queueMicrotask(() => {
      loadData();
    });
  }, []);

  const handleToggleRead = (id: string, current: boolean) => {
    startTransition(async () => {
      const res = await toggleMessageRead(id, !current);
      if (res.success) loadData();
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const res = await deleteMessage(id);
      if (res.success) {
        if (selectedId === id) setSelectedId(null);
        loadData();
      }
    });
  };

  const unreadCount = messages.filter((m) => m.status !== "read").length;

  const isRead = (m: ContactMessageRecord) => m.status === "read";

  const selectedMsg = messages.find((m) => m.id === selectedId);

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <AdminHeader
        title="Contact Messages Inbox"
        subtitle={
          unreadCount > 0
            ? `${unreadCount} unread · ${messages.length} total messages received`
            : `${messages.length} total messages received`
        }
      />

      <main className="flex-1 p-6 md:p-8 overflow-hidden flex flex-col md:flex-row gap-6">
        <div className="md:w-80 lg:w-96 shrink-0 rounded-2xl bg-slate-900/40 border border-white/10 flex flex-col max-h-[70vh] md:max-h-[unset] overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Inbox</h3>
            <span className="text-[10px] font-mono text-slate-500">{messages.length} messages</span>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {loading ? (
              <div className="p-8 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading messages...
              </div>
            ) : messages.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                No messages yet. Messages sent from the contact form will appear here.
              </div>
            ) : (
              messages.map((message) => (
                <button
                  key={message.id}
                  onClick={() => setSelectedId(message.id)}
                  className={`w-full text-left p-4 border-b border-white/5 space-y-1 transition-colors ${
                    selectedId === message.id
                      ? "bg-purple-500/10 border-l-2 border-l-purple-500"
                      : "hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      {!isRead(message) && <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />}
                      <span className={`text-xs font-semibold truncate ${!isRead(message) ? "text-white" : "text-slate-300"}`}>
                        {message.name}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-500 shrink-0">
                      {message.created_at
                        ? new Date(message.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })
                        : ""}
                    </span>
                  </div>
                  <span className="block text-[10px] text-purple-400 font-mono truncate">{message.email}</span>
                  <span className="block text-[11px] text-slate-400 truncate">{message.message.slice(0, 80)}{message.message.length > 80 ? "…" : ""}</span>
                </button>
              ))
            )}
          </div>
        </div>

        <div className="flex-1 rounded-2xl bg-slate-900/40 border border-white/10 flex flex-col min-h-[60vh]">
          {selectedMsg ? (
            <>
              <div className="p-6 border-b border-white/10 space-y-2">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <h2 className="text-lg font-bold text-white">Message from {selectedMsg.name}</h2>
                    <p className="text-xs text-slate-400 font-mono pt-0.5">
                      From <span className="text-purple-300">{selectedMsg.name}</span> — {selectedMsg.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleRead(selectedMsg.id, isRead(selectedMsg))}
                      disabled={isPending}
                      className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-purple-300 hover:border-purple-500/30 transition-colors disabled:opacity-50"
                      title={isRead(selectedMsg) ? "Mark as unread" : "Mark as read"}
                    >
                      {isRead(selectedMsg) ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <a
                      href={`mailto:${selectedMsg.email}`}
                      className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-emerald-300 hover:border-emerald-500/30 transition-colors"
                      title="Reply via email"
                    >
                      <Reply className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => handleDelete(selectedMsg.id)}
                      disabled={isPending}
                      className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 transition-colors disabled:opacity-50"
                      title="Delete message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <div className="whitespace-pre-wrap text-xs leading-7 text-slate-300 max-w-none font-sans">
                  {selectedMsg.message}
                </div>
              </div>
              <div className="p-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>
                  Received{" "}
                  {selectedMsg.created_at ? new Date(selectedMsg.created_at).toLocaleString() : "—"}
                </span>
                {isRead(selectedMsg) ? (
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Check className="w-3 h-3" /> Read
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-purple-400">Unread</span>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-3">
              <Mail className="w-10 h-10 text-slate-600" />
              <h3 className="text-sm font-semibold text-slate-400">No Message Selected</h3>
              <p className="text-xs text-slate-500 max-w-xs">
                Select a message from the inbox to read its full contents and manage it.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
