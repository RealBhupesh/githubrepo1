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
    <div className="timer-controls">
      <button className="control-button start-button" onClick={onToggle} title="Start/Pause (Space)">
        {status === 'running' ? <Pause size={24} /> : <Play size={24} />}
        <span>{status === 'running' ? 'Pause' : 'Start'}</span>
      </button>

      <button className="control-button icon-button" onClick={onReset} title="Reset (R)">
        <RotateCcw size={24} />
      </button>

      <button className="control-button icon-button" onClick={onSkip} title="Skip (S)">
        <SkipForward size={24} />
      </button>

      <button className="control-button icon-button settings-button" onClick={onSettings} title="Settings (C)">
        <Settings size={24} />
      </button>
    </div>
  );
};
