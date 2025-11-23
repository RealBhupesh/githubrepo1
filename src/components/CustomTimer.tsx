import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { playSound, showNotification } from '../utils/helpers';

interface CustomTimerProps {
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  volume: number;
}

export const CustomTimer = ({ soundEnabled, notificationsEnabled, volume }: CustomTimerProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [targetTime, setTargetTime] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);

  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const accumulatedTimeRef = useRef<number>(0);

  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    if (h > 0) {
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const start = useCallback(() => {
    if (!isRunning) {
      if (targetTime === 0) {
        const target = hours * 3600000 + minutes * 60000 + seconds * 1000;
        setTargetTime(target);
      }

      setIsRunning(true);
      startTimeRef.current = Date.now();
      intervalRef.current = window.setInterval(() => {
        const now = Date.now();
        const elapsed = now - startTimeRef.current + accumulatedTimeRef.current;
        setElapsedTime(elapsed);

        // Check if timer reached target (countdown mode)
        if (targetTime > 0 && elapsed >= targetTime) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setIsRunning(false);
          setElapsedTime(targetTime);

          // Play sound and notification
          if (soundEnabled) {
            playSound(volume);
          }
          if (notificationsEnabled) {
            showNotification('Timer Complete!', 'Your custom timer has finished!');
          }
        }
      }, 100);
    }
  }, [isRunning, hours, minutes, seconds, targetTime, soundEnabled, notificationsEnabled, volume]);

  const pause = useCallback(() => {
    if (isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      accumulatedTimeRef.current = elapsedTime;
      setIsRunning(false);
    }
  }, [isRunning, elapsedTime]);

  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
    setElapsedTime(0);
    setTargetTime(0);
    accumulatedTimeRef.current = 0;
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const displayTime = targetTime > 0 ? Math.max(0, targetTime - elapsedTime) : elapsedTime;

  return (
    <div className="custom-timer-container">
      {!isRunning && elapsedTime === 0 && (
        <div className="timer-setup">
          <div className="time-inputs">
            <div className="time-input-group">
              <label htmlFor="hours">HRS</label>
              <input
                id="hours"
                type="number"
                min="0"
                max="23"
                value={hours}
                onChange={(e) => setHours(Math.max(0, Math.min(23, parseInt(e.target.value) || 0)))}
                className="time-input"
              />
            </div>
            <span className="time-separator">:</span>
            <div className="time-input-group">
              <label htmlFor="minutes">MIN</label>
              <input
                id="minutes"
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => setMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                className="time-input"
              />
            </div>
            <span className="time-separator">:</span>
            <div className="time-input-group">
              <label htmlFor="seconds">SEC</label>
              <input
                id="seconds"
                type="number"
                min="0"
                max="59"
                value={seconds}
                onChange={(e) => setSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                className="time-input"
              />
            </div>
          </div>
        </div>
      )}

      <div className="timer-display">
        <div className="time-display" style={{ fontSize: '3.5rem', fontWeight: 700 }}>
          {formatTime(displayTime)}
        </div>
      </div>

      <div className="timer-controls">
        <button
          onClick={isRunning ? pause : start}
          className="control-button primary-button"
          disabled={!isRunning && hours === 0 && minutes === 0 && seconds === 0}
          aria-label={isRunning ? 'Pause' : 'Start'}
        >
          {isRunning ? <Pause size={20} /> : <Play size={20} />}
          <span>{isRunning ? 'PAUSE' : 'START'}</span>
        </button>

        <button
          onClick={reset}
          className="control-button secondary-button"
          aria-label="Reset"
        >
          <RotateCcw size={20} />
          <span>RESET</span>
        </button>
      </div>
    </div>
  );
};
