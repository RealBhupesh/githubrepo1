import { formatTime } from '../utils/helpers';

interface TimerDisplayProps {
  secondsLeft: number;
  isRunning: boolean;
}

export const TimerDisplay = ({ secondsLeft, isRunning }: TimerDisplayProps) => {
  return (
    <div className="timer-display">
      <div className={`timer-text ${isRunning ? 'running' : ''}`}>
        {formatTime(secondsLeft)}
      </div>
    </div>
  );
};
