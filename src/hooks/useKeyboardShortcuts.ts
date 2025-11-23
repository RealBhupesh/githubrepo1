import { useEffect } from 'react';

interface KeyboardShortcuts {
  onStartPause?: () => void;
  onReset?: () => void;
  onSkip?: () => void;
  onSettings?: () => void;
  onFullscreen?: () => void;
  onEscape?: () => void;
}

export const useKeyboardShortcuts = (shortcuts: KeyboardShortcuts) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in an input
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (event.key) {
        case ' ':
          event.preventDefault();
          shortcuts.onStartPause?.();
          break;
        case 'r':
        case 'R':
          event.preventDefault();
          shortcuts.onReset?.();
          break;
        case 's':
        case 'S':
          event.preventDefault();
          shortcuts.onSkip?.();
          break;
        case 'c':
        case 'C':
          event.preventDefault();
          shortcuts.onSettings?.();
          break;
        case 'f':
        case 'F':
          event.preventDefault();
          shortcuts.onFullscreen?.();
          break;
        case 'Escape':
          shortcuts.onEscape?.();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [shortcuts]);
};
