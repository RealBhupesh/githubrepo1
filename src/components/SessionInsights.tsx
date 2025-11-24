import { Flame, Target, Clock3, ChevronRight, Zap } from 'lucide-react';
import type { TimerMode, TimerStatus } from '../types';
import { formatClockTime, formatTime } from '../utils/helpers';

interface SessionInsightsProps {
  goal: number;
  todayPomodoros: number;
  currentStreak: number;
  bestStreak: number;
  nextMode: TimerMode;
  nextDuration: number;
  currentMode: TimerMode;
  secondsLeft: number;
  status: TimerStatus;
  completedPomodoros: number;
  longBreakInterval: number;
  autoStartNext: boolean;
}

const MODE_LABELS: Record<TimerMode, string> = {
  pomodoro: 'Focus session',
  shortBreak: 'Short break',
  longBreak: 'Long break',
};

const MODE_COLORS: Record<TimerMode, string> = {
  pomodoro: 'var(--te-orange)',
  shortBreak: 'var(--te-green, #1abc9c)',
  longBreak: 'var(--te-blue, #3498db)',
};

export const SessionInsights = ({
  goal,
  todayPomodoros,
  currentStreak,
  bestStreak,
  nextMode,
  nextDuration,
  currentMode,
  secondsLeft,
  status,
  completedPomodoros,
  longBreakInterval,
  autoStartNext,
}: SessionInsightsProps) => {
  const progress = goal > 0 ? Math.min(100, Math.round((todayPomodoros / goal) * 100)) : 0;
  const cyclePosition = (completedPomodoros % longBreakInterval) + 1;
  const timeDescriptor = status === 'running' ? 'Ends at' : 'If started now, ends by';

  return (
    <div className="insights-grid" aria-label="Session insights">
      <div className="insight-card goal-card">
        <div className="insight-card__header">
          <div className="insight-title">
            <Target size={18} />
            <span>Daily goal</span>
          </div>
          <span className="insight-meta">{progress}%</span>
        </div>

        <div className="goal-progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="goal-progress__bar" style={{ width: `${progress}%` }} />
        </div>

        <div className="goal-stats">
          <div>
            <div className="goal-label">Completed today</div>
            <div className="goal-value">{todayPomodoros} / {goal}</div>
          </div>
          <div className="streak-chip" aria-label={`Current streak ${currentStreak} days`}>
            <Flame size={16} />
            <span>{currentStreak} day{currentStreak === 1 ? '' : 's'}</span>
            <span className="streak-best">Best {bestStreak}</span>
          </div>
        </div>
      </div>

      <div className="insight-card next-card">
        <div className="insight-card__header">
          <div className="insight-title">
            <Clock3 size={18} />
            <span>Up next</span>
          </div>
          <span className="insight-meta" style={{ color: MODE_COLORS[currentMode] }}>
            {MODE_LABELS[currentMode]}
          </span>
        </div>

        <div className="next-session">
          <div className="next-session__current">
            <div className="label">Current</div>
            <div className="value">{formatTime(secondsLeft)}</div>
            <div className="hint">{timeDescriptor} {formatClockTime(secondsLeft)}</div>
          </div>

          <ChevronRight className="next-arrow" size={20} aria-hidden="true" />

          <div className="next-session__upcoming" aria-label={`Next session ${MODE_LABELS[nextMode]}`}>
            <div className="label">Next</div>
            <div className="value" style={{ color: MODE_COLORS[nextMode] }}>
              {MODE_LABELS[nextMode]}
            </div>
            <div className="hint">{formatTime(nextDuration)}</div>
            <div className="pill">
              <Zap size={14} />
              <span>{autoStartNext ? 'Auto-start enabled' : 'Manual start'}</span>
            </div>
          </div>
        </div>

        <div className="cycle-footnote">
          Cycle {cyclePosition} / {longBreakInterval} · Long break every {longBreakInterval} sessions
        </div>
      </div>
    </div>
  );
};
