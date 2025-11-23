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
