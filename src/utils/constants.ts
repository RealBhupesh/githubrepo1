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
    id: 'classic',
    name: 'CLASSIC',
    background: '#FFFFFF',
    primary: '#FF6600',
    secondary: '#FFFF00',
    text: '#000000',
    textSecondary: '#CCCCCC',
    accent: '#FF6600',
  },
  {
    id: 'orange',
    name: 'ORANGE',
    background: '#FF6600',
    primary: '#000000',
    secondary: '#FFFF00',
    text: '#FFFFFF',
    textSecondary: '#FFE5CC',
    accent: '#FFFF00',
  },
  {
    id: 'yellow',
    name: 'YELLOW',
    background: '#FFFF00',
    primary: '#000000',
    secondary: '#FF6600',
    text: '#000000',
    textSecondary: '#666666',
    accent: '#FF6600',
  },
  {
    id: 'black',
    name: 'BLACK',
    background: '#000000',
    primary: '#FF6600',
    secondary: '#FFFF00',
    text: '#FFFFFF',
    textSecondary: '#CCCCCC',
    accent: '#FFFF00',
  },
  {
    id: 'red',
    name: 'RED',
    background: '#FF0000',
    primary: '#000000',
    secondary: '#FFFF00',
    text: '#FFFFFF',
    textSecondary: '#FFCCCC',
    accent: '#FFFF00',
  },
  {
    id: 'green',
    name: 'GREEN',
    background: '#00FF00',
    primary: '#000000',
    secondary: '#FF6600',
    text: '#000000',
    textSecondary: '#006600',
    accent: '#FF6600',
  },
  {
    id: 'blue',
    name: 'BLUE',
    background: '#0000FF',
    primary: '#FFFF00',
    secondary: '#FF6600',
    text: '#FFFFFF',
    textSecondary: '#CCCCFF',
    accent: '#FFFF00',
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
