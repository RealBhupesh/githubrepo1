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
import { ToastContainer } from './components/Toast';
import { useTimer } from './hooks/useTimer';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useFullscreen } from './hooks/useFullscreen';
import { useToast } from './hooks/useToast';
import { loadSettings, saveSettings, loadStatistics, saveStatistics } from './utils/storage';
import { requestNotificationPermission } from './utils/helpers';
import { analytics } from './utils/analytics';
import { THEMES, BACKGROUND_IMAGES } from './utils/constants';
import type { AppMode, TimerMode, Statistics } from './types';
import './App.css';

function App() {
  const [appMode, setAppMode] = useState<AppMode>('pomodoro');
  const [settings, setSettings] = useState(() => loadSettings());
  const [statistics, setStatistics] = useState(() => loadStatistics());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [showEscHint, setShowEscHint] = useState(false);

  const { isFullscreen, toggleFullscreen, exitFullscreen } = useFullscreen();
  const { toasts, closeToast, success, info } = useToast();

  const handleSessionComplete = useCallback(
    (mode: TimerMode) => {
      const newStats: Statistics = { ...statistics };

      if (mode === 'pomodoro') {
        newStats.totalPomodoros += 1;
        newStats.todayPomodoros += 1;
        newStats.totalTimeInSeconds += settings.timer.pomodoro * 60;
        success('Great work! Pomodoro session completed!', 5000);
        analytics.trackTimerComplete('pomodoro', settings.timer.pomodoro);
      } else if (mode === 'shortBreak') {
        newStats.totalShortBreaks += 1;
        newStats.totalTimeInSeconds += settings.timer.shortBreak * 60;
        info('Short break completed! Ready to focus?', 5000);
        analytics.trackTimerComplete('shortBreak', settings.timer.shortBreak);
      } else if (mode === 'longBreak') {
        newStats.totalLongBreaks += 1;
        newStats.totalTimeInSeconds += settings.timer.longBreak * 60;
        success('Long break finished! Time to get back to work!', 5000);
        analytics.trackTimerComplete('longBreak', settings.timer.longBreak);
      }

      newStats.lastSessionDate = new Date().toISOString();
      setStatistics(newStats);
      saveStatistics(newStats);
    },
    [statistics, settings.timer, success, info]
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
        />
      </div>
    </div>
  );
}

export default App;
