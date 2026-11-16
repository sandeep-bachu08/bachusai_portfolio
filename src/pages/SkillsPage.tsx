import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Trash2 } from 'lucide-react';
import {
  PROGRAMMING_LANGUAGES,
  CONFIRMED_TOOLS,
  AREAS_OF_INTEREST,
  SkillItem,
} from '../data/portfolioData';

const STORAGE_KEY_TOOLS = 'sandeep_portfolio_confirmed_tools_v1';

export const SkillsPage: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [confirmedTools, setConfirmedTools] = useState<SkillItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TOOLS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return CONFIRMED_TOOLS;
  });

  const [newToolName, setNewToolName] = useState('');
  const [newToolLevel, setNewToolLevel] = useState('Basic');
  const [showAddToolInput, setShowAddToolInput] = useState(false);

  const handleAddConfirmedTool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newToolName.trim()) return;
    const updated = [
      ...confirmedTools,
      { name: newToolName.trim(), level: newToolLevel.trim() || 'Basic' },
    ];
    setConfirmedTools(updated);
    setNewToolName('');
    setShowAddToolInput(false);
    try {
      localStorage.setItem(STORAGE_KEY_TOOLS, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleRemoveTool = (name: string) => {
    const updated = confirmedTools.filter((t) => t.name !== name);
    setConfirmedTools(updated);
    try {
      localStorage.setItem(STORAGE_KEY_TOOLS, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const cardReveal = (index: number) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay: shouldReduceMotion ? 0 : 0.1 + index * 0.1,
    },
  });

  return (
    <div className="py-12 md:py-18 px-6 max-w-6xl mx-auto space-y-16">
      {/* Page Header */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-[#A65D70] mb-2">
          02. Technical Focus
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#642E3B] tracking-tight">
          Technical Skills
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#40363A]/85 max-w-2xl leading-relaxed">
          An honest, transparent representation of my current programming proficiencies, tools, and
          areas of interest. No misleading percentage bars or inflated claims.
        </p>
      </motion.div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {/* Column 1: Programming Languages */}
        <motion.div
          {...cardReveal(0)}
          className="bg-[#FFFFFF] border border-[#EBDDD7] rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:border-[#642E3B]/35 transition-colors"
        >
          <div>
            <div className="pb-4 mb-6 border-b border-[#EBDDD7]">
              <h2 className="text-lg font-bold text-[#642E3B]">1. Programming Languages</h2>
              <p className="text-xs text-[#A65D70] mt-0.5 font-medium">Core Software Foundation</p>
            </div>

            <ul className="divide-y divide-[#EBDDD7]/70">
              {PROGRAMMING_LANGUAGES.map((lang) => (
                <li key={lang.name} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-bold text-[#40363A]">{lang.name}</span>
                    <span className="text-xs font-semibold text-[#642E3B] bg-[#EBDDD7]/60 px-2.5 py-0.5 rounded-sm">
                      {lang.level}
                    </span>
                  </div>
                  {lang.note && (
                    <p className="mt-1.5 text-xs text-[#40363A]/80 leading-relaxed">{lang.note}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-[#EBDDD7]/70 text-xs text-[#40363A]/70 leading-relaxed">
            Continuously solving problems, developing scripting abilities, and studying algorithmic
            thinking.
          </div>
        </motion.div>

        {/* Column 2: Technologies and Tools */}
        <motion.div
          {...cardReveal(1)}
          className="bg-[#FFFFFF] border border-[#EBDDD7] rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:border-[#642E3B]/35 transition-colors"
        >
          <div>
            <div className="flex items-baseline justify-between pb-4 mb-6 border-b border-[#EBDDD7]">
              <div>
                <h2 className="text-lg font-bold text-[#642E3B]">2. Technologies &amp; Tools</h2>
                <p className="text-xs text-[#A65D70] mt-0.5 font-medium">Confirmed Stack</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddToolInput((prev) => !prev)}
                className="text-xs font-semibold text-[#642E3B] hover:text-[#A65D70] underline underline-offset-2 cursor-pointer whitespace-nowrap shrink-0"
              >
                {showAddToolInput ? 'Cancel' : '+ Add Tool'}
              </button>
            </div>

            <ul className="divide-y divide-[#EBDDD7]/70">
              {confirmedTools.map((tool) => (
                <li key={tool.name} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-bold text-[#40363A]">{tool.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#642E3B] bg-[#EBDDD7]/60 px-2.5 py-0.5 rounded-sm">
                        {tool.level}
                      </span>
                      {confirmedTools.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveTool(tool.name)}
                          aria-label={`Remove ${tool.name}`}
                          className="text-[#40363A]/40 hover:text-[#642E3B] cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                  {tool.note && (
                    <p className="mt-1.5 text-xs text-[#40363A]/80 leading-relaxed">{tool.note}</p>
                  )}
                </li>
              ))}
            </ul>

            {showAddToolInput && (
              <form
                onSubmit={handleAddConfirmedTool}
                className="mt-5 p-4 bg-[#FAF7F2] border border-[#EBDDD7] rounded-lg space-y-3"
              >
                <p className="text-xs font-semibold text-[#642E3B]">Confirm Additional Tool:</p>
                <input
                  type="text"
                  value={newToolName}
                  onChange={(e) => setNewToolName(e.target.value)}
                  placeholder="Tool name (e.g., Linux, VS Code)"
                  className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#EBDDD7] rounded-md text-[#40363A] focus:outline-none focus:border-[#642E3B]"
                />
                <div className="flex items-center gap-2">
                  <select
                    value={newToolLevel}
                    onChange={(e) => setNewToolLevel(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs bg-[#FFFFFF] border border-[#EBDDD7] rounded-md text-[#40363A] focus:outline-none focus:border-[#642E3B]"
                  >
                    <option value="Basic">Basic</option>
                    <option value="Currently Learning">Currently Learning</option>
                    <option value="Used in Academic Projects">Used in Academic Projects</option>
                  </select>
                  <button
                    type="submit"
                    className="px-3.5 py-2 text-xs font-semibold text-[#FFFFFF] bg-[#642E3B] rounded-md hover:bg-[#A65D70] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Save
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="mt-8 pt-4 border-t border-[#EBDDD7]/70 text-xs text-[#40363A]/70 leading-relaxed">
            Strict adherence to listing only confirmed tools used in actual projects.
          </div>
        </motion.div>

        {/* Column 3: Areas of Interest */}
        <motion.div
          {...cardReveal(2)}
          className="bg-[#FFFFFF] border border-[#EBDDD7] rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:border-[#642E3B]/35 transition-colors"
        >
          <div>
            <div className="pb-4 mb-6 border-b border-[#EBDDD7]">
              <h2 className="text-lg font-bold text-[#642E3B]">3. Areas of Interest</h2>
              <p className="text-xs text-[#A65D70] mt-0.5 font-medium">Academic Pursuits</p>
            </div>

            <ul className="divide-y divide-[#EBDDD7]/70">
              {AREAS_OF_INTEREST.map((interest) => (
                <li key={interest} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-bold text-[#40363A]">{interest}</span>
                    <span className="text-xs font-medium text-[#A65D70]">Academic Focus</span>
                  </div>
                  <p className="mt-1.5 text-xs text-[#40363A]/80 leading-relaxed">
                    Undergraduate study and coursework in artificial intelligence and machine
                    learning at Jain University.
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-[#EBDDD7]/70 text-xs text-[#40363A]/70 leading-relaxed">
            Developing foundational understanding of machine learning principles and Python.
          </div>
        </motion.div>
      </div>

      {/* Next Step Banner */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="bg-[#EBDDD7]/45 border border-[#EBDDD7] rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h3 className="text-base font-bold text-[#642E3B]">See these skills in practice</h3>
          <p className="text-xs sm:text-sm text-[#40363A]/80 mt-1">
            Explore the JAIN Smart Campus Navigation project and verified codebase on GitHub.
          </p>
        </div>
        <Link
          to="/projects"
          className="group inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#642E3B] bg-[#FFFFFF] border border-[#642E3B]/30 rounded-lg hover:bg-[#FAF7F2] transition-colors whitespace-nowrap shrink-0"
        >
          <span>View Featured Projects</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </div>
  );
};
