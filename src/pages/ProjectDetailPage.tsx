import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ExternalLink, Github, CheckCircle2 } from 'lucide-react';
import { INITIAL_PROJECTS } from '../data/portfolioData';

export const ProjectDetailPage: React.FC = () => {
  const project = INITIAL_PROJECTS.find((p) => p.id === 'jain-smart-navigation')!;
  const shouldReduceMotion = useReducedMotion();

  const sectionReveal = {
    initial: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  };

  return (
    <div className="py-12 md:py-18 px-6 max-w-5xl mx-auto space-y-14">
      {/* Back to Projects Navigation */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#642E3B] hover:text-[#A65D70] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Back to All Projects</span>
        </Link>
      </motion.div>

      {/* Project Header */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-4 pb-8 border-b border-[#EBDDD7]"
      >
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[#A65D70]">
          <span>{project.academicContext}</span>
          <span aria-hidden="true">·</span>
          <span>School of Engineering and Technology (SET)</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#642E3B] tracking-tight">
          {project.title}
        </h1>

        {project.subtitle && (
          <p className="text-base sm:text-lg font-medium text-[#40363A]/80 leading-relaxed max-w-3xl">
            {project.subtitle}
          </p>
        )}

        {/* Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center gap-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#FFFFFF] bg-[#642E3B] rounded-lg hover:bg-[#A65D70] transition-colors whitespace-nowrap shrink-0 shadow-xs"
          >
            <Github className="w-4 h-4" />
            <span>View GitHub Repository</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#642E3B] bg-[#FFFFFF] border border-[#642E3B] rounded-lg hover:bg-[#EBDDD7]/60 transition-colors whitespace-nowrap shrink-0"
            >
              <span>Live Deployment on Vercel</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </motion.div>

      {/* Architectural Showcase Visualization */}
      {project.imageUrl && (
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="bg-[#FFFFFF] border border-[#EBDDD7] rounded-xl overflow-hidden shadow-sm group"
        >
          <div className="relative aspect-16/9 bg-[#EBDDD7]/50 overflow-hidden">
            <img
              src={project.imageUrl}
              alt="JAIN Smart Campus Navigation digital twin campus visual"
              className="w-full h-full object-cover select-none transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
          <div className="p-4 bg-[#FAF7F2] border-t border-[#EBDDD7] text-xs text-[#40363A]/75 flex items-center justify-between">
            <span>Visual overview: JAIN University engineering campus architectural layout</span>
            <span className="font-mono-tabular">Digital Twin Mapping</span>
          </div>
        </motion.div>
      )}

      {/* Detailed Content Sections */}
      <div className="space-y-12 text-[#40363A]">
        {/* 1. Project Overview */}
        <motion.section {...sectionReveal} className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#642E3B] tracking-tight">
            1. Project Overview
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">{project.description}</p>
          <p className="text-sm sm:text-base leading-relaxed text-[#40363A]/90">
            The project serves as an interactive spatial guide and digital twin tailored specifically
            for the Jain University School of Engineering and Technology (SET). It addresses the
            real-world challenge of locating academic blocks, specialized labs, seminar halls, and
            navigating intra-campus routes.
          </p>
        </motion.section>

        {/* 2. Problem Statement */}
        {project.problemStatement && (
          <motion.section {...sectionReveal} className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#642E3B] tracking-tight">
              2. Problem Statement
            </h2>
            <div className="p-6 bg-[#FFFFFF] border border-[#EBDDD7] rounded-xl text-sm sm:text-base leading-relaxed text-[#40363A] shadow-2xs">
              {project.problemStatement}
            </div>
          </motion.section>
        )}

        {/* 3. Objectives */}
        {project.objectives && project.objectives.length > 0 && (
          <motion.section {...sectionReveal} className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#642E3B] tracking-tight">
              3. Project Objectives
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.objectives.map((obj, i) => (
                <li
                  key={i}
                  className="p-5 bg-[#FFFFFF] border border-[#EBDDD7] rounded-xl flex items-start gap-3 text-sm shadow-2xs"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#642E3B] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{obj}</span>
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* 4. Verified Features */}
        <motion.section {...sectionReveal} className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#642E3B] tracking-tight">
            4. Verified Technical Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {project.verifiedHighlights.map((feat, index) => (
              <div
                key={index}
                className="p-5 bg-[#FFFFFF] border border-[#EBDDD7] rounded-xl space-y-2 shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#EBDDD7] text-[#642E3B] text-xs font-bold flex items-center justify-center font-display">
                    0{index + 1}
                  </span>
                  <h3 className="text-sm font-bold text-[#642E3B]">Feature Highlight</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#40363A]/90 leading-relaxed">{feat}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 5. Verified Technology Stack */}
        <motion.section {...sectionReveal} className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#642E3B] tracking-tight">
            5. Verified Technology Stack
          </h2>
          <div className="p-6 bg-[#FFFFFF] border border-[#EBDDD7] rounded-xl space-y-4 shadow-2xs">
            <p className="text-xs text-[#A65D70] font-semibold uppercase tracking-wider">
              Confirmed from repository package.json and server implementation
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {project.technologies.map((tech) => (
                <div
                  key={tech}
                  className="p-3 bg-[#FAF7F2] border border-[#EBDDD7] rounded-lg text-center"
                >
                  <p className="text-xs sm:text-sm font-semibold text-[#642E3B]">{tech}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 6. Confirmed Contribution */}
        {project.confirmedContribution && (
          <motion.section {...sectionReveal} className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#642E3B] tracking-tight">
              6. Confirmed Contribution
            </h2>
            <div className="p-6 bg-[#FFFFFF] border border-[#EBDDD7] rounded-xl text-sm leading-relaxed text-[#40363A] shadow-2xs">
              <p className="font-semibold text-[#642E3B] mb-1">Bachu Venkata Sai Sandeep</p>
              <p className="text-xs sm:text-sm text-[#40363A]/85">{project.confirmedContribution}</p>
            </div>
          </motion.section>
        )}

        {/* 7. Repository & Deployment Access */}
        <motion.section
          {...sectionReveal}
          className="p-8 bg-[#EBDDD7]/45 border border-[#A65D70]/25 rounded-xl space-y-4"
        >
          <h2 className="text-lg font-bold text-[#642E3B]">Inspect Repository Code</h2>
          <p className="text-xs sm:text-sm text-[#40363A]/80 leading-relaxed">
            The complete source code is maintained on GitHub under{' '}
            <code className="text-[#642E3B] font-mono-tabular bg-[#FAF7F2] px-1.5 py-0.5 rounded">
              sandeep-bachu08/jain-smart-navigation-system
            </code>
            . You can review all endpoints, campus geometry datasets, and natural-language query
            handlers directly.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#FFFFFF] bg-[#642E3B] rounded-lg hover:bg-[#A65D70] transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Open GitHub Repository</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <Link
              to="/projects"
              className="px-4 py-2 text-xs font-semibold text-[#642E3B] hover:underline"
            >
              Return to Projects List
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
};
