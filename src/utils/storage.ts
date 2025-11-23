import type { AppSettings, Statistics } from '../types';
import { DEFAULT_TIMER_SETTINGS, THEMES } from './constants';

const STORAGE_KEYS = {
  SETTINGS: 'pomodoro_settings',
  STATISTICS: 'pomodoro_statistics',
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
      const stats = JSON.parse(stored);

      // Reset daily stats if it's a new day
      const lastDate = new Date(stats.lastSessionDate);
      const today = new Date();
      if (lastDate.toDateString() !== today.toDateString()) {
        return {
          ...stats,
          todayPomodoros: 0,
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
  };
};

export const saveStatistics = (statistics: Statistics): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.STATISTICS, JSON.stringify(statistics));
  } catch (error) {
    console.error('Error saving statistics:', error);
  }
};
