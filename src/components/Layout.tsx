import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation, useNavigate, useOutlet } from 'react-router-dom';
import { Download, Menu, X, FileText, ArrowLeft, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  PERSONAL_INFO,
  INITIAL_PROJECTS,
  CONFIRMED_TOOLS,
  ProjectItem,
  SkillItem,
} from '../data/portfolioData';
import { generateAndDownloadResumePDF } from '../utils/resumeGenerator';
import { ResumePreviewModal } from './ResumePreviewModal';

const NAV_ITEMS = [
  { path: '/', label: 'Home', indexLabel: '01' },
  { path: '/about', label: 'About', indexLabel: '02' },
  { path: '/skills', label: 'Skills', indexLabel: '03' },
  { path: '/projects', label: 'Projects', indexLabel: '04' },
  { path: '/education', label: 'Education', indexLabel: '05' },
  { path: '/achievements', label: 'Achievements', indexLabel: '06' },
  { path: '/contact', label: 'Contact', indexLabel: '07' },
];

const ROUTE_ORDER = [
  '/',
  '/about',
  '/skills',
  '/projects',
  '/projects/jain-smart-navigation',
  '/education',
  '/achievements',
  '/contact',
];

export const Layout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [projects] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [confirmedTools] = useState<SkillItem[]>(CONFIRMED_TOOLS);

  const location = useLocation();
  const navigate = useNavigate();
  const currentOutlet = useOutlet();
  const shouldReduceMotion = useReducedMotion();

  const prevPathRef = useRef<string>(location.pathname);
  const prevIdx = ROUTE_ORDER.indexOf(prevPathRef.current);
  const currIdx = ROUTE_ORDER.indexOf(location.pathname);
  const slideDirection = currIdx >= prevIdx ? 1 : -1;

  useEffect(() => {
    prevPathRef.current = location.pathname;
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleDownloadResume = async () => {
    setIsGeneratingPdf(true);
    try {
      await generateAndDownloadResumePDF({
        projects,
        confirmedTools,
      });
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Determine current top-level chapter for editorial horizontal pager
  const normalizedPath = location.pathname.startsWith('/projects')
    ? '/projects'
    : location.pathname;
  const activeChapterIndex = Math.max(
    0,
    NAV_ITEMS.findIndex((item) => item.path === normalizedPath)
  );
  const prevChapter =
    activeChapterIndex > 0 ? NAV_ITEMS[activeChapterIndex - 1] : NAV_ITEMS[NAV_ITEMS.length - 1];
  const nextChapter =
    activeChapterIndex < NAV_ITEMS.length - 1 ? NAV_ITEMS[activeChapterIndex + 1] : NAV_ITEMS[0];

  const pageVariants = {
    initial: (dir: number) =>
      shouldReduceMotion
        ? { opacity: 0 }
        : { opacity: 0, x: dir * 44, filter: 'blur(2px)' },
    animate: shouldReduceMotion
      ? { opacity: 1 }
      : {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          transition: {
            duration: 0.48,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          },
        },
    exit: (dir: number) =>
      shouldReduceMotion
        ? { opacity: 0 }
        : {
            opacity: 0,
            x: dir * -36,
            filter: 'blur(2px)',
            transition: {
              duration: 0.28,
              ease: [0.4, 0, 1, 1] as [number, number, number, number],
            },
          },
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#40363A] flex flex-col font-sans overflow-x-hidden">
      {/* STICKY TOP BAR (3-Zone Contract) */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-xs border-b border-[#EBDDD7]">
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark / Monogram */}
          <Link
            to="/"
            className="inline-flex items-center gap-3 text-[#642E3B] font-display font-bold tracking-tight whitespace-nowrap shrink-0 group focus-visible:outline-2 focus-visible:outline-[#642E3B] rounded-lg"
          >
            <span className="w-9 h-9 rounded-full bg-[#642E3B] text-[#FFFFFF] flex items-center justify-center text-sm font-bold tracking-wider transition-transform duration-300 group-hover:scale-105 group-hover:bg-[#A65D70]">
              {PERSONAL_INFO.initials}
            </span>
            <span className="text-base sm:text-lg text-[#40363A] group-hover:text-[#642E3B] transition-colors">
              Sai Sandeep
            </span>
          </Link>

          {/* Zone 2: Multi-Page Navigation Links with Animated Active Indicator */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-6 text-sm font-medium"
          >
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.path);

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={`relative py-1.5 transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-[#642E3B] font-semibold'
                      : 'text-[#40363A]/80 hover:text-[#642E3B]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#642E3B] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action (Resume CTA) + Mobile Menu Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleDownloadResume}
              disabled={isGeneratingPdf}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#FFFFFF] bg-[#642E3B] rounded-lg hover:bg-[#A65D70] transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-[#642E3B]"
            >
              <Download className="w-3.5 h-3.5" />
              {isGeneratingPdf ? 'Preparing PDF...' : 'Download Resume'}
            </button>

            <button
              type="button"
              onClick={() => setIsResumeModalOpen(true)}
              aria-label="Preview resume sheet"
              className="hidden md:inline-flex p-2 text-[#40363A]/70 hover:text-[#642E3B] rounded-lg hover:bg-[#EBDDD7]/50 transition-colors cursor-pointer"
              title="Preview Resume"
            >
              <FileText className="w-4 h-4 text-[#A65D70]" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="lg:hidden p-2.5 rounded-lg text-[#642E3B] hover:bg-[#EBDDD7]/60 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#642E3B]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Responsive Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden bg-[#FAF7F2] border-b border-[#EBDDD7] px-6 py-5 space-y-4 shadow-sm overflow-hidden"
            >
              <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1.5">
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `py-2.5 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                        isActive
                          ? 'bg-[#EBDDD7] text-[#642E3B] font-semibold'
                          : 'text-[#40363A] hover:bg-[#EBDDD7]/50 hover:text-[#642E3B]'
                      }`
                    }
                  >
                    <span>{item.label}</span>
                    <span className="text-xs font-mono-tabular text-[#A65D70]">
                      *{item.indexLabel}
                    </span>
                  </NavLink>
                ))}
              </nav>
              <div className="pt-3 border-t border-[#EBDDD7] flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleDownloadResume();
                  }}
                  disabled={isGeneratingPdf}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#FFFFFF] bg-[#642E3B] rounded-lg hover:bg-[#A65D70] transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  {isGeneratingPdf ? 'Preparing PDF...' : 'Download Resume'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsResumeModalOpen(true);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-[#642E3B] bg-[#FAF7F2] border border-[#642E3B]/25 rounded-lg hover:bg-[#EBDDD7]/60 transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Preview Resume
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Page Route Content with Editorial Horizontal Slide Transition */}
      <main className="flex-1 relative overflow-x-hidden">
        <AnimatePresence mode="wait" custom={slideDirection}>
          <motion.div
            key={location.pathname}
            custom={slideDirection}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
          >
            {currentOutlet}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Editorial Horizontal Slide Chapter Bar (Inspired by reference video controls) */}
      <div className="border-t border-[#EBDDD7] bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(prevChapter.path)}
              aria-label={`Previous page: ${prevChapter.label}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#642E3B]/30 text-xs font-medium text-[#642E3B] hover:bg-[#642E3B] hover:text-[#FFFFFF] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{prevChapter.label}</span>
            </button>
            <button
              type="button"
              onClick={() => navigate(nextChapter.path)}
              aria-label={`Next page: ${nextChapter.label}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#642E3B]/30 text-xs font-medium text-[#642E3B] hover:bg-[#642E3B] hover:text-[#FFFFFF] transition-colors cursor-pointer"
            >
              <span className="hidden sm:inline">{nextChapter.label}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-baseline gap-2 font-display">
            <span className="text-xs uppercase tracking-widest text-[#A65D70] hidden sm:inline">
              {NAV_ITEMS[activeChapterIndex]?.label}
            </span>
            <span className="text-lg sm:text-xl font-bold text-[#642E3B] font-mono-tabular">
              *{NAV_ITEMS[activeChapterIndex]?.indexLabel || '01'}
            </span>
            <span className="text-xs text-[#40363A]/60 font-mono-tabular">/ 07</span>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#FAF7F2] border-t border-[#EBDDD7] py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#40363A]/80">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-[#642E3B] text-[#FFFFFF] flex items-center justify-center font-display font-bold text-xs">
              {PERSONAL_INFO.initials}
            </span>
            <div>
              <p className="font-semibold text-[#642E3B]">{PERSONAL_INFO.fullName}</p>
              <p className="text-[11px] text-[#40363A]/70">Jain University, Bangalore</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <Link to="/about" className="hover:text-[#642E3B] transition-colors">
              About
            </Link>
            <span aria-hidden="true" className="text-[#A65D70]">
              ·
            </span>
            <Link to="/skills" className="hover:text-[#642E3B] transition-colors">
              Skills
            </Link>
            <span aria-hidden="true" className="text-[#A65D70]">
              ·
            </span>
            <Link to="/projects" className="hover:text-[#642E3B] transition-colors">
              Projects
            </Link>
            <span aria-hidden="true" className="text-[#A65D70]">
              ·
            </span>
            <Link to="/education" className="hover:text-[#642E3B] transition-colors">
              Education
            </Link>
            <span aria-hidden="true" className="text-[#A65D70]">
              ·
            </span>
            <Link to="/achievements" className="hover:text-[#642E3B] transition-colors">
              Achievements
            </Link>
            <span aria-hidden="true" className="text-[#A65D70]">
              ·
            </span>
            <Link to="/contact" className="hover:text-[#642E3B] transition-colors">
              Contact
            </Link>
            <span aria-hidden="true" className="text-[#A65D70]">
              ·
            </span>
            <button
              type="button"
              onClick={handleDownloadResume}
              className="font-medium text-[#642E3B] hover:text-[#A65D70] underline underline-offset-2 cursor-pointer"
            >
              Resume (PDF)
            </button>
          </div>
        </div>
      </footer>

      {/* One-Page Resume Preview Modal */}
      <ResumePreviewModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        onDownloadPdf={handleDownloadResume}
        isGeneratingPdf={isGeneratingPdf}
        projects={projects}
        confirmedTools={confirmedTools}
      />
    </div>
  );
};
