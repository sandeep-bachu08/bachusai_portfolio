import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { Mail, Code2 } from 'lucide-react';
import { PERSONAL_INFO, ORIGINAL_PROFILE_PHOTO } from '../data/portfolioData';

export const AboutPage: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const itemReveal = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  return (
    <div className="py-12 md:py-18 px-6 max-w-6xl mx-auto space-y-16">
      {/* Page Header */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-[#A65D70] mb-2">
          01. Background &amp; Profile
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#642E3B] tracking-tight">
          About Me
        </h1>
      </motion.div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Authentic Bio */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: shouldReduceMotion ? 0 : 0.1 },
            },
          }}
          className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#40363A] leading-relaxed"
        >
          {PERSONAL_INFO.aboutParagraphs.map((paragraph, index) => (
            <motion.p key={index} variants={itemReveal}>
              {paragraph}
            </motion.p>
          ))}

          <motion.div variants={itemReveal} className="pt-4 flex flex-wrap items-center gap-4">
            <Link
              to="/skills"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#FFFFFF] bg-[#642E3B] rounded-lg hover:bg-[#A65D70] transition-colors whitespace-nowrap shrink-0 shadow-xs"
            >
              <Code2 className="w-4 h-4" />
              <span>Explore Technical Skills</span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#642E3B] bg-[#FFFFFF] border border-[#642E3B] rounded-lg hover:bg-[#EBDDD7]/60 transition-colors whitespace-nowrap shrink-0"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Me</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Column: Profile Information Card & Circular Photograph */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="lg:col-span-5 space-y-8"
        >
          {/* Circular Photograph with thin Burgundy Border & subtle shadow */}
          <div className="group flex items-center gap-5 p-5 bg-[#FFFFFF] border border-[#EBDDD7] rounded-xl shadow-2xs">
            <div className="w-24 h-24 rounded-full border-2 border-[#642E3B] bg-[#FAF7F2] shadow-xs overflow-hidden shrink-0">
              <img
                src={ORIGINAL_PROFILE_PHOTO}
                alt="Bachu Venkata Sai Sandeep"
                className="w-full h-full object-cover object-top select-none transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-bold text-[#642E3B]">{PERSONAL_INFO.fullName}</h2>
              <p className="text-xs font-semibold text-[#A65D70] uppercase tracking-wide">
                B.Tech – AIML
              </p>
              <p className="text-xs text-[#40363A]/75">Jain University, Bangalore</p>
            </div>
          </div>

          {/* Clean Profile Information Area */}
          <div className="bg-[#FFFFFF] border border-[#EBDDD7] rounded-xl p-6 sm:p-7 shadow-2xs">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#642E3B] pb-3 mb-4 border-b border-[#EBDDD7]">
              Academic &amp; Profile Summary
            </h3>
            <dl className="divide-y divide-[#EBDDD7]/70">
              {PERSONAL_INFO.profileDetails.map((item) => (
                <div
                  key={item.label}
                  className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1"
                >
                  <dt className="text-xs font-medium text-[#40363A]/75">{item.label}</dt>
                  <dd className="text-sm font-semibold text-[#642E3B] sm:text-right">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
