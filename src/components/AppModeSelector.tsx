import { Timer, TimerReset, Clock, Coffee } from 'lucide-react';
import type { AppMode } from '../types';

interface AppModeSelectorProps {
  currentMode: AppMode;
  onModeChange: (mode: AppMode) => void;
}

export const AppModeSelector = ({ currentMode, onModeChange }: AppModeSelectorProps) => {
  const modes: Array<{ id: AppMode; label: string; icon: React.JSX.Element }> = [
    { id: 'pomodoro', label: 'POMODORO', icon: <Coffee size={18} /> },
    { id: 'stopwatch', label: 'STOPWATCH', icon: <TimerReset size={18} /> },
    { id: 'timer', label: 'TIMER', icon: <Timer size={18} /> },
    { id: 'countdown', label: 'COUNTDOWN', icon: <Clock size={18} /> },
  ];

  return (
    <div className="app-mode-selector" role="tablist">
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onModeChange(mode.id)}
          className={`app-mode-button ${currentMode === mode.id ? 'active' : ''}`}
          role="tab"
          aria-selected={currentMode === mode.id}
          aria-label={mode.label}
        >
          {mode.icon}
          <span>{mode.label}</span>
        </button>
      ))}
    </div>
  );
};
