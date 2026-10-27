import React, { useState } from 'react';
import { PortfolioProject, TopicStatus } from '../types';
import { Code2, Copy, Check, CheckCircle2, Terminal, Cpu } from 'lucide-react';

interface PortfolioLabViewProps {
  projects: PortfolioProject[];
  onUpdateProjectStatus: (projectId: string, status: TopicStatus) => void;
}

export const PortfolioLabView: React.FC<PortfolioLabViewProps> = ({
  projects,
  onUpdateProjectStatus,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyCode = async (id: string, code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
          <Cpu className="w-4 h-4" /> Hands-On Robotics Engineering Portfolio
        </div>
        <h2 className="text-xl font-bold text-white mt-1">
          Python Robotics & Control Simulations (Exam Mastery + Portfolio Pieces)
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          From your session handoff decisions: code the Forward Kinematics of a 2-link arm in
          Python (Phase 2) and simulate a closed-loop PID controller (Phase 3). Both deepen durable
          intuition for GATE RA 2-mark numericals and double as robotics engineering portfolio
          pieces.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Phase {proj.phase} • GATE {proj.paper}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {proj.libraries.map((lib) => (
                      <span
                        key={lib}
                        className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300"
                      >
                        {lib}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{proj.title}</h3>
                <p className="text-sm text-slate-300 mt-1">{proj.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={proj.status}
                  onChange={(e) =>
                    onUpdateProjectStatus(proj.id, e.target.value as TopicStatus)
                  }
                  className={`rounded-lg px-3 py-2 text-xs font-bold border ${
                    proj.status === 'done'
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                      : proj.status === 'in_progress'
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  <option value="not_started">Status: Not Started</option>
                  <option value="in_progress">Status: In Progress</option>
                  <option value="done">Status: Completed ✓</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2">
              <div className="lg:col-span-5 bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Project Deliverables Checklist
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  {proj.deliverables.map((deliv, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="font-mono text-indigo-400 font-bold">{idx + 1}.</span>
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" /> Ready-to-Run Python Starter
                    Template
                  </span>
                  <button
                    onClick={() => handleCopyCode(proj.id, proj.starterCodeSnippet)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition"
                  >
                    {copiedId === proj.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy Python Code
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-xs font-mono text-emerald-200/90 overflow-x-auto leading-relaxed p-2">
                  <code>{proj.starterCodeSnippet}</code>
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
