import { useState, useEffect, useCallback, useRef } from 'react';
import type { TimerMode, TimerStatus, TimerSettings } from '../types';
import { playSound, showNotification } from '../utils/helpers';

interface UseTimerProps {
  settings: TimerSettings;
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  volume: number;
  onSessionComplete: (mode: TimerMode) => void;
}

export const useTimer = ({
  settings,
  soundEnabled,
  notificationsEnabled,
  volume,
  onSessionComplete,
}: UseTimerProps) => {
  const [mode, setMode] = useState<TimerMode>('pomodoro');
  const [status, setStatus] = useState<TimerStatus>('idle');
  const [secondsLeft, setSecondsLeft] = useState(settings.pomodoro * 60);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  const intervalRef = useRef<number | null>(null);
  const secondsLeftRef = useRef(secondsLeft);
  const modeRef = useRef(mode);
  const statusRef = useRef(status);

  // Update refs when state changes
  useEffect(() => {
    secondsLeftRef.current = secondsLeft;
    modeRef.current = mode;
    statusRef.current = status;
  }, [secondsLeft, mode, status]);

  const getModeDuration = useCallback((timerMode: TimerMode): number => {
    switch (timerMode) {
      case 'pomodoro':
        return settings.pomodoro * 60;
      case 'shortBreak':
        return settings.shortBreak * 60;
      case 'longBreak':
        return settings.longBreak * 60;
    }
  }, [settings]);

  const switchMode = useCallback((newMode: TimerMode) => {
    setMode(newMode);
    const duration = getModeDuration(newMode);
    setSecondsLeft(duration);
    setStatus('idle');
  }, [getModeDuration]);

  const tick = useCallback(() => {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);

    if (secondsLeftRef.current === 0) {
      // Timer completed
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      const currentMode = modeRef.current;

      // Play sound
      if (soundEnabled) {
        playSound(volume);
      }

      // Show notification
      if (notificationsEnabled) {
        const messages = {
          pomodoro: 'Great work! Time for a break.',
          shortBreak: 'Break is over. Ready to focus?',
          longBreak: 'Long break finished. Ready for another session?',
        };
        showNotification('Timer Complete!', messages[currentMode]);
      }

      // Update completed pomodoros
      if (currentMode === 'pomodoro') {
        setCompletedPomodoros(prev => prev + 1);
        onSessionComplete(currentMode);
      } else {
        onSessionComplete(currentMode);
      }

      // Auto-start next session
      let nextMode: TimerMode = 'pomodoro';
      let shouldAutoStart = false;

      if (currentMode === 'pomodoro') {
        const nextPomodoroCount = completedPomodoros + 1;
        if (nextPomodoroCount % settings.longBreakInterval === 0) {
          nextMode = 'longBreak';
        } else {
          nextMode = 'shortBreak';
        }
        shouldAutoStart = settings.autoStartBreaks;
      } else {
        nextMode = 'pomodoro';
        shouldAutoStart = settings.autoStartPomodoros;
      }

      setMode(nextMode);
      const nextDuration = getModeDuration(nextMode);
      setSecondsLeft(nextDuration);
      secondsLeftRef.current = nextDuration;

      if (shouldAutoStart) {
        setStatus('running');
        statusRef.current = 'running';
        intervalRef.current = window.setInterval(tick, 1000);
      } else {
        setStatus('idle');
        statusRef.current = 'idle';
      }
    }
  }, [soundEnabled, notificationsEnabled, volume, completedPomodoros, settings, getModeDuration, onSessionComplete]);

  const start = useCallback(() => {
    setStatus('running');
    if (intervalRef.current === null) {
      intervalRef.current = window.setInterval(tick, 1000);
    }
  }, [tick]);

  const pause = useCallback(() => {
    setStatus('paused');
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const toggle = useCallback(() => {
    if (statusRef.current === 'running') {
      pause();
    } else {
      start();
    }
  }, [start, pause]);

  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setStatus('idle');
    const duration = getModeDuration(modeRef.current);
    setSecondsLeft(duration);
  }, [getModeDuration]);

  const skip = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const currentMode = modeRef.current;
    let nextMode: TimerMode = 'pomodoro';

    if (currentMode === 'pomodoro') {
      const nextPomodoroCount = completedPomodoros;
      if (nextPomodoroCount % settings.longBreakInterval === 0) {
        nextMode = 'longBreak';
      } else {
        nextMode = 'shortBreak';
      }
    } else {
      nextMode = 'pomodoro';
    }

    setMode(nextMode);
    const duration = getModeDuration(nextMode);
    setSecondsLeft(duration);
    setStatus('idle');
  }, [completedPomodoros, settings.longBreakInterval, getModeDuration]);

  // Update timer when settings change
  useEffect(() => {
    if (statusRef.current === 'idle') {
      const duration = getModeDuration(modeRef.current);
      setSecondsLeft(duration);
    }
  }, [settings, getModeDuration]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    mode,
    status,
    secondsLeft,
    completedPomodoros,
    start,
    pause,
    toggle,
    reset,
    skip,
    switchMode,
  };
};
