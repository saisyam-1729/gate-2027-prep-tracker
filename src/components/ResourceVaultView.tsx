import React, { useState } from 'react';
import { CURATED_RESOURCE_VAULT } from '../data/initialData';
import { PaperCode, ResourceCategory } from '../types';
import {
  ExternalLink,
  Search,
  Youtube,
  Github,
  MessageSquare,
  GraduationCap,
  ShieldCheck,
  BookOpen,
} from 'lucide-react';

export const ResourceVaultView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [paperFilter, setPaperFilter] = useState<'ALL' | PaperCode>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | ResourceCategory>('ALL');

  const filteredResources = CURATED_RESOURCE_VAULT.filter((r) => {
    if (paperFilter !== 'ALL' && r.paper !== paperFilter && r.paper !== 'BOTH') {
      return false;
    }
    if (categoryFilter !== 'ALL' && r.category !== categoryFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.authorOrSource.toLowerCase().includes(q) ||
        (r.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const getCategoryBadge = (cat: ResourceCategory) => {
    switch (cat) {
      case 'official':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <ShieldCheck className="w-3.5 h-3.5" /> Official IITM / NPTEL
          </span>
        );
      case 'github':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-700/80 text-slate-200 border border-slate-600">
            <Github className="w-3.5 h-3.5" /> GitHub Repo
          </span>
        );
      case 'youtube':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
            <Youtube className="w-3.5 h-3.5" /> YouTube Channel / Playlist
          </span>
        );
      case 'nptel':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <GraduationCap className="w-3.5 h-3.5" /> NPTEL IIT Course
          </span>
        );
      case 'forum':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <MessageSquare className="w-3.5 h-3.5" /> Discussion Forum
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            <BookOpen className="w-3.5 h-3.5" /> Practice / PYQ
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white">
          End-to-End Verified GATE 2027 Resource Hub (GitHub, YouTube, NPTEL, Forums & Official)
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Every link below has been verified for your GATE 2027 Data Science & AI (DA) and Robotics
          & Automation (RA — Part B1 Electrical) preparation. In addition to these master links,
          every individual topic in the Topic Tracker also has its own primary resource and direct
          video/PYQ links attached.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search GitHub repos, NPTEL courses, Brian Douglas, Modern Robotics, GateOverflow..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
            {(['ALL', 'RA', 'DA', 'GA', 'CCA_F', 'GCP_PMLE'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPaperFilter(p)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition ${
                  paperFilter === p
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {p === 'ALL'
                  ? 'All Tracks'
                  : p === 'CCA_F'
                  ? 'Claude CCA-F'
                  : p === 'GCP_PMLE'
                  ? 'GCP ML Eng'
                  : `GATE ${p}`}
              </button>
            ))}
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as 'ALL' | ResourceCategory)}
            className="rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs font-semibold text-slate-200"
          >
            <option value="ALL">All Categories ({CURATED_RESOURCE_VAULT.length})</option>
            <option value="official">Official IIT Madras & Portals</option>
            <option value="github">GitHub Repositories & Notes</option>
            <option value="nptel">NPTEL IIT Video Courses</option>
            <option value="youtube">YouTube Channels & Playlists</option>
            <option value="forum">Discussion Forums & Communities</option>
            <option value="practice">Practice & Question Banks</option>
          </select>
        </div>
      </div>

      {/* Proxy Paper Strategy Guide for GATE RA */}
      <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-xl p-5">
        <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider mb-2">
          Strategic Note: How to Use Past GATE Proxy Papers for the New GATE 2027 RA Paper
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs text-slate-300">
          <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-3">
            <div className="font-bold text-white mb-1">1. Circuits, Control & Signals</div>
            Use <span className="text-indigo-300 font-semibold">GATE EE, EC & IN</span> past papers
            (1-mark & 2-mark questions on KCL/KVL, Thevenin, Transients, Routh-Hurwitz, Bode, Root
            Locus, Z-Transform, Sampling).
          </div>
          <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-3">
            <div className="font-bold text-white mb-1">2. Sensors, Op-Amps & Actuators</div>
            Use <span className="text-emerald-300 font-semibold">GATE IN (Instrumentation)</span>{' '}
            past papers for LVDT, Strain Gauge, Piezoelectric, Hall Effect, Charge Amplifiers, ADC/DAC,
            and Optical Encoders.
          </div>
          <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-3">
            <div className="font-bold text-white mb-1">3. Mechanics, Kinematics & CIM</div>
            Use <span className="text-amber-300 font-semibold">GATE ME & PI (Production)</span> past
            papers for Trusses, Friction, Rigid Body Plane Motion, Grübler’s DOF, DH Forward
            Kinematics, CNC BLU, and AGVs.
          </div>
          <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-3">
            <div className="font-bold text-white mb-1">4. Maths, Python, DSA & GA</div>
            Use <span className="text-cyan-300 font-semibold">GATE DA & CS</span> past papers (2024–2026)
            — 100% shared preparation between your RA and DA papers!
          </div>
        </div>
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map((res) => (
          <a
            key={res.id}
            href={res.url}
            target="_blank"
            rel="noreferrer"
            className="group bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-5 flex flex-col justify-between transition"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                {getCategoryBadge(res.category)}
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {res.paper}
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition flex items-start justify-between gap-2">
                <span>{res.title}</span>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 shrink-0 mt-1" />
              </h3>
              <div className="text-xs text-indigo-400/90 font-medium mt-1">
                {res.authorOrSource}
              </div>
              <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">{res.description}</p>
            </div>

            {res.tags && res.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-800/80">
                {res.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  );
};
