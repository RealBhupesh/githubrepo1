import type { TimerMode } from '../types';

interface ModeSelectorProps {
  currentMode: TimerMode;
  onModeChange: (mode: TimerMode) => void;
  disabled?: boolean;
}

export const ModeSelector = ({ currentMode, onModeChange, disabled }: ModeSelectorProps) => {
  const modes: { value: TimerMode; label: string }[] = [
    { value: 'pomodoro', label: 'Pomodoro' },
    { value: 'shortBreak', label: 'Short Break' },
    { value: 'longBreak', label: 'Long Break' },
  ];

  return (
    <div className="mode-selector">
      {modes.map((mode) => (
        <button
          key={mode.value}
          className={`mode-button ${currentMode === mode.value ? 'active' : ''}`}
          onClick={() => onModeChange(mode.value)}
          disabled={disabled}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
};
