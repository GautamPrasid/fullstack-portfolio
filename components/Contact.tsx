"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  User,
  MessageSquare,
  Send,
  CheckCircle,
  AlertCircle,
  MapPin,
  Github,
  Linkedin,
} from "lucide-react";

interface FormState {
  name: string;
  email: string;
  message: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

const INITIAL_FORM: FormState = { name: "", email: "", message: "" };

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "alex@example.com",
    href: "mailto:alex@example.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Kathmandu, Nepal",
    href: null,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/alexpoudel",
    href: "https://github.com/alexpoudel",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/alexpoudel",
    href: "https://linkedin.com/in/alexpoudel",
  },
];

export default function Contact() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email.";
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  /**
   * Form submission handler — prepared for Resend integration.
   * To enable sending, replace the simulated delay with:
   *   await fetch('/api/contact', { method: 'POST', body: JSON.stringify(form) })
   * And create `app/api/contact/route.ts` using the Resend SDK.
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");

    try {
      // --- Resend integration placeholder ---
      // const res = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(form),
      // });
      // if (!res.ok) throw new Error('Failed to send');
      // --- End placeholder ---

      // Simulate network request for demonstration
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setStatus("success");
      setForm(INITIAL_FORM);
    } catch {
      setStatus("error");
    }
  };

  const resetStatus = () => setStatus("idle");

  return (
    <section
      id="contact"
      className="section-padding relative overflow-hidden"
      aria-label="Contact me"
    >
      {/* BG orb */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-[0.08] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.p variants={itemVariants} className="section-label">
            <span aria-hidden="true">✦</span> Get In Touch
          </motion.p>
          <motion.h2 variants={itemVariants} className="section-title">
            Let&apos;s Work{" "}
            <span className="gradient-text">Together</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle mx-auto">
            Have a project in mind? Want to collaborate? I&apos;d love to hear
            from you — just drop a message.
          </motion.p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Left: Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold text-[#f0f0ff] mb-3">
                Ready to collaborate?
              </h3>
              <p className="text-[#a0a0c0] leading-relaxed">
                Whether you&apos;re a startup, an agency, or an individual with
                a great idea — I&apos;m open to freelance projects and full-time
                opportunities.
              </p>
            </motion.div>

            <motion.ul
              variants={containerVariants}
              className="space-y-4"
              aria-label="Contact information"
            >
              {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                <motion.li
                  key={label}
                  variants={itemVariants}
                  className="flex items-center gap-4"
                >
                  <div
                    className="w-10 h-10 rounded-xl glass border border-violet-500/20 flex items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    <Icon className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-xs text-[#5a5a8a] font-medium mb-0.5">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("mailto") ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        className="text-sm text-[#a0a0c0] hover:text-violet-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-[#a0a0c0]">{value}</p>
                    )}
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            {/* Availability */}
            <motion.div
              variants={itemVariants}
              className="glass-card p-4 flex items-center gap-3 border border-emerald-500/20 bg-emerald-500/5"
            >
              <span
                className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse shrink-0"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-semibold text-[#f0f0ff]">
                  Available for work
                </p>
                <p className="text-xs text-[#5a5a8a]">
                  Open to freelance & full-time roles
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <div className="glass-card p-6 sm:p-8">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-4 py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-emerald-400" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-[#f0f0ff]">
                    Message sent!
                  </h3>
                  <p className="text-[#a0a0c0] text-sm max-w-xs">
                    Thanks for reaching out. I&apos;ll get back to you within 24
                    hours.
                  </p>
                  <button
                    onClick={resetStatus}
                    className="btn-secondary text-sm mt-2"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Contact form"
                >
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-4 rounded-xl border border-red-500/30 bg-red-500/10 mb-6"
                      role="alert"
                    >
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0" aria-hidden="true" />
                      <p className="text-sm text-red-300">
                        Something went wrong. Please try again or email me directly.
                      </p>
                    </motion.div>
                  )}

                  <div className="space-y-5">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="flex items-center gap-2 text-sm font-medium text-[#a0a0c0] mb-2"
                      >
                        <User className="w-3.5 h-3.5" aria-hidden="true" />
                        Full Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        autoComplete="name"
                        aria-describedby={errors.name ? "name-error" : undefined}
                        aria-invalid={!!errors.name}
                        className={`input-field ${errors.name ? "border-red-500/50 focus:border-red-500/70" : ""}`}
                      />
                      {errors.name && (
                        <p
                          id="name-error"
                          className="text-xs text-red-400 mt-1.5"
                          role="alert"
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="flex items-center gap-2 text-sm font-medium text-[#a0a0c0] mb-2"
                      >
                        <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        autoComplete="email"
                        aria-describedby={errors.email ? "email-error" : undefined}
                        aria-invalid={!!errors.email}
                        className={`input-field ${errors.email ? "border-red-500/50 focus:border-red-500/70" : ""}`}
                      />
                      {errors.email && (
                        <p
                          id="email-error"
                          className="text-xs text-red-400 mt-1.5"
                          role="alert"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="flex items-center gap-2 text-sm font-medium text-[#a0a0c0] mb-2"
                      >
                        <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project or idea..."
                        aria-describedby={errors.message ? "message-error" : undefined}
                        aria-invalid={!!errors.message}
                        className={`input-field resize-none ${errors.message ? "border-red-500/50 focus:border-red-500/70" : ""}`}
                      />
                      {errors.message && (
                        <p
                          id="message-error"
                          className="text-xs text-red-400 mt-1.5"
                          role="alert"
                        >
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
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
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
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" aria-hidden="true" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
