import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import {
  Download,
  ArrowRight,
  Code2,
  GraduationCap,
  Award,
  FolderGit2,
  Mail,
  User,
  ExternalLink,
} from 'lucide-react';
import {
  PERSONAL_INFO,
  ORIGINAL_PROFILE_PHOTO,
  INITIAL_PROJECTS,
  CONFIRMED_TOOLS,
} from '../data/portfolioData';
import { generateAndDownloadResumePDF } from '../utils/resumeGenerator';

export const HomePage: React.FC = () => {
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

  const containerStagger = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.11,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemReveal = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  const directoryCards = [
    {
      to: '/about',
      icon: User,
      index: '01',
      title: 'About Me',
      description:
        'Academic background at Jain University, focus in AIML, and software development goals.',
      cta: 'Read Bio',
    },
    {
      to: '/skills',
      icon: Code2,
      index: '02',
      title: 'Technical Skills',
      description:
        'Python (Currently Learning), Java (Basic), C Programming (Basic), Git & GitHub, and AIML focus.',
      cta: 'View Skills',
    },
    {
      to: '/projects',
      icon: FolderGit2,
      index: '03',
      title: 'Featured Projects',
      description:
        'JAIN Smart Campus Navigation — digital twin and multilingual query system with public GitHub repository.',
      cta: 'Explore Projects',
    },
    {
      to: '/education',
      icon: GraduationCap,
      index: '04',
      title: 'Education Timeline',
      description:
        'B.Tech AIML (Semester 1 SGPA 8.45, Semester 2 SGPA 8.95), Intermediate (92.6%), and 10th Standard (87.33%).',
      cta: 'View Timeline',
    },
    {
      to: '/achievements',
      icon: Award,
      index: '05',
      title: 'Achievements & Status',
      description:
        'Smart India Hackathon (SIH) participation and current professional status as a Fresher.',
      cta: 'View Details',
    },
    {
      to: '/contact',
      icon: Mail,
      index: '06',
      title: 'Contact',
      description:
        'Direct email, phone, location, and verified communication form for inquiries and internships.',
      cta: 'Get In Touch',
    },
  ];

  return (
    <div className="space-y-16 md:space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 px-6 border-b border-[#EBDDD7]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Staggered Editorial Typography Reveal */}
            <motion.div
              variants={containerStagger}
              initial="hidden"
              animate="show"
              className="order-2 lg:order-1 lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              <motion.p
                variants={itemReveal}
                className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#A65D70]"
              >
                {PERSONAL_INFO.heroGreeting}
              </motion.p>

              <div className="overflow-hidden py-0.5">
                <motion.h1
                  variants={{
                    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 36 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.65,
                        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                      },
                    },
                  }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#642E3B] tracking-tight leading-tight"
                  style={{ textWrap: 'balance' }}
                >
                  {PERSONAL_INFO.fullName}
                </motion.h1>
              </div>

              <motion.p
                variants={itemReveal}
                className="text-base sm:text-lg text-[#40363A] leading-relaxed max-w-2xl mx-auto lg:mx-0"
              >
                {PERSONAL_INFO.heroIntroduction}
              </motion.p>

              {/* Two Primary Buttons */}
              <motion.div
                variants={itemReveal}
                className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4"
              >
                <Link
                  to="/projects"
                  className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#FFFFFF] bg-[#642E3B] rounded-lg hover:bg-[#A65D70] transition-all duration-300 whitespace-nowrap shrink-0 shadow-xs focus-visible:outline-2 focus-visible:outline-[#642E3B]"
                >
                  <span>View My Projects</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <button
                  type="button"
                  onClick={handleDownloadResume}
                  disabled={isGeneratingPdf}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#642E3B] bg-[#FFFFFF] border border-[#642E3B] rounded-lg hover:bg-[#EBDDD7]/60 transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-[#642E3B]"
                >
                  <Download className="w-4 h-4" />
                  {isGeneratingPdf ? 'Generating PDF...' : 'Download Resume'}
                </button>
              </motion.div>

              {/* Verified Profile Links (Clean unboxed metadata) */}
              <motion.div
                variants={itemReveal}
                className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1.5 text-xs text-[#40363A]/80"
              >
                <span>Jain University, Bangalore</span>
                <span aria-hidden="true" className="text-[#A65D70]">
                  ·
                </span>
                <span>B.Tech AIML (Second Year, Sem 3)</span>
                <span aria-hidden="true" className="text-[#A65D70]">
                  ·
                </span>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#642E3B] hover:text-[#A65D70] underline underline-offset-2 inline-flex items-center gap-1"
                >
                  GitHub
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span aria-hidden="true" className="text-[#A65D70]">
                  ·
                </span>
                <a
                  href={PERSONAL_INFO.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#642E3B] hover:text-[#A65D70] underline underline-offset-2 inline-flex items-center gap-1"
                >
                  LinkedIn
                  <ExternalLink className="w-3 h-3" />
                </a>
              </motion.div>
            </motion.div>

            {/* Right Column: Verified Original Circular Photograph with Restrained Editorial Entrance */}
            <motion.div
              initial={
                shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92, x: 24 }
              }
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
              }}
              className="order-1 lg:order-2 lg:col-span-5 flex flex-col items-center justify-center"
            >
              <div className="relative flex items-center justify-center">
                {/* Elegant Burgundy Circular Decorative Element */}
                <motion.div
                  aria-hidden="true"
                  initial={shouldReduceMotion ? false : { scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
                  className="w-64 h-64 sm:w-76 sm:h-76 rounded-full border border-[#A65D70]/30 bg-[#EBDDD7]/40 flex items-center justify-center"
                >
                  <div className="w-58 h-58 sm:w-70 sm:h-70 rounded-full border border-[#642E3B]/20" />
                </motion.div>

                {/* Circular Profile Frame: Exact Uploaded Photograph with Thin Burgundy Border & Subtle Shadow */}
                <div className="absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full border-2 border-[#642E3B] bg-[#FFFFFF] shadow-md overflow-hidden flex items-center justify-center group">
                  <img
                    src={ORIGINAL_PROFILE_PHOTO}
                    alt="Bachu Venkata Sai Sandeep professional photograph"
                    className="w-full h-full object-cover object-top select-none transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="eager"
                  />
                </div>
              </div>

              <p className="mt-4 text-xs text-[#40363A]/70 text-center font-medium">
                Bachu Venkata Sai Sandeep · Jain University
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. DIRECT SECTIONS DIRECTORY (Scroll-Triggered Editorial Stagger) */}
      <section className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 max-w-xl"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#A65D70] mb-1.5">
            Portfolio Navigation
          </p>
          <h2 className="text-2xl font-bold text-[#642E3B] tracking-tight">
            Explore Verified Portfolio Sections
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.08,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {directoryCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <motion.div key={card.to} variants={itemReveal}>
                <Link
                  to={card.to}
                  className="group h-full p-6 bg-[#FFFFFF] border border-[#EBDDD7] rounded-xl hover:border-[#642E3B]/45 hover:shadow-sm transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-lg bg-[#EBDDD7]/60 text-[#642E3B] flex items-center justify-center group-hover:bg-[#642E3B] group-hover:text-[#FFFFFF] transition-colors duration-300">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono-tabular font-semibold text-[#A65D70]">
                        *{card.index}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#642E3B]">{card.title}</h3>
                    <p className="text-xs text-[#40363A]/80 leading-relaxed">{card.description}</p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-[#EBDDD7]/60 flex items-center justify-between text-xs font-medium text-[#642E3B]">
                    <span>{card.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
};
