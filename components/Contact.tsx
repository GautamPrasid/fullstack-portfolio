"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  User,
  MessageSquare,
  Send,
  CircleCheck,
  CircleAlert,
  MapPin,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

interface FormState {
  name: string;
  email: string;
  message: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

const INITIAL_FORM: FormState = { name: "", email: "", message: "" };

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "gprasid10@gmail.com",
    href: "mailto:gprasid10@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Pokhara, Nepal",
    href: null,
  },
  {
    icon: FaGithub,
    label: "GitHub",
    value: "github.com/GautamPrasid",
    href: "https://github.com/GautamPrasid",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/prasid-gautam",
    href: "https://www.linkedin.com/in/prasid-gautam/",
  },
];

export default function Contact() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) {
      next.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!form.message.trim()) next.message = "Message is required.";
    else if (form.message.trim().length < 10)
      next.message = "Message must be at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    // Simulate network request — replace with real API call
    await new Promise((res) => setTimeout(res, 1400));
    setStatus("success");
    setForm(INITIAL_FORM);
  };

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-label="Contact section"
    >
      {/* Background decoration */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-[0.07] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(139,92,246,1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-10">
        {/* Section header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <motion.p variants={itemVariants} className="section-label">
            <span aria-hidden="true">✦</span> Contact
          </motion.p>
          <motion.h2 variants={itemVariants} className="section-title">
            Let&apos;s Work{" "}
            <span className="gradient-text">Together</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="section-subtitle mx-auto"
          >
            Have a project in mind or just want to say hello? Drop me a
            message — I&apos;ll get back to you within 24 hours.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Contact Info — left column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-2 space-y-5"
          >
            {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
              <motion.div
                key={label}
                variants={itemVariants}
                className="glass rounded-xl p-4 border border-white/5 flex items-center gap-4 group hover:border-violet-500/25 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-violet-400" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-[#5a5a8a] font-medium mb-0.5">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("mailto") ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                      className="text-sm text-[#a0a0c0] hover:text-violet-400 transition-colors duration-200 truncate block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm text-[#a0a0c0] truncate">{value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Availability badge */}
            <motion.div
              variants={itemVariants}
              className="glass rounded-xl p-4 border border-emerald-500/20 flex items-center gap-3"
            >
              <span
                className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse shrink-0"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-semibold text-emerald-400">
                  Available for work
                </p>
                <p className="text-xs text-[#5a5a8a] mt-0.5">
                  Open to freelance &amp; full-time opportunities
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form — right column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-3"
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-2xl p-10 border border-emerald-500/20 flex flex-col items-center justify-center text-center gap-4 min-h-[380px]"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <CircleCheck
                    className="w-8 h-8 text-emerald-400"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-xl font-bold text-[#f0f0ff]">
                  Message Sent!
                </h3>
                <p className="text-[#a0a0c0] max-w-xs">
                  Thanks for reaching out. I&apos;ll get back to you within
                  24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="btn-secondary mt-2"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <motion.form
                variants={itemVariants}
                onSubmit={handleSubmit}
                noValidate
                className="glass rounded-2xl p-6 sm:p-8 border border-white/5 space-y-5"
                aria-label="Contact form"
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-[#a0a0c0] mb-2"
                  >
                    Your Name
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a5a8a]"
                      aria-hidden="true"
                    />
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Prasid Gautam"
                      autoComplete="name"
                      className={`w-full bg-white/[0.03] border rounded-xl pl-10 pr-4 py-3 text-sm text-[#f0f0ff] placeholder-[#3a3a5a] focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-colors duration-200 ${
                        errors.name
                          ? "border-rose-500/50"
                          : "border-white/8 hover:border-white/15"
                      }`}
                      aria-invalid={!!errors.name}
                      aria-describedby={
                        errors.name ? "contact-name-error" : undefined
                      }
                    />
                  </div>
                  {errors.name && (
                    <p
                      id="contact-name-error"
                      role="alert"
                      className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5"
                    >
                      <CircleAlert className="w-3 h-3" aria-hidden="true" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium text-[#a0a0c0] mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a5a8a]"
                      aria-hidden="true"
                    />
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className={`w-full bg-white/[0.03] border rounded-xl pl-10 pr-4 py-3 text-sm text-[#f0f0ff] placeholder-[#3a3a5a] focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-colors duration-200 ${
                        errors.email
                          ? "border-rose-500/50"
                          : "border-white/8 hover:border-white/15"
                      }`}
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? "contact-email-error" : undefined
                      }
                    />
                  </div>
                  {errors.email && (
                    <p
                      id="contact-email-error"
                      role="alert"
                      className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5"
                    >
                      <CircleAlert className="w-3 h-3" aria-hidden="true" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-[#a0a0c0] mb-2"
                  >
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquare
                      className="absolute left-3.5 top-3.5 w-4 h-4 text-[#5a5a8a]"
                      aria-hidden="true"
                    />
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project or just say hi..."
                      className={`w-full bg-white/[0.03] border rounded-xl pl-10 pr-4 py-3 text-sm text-[#f0f0ff] placeholder-[#3a3a5a] focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-colors duration-200 resize-none ${
                        errors.message
                          ? "border-rose-500/50"
                          : "border-white/8 hover:border-white/15"
                      }`}
                      aria-invalid={!!errors.message}
                      aria-describedby={
                        errors.message ? "contact-message-error" : undefined
                      }
                    />
                  </div>
                  {errors.message && (
                    <p
                      id="contact-message-error"
                      role="alert"
                      className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5"
                    >
                      <CircleAlert className="w-3 h-3" aria-hidden="true" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  {status === "loading" ? (
                    <>
                      <svg
                        className="w-4 h-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" aria-hidden="true" />
                      Send Message
                    </>
                  )}
                </button>

                {status === "error" && (
                  <p
                    role="alert"
                    className="flex items-center gap-2 text-sm text-rose-400 text-center justify-center"
                  >
                    <CircleAlert className="w-4 h-4" aria-hidden="true" />
                    Something went wrong. Please try again.
                  </p>
                )}
              </motion.form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
