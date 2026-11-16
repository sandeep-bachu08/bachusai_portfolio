import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { INITIAL_PROJECTS } from '../data/portfolioData';

export const ProjectsPage: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="py-12 md:py-18 px-6 max-w-6xl mx-auto space-y-16">
      {/* Page Header */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="pb-6 border-b border-[#EBDDD7]"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-[#A65D70] mb-2">
          03. Academic &amp; Technical Portfolio
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#642E3B] tracking-tight">
          Featured Projects
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#40363A]/85 max-w-2xl leading-relaxed">
          Showcasing verified software engineering and digital mapping work with public GitHub
          repository inspection.
        </p>
      </motion.div>

      {/* Projects List */}
      <div className="space-y-12">
        {INITIAL_PROJECTS.map((project, index) => {
          const isJainProject = project.id === 'jain-smart-navigation';

          return (
            <motion.article
              key={project.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: shouldReduceMotion ? 0 : 0.1 + index * 0.1,
              }}
              className="group bg-[#FFFFFF] border border-[#EBDDD7] rounded-xl overflow-hidden shadow-2xs hover:border-[#642E3B]/40 hover:shadow-md transition-all duration-500"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* Visual Thumbnail Column with Image Reveal & Hover Zoom */}
                <div className="lg:col-span-5 bg-[#EBDDD7]/40 border-b lg:border-b-0 lg:border-r border-[#EBDDD7] relative min-h-[260px] sm:min-h-[340px] flex items-center justify-center overflow-hidden">
                  {project.imageUrl ? (
                    <motion.img
                      initial={shouldReduceMotion ? false : { scale: 1.08, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                      src={project.imageUrl}
                      alt={`${project.title} architectural visualization`}
                      className="w-full h-full object-cover select-none transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="p-8 text-center space-y-2">
                      <div className="w-12 h-12 mx-auto rounded-lg bg-[#642E3B] text-[#FFFFFF] flex items-center justify-center font-display font-bold text-base">
                        0{index + 1}
                      </div>
                      <p className="text-base font-bold text-[#642E3B]">{project.title}</p>
                      <p className="text-xs text-[#40363A]/75">{project.academicContext}</p>
                    </div>
                  )}
                </div>

                {/* Project Details Column */}
                <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-xs font-semibold text-[#A65D70]">
                        {project.academicContext}
                      </span>
                      <span className="text-xs font-mono-tabular font-semibold text-[#642E3B]">
                        *0{index + 1}
                      </span>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-[#642E3B] tracking-tight">
                        {project.title}
                      </h2>
                      {project.subtitle && (
                        <p className="mt-1 text-sm font-medium text-[#40363A]/75">
                          {project.subtitle}
                        </p>
                      )}
                    </div>

                    <p className="text-sm sm:text-base text-[#40363A] leading-relaxed">
                      {project.description}
                    </p>

                    {/* Verified Highlights */}
                    {project.verifiedHighlights.length > 0 && (
                      <div className="space-y-2 pt-1">
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#642E3B]">
                          Verified Implementation Highlights
                        </p>
                        <ul className="space-y-1.5 text-xs sm:text-sm text-[#40363A]/90">
                          {project.verifiedHighlights.map((highlight, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-2">
                              <span
                                aria-hidden="true"
                                className="text-[#A65D70] font-bold select-none"
                              >
                                ·
                              </span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Tech Stack & Action Links */}
                  <div className="pt-5 border-t border-[#EBDDD7] space-y-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#642E3B] mb-1.5">
                        Technology Stack
                      </p>
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-medium text-[#40363A]">
                        {project.technologies.map((tech, tIdx) => (
                          <React.Fragment key={tech}>
                            <span>{tech}</span>
                            {tIdx < project.technologies.length - 1 && (
                              <span aria-hidden="true" className="text-[#A65D70]">
                                ·
                              </span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      {isJainProject && (
                        <Link
                          to="/projects/jain-smart-navigation"
                          className="group/btn inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#FFFFFF] bg-[#642E3B] rounded-lg hover:bg-[#A65D70] transition-all duration-300 whitespace-nowrap shrink-0 shadow-xs"
                        >
                          <span>Full Project Details</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </Link>
                      )}

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#642E3B] bg-[#FFFFFF] border border-[#642E3B] rounded-lg hover:bg-[#EBDDD7]/60 transition-colors whitespace-nowrap shrink-0"
                      >
                        <span>View on GitHub</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
};
