"use client";

import { useState, type FormEvent } from "react";
import { motion, type Variants } from "framer-motion";
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
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface FormState {
  name: string;
  email: string;
  message: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

const INITIAL_FORM: FormState = { name: "", email: "", message: "" };

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
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
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setStatus("success");
        setForm(INITIAL_FORM);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section id="contact" watermark="GET IN TOUCH" ariaLabel="Contact section">
      <Container>
        {/* Section header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center"
        >
          <motion.span variants={itemVariants} className="text-xs uppercase tracking-widest text-purple-400 font-semibold text-center block mb-2">
            ✦ Contact
          </motion.span>
          <motion.h2 variants={itemVariants} className="text-2xl sm:text-4xl lg:text-5xl font-bold text-center text-white tracking-tight mb-3">
            Let&apos;s Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Together</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-slate-400 text-xs sm:text-sm md:text-base text-center max-w-2xl mx-auto leading-relaxed"
          >
            Have a project in mind or want to explore potential collaboration? Send a message directly below.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Contact Info — Left Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-5 space-y-4"
          >
            {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
              <motion.div key={label} variants={itemVariants}>
                <Card className="p-5 flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 text-purple-400">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-0.5">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("mailto") ? "_self" : "_blank"}
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-slate-300 hover:text-purple-300 transition-colors duration-200 truncate block focus-ring rounded"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-slate-300 truncate">{value}</p>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}

            {/* Availability badge */}
            <motion.div variants={itemVariants}>
              <Card className="p-6 border-emerald-500/20 flex items-center gap-3.5 mt-2" hoverEffect={false}>
                <span
                  className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-bold text-emerald-400">
                    Available for work
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">
                    Open to freelance &amp; full-time opportunities
                  </p>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* Contact Form — Right Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-7"
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card className="p-10 flex flex-col items-center justify-center text-center gap-4 min-h-[420px] border-emerald-500/30">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                    <CircleCheck
                      className="w-8 h-8 text-emerald-400"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Message Sent!
                  </h3>
                  <p className="text-slate-300 max-w-sm text-sm sm:text-base">
                    Thanks for reaching out. I&apos;ll get back to you within
                    24 hours.
                  </p>
                  <Button
                    variant="secondary"
                    onClick={() => setStatus("idle")}
                    className="mt-2"
                  >
                    Send Another Message
                  </Button>
                </Card>
              </motion.div>
            ) : (
              <motion.form
                variants={itemVariants}
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
              >
                <Card className="p-6 md:p-8 space-y-6 shadow-2xl">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                    >
                      Your Name
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
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
                        className={`w-full bg-[#090a0f]/80 border rounded-xl pl-11 pr-4 h-12 text-sm text-white placeholder-slate-500 focus-ring transition-colors duration-200 ${
                          errors.name
                            ? "border-rose-500/50"
                            : "border-white/10 hover:border-white/20"
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
                        className="flex items-center gap-1.5 text-xs text-rose-400 mt-2 font-medium"
                      >
                        <CircleAlert className="w-3.5 h-3.5" aria-hidden="true" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
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
                        className={`w-full bg-[#090a0f]/80 border rounded-xl pl-11 pr-4 h-12 text-sm text-white placeholder-slate-500 focus-ring transition-colors duration-200 ${
                          errors.email
                            ? "border-rose-500/50"
                            : "border-white/10 hover:border-white/20"
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
                        className="flex items-center gap-1.5 text-xs text-rose-400 mt-2 font-medium"
                      >
                        <CircleAlert className="w-3.5 h-3.5" aria-hidden="true" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                    >
                      Message
                    </label>
                    <div className="relative">
                      <MessageSquare
                        className="absolute left-3.5 top-4 w-4 h-4 text-slate-400 pointer-events-none"
                        aria-hidden="true"
                      />
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project or just say hi..."
                        className={`w-full bg-[#090a0f]/80 border rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-slate-500 focus-ring transition-colors duration-200 resize-none ${
                          errors.message
                            ? "border-rose-500/50"
                            : "border-white/10 hover:border-white/20"
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
                        className="flex items-center gap-1.5 text-xs text-rose-400 mt-2 font-medium"
                      >
                        <CircleAlert className="w-3.5 h-3.5" aria-hidden="true" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={status === "loading"}
                    className="w-full justify-center"
                    aria-label="Send message"
                  >
                    {status === "loading" ? (
                      <>
                        <svg
                          className="w-4 h-4 animate-spin text-white"
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
                  </Button>

                  {status === "error" && (
                    <p
                      role="alert"
                      className="flex items-center gap-2 text-sm text-rose-400 text-center justify-center font-medium"
                    >
                      <CircleAlert className="w-4 h-4" aria-hidden="true" />
                      Something went wrong. Please try again.
                    </p>
                  )}
                </Card>
              </motion.form>
            )}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
