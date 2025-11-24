import { useState, useEffect, useCallback } from 'react';
import { BarChart3 } from 'lucide-react';
import { AppModeSelector } from './components/AppModeSelector';
import { TimerDisplay } from './components/TimerDisplay';
import { ModeSelector } from './components/ModeSelector';
import { TimerControls } from './components/TimerControls';
import { Stopwatch } from './components/Stopwatch';
import { CustomTimer } from './components/CustomTimer';
import { CountdownTimer } from './components/CountdownTimer';
import { SettingsPanel } from './components/SettingsPanel';
import { StatisticsPanel } from './components/StatisticsPanel';
import { FullscreenButton } from './components/FullscreenButton';
import { SessionInsights } from './components/SessionInsights';
import { DistractionJournal } from './components/DistractionJournal';
import { ToastContainer } from './components/Toast';
import { useTimer } from './hooks/useTimer';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useFullscreen } from './hooks/useFullscreen';
import { useToast } from './hooks/useToast';
import {
  loadSettings,
  saveSettings,
  loadStatistics,
  saveStatistics,
  loadDistractions,
  saveDistractions,
} from './utils/storage';
import { requestNotificationPermission } from './utils/helpers';
import { analytics } from './utils/analytics';
import { THEMES, BACKGROUND_IMAGES } from './utils/constants';
import type { AppMode, TimerMode, Statistics, DistractionNote } from './types';
import './App.css';

function App() {
  const [appMode, setAppMode] = useState<AppMode>('pomodoro');
  const [settings, setSettings] = useState(() => loadSettings());
  const [statistics, setStatistics] = useState(() => loadStatistics());
  const [distractions, setDistractions] = useState<DistractionNote[]>(() => loadDistractions());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [showEscHint, setShowEscHint] = useState(false);

  const { isFullscreen, toggleFullscreen, exitFullscreen } = useFullscreen();
  const { toasts, closeToast, success, info } = useToast();

  const handleSessionComplete = useCallback(
    (mode: TimerMode) => {
      const now = new Date();

      setStatistics((prevStats) => {
        const lastSessionDate = new Date(prevStats.lastSessionDate);
        const isNewDay = lastSessionDate.toDateString() !== now.toDateString();
        const baseStats: Statistics = isNewDay
          ? { ...prevStats, todayPomodoros: 0 }
          : { ...prevStats };

        const updatedStats: Statistics = { ...baseStats, lastSessionDate: now.toISOString() };

        if (mode === 'pomodoro') {
          const lastPomodoro = new Date(prevStats.lastPomodoroDate);
          const dayDiff = Math.floor(
            (now.setHours(0, 0, 0, 0) - lastPomodoro.setHours(0, 0, 0, 0)) /
              (1000 * 60 * 60 * 24)
          );

          const isFirstPomodoroToday = updatedStats.todayPomodoros === 0;
          const nextStreak = isFirstPomodoroToday
            ? dayDiff === 1
              ? prevStats.currentStreak + 1
              : 1
            : updatedStats.currentStreak;

          updatedStats.currentStreak = Math.max(updatedStats.currentStreak, nextStreak);
          updatedStats.bestStreak = Math.max(updatedStats.bestStreak, nextStreak);
          updatedStats.totalPomodoros += 1;
          updatedStats.todayPomodoros += 1;
          updatedStats.totalTimeInSeconds += settings.timer.pomodoro * 60;
          updatedStats.lastPomodoroDate = now.toISOString();
        } else if (mode === 'shortBreak') {
          updatedStats.totalShortBreaks += 1;
          updatedStats.totalTimeInSeconds += settings.timer.shortBreak * 60;
        } else if (mode === 'longBreak') {
          updatedStats.totalLongBreaks += 1;
          updatedStats.totalTimeInSeconds += settings.timer.longBreak * 60;
        }

        saveStatistics(updatedStats);
        return updatedStats;
      });

      if (mode === 'pomodoro') {
        success('Great work! Pomodoro session completed!', 5000);
        analytics.trackTimerComplete('pomodoro', settings.timer.pomodoro);
      } else if (mode === 'shortBreak') {
        info('Short break completed! Ready to focus?', 5000);
        analytics.trackTimerComplete('shortBreak', settings.timer.shortBreak);
      } else if (mode === 'longBreak') {
        success('Long break finished! Time to get back to work!', 5000);
        analytics.trackTimerComplete('longBreak', settings.timer.longBreak);
      }
    },
    [settings.timer, success, info]
  );

  const timer = useTimer({
    settings: settings.timer,
    soundEnabled: settings.soundEnabled,
    notificationsEnabled: settings.notificationsEnabled,
    volume: settings.volume,
    onSessionComplete: handleSessionComplete,
  });

  useKeyboardShortcuts({
    onStartPause: timer.toggle,
    onReset: timer.reset,
    onSkip: timer.skip,
    onSettings: () => setIsSettingsOpen(true),
    onFullscreen: toggleFullscreen,
    onEscape: () => {
      if (isSettingsOpen) setIsSettingsOpen(false);
      else if (isStatsOpen) setIsStatsOpen(false);
      else if (isFullscreen) exitFullscreen();
    },
  });

  // Save settings when they change
  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  // Save distractions when they change
  useEffect(() => {
    saveDistractions(distractions);
  }, [distractions]);

  // Keep the document title in sync with the current time
  useEffect(() => {
    const updateTitle = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      const statusLabel =
        timer.status === 'running'
          ? timer.mode === 'pomodoro'
            ? 'Focusing'
            : timer.mode === 'shortBreak'
              ? 'Short break'
              : 'Long break'
          : 'Timer paused';

      document.title = `${formattedTime} • ${statusLabel}`;
    };

    updateTitle();
    const intervalId = window.setInterval(updateTitle, 1000);
    return () => window.clearInterval(intervalId);
  }, [timer.mode, timer.status]);

  // Request notification permission
  useEffect(() => {
    if (settings.notificationsEnabled) {
      requestNotificationPermission();
    }
  }, [settings.notificationsEnabled]);

  // Show ESC hint in fullscreen
  useEffect(() => {
    if (isFullscreen) {
      setShowEscHint(true);
      const timer = setTimeout(() => setShowEscHint(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isFullscreen]);

  const selectedTheme = THEMES.find((t) => t.id === settings.selectedTheme) || THEMES[0];

  let backgroundStyle: React.CSSProperties = {
    background: selectedTheme.background,
  };

  if (settings.selectedBackground === 'custom' && settings.customBackgroundUrl) {
    backgroundStyle = {
      backgroundImage: `url(${settings.customBackgroundUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  } else if (settings.selectedBackground) {
    const bgImage = BACKGROUND_IMAGES.find((bg) => bg.id === settings.selectedBackground);
    if (bgImage) {
      backgroundStyle = {
        backgroundImage: `url(${bgImage.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    }
  }

  const handleModeChange = useCallback(
    (mode: TimerMode) => {
      if (timer.status !== 'running') {
        timer.switchMode(mode);
      }
    },
    [timer]
  );

  const handleThemeChange = useCallback(
    (themeId: string) => {
      setSettings({ ...settings, selectedTheme: themeId });
      analytics.trackThemeChange(themeId);
    },
    [settings]
  );

  const handleBackgroundChange = useCallback(
    (bgId: string | null) => {
      setSettings({ ...settings, selectedBackground: bgId });
      if (bgId) analytics.trackBackgroundChange(bgId);
    },
    [settings]
  );

  const getNextMode = (): TimerMode => {
    if (timer.mode === 'pomodoro') {
      const nextCount = timer.completedPomodoros + 1;
      return nextCount % settings.timer.longBreakInterval === 0 ? 'longBreak' : 'shortBreak';
    }
    return 'pomodoro';
  };

  const nextMode = getNextMode();
  const nextDuration =
    nextMode === 'pomodoro'
      ? settings.timer.pomodoro * 60
      : nextMode === 'shortBreak'
        ? settings.timer.shortBreak * 60
        : settings.timer.longBreak * 60;
  const autoStartNext =
    timer.mode === 'pomodoro' ? settings.timer.autoStartBreaks : settings.timer.autoStartPomodoros;

  const handleAddDistraction = (text: string) => {
    const note: DistractionNote = {
      id: crypto.randomUUID?.() ?? `${Date.now()}`,
      text,
      timestamp: new Date().toISOString(),
      resolved: false,
    };

    setDistractions((prev) => [note, ...prev]);
  };

  const handleToggleDistraction = (id: string) => {
    setDistractions((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, resolved: !entry.resolved } : entry))
    );
  };

  const handleRemoveDistraction = (id: string) => {
    setDistractions((prev) => prev.filter((entry) => entry.id !== id));
  };

  return (
    <div className="app" style={backgroundStyle}>
      <div
        className="app-overlay"
        style={{
          '--theme-color': selectedTheme.primary,
          '--theme-bg': selectedTheme.background,
          '--theme-text': selectedTheme.text,
          '--theme-accent': selectedTheme.accent,
        } as React.CSSProperties}
      >
        <ToastContainer toasts={toasts} onClose={closeToast} />

        {showEscHint && (
          <div className="esc-hint" role="alert" aria-live="polite">
            Press <kbd>Esc</kbd> to exit fullscreen
          </div>
        )}

        <header className="app-header">
          <h1 className="app-title">TIMER-PRO</h1>
          <div className="header-actions">
            <button
              className="stats-button"
              onClick={() => setIsStatsOpen(true)}
              title="View Statistics"
              aria-label="View Statistics"
            >
              <BarChart3 size={20} aria-hidden="true" />
              <span>Stats</span>
            </button>
          </div>
        </header>

        <main className="app-main">
          <AppModeSelector currentMode={appMode} onModeChange={setAppMode} />

          {appMode === 'pomodoro' && (
            <>
              <ModeSelector
                currentMode={timer.mode}
                onModeChange={handleModeChange}
                disabled={timer.status === 'running'}
              />

              <TimerDisplay secondsLeft={timer.secondsLeft} isRunning={timer.status === 'running'} />

              <TimerControls
                status={timer.status}
                onToggle={timer.toggle}
                onReset={timer.reset}
                onSkip={timer.skip}
                onSettings={() => setIsSettingsOpen(true)}
              />

              {timer.mode === 'pomodoro' && (
                <div className="session-counter">
                  Session {timer.completedPomodoros + 1}
                </div>
              )}

              <SessionInsights
                goal={settings.timer.dailyGoal}
                todayPomodoros={statistics.todayPomodoros}
                currentStreak={statistics.currentStreak}
                bestStreak={statistics.bestStreak}
                nextMode={nextMode}
                nextDuration={nextDuration}
                currentMode={timer.mode}
                secondsLeft={timer.secondsLeft}
                status={timer.status}
                completedPomodoros={timer.completedPomodoros}
                longBreakInterval={settings.timer.longBreakInterval}
                autoStartNext={autoStartNext}
              />

              <DistractionJournal
                entries={distractions}
                onAdd={handleAddDistraction}
                onToggleResolved={handleToggleDistraction}
                onRemove={handleRemoveDistraction}
              />
            </>
          )}

          {appMode === 'stopwatch' && <Stopwatch />}

          {appMode === 'timer' && (
            <CustomTimer
              soundEnabled={settings.soundEnabled}
              notificationsEnabled={settings.notificationsEnabled}
              volume={settings.volume}
            />
          )}

          {appMode === 'countdown' && (
            <CountdownTimer
              soundEnabled={settings.soundEnabled}
              notificationsEnabled={settings.notificationsEnabled}
              volume={settings.volume}
            />
          )}
        </main>

        <footer className="app-footer">
          <FullscreenButton isFullscreen={isFullscreen} onToggle={toggleFullscreen} />
        </footer>

        <SettingsPanel
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          timerSettings={settings.timer}
          onTimerSettingsChange={(timerSettings) =>
            setSettings({ ...settings, timer: timerSettings })
          }
          selectedTheme={settings.selectedTheme}
          onThemeChange={handleThemeChange}
          selectedBackground={settings.selectedBackground}
          onBackgroundChange={handleBackgroundChange}
          customBackgroundUrl={settings.customBackgroundUrl}
          onCustomBackgroundChange={(url) =>
            setSettings({ ...settings, customBackgroundUrl: url })
          }
          volume={settings.volume}
          onVolumeChange={(volume) => setSettings({ ...settings, volume })}
        />

        <StatisticsPanel
          isOpen={isStatsOpen}
          onClose={() => setIsStatsOpen(false)}
          statistics={statistics}
          dailyGoal={settings.timer.dailyGoal}
        />
      </div>
    </div>
  );
}

export default App;
