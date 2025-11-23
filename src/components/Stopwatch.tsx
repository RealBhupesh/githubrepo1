import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';
import type { Lap } from '../types';

export const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState<Lap[]>([]);

  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const accumulatedTimeRef = useRef<number>(0);

  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  };

  const start = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
      startTimeRef.current = Date.now();
      intervalRef.current = window.setInterval(() => {
        const now = Date.now();
        const elapsed = now - startTimeRef.current + accumulatedTimeRef.current;
        setElapsedTime(elapsed);
      }, 10); // Update every 10ms for smooth animation
    }
  }, [isRunning]);

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
    setLaps([]);
    accumulatedTimeRef.current = 0;
  }, []);

  const addLap = useCallback(() => {
    if (elapsedTime > 0) {
      const previousLapTime = laps.length > 0 ? laps[laps.length - 1].totalTime : 0;
      const lapTime = elapsedTime - previousLapTime;

      const newLap: Lap = {
        id: `lap-${Date.now()}`,
        lapNumber: laps.length + 1,
        lapTime,
        totalTime: elapsedTime,
        timestamp: Date.now(),
      };

      setLaps([...laps, newLap]);
    }
  }, [elapsedTime, laps]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="stopwatch-container">
      <div className="stopwatch-display">
        <div className="time-display" style={{ fontSize: '3.5rem', fontWeight: 700 }}>
          {formatTime(elapsedTime)}
        </div>
      </div>

      <div className="stopwatch-controls">
        <button
          onClick={isRunning ? pause : start}
          className="control-button primary-button"
          aria-label={isRunning ? 'Pause' : 'Start'}
        >
          {isRunning ? <Pause size={20} /> : <Play size={20} />}
          <span>{isRunning ? 'PAUSE' : 'START'}</span>
        </button>

        <button
          onClick={addLap}
          className="control-button secondary-button"
          disabled={elapsedTime === 0}
          aria-label="Add Lap"
        >
          <Flag size={20} />
          <span>LAP</span>
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

      {laps.length > 0 && (
        <div className="laps-container">
          <h3 className="laps-title">LAPS</h3>
          <div className="laps-list">
            {[...laps].reverse().map((lap, index) => {
              const displayNumber = laps.length - index;
              return (
                <div key={lap.id} className="lap-item">
                  <span className="lap-number">#{displayNumber}</span>
                  <span className="lap-time">{formatTime(lap.lapTime)}</span>
                  <span className="lap-total">{formatTime(lap.totalTime)}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
