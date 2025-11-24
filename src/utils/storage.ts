import type { AppSettings, DistractionNote, Statistics } from '../types';
import { DEFAULT_TIMER_SETTINGS, THEMES } from './constants';

const STORAGE_KEYS = {
  SETTINGS: 'pomodoro_settings',
  STATISTICS: 'pomodoro_statistics',
  DISTRACTIONS: 'pomodoro_distractions',
};

export const loadSettings = (): AppSettings => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...parsed,
        timer: { ...DEFAULT_TIMER_SETTINGS, ...parsed.timer },
      };
    }
  } catch (error) {
    console.error('Error loading settings:', error);
  }

  return {
    timer: DEFAULT_TIMER_SETTINGS,
    selectedTheme: THEMES[0].id,
    selectedBackground: 'city',
    soundEnabled: true,
    notificationsEnabled: true,
    volume: 0.5,
  };
};

export const saveSettings = (settings: AppSettings): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
};

export const loadStatistics = (): Statistics => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.STATISTICS);
    if (stored) {
      const parsed = JSON.parse(stored);
      const stats: Statistics = {
        totalPomodoros: 0,
        totalShortBreaks: 0,
        totalLongBreaks: 0,
        totalTimeInSeconds: 0,
        todayPomodoros: 0,
        lastSessionDate: new Date().toISOString(),
        lastPomodoroDate: new Date().toISOString(),
        currentStreak: 0,
        bestStreak: 0,
        ...parsed,
      };

      // Reset daily stats if it's a new day
      const lastPomodoro = new Date(stats.lastPomodoroDate || stats.lastSessionDate);
      const today = new Date();
      const diffDays = Math.floor(
        (today.setHours(0, 0, 0, 0) - lastPomodoro.setHours(0, 0, 0, 0)) /
          (1000 * 60 * 60 * 24)
      );

      if (diffDays >= 1) {
        return {
          ...stats,
          todayPomodoros: 0,
          currentStreak: diffDays === 1 ? stats.currentStreak : 0,
          lastSessionDate: today.toISOString(),
        };
      }

      return stats;
    }
  } catch (error) {
    console.error('Error loading statistics:', error);
  }

  return {
    totalPomodoros: 0,
    totalShortBreaks: 0,
    totalLongBreaks: 0,
    totalTimeInSeconds: 0,
    todayPomodoros: 0,
    lastSessionDate: new Date().toISOString(),
    lastPomodoroDate: new Date().toISOString(),
    currentStreak: 0,
    bestStreak: 0,
  };
};

export const saveStatistics = (statistics: Statistics): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.STATISTICS, JSON.stringify(statistics));
  } catch (error) {
    console.error('Error saving statistics:', error);
  }
};

export const loadDistractions = (): DistractionNote[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.DISTRACTIONS);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => ({
          id: item.id ?? crypto.randomUUID?.() ?? String(Date.now()),
          text: item.text ?? '',
          timestamp: item.timestamp ?? new Date().toISOString(),
          resolved: Boolean(item.resolved),
        }));
      }
    }
  } catch (error) {
    console.error('Error loading distractions:', error);
  }

  return [];
};

export const saveDistractions = (distractions: DistractionNote[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.DISTRACTIONS, JSON.stringify(distractions));
  } catch (error) {
    console.error('Error saving distractions:', error);
  }
};
