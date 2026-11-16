import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { EDUCATION_TIMELINE } from '../data/portfolioData';

export const EducationPage: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="py-12 md:py-18 px-6 max-w-5xl mx-auto space-y-16">
      {/* Page Header */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-[#A65D70] mb-2">
          04. Academic Qualifications
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#642E3B] tracking-tight">
          Education
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#40363A]/85 max-w-2xl leading-relaxed">
          Structured academic qualifications in reverse chronological order with verified scores,
          semester-wise SGPA results, and institution details.
        </p>
      </motion.div>

      {/* Progressive Vertical Timeline */}
      <div className="relative pl-6 sm:pl-10 border-l border-[#A65D70]/40 space-y-12">
        {EDUCATION_TIMELINE.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
              delay: shouldReduceMotion ? 0 : index * 0.12,
            }}
            className="relative group"
          >
            {/* Timeline Bullet Node */}
            <motion.div
              aria-hidden="true"
              initial={shouldReduceMotion ? false : { scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
                delay: shouldReduceMotion ? 0 : 0.1 + index * 0.12,
              }}
              className={`w-4 h-4 rounded-full border-2 border-[#642E3B] absolute -left-[31px] sm:-left-[47px] top-2 transition-colors ${
                index === 0 ? 'bg-[#642E3B]' : 'bg-[#FAF7F2] group-hover:bg-[#A65D70]'
              }`}
            />

            <div className="bg-[#FFFFFF] border border-[#EBDDD7] rounded-xl p-6 sm:p-8 shadow-2xs hover:border-[#642E3B]/35 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 mb-4 border-b border-[#EBDDD7]/80">
                <div>
                  <h2 className="text-xl font-bold text-[#642E3B]">{edu.qualification}</h2>
                  {edu.specialization && (
                    <p className="text-sm font-semibold text-[#A65D70] mt-0.5">
                      Specialization: {edu.specialization}
                    </p>
                  )}
                </div>

                <div className="text-xs sm:text-sm font-semibold text-[#642E3B] font-mono-tabular shrink-0 bg-[#EBDDD7]/50 px-3 py-1 rounded-md">
                  <span className="text-[#40363A]/70 font-sans font-normal">
                    {edu.statusOrScoreLabel}:{' '}
                  </span>
                  {edu.statusOrScoreValue}
                </div>
              </div>

              <div className="space-y-1.5 text-sm text-[#40363A]">
                <p className="font-semibold text-base text-[#40363A]">{edu.institution}</p>
                <p className="text-xs sm:text-sm text-[#40363A]/75">{edu.location}</p>
              </div>

              {/* Subsection: ACADEMIC PERFORMANCE (Semester 1 & 2 SGPA Results with Subtle Stagger) */}
              {edu.semesterResults && edu.semesterResults.length > 0 && (
                <div className="mt-6 pt-5 border-t border-[#EBDDD7]">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#642E3B] mb-3">
                    Academic Performance
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {edu.semesterResults.map((sem, sIdx) => (
                      <motion.div
                        key={sem.semester}
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.45,
                          ease: [0.22, 1, 0.36, 1],
                          delay: shouldReduceMotion ? 0 : 0.2 + sIdx * 0.1,
                        }}
                        className="p-4 bg-[#FAF7F2] border border-[#EBDDD7] rounded-lg flex flex-col justify-between space-y-2 shadow-2xs hover:border-[#642E3B]/35 transition-colors"
                      >
                        <span className="text-xs font-semibold text-[#A65D70] uppercase tracking-wide">
                          {sem.semester}
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xs font-medium text-[#40363A]/80">SGPA:</span>
                          <span className="text-2xl font-bold text-[#642E3B] font-mono-tabular">
                            {sem.sgpa}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {index === 0 && (
                <div className="mt-5 pt-4 border-t border-[#EBDDD7]/60 text-xs text-[#40363A]/80 leading-relaxed">
                  Focusing on core coursework in artificial intelligence, machine learning, data
                  structures, and software development fundamentals.
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
