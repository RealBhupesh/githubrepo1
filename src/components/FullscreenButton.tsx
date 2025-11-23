import { Maximize, Minimize } from 'lucide-react';

interface FullscreenButtonProps {
  isFullscreen: boolean;
  onToggle: () => void;
}

export const FullscreenButton = ({ isFullscreen, onToggle }: FullscreenButtonProps) => {
  return (
    <button className="fullscreen-button" onClick={onToggle} title="Fullscreen (F)">
      {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
      <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
    </button>
  );
};
