import type { Theme, BackgroundImage, TimerSettings } from '../types';

export const DEFAULT_TIMER_SETTINGS: TimerSettings = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  autoStartBreaks: false,
  autoStartPomodoros: false,
  longBreakInterval: 4,
  soundEnabled: true,
  notificationsEnabled: true,
  volume: 0.5,
};

export const THEMES: Theme[] = [
  {
    id: 'sunset',
    name: 'Sunset',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    primary: '#667eea',
    secondary: '#764ba2',
    text: '#ffffff',
    textSecondary: '#e0e0e0',
    accent: '#ffd700',
  },
  {
    id: 'ocean',
    name: 'Ocean',
    background: 'linear-gradient(135deg, #2e3192 0%, #1bffff 100%)',
    primary: '#2e3192',
    secondary: '#1bffff',
    text: '#ffffff',
    textSecondary: '#e0e0e0',
    accent: '#00d4ff',
  },
  {
    id: 'forest',
    name: 'Forest',
    background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    primary: '#0f2027',
    secondary: '#2c5364',
    text: '#ffffff',
    textSecondary: '#b0b0b0',
    accent: '#4ade80',
  },
  {
    id: 'midnight',
    name: 'Midnight',
    background: 'linear-gradient(135deg, #000000 0%, #434343 100%)',
    primary: '#000000',
    secondary: '#434343',
    text: '#ffffff',
    textSecondary: '#999999',
    accent: '#bb86fc',
  },
  {
    id: 'cherry',
    name: 'Cherry',
    background: 'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)',
    primary: '#eb3349',
    secondary: '#f45c43',
    text: '#ffffff',
    textSecondary: '#ffebee',
    accent: '#ffd700',
  },
  {
    id: 'lavender',
    name: 'Lavender',
    background: 'linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)',
    primary: '#8e2de2',
    secondary: '#4a00e0',
    text: '#ffffff',
    textSecondary: '#e8d5f5',
    accent: '#ffd700',
  },
];

export const BACKGROUND_IMAGES: BackgroundImage[] = [
  {
    id: 'city',
    name: 'City Skyline',
    url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1920&q=80',
  },
  {
    id: 'mountains',
    name: 'Mountains',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
  },
  {
    id: 'beach',
    name: 'Beach',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80',
  },
  {
    id: 'northern-lights',
    name: 'Northern Lights',
    url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1920&q=80',
  },
  {
    id: 'night-sky',
    name: 'Night Sky',
    url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=80',
  },
  {
    id: 'coffee-shop',
    name: 'Coffee Shop',
    url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1920&q=80',
  },
];

export const KEYBOARD_SHORTCUTS = {
  START_PAUSE: ' ',
  RESET: 'r',
  SKIP: 's',
  SETTINGS: 'c',
  FULLSCREEN: 'f',
  ESCAPE: 'Escape',
};
