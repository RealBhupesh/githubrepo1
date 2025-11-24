// App modes
export type AppMode = 'pomodoro' | 'stopwatch' | 'timer' | 'countdown';

// Timer modes (for Pomodoro)
export type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak';

export type TimerStatus = 'idle' | 'running' | 'paused';

export interface TimerSettings {
  pomodoro: number; // in minutes
  shortBreak: number;
  longBreak: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  longBreakInterval: number; // after how many pomodoros
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  volume: number; // 0-1
  dailyGoal: number; // target pomodoros per day
}

// Stopwatch lap interface
export interface Lap {
  id: string;
  lapNumber: number;
  lapTime: number;
  totalTime: number;
  timestamp: number;
}

// Timer preset interface
export interface TimerPreset {
  id: string;
  name: string;
  duration: number; // in seconds
  category: 'work' | 'break' | 'exercise' | 'custom';
}

// Timer history interface
export interface TimerHistoryEntry {
  id: string;
  mode: AppMode;
  timerMode?: TimerMode; // for pomodoro
  duration: number; // in seconds
  completed: boolean;
  timestamp: number;
  label?: string;
}

export interface Theme {
  id: string;
  name: string;
  background: string;
  primary: string;
  secondary: string;
  text: string;
  textSecondary: string;
  accent: string;
}

export interface BackgroundImage {
  id: string;
  name: string;
  url: string;
  thumbnail?: string;
}

export interface Statistics {
  totalPomodoros: number;
  totalShortBreaks: number;
  totalLongBreaks: number;
  totalTimeInSeconds: number;
  todayPomodoros: number;
  lastSessionDate: string;
  lastPomodoroDate: string;
  currentStreak: number;
  bestStreak: number;
}

export interface AppSettings {
  timer: TimerSettings;
  selectedTheme: string;
  selectedBackground: string | null;
  customBackgroundUrl?: string;
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  volume: number;
}
