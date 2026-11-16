import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Mail, Phone, MapPin, ExternalLink, Copy, Check, Send, AlertCircle, Loader2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { submitContactForm, ContactSubmissionResponse } from '../services/api';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  general?: string;
}

export const ContactPage: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isPrepared, setIsPrepared] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [backendReceipt, setBackendReceipt] = useState<ContactSubmissionResponse | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.name.trim()) {
      newErrors.name = 'Please enter your name.';
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long.';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(form.email.trim())) {
      newErrors.email = 'Please provide a valid email address (e.g. name@domain.com).';
    }

    if (!form.message.trim()) {
      newErrors.message = 'Please write a message before submitting.';
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'Please provide a message with at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setBackendReceipt(null);

    try {
      const response = await submitContactForm({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim() || 'Portfolio Inquiry',
        message: form.message.trim(),
        website: form.website,
      });
      setBackendReceipt(response);
      setIsPrepared(true);
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : 'Unable to submit to backend server.';
      if (
        errorMsg.toLowerCase().includes('too many') ||
        errorMsg.toLowerCase().includes('valid') ||
        errorMsg.toLowerCase().includes('character') ||
        errorMsg.toLowerCase().includes('spam')
      ) {
        setErrors({ general: errorMsg });
      } else {
        setBackendReceipt(null);
        setIsPrepared(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
    form.subject.trim() || `Portfolio Inquiry from ${form.name.trim()}`
  )}&body=${encodeURIComponent(
    `Name: ${form.name.trim()}\nEmail: ${form.email.trim()}\n\nMessage:\n${form.message.trim()}`
  )}`;

  return (
    <div className="py-12 md:py-18 px-6 max-w-6xl mx-auto space-y-16">
      {/* Page Header */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-[#A65D70] mb-2">
          07. Communication
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#642E3B] tracking-tight">
          Contact Me
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#40363A]/85 max-w-2xl leading-relaxed">
          Reach out for internship opportunities, academic discussions, or software development
          inquiries.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Direct Contact Details & Links */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="bg-[#FFFFFF] border border-[#EBDDD7] rounded-xl p-6 sm:p-8 space-y-6 shadow-2xs">
            <h2 className="text-base font-bold text-[#642E3B] pb-3 border-b border-[#EBDDD7]">
              Verified Contact Information
            </h2>

            {/* Email */}
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <p className="text-xs font-medium text-[#40363A]/70 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#A65D70]" />
                  <span>Email</span>
                </p>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-sm font-semibold text-[#642E3B] hover:text-[#A65D70] underline underline-offset-2 break-all"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                className="p-2 text-xs text-[#40363A]/70 hover:text-[#642E3B] rounded-lg hover:bg-[#EBDDD7]/40 transition-colors cursor-pointer shrink-0"
                title="Copy email to clipboard"
                aria-label="Copy email address"
              >
                {copiedField === 'email' ? (
                  <Check className="w-4 h-4 text-[#642E3B]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Phone */}
            <div className="flex items-start justify-between gap-3 pt-4 border-t border-[#EBDDD7]/70">
              <div className="space-y-1">
                <p className="text-xs font-medium text-[#40363A]/70 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#A65D70]" />
                  <span>Phone</span>
                </p>
                <a
                  href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                  className="text-sm font-semibold text-[#40363A] hover:text-[#642E3B] font-mono-tabular"
                >
                  {PERSONAL_INFO.phone}
                </a>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                className="p-2 text-xs text-[#40363A]/70 hover:text-[#642E3B] rounded-lg hover:bg-[#EBDDD7]/40 transition-colors cursor-pointer shrink-0"
                title="Copy phone number to clipboard"
                aria-label="Copy phone number"
              >
                {copiedField === 'phone' ? (
                  <Check className="w-4 h-4 text-[#642E3B]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Location */}
            <div className="space-y-1 pt-4 border-t border-[#EBDDD7]/70">
              <p className="text-xs font-medium text-[#40363A]/70 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#A65D70]" />
                <span>Location</span>
              </p>
              <p className="text-sm font-medium text-[#40363A] leading-relaxed">
                {PERSONAL_INFO.location}
              </p>
            </div>

            {/* Professional Profiles */}
            <div className="pt-5 border-t border-[#EBDDD7] space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#642E3B]">
                Professional Profiles
              </p>
              <div className="flex flex-col space-y-2 text-sm">
                <a
                  href={PERSONAL_INFO.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between py-2 px-3.5 rounded-lg bg-[#FAF7F2] hover:bg-[#EBDDD7]/60 text-[#642E3B] font-medium transition-colors"
                >
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#A65D70]" />
                </a>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between py-2 px-3.5 rounded-lg bg-[#FAF7F2] hover:bg-[#EBDDD7]/60 text-[#642E3B] font-medium transition-colors"
                >
                  <span>GitHub Profile</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#A65D70]" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Validated Contact Form with Fallback */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
          className="lg:col-span-7"
        >
          <div className="bg-[#FFFFFF] border border-[#EBDDD7] rounded-xl p-6 sm:p-8 shadow-2xs">
            <h2 className="text-base font-bold text-[#642E3B] pb-3 mb-6 border-b border-[#EBDDD7]">
              Send an Inquiry
            </h2>

            {isPrepared ? (
              <div className="p-6 rounded-xl bg-[#FAF7F2] border border-[#A65D70]/30 space-y-4">
                <div className="flex items-center gap-2.5 text-[#642E3B] font-bold text-base">
                  <Check className="w-5 h-5 text-[#642E3B]" />
                  <span>
                    {backendReceipt?.success
                      ? 'Message Recorded in Portfolio Backend'
                      : 'Message Prepared for Direct Email'}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#40363A] leading-relaxed">
                  {backendReceipt?.success ? (
                    <>
                      {backendReceipt.message} You may also open your default email client below to
                      send a direct copy to{' '}
                      <strong className="text-[#642E3B]">{PERSONAL_INFO.email}</strong>.
                    </>
                  ) : (
                    <>
                      Your message has been validated and prepared for{' '}
                      <span className="font-semibold text-[#642E3B]">
                        {PERSONAL_INFO.fullName}
                      </span>
                      . Click below to dispatch it through your default email client to{' '}
                      <strong className="text-[#642E3B]">{PERSONAL_INFO.email}</strong>.
                    </>
                  )}
                </p>

                <div className="p-3 bg-[#FFFFFF] border border-[#EBDDD7] rounded-lg text-xs space-y-1">
                  {backendReceipt?.submission_id && (
                    <p className="font-mono-tabular text-[#642E3B]">
                      <span className="font-semibold">Reference ID:</span> #
                      {backendReceipt.submission_id} ({backendReceipt.delivery_status})
                    </p>
                  )}
                  <p>
                    <span className="font-semibold text-[#642E3B]">Sender:</span> {form.name} (
                    {form.email})
                  </p>
                  <p>
                    <span className="font-semibold text-[#642E3B]">Subject:</span>{' '}
                    {form.subject || 'Portfolio Inquiry'}
                  </p>
                  <p className="line-clamp-2 text-[#40363A]/80">
                    <span className="font-semibold text-[#642E3B]">Message:</span> {form.message}
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={mailtoUrl}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#FFFFFF] bg-[#642E3B] rounded-lg hover:bg-[#A65D70] transition-colors shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span>Open in Email Client</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      handleCopy(
                        `From: ${form.name} <${form.email}>\nSubject: ${
                          form.subject || 'Portfolio Inquiry'
                        }\n\n${form.message}`,
                        'message_payload'
                      );
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#642E3B] bg-[#FFFFFF] border border-[#642E3B]/30 rounded-lg hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                  >
                    {copiedField === 'message_payload' ? (
                      <>
                        <Check className="w-4 h-4 text-[#642E3B]" />
                        <span>Copied to Clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Message Text</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsPrepared(false);
                      setBackendReceipt(null);
                      setForm({ name: '', email: '', subject: '', message: '', website: '' });
                      setErrors({});
                    }}
                    className="text-xs font-medium text-[#40363A]/80 hover:text-[#642E3B] hover:underline cursor-pointer ml-auto"
                  >
                    Write Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Honeypot anti-spam field (hidden from real users) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(e) => setForm((prev) => ({ ...prev, website: e.target.value }))}
                  />
                </div>

                {errors.general && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2 font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errors.general}</span>
                  </div>
                )}

                {/* Name Field */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold text-[#40363A] mb-1.5"
                  >
                    Full Name <span className="text-[#642E3B]">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, name: e.target.value }));
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    placeholder="Your name"
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    className={`w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border rounded-lg text-[#40363A] transition-colors focus:outline-none ${
                      errors.name
                        ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                        : 'border-[#EBDDD7] focus:border-[#642E3B] focus:bg-[#FFFFFF]'
                    }`}
                  />
                  {errors.name && (
                    <p
                      id="contact-name-error"
                      className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold text-[#40363A] mb-1.5"
                  >
                    Email Address <span className="text-[#642E3B]">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, email: e.target.value }));
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    placeholder="name@example.com"
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    className={`w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border rounded-lg text-[#40363A] transition-colors focus:outline-none ${
                      errors.email
                        ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                        : 'border-[#EBDDD7] focus:border-[#642E3B] focus:bg-[#FFFFFF]'
                    }`}
                  />
                  {errors.email && (
                    <p
                      id="contact-email-error"
                      className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-semibold text-[#40363A] mb-1.5"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={form.subject}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, subject: e.target.value }))
                    }
                    placeholder="Internship Inquiry / Project Discussion"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#EBDDD7] rounded-lg text-[#40363A] focus:outline-none focus:border-[#642E3B] focus:bg-[#FFFFFF] transition-colors"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-[#40363A] mb-1.5"
                  >
                    Message <span className="text-[#642E3B]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, message: e.target.value }));
                      if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    placeholder="Please write your inquiry or message..."
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    className={`w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border rounded-lg text-[#40363A] transition-colors focus:outline-none ${
                      errors.message
                        ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                        : 'border-[#EBDDD7] focus:border-[#642E3B] focus:bg-[#FFFFFF]'
                    }`}
                  />
                  {errors.message && (
                    <p
                      id="contact-message-error"
                      className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                <div className="pt-2 flex items-center justify-between gap-4">
                  <p className="text-xs text-[#40363A]/70">
                    Direct contact:{' '}
                    <span className="font-semibold text-[#642E3B]">{PERSONAL_INFO.email}</span>
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-semibold text-[#FFFFFF] bg-[#642E3B] rounded-lg hover:bg-[#A65D70] transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
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
  );
};
