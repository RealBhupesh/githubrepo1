import { X } from 'lucide-react';
import type { TimerSettings } from '../types';
import { THEMES, BACKGROUND_IMAGES } from '../utils/constants';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  timerSettings: TimerSettings;
  onTimerSettingsChange: (settings: TimerSettings) => void;
  selectedTheme: string;
  onThemeChange: (themeId: string) => void;
  selectedBackground: string | null;
  onBackgroundChange: (backgroundId: string | null) => void;
  customBackgroundUrl?: string;
  onCustomBackgroundChange: (url: string) => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
}

export const SettingsPanel = ({
  isOpen,
  onClose,
  timerSettings,
  onTimerSettingsChange,
  selectedTheme,
  onThemeChange,
  selectedBackground,
  onBackgroundChange,
  customBackgroundUrl,
  onCustomBackgroundChange,
  volume,
  onVolumeChange,
}: SettingsPanelProps) => {
  if (!isOpen) return null;

  const handleTimerChange = (field: keyof TimerSettings, value: number | boolean) => {
    onTimerSettingsChange({ ...timerSettings, [field]: value });
  };

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2>Settings</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="settings-content">
          {/* Timer Settings */}
          <section className="settings-section">
            <h3>Timer Duration (minutes)</h3>
            <div className="settings-group">
              <label>
                <span>Pomodoro</span>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={timerSettings.pomodoro}
                  onChange={(e) => handleTimerChange('pomodoro', parseInt(e.target.value) || 25)}
                />
              </label>
              <label>
                <span>Short Break</span>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={timerSettings.shortBreak}
                  onChange={(e) => handleTimerChange('shortBreak', parseInt(e.target.value) || 5)}
                />
              </label>
              <label>
                <span>Long Break</span>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={timerSettings.longBreak}
                  onChange={(e) => handleTimerChange('longBreak', parseInt(e.target.value) || 15)}
                />
              </label>
              <label>
                <span>Long Break Interval</span>
                <input
                  type="number"
                  min="2"
                  max="10"
                  value={timerSettings.longBreakInterval}
                  onChange={(e) =>
                    handleTimerChange('longBreakInterval', parseInt(e.target.value) || 4)
                  }
                />
              </label>
              <label>
                <span>Daily Goal (pomodoros)</span>
                <input
                  type="number"
                  min="1"
                  max="24"
                  value={timerSettings.dailyGoal}
                  onChange={(e) => handleTimerChange('dailyGoal', parseInt(e.target.value) || 8)}
                />
              </label>
            </div>
          </section>

          {/* Auto-start Settings */}
          <section className="settings-section">
            <h3>Auto-start</h3>
            <div className="settings-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={timerSettings.autoStartBreaks}
                  onChange={(e) => handleTimerChange('autoStartBreaks', e.target.checked)}
                />
                <span>Auto-start breaks</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={timerSettings.autoStartPomodoros}
                  onChange={(e) => handleTimerChange('autoStartPomodoros', e.target.checked)}
                />
                <span>Auto-start pomodoros</span>
              </label>
            </div>
          </section>

          {/* Sound Settings */}
          <section className="settings-section">
            <h3>Sound & Notifications</h3>
            <div className="settings-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={timerSettings.soundEnabled}
                  onChange={(e) => handleTimerChange('soundEnabled', e.target.checked)}
                />
                <span>Sound notifications</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={timerSettings.notificationsEnabled}
                  onChange={(e) => handleTimerChange('notificationsEnabled', e.target.checked)}
                />
                <span>Browser notifications</span>
              </label>
              <label>
                <span>Volume</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                />
                <span className="volume-value">{Math.round(volume * 100)}%</span>
              </label>
            </div>
          </section>

          {/* Theme Settings */}
          <section className="settings-section">
            <h3>Theme</h3>
            <div className="theme-grid">
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  className={`theme-option ${selectedTheme === theme.id ? 'active' : ''}`}
                  onClick={() => onThemeChange(theme.id)}
                  style={{ background: theme.background }}
                >
                  <span>{theme.name}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Background Settings */}
          <section className="settings-section">
            <h3>Background</h3>
            <div className="background-grid">
              <button
                className={`background-option ${selectedBackground === null ? 'active' : ''}`}
                onClick={() => onBackgroundChange(null)}
              >
                <span>None</span>
              </button>
              {BACKGROUND_IMAGES.map((bg) => (
                <button
                  key={bg.id}
                  className={`background-option ${selectedBackground === bg.id ? 'active' : ''}`}
                  onClick={() => onBackgroundChange(bg.id)}
                  style={{ backgroundImage: `url(${bg.url})` }}
                >
                  <span>{bg.name}</span>
                </button>
              ))}
            </div>
            <label>
              <span>Custom Background URL</span>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={customBackgroundUrl || ''}
                onChange={(e) => onCustomBackgroundChange(e.target.value)}
              />
            </label>
            {customBackgroundUrl && (
              <button
                className="use-custom-bg"
                onClick={() => onBackgroundChange('custom')}
              >
                Use Custom Background
              </button>
            )}
          </section>

          {/* Keyboard Shortcuts */}
          <section className="settings-section">
            <h3>Keyboard Shortcuts</h3>
            <div className="shortcuts-list">
              <div className="shortcut-item">
                <span>Start/Pause</span>
                <kbd>Space</kbd>
              </div>
              <div className="shortcut-item">
                <span>Reset</span>
                <kbd>R</kbd>
              </div>
              <div className="shortcut-item">
                <span>Skip</span>
                <kbd>S</kbd>
              </div>
              <div className="shortcut-item">
                <span>Settings</span>
                <kbd>C</kbd>
              </div>
              <div className="shortcut-item">
                <span>Fullscreen</span>
                <kbd>F</kbd>
              </div>
              <div className="shortcut-item">
                <span>Exit</span>
                <kbd>Esc</kbd>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
