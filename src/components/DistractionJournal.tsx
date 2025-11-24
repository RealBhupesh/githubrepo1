import { useState } from 'react';
import type { FormEvent } from 'react';
import { NotebookPen, CheckCircle2, Circle, Trash2, Sparkles } from 'lucide-react';
import type { DistractionNote } from '../types';
import { formatClockTime } from '../utils/helpers';

interface DistractionJournalProps {
  entries: DistractionNote[];
  onAdd: (text: string) => void;
  onToggleResolved: (id: string) => void;
  onRemove: (id: string) => void;
}

export const DistractionJournal = ({ entries, onAdd, onToggleResolved, onRemove }: DistractionJournalProps) => {
  const [draft, setDraft] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const value = draft.trim();
    if (!value) return;
    onAdd(value);
    setDraft('');
  };

  return (
    <div className="distraction-card">
      <div className="insight-card__header">
        <div className="insight-title">
          <NotebookPen size={18} />
          <span>Distraction jotter</span>
        </div>
        <div className="distraction-meta">
          <Sparkles size={16} />
          <span>Park it, return later</span>
        </div>
      </div>

      <form className="distraction-form" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="distraction-input">
          Write your distraction
        </label>
        <textarea
          id="distraction-input"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Jot the intrusive thought or task so you can get back to focus..."
          maxLength={240}
          className="distraction-input"
          rows={2}
        />
        <div className="distraction-form__actions">
          <span className="char-count">{draft.trim().length}/240</span>
          <button type="submit" className="secondary-button" disabled={!draft.trim()}>
            Save for later
          </button>
        </div>
      </form>

      <div className="distraction-list" aria-live="polite">
        {entries.length === 0 ? (
          <div className="distraction-empty">No distractions logged. Write one to park it.</div>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="distraction-item">
              <button
                type="button"
                className="distraction-toggle"
                onClick={() => onToggleResolved(entry.id)}
                aria-label={entry.resolved ? 'Mark as unresolved' : 'Mark as resolved'}
              >
                {entry.resolved ? <CheckCircle2 size={18} /> : <Circle size={18} />}
              </button>
              <div className="distraction-details">
                <div className="distraction-text" data-resolved={entry.resolved}>
                  {entry.text}
                </div>
                <div className="distraction-meta-row">
                  <span className="distraction-time">Saved for later · {formatClockTime(0, entry.timestamp)}</span>
                </div>
              </div>
              <button
                type="button"
                className="ghost-button"
                onClick={() => onRemove(entry.id)}
                aria-label="Remove distraction"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
