import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';
import { playSound, showNotification } from '../utils/helpers';
import type { TimerPreset } from '../types';

interface CountdownTimerProps {
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  volume: number;
}

const DEFAULT_PRESETS: TimerPreset[] = [
  { id: '1', name: 'QUICK', duration: 300, category: 'work' }, // 5 min
  { id: '2', name: 'WORK', duration: 1500, category: 'work' }, // 25 min
  { id: '3', name: 'BREAK', duration: 300, category: 'break' }, // 5 min
  { id: '4', name: 'LONG BREAK', duration: 900, category: 'break' }, // 15 min
  { id: '5', name: 'EXERCISE', duration: 1800, category: 'exercise' }, // 30 min
];

export const CountdownTimer = ({ soundEnabled, notificationsEnabled, volume }: CountdownTimerProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [customMinutes, setCustomMinutes] = useState(10);

  const intervalRef = useRef<number | null>(null);
  const secondsLeftRef = useRef(secondsLeft);

  useEffect(() => {
    secondsLeftRef.current = secondsLeft;
  }, [secondsLeft]);

  const formatTime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    if (h > 0) {
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const tick = useCallback(() => {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);

    if (secondsLeftRef.current === 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsRunning(false);

      // Play sound and notification
      if (soundEnabled) {
        playSound(volume);
      }
      if (notificationsEnabled) {
        showNotification('Timer Complete!', 'Your countdown has finished!');
      }
    }
  }, [soundEnabled, notificationsEnabled, volume]);

  const start = useCallback(() => {
    if (!isRunning && secondsLeft > 0) {
      setIsRunning(true);
      intervalRef.current = window.setInterval(tick, 1000);
    }
  }, [isRunning, secondsLeft, tick]);

  const pause = useCallback(() => {
    if (isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsRunning(false);
    }
  }, [isRunning]);

  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
    setSecondsLeft(0);
    setSelectedPreset(null);
  }, []);

  const selectPreset = useCallback((preset: TimerPreset) => {
    if (!isRunning) {
      setSelectedPreset(preset.id);
      setSecondsLeft(preset.duration);
      secondsLeftRef.current = preset.duration;
    }
  }, [isRunning]);

  const setCustomTimer = useCallback(() => {
    if (!isRunning) {
      setSelectedPreset('custom');
      const duration = customMinutes * 60;
      setSecondsLeft(duration);
      secondsLeftRef.current = duration;
    }
  }, [isRunning, customMinutes]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="countdown-timer-container">
      {secondsLeft === 0 && !isRunning && (
        <div className="preset-selector">
          <h3 className="preset-title">SELECT PRESET</h3>
          <div className="preset-grid">
            {DEFAULT_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => selectPreset(preset)}
                className={`preset-button ${selectedPreset === preset.id ? 'selected' : ''}`}
              >
                <Clock size={16} />
                <span>{preset.name}</span>
                <span className="preset-duration">{formatTime(preset.duration)}</span>
              </button>
            ))}
          </div>

          <div className="custom-preset">
            <h4 className="custom-title">CUSTOM</h4>
            <div className="custom-input-group">
              <input
                type="number"
                min="1"
                max="999"
                value={customMinutes}
                onChange={(e) => setCustomMinutes(Math.max(1, Math.min(999, parseInt(e.target.value) || 1)))}
                className="custom-input"
              />
              <span>MINUTES</span>
              <button onClick={setCustomTimer} className="set-button">
                SET
              </button>
            </div>
          </div>
        </div>
      )}

      {secondsLeft > 0 && (
        <>
          <div className="countdown-display">
            <div className="time-display" style={{ fontSize: '3.5rem', fontWeight: 700 }}>
              {formatTime(secondsLeft)}
            </div>
          </div>

          <div className="countdown-controls">
            <button
              onClick={isRunning ? pause : start}
              className="control-button primary-button"
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
        </>
      )}
    </div>
  );
};
