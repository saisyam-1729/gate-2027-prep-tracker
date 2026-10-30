import React from 'react';
import { WeeklyHourEntry } from '../types';
import { Clock, TrendingUp, CheckCircle2, AlertTriangle } from 'lucide-react';

interface HoursLogViewProps {
  weeklyHours: WeeklyHourEntry[];
  onUpdateWeekHours: (
    weekNumber: number,
    field: 'raHours' | 'daHours' | 'gaHours' | 'certHours' | 'notes',
    value: number | string
  ) => void;
}

export const HoursLogView: React.FC<HoursLogViewProps> = ({
  weeklyHours,
  onUpdateWeekHours,
}) => {
  const totalLogged = weeklyHours.reduce(
    (sum, w) => sum + w.raHours + w.daHours + w.gaHours + (w.certHours || 0),
    0
  );
  const totalRA = weeklyHours.reduce((sum, w) => sum + w.raHours, 0);
  const totalDA = weeklyHours.reduce((sum, w) => sum + w.daHours, 0);
  const totalGA = weeklyHours.reduce((sum, w) => sum + w.gaHours, 0);
  const totalCert = weeklyHours.reduce((sum, w) => sum + (w.certHours || 0), 0);
  const totalTarget = weeklyHours.reduce((sum, w) => sum + w.targetHours, 0);

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Clock className="w-4 h-4" /> 17-Week Hours Log & 80/20 Split Monitor
            </div>
            <h2 className="text-xl font-bold text-white mt-1">
              Weekly Effort Against 15-Hour Target (~2h Weekdays + 5–6h/day Weekends)
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Working Rule from Handoff: Log hours honestly even when low so the tracker’s drift
              flags stay accurate. Target split is ~80% RA (~12h/wk), ~20% DA (~3h/wk), plus 15
              mins/day GA.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950 border border-slate-800 rounded-xl px-5 py-3">
            <div>
              <div className="text-xs text-slate-400">Cumulative Hours</div>
              <div className="text-2xl font-mono font-bold text-white">
                {totalLogged.toFixed(1)}{' '}
                <span className="text-sm text-slate-500">/ {totalTarget}h</span>
              </div>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div className="text-xs space-y-0.5 font-mono">
              <div className="text-indigo-300">RA: {totalRA.toFixed(1)}h</div>
              <div className="text-emerald-300">DA: {totalDA.toFixed(1)}h</div>
              <div className="text-amber-300">GA: {totalGA.toFixed(1)}h</div>
              <div className="text-violet-300">Certs: {totalCert.toFixed(1)}h</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {weeklyHours.map((week) => {
          const sum = week.raHours + week.daHours + week.gaHours + (week.certHours || 0);
          const pct = Math.min(100, Math.round((sum / Math.max(1, week.targetHours)) * 100));
          const today = new Date().toISOString().slice(0, 10);
          const isCurrentWeek = today >= week.startDate && today <= week.endDate;

          return (
            <div
              key={week.weekNumber}
              className={`rounded-xl border p-4 transition ${
                isCurrentWeek
                  ? 'bg-indigo-950/30 border-indigo-500/60 ring-1 ring-indigo-500/40'
                  : 'bg-slate-900/90 border-slate-800'
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                <div className="lg:col-span-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{week.label}</span>
                    {isCurrentWeek && (
                      <span className="px-2 py-0.5 rounded bg-indigo-500 text-white text-[10px] font-bold uppercase">
                        Active Week
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-2 bg-slate-950 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          sum >= week.targetHours
                            ? 'bg-emerald-500'
                            : sum >= week.targetHours * 0.7
                            ? 'bg-indigo-500'
                            : 'bg-amber-500'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-300">
                      {sum.toFixed(1)} / {week.targetHours}h
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 grid grid-cols-4 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-indigo-300 mb-1">
                      RA (80%)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min={0}
                      max={60}
                      value={week.raHours}
                      onChange={(e) =>
                        onUpdateWeekHours(week.weekNumber, 'raHours', Number(e.target.value))
                      }
                      className="w-full rounded-lg bg-slate-950 border border-slate-800 px-2.5 py-1.5 text-xs font-mono text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-emerald-300 mb-1">
                      DA (20%)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min={0}
                      max={40}
                      value={week.daHours}
                      onChange={(e) =>
                        onUpdateWeekHours(week.weekNumber, 'daHours', Number(e.target.value))
                      }
                      className="w-full rounded-lg bg-slate-950 border border-slate-800 px-2.5 py-1.5 text-xs font-mono text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-amber-300 mb-1">
                      GA (15m/d)
                    </label>
                    <input
                      type="number"
                      step="0.25"
                      min={0}
                      max={20}
                      value={week.gaHours}
                      onChange={(e) =>
                        onUpdateWeekHours(week.weekNumber, 'gaHours', Number(e.target.value))
                      }
                      className="w-full rounded-lg bg-slate-950 border border-slate-800 px-2.5 py-1.5 text-xs font-mono text-white"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-[11px] font-semibold text-violet-300 mb-1"
                      title="Google Cloud PMLE + Anthropic Claude CCA-F (~1.5h/wk micro-slot)"
                    >
                      Certs (~1.5h)
                    </label>
                    <input
                      type="number"
                      step="0.25"
                      min={0}
                      max={20}
                      value={week.certHours || 0}
                      onChange={(e) =>
                        onUpdateWeekHours(week.weekNumber, 'certHours', Number(e.target.value))
                      }
                      className="w-full rounded-lg bg-slate-950 border border-slate-800 px-2.5 py-1.5 text-xs font-mono text-white"
                    />
                  </div>
                </div>

                <div className="lg:col-span-3">
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Weekly Milestone & Reflection Notes
                  </label>
                  <input
                    type="text"
                    value={week.notes}
                    onChange={(e) =>
                      onUpdateWeekHours(week.weekNumber, 'notes', e.target.value)
                    }
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-1.5 text-xs text-slate-200"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
