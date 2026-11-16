import React from 'react';
import { X, Download, Printer, ExternalLink } from 'lucide-react';
import {
  PERSONAL_INFO,
  PROGRAMMING_LANGUAGES,
  AREAS_OF_INTEREST,
  ACHIEVEMENTS_LIST,
  LANGUAGES,
  INITIAL_PROJECTS,
  CONFIRMED_TOOLS,
  ProjectItem,
  SkillItem,
} from '../data/portfolioData';

interface ResumePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadPdf: () => void;
  isGeneratingPdf: boolean;
  profilePhotoUrl?: string | null;
  projects?: ProjectItem[];
  confirmedTools?: SkillItem[];
}

export const ResumePreviewModal: React.FC<ResumePreviewModalProps> = ({
  isOpen,
  onClose,
  onDownloadPdf,
  isGeneratingPdf,
  projects = INITIAL_PROJECTS,
  confirmedTools = CONFIRMED_TOOLS,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#40363A]/60 backdrop-blur-xs p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div className="relative w-full max-w-4xl bg-[#FAF7F2] border border-[#EBDDD7] rounded-xl shadow-xl my-8 overflow-hidden">
        {/* Top Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-[#FFFFFF] border-b border-[#EBDDD7]">
          <div>
            <h3 id="resume-modal-title" className="text-base font-semibold text-[#642E3B]">
              Academic &amp; Technical Resume Preview
            </h3>
            <p className="text-xs text-[#40363A]/75">
              Compact, structured, ATS-friendly layout matching downloadable PDF
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#642E3B] bg-[#FAF7F2] border border-[#642E3B]/25 rounded-lg hover:bg-[#EBDDD7]/60 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print View
            </button>
            <button
              type="button"
              onClick={onDownloadPdf}
              disabled={isGeneratingPdf}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#FFFFFF] bg-[#642E3B] rounded-lg hover:bg-[#A65D70] transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-60"
            >
              <Download className="w-3.5 h-3.5" />
              {isGeneratingPdf ? 'Generating PDF...' : 'Download PDF Resume'}
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume preview"
              className="p-2 text-[#40363A]/70 hover:text-[#642E3B] rounded-lg hover:bg-[#EBDDD7]/40 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Sheet */}
        <div className="p-6 md:p-10 max-h-[80vh] overflow-y-auto">
          <div className="max-w-3xl mx-auto bg-[#FAF7F2] border border-[#EBDDD7] shadow-sm rounded-lg overflow-hidden">
            {/* Top Burgundy Accent */}
            <div className="h-1.5 bg-[#642E3B]" />

            {/* Resume Header: No location, no photo, no designation, no summary */}
            <div className="px-6 pt-6 pb-5 md:px-10 md:pt-8 md:pb-6 border-b border-[#642E3B]/40 space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold text-[#642E3B] tracking-tight">
                Bachu Venkata Sai Sandeep
              </h1>
              <div className="pt-1 space-y-1 text-xs sm:text-sm text-[#40363A]">
                <p>
                  <span className="font-semibold text-[#642E3B]">Email:</span>{' '}
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-[#40363A] underline hover:text-[#642E3B]"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                  <span className="mx-3 text-[#A65D70]">|</span>
                  <span className="font-semibold text-[#642E3B]">Phone:</span>{' '}
                  <a
                    href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                    className="hover:text-[#642E3B]"
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-[#642E3B]">LinkedIn:</span>{' '}
                  <a
                    href={PERSONAL_INFO.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#40363A] hover:text-[#642E3B] underline break-all"
                  >
                    {PERSONAL_INFO.linkedIn}
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-[#642E3B]">GitHub:</span>{' '}
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#40363A] hover:text-[#642E3B] underline break-all"
                  >
                    {PERSONAL_INFO.github}
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </p>
              </div>
            </div>

            {/* Resume Body */}
            <div className="p-6 md:p-10 space-y-7 text-sm text-[#40363A]">
              {/* 1. Education Section (Multi-line, no addresses, clear vertical spacing) */}
              <section>
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#642E3B] border-b border-[#A65D70]/50 pb-1.5 mb-4">
                  Education
                </h2>
                <div className="space-y-5">
                  {/* 1. B.Tech */}
                  <div className="space-y-1 text-xs sm:text-sm leading-relaxed">
                    <p className="font-bold text-[#642E3B] text-sm">
                      1. Bachelor of Technology (B.Tech)
                    </p>
                    <div className="pl-4 space-y-1">
                      <p>
                        <span className="font-semibold text-[#40363A]">Specialization:</span>{' '}
                        Artificial Intelligence and Machine Learning
                      </p>
                      <p>
                        <span className="font-semibold text-[#40363A]">Institution:</span> Jain
                        University
                      </p>
                      <p>
                        <span className="font-semibold text-[#40363A]">Academic Status:</span>{' '}
                        Second Year – Semester 3
                      </p>
                      <div className="pt-1">
                        <p className="font-semibold text-[#642E3B]">
                          Academic Performance (Semester-wise SGPA):
                        </p>
                        <ul className="pl-4 pt-1 space-y-0.5 list-disc font-mono-tabular">
                          <li>Semester 1: 8.45</li>
                          <li>Semester 2: 8.95</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* 2. Intermediate */}
                  <div className="space-y-1 text-xs sm:text-sm leading-relaxed">
                    <p className="font-bold text-[#642E3B] text-sm">2. Intermediate</p>
                    <div className="pl-4 space-y-1">
                      <p>
                        <span className="font-semibold text-[#40363A]">Institution:</span> Sri
                        Chaitanya Junior College
                      </p>
                      <p className="font-mono-tabular">
                        <span className="font-semibold font-sans text-[#40363A]">Percentage:</span>{' '}
                        92.6%
                      </p>
                    </div>
                  </div>

                  {/* 3. 10th Standard */}
                  <div className="space-y-1 text-xs sm:text-sm leading-relaxed">
                    <p className="font-bold text-[#642E3B] text-sm">3. 10th Standard</p>
                    <div className="pl-4 space-y-1">
                      <p>
                        <span className="font-semibold text-[#40363A]">Institution:</span> Sri Sai
                        Vidyanikethan High School
                      </p>
                      <p className="font-mono-tabular">
                        <span className="font-semibold font-sans text-[#40363A]">Percentage:</span>{' '}
                        87.33%
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 2. Technical Skills & Areas of Interest */}
              <section>
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#642E3B] border-b border-[#A65D70]/50 pb-1.5 mb-3.5">
                  Technical Skills &amp; Areas of Interest
                </h2>
                <div className="space-y-3 text-xs sm:text-sm leading-relaxed">
                  <div>
                    <p className="font-semibold text-[#642E3B]">Programming Languages:</p>
                    <ul className="pl-5 pt-0.5 space-y-0.5 list-disc">
                      {PROGRAMMING_LANGUAGES.map((l) => (
                        <li key={l.name}>
                          {l.name} ({l.level})
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-[#642E3B]">Technologies &amp; Tools:</p>
                    <ul className="pl-5 pt-0.5 space-y-0.5 list-disc">
                      {confirmedTools.map((t) => (
                        <li key={t.name}>
                          {t.name} ({t.level})
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-[#642E3B]">Areas of Interest:</p>
                    <ul className="pl-5 pt-0.5 space-y-0.5 list-disc">
                      {AREAS_OF_INTEREST.map((area) => (
                        <li key={area}>{area}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* 3. Academic Projects */}
              <section>
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#642E3B] border-b border-[#A65D70]/50 pb-1.5 mb-3.5">
                  Academic Projects
                </h2>
                {projects.slice(0, 1).map((proj) => (
                  <div key={proj.id} className="space-y-1.5 text-xs sm:text-sm leading-relaxed">
                    <p className="font-bold text-[#642E3B] text-sm">{proj.title}</p>
                    <div className="pl-4 space-y-1">
                      <p>
                        An academic project focused on helping users navigate the university campus
                        through a digital navigation system.
                      </p>
                      <p>
                        <span className="font-semibold text-[#642E3B]">Verified Technologies:</span>{' '}
                        {proj.technologies.join(', ')}
                      </p>
                      <p>
                        <span className="font-semibold text-[#642E3B]">GitHub Repository:</span>{' '}
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#40363A] hover:text-[#642E3B] underline break-all"
                        >
                          {proj.githubUrl}
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      </p>
                    </div>
                  </div>
                ))}
              </section>

              {/* 4. Achievements & Extracurricular Participation */}
              <section>
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#642E3B] border-b border-[#A65D70]/50 pb-1.5 mb-3">
                  Achievements &amp; Extracurricular Participation
                </h2>
                {ACHIEVEMENTS_LIST.map((ach) => (
                  <div key={ach.id} className="text-xs sm:text-sm space-y-1">
                    <p className="font-bold text-[#642E3B]">{ach.title}:</p>
                    <p className="pl-4">• {ach.description}</p>
                  </div>
                ))}
              </section>

              {/* 5. Languages */}
              <section>
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#642E3B] border-b border-[#A65D70]/50 pb-1.5 mb-3">
                  Languages
                </h2>
                <ul className="pl-5 text-xs sm:text-sm space-y-0.5 list-disc">
                  {LANGUAGES.map((lang) => (
                    <li key={lang}>{lang}</li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
