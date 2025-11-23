import { Play, Pause, RotateCcw, SkipForward, Settings } from 'lucide-react';
import type { TimerStatus } from '../types';

interface TimerControlsProps {
  status: TimerStatus;
  onToggle: () => void;
  onReset: () => void;
  onSkip: () => void;
  onSettings: () => void;
}

export const TimerControls = ({
  status,
  onToggle,
  onReset,
  onSkip,
  onSettings,
}: TimerControlsProps) => {
  return (
    <div className="timer-controls" role="group" aria-label="Timer controls">
      <button
        className="control-button start-button"
        onClick={onToggle}
        title="Start/Pause (Space)"
        aria-label={status === 'running' ? 'Pause timer' : 'Start timer'}
      >
        {status === 'running' ? <Pause size={24} aria-hidden="true" /> : <Play size={24} aria-hidden="true" />}
        <span>{status === 'running' ? 'Pause' : 'Start'}</span>
      </button>

      <button
        className="control-button icon-button"
        onClick={onReset}
        title="Reset (R)"
        aria-label="Reset timer"
      >
        <RotateCcw size={24} aria-hidden="true" />
      </button>

      <button
        className="control-button icon-button"
        onClick={onSkip}
        title="Skip (S)"
        aria-label="Skip to next session"
      >
        <SkipForward size={24} aria-hidden="true" />
      </button>

      <button
        className="control-button icon-button settings-button"
        onClick={onSettings}
        title="Settings (C)"
        aria-label="Open settings"
      >
        <Settings size={24} aria-hidden="true" />
      </button>
    </div>
  );
};
