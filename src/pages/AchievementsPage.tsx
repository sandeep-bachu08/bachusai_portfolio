import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { Download, ArrowRight, Award, Briefcase, Mail } from 'lucide-react';
import {
  ACHIEVEMENTS_LIST,
  PERSONAL_INFO,
  INITIAL_PROJECTS,
  CONFIRMED_TOOLS,
} from '../data/portfolioData';
import { generateAndDownloadResumePDF } from '../utils/resumeGenerator';

export const AchievementsPage: React.FC = () => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleDownloadResume = async () => {
    setIsGeneratingPdf(true);
    try {
      await generateAndDownloadResumePDF({
        projects: INITIAL_PROJECTS,
        confirmedTools: CONFIRMED_TOOLS,
      });
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="py-12 md:py-18 px-6 max-w-5xl mx-auto space-y-16">
      {/* 1. Achievements & Participation */}
      <motion.section
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-6"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#A65D70] mb-2">
            05. Extracurricular &amp; Technical Events
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#642E3B] tracking-tight">
            Achievements &amp; Participation
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#40363A]/85 max-w-2xl leading-relaxed">
            Verified participation in collegiate and national-level technical competitions.
          </p>
        </div>

        <div className="space-y-4">
          {ACHIEVEMENTS_LIST.map((item) => (
            <div
              key={item.id}
              className="bg-[#FFFFFF] border border-[#EBDDD7] rounded-xl p-6 sm:p-8 shadow-2xs hover:border-[#642E3B]/35 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-[#EBDDD7]/60 text-[#642E3B] flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#A65D70]">
                    {item.category}
                  </span>
                  <h2 className="text-xl font-bold text-[#642E3B]">{item.title}</h2>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#40363A] leading-relaxed mt-3">
                {item.description}
              </p>

              {item.note && (
                <p className="text-xs text-[#40363A]/75 mt-2 pt-3 border-t border-[#EBDDD7]/60 leading-relaxed">
                  {item.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </motion.section>

      {/* 2. Experience Section */}
      <motion.section
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="space-y-6 pt-4 border-t border-[#EBDDD7]"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#A65D70] mb-2">
            06. Career Standing
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#642E3B] tracking-tight">
            Experience
          </h2>
        </div>

        <div className="bg-[#FFFFFF] border border-[#EBDDD7] rounded-xl p-6 sm:p-8 shadow-2xs hover:border-[#642E3B]/35 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-[#EBDDD7]/60 text-[#642E3B] flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#A65D70]">
                Current Standing
              </span>
              <h3 className="text-lg font-bold text-[#642E3B]">Fresher</h3>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#40363A] leading-relaxed">
            {PERSONAL_INFO.experienceStatement}
          </p>

          <p className="mt-4 pt-4 border-t border-[#EBDDD7]/60 text-xs text-[#40363A]/75 leading-relaxed">
            Eager to contribute to forward-thinking engineering teams through internships, junior
            roles, and applied artificial intelligence projects.
          </p>
        </div>
      </motion.section>

      {/* 3. Resume CTA & Contact Banner */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="p-8 bg-[#EBDDD7]/50 border border-[#A65D70]/25 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
      >
        <div className="space-y-1 max-w-xl">
          <h3 className="text-lg font-bold text-[#642E3B]">
            Official Verified Academic Resume
          </h3>
          <p className="text-xs sm:text-sm text-[#40363A]/85">
            Download the official PDF formatted with complete academic credentials.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleDownloadResume}
            disabled={isGeneratingPdf}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#FFFFFF] bg-[#642E3B] rounded-lg hover:bg-[#A65D70] transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-60 shadow-xs"
          >
            <Download className="w-4 h-4" />
            {isGeneratingPdf ? 'Generating PDF...' : 'Download Resume (PDF)'}
          </button>

          <Link
            to="/contact"
            className="group inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#642E3B] bg-[#FFFFFF] border border-[#642E3B]/30 rounded-lg hover:bg-[#FAF7F2] transition-colors whitespace-nowrap shrink-0"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact Me</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
