import { X, Trophy, Clock, Coffee, TrendingUp, Flame, Target } from 'lucide-react';
import type { Statistics } from '../types';
import { formatDuration } from '../utils/helpers';

interface StatisticsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  statistics: Statistics;
  dailyGoal: number;
}

export const StatisticsPanel = ({ isOpen, onClose, statistics, dailyGoal }: StatisticsPanelProps) => {
  if (!isOpen) return null;

  const goalProgress = dailyGoal > 0 ? Math.round((statistics.todayPomodoros / dailyGoal) * 100) : 0;

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2>Statistics</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="settings-content">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <Trophy />
              </div>
              <div className="stat-value">{statistics.todayPomodoros}</div>
              <div className="stat-label">Today's Sessions</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <Target />
              </div>
              <div className="stat-value">{goalProgress}%</div>
              <div className="stat-label">Daily Progress ({statistics.todayPomodoros}/{dailyGoal})</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <TrendingUp />
              </div>
              <div className="stat-value">{statistics.totalPomodoros}</div>
              <div className="stat-label">Total Pomodoros</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <Coffee />
              </div>
              <div className="stat-value">
                {statistics.totalShortBreaks + statistics.totalLongBreaks}
              </div>
              <div className="stat-label">Total Breaks</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <Clock />
              </div>
              <div className="stat-value">{formatDuration(statistics.totalTimeInSeconds)}</div>
              <div className="stat-label">Total Focus Time</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <Flame />
              </div>
              <div className="stat-value">{statistics.currentStreak}d</div>
              <div className="stat-label">Current Streak (best {statistics.bestStreak}d)</div>
            </div>
          </div>

          <div className="stats-details">
            <h3>Breakdown</h3>
            <div className="stats-breakdown">
              <div className="breakdown-item">
                <span>Short Breaks:</span>
                <span>{statistics.totalShortBreaks}</span>
              </div>
              <div className="breakdown-item">
                <span>Long Breaks:</span>
                <span>{statistics.totalLongBreaks}</span>
              </div>
              <div className="breakdown-item">
                <span>Average per day:</span>
                <span>
                  {statistics.totalPomodoros > 0
                    ? Math.round(statistics.totalPomodoros / Math.max(1, getDaysSinceStart(statistics.lastSessionDate)))
                    : 0}{' '}
                  sessions
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function getDaysSinceStart(lastSessionDate: string): number {
  const lastDate = new Date(lastSessionDate);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - lastDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDays);
}
