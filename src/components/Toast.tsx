import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info, AlertCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastProps {
  toast: ToastMessage;
  onClose: (id: string) => void;
}

const Toast = ({ toast, onClose }: ToastProps) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = toast.duration || 3000;
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onClose(toast.id), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onClose]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'error':
        return <XCircle size={20} />;
      case 'warning':
        return <AlertCircle size={20} />;
      case 'info':
      default:
        return <Info size={20} />;
    }
  };

  const getStyles = () => {
    switch (toast.type) {
      case 'success':
        return {
          bg: '#00FF00',
          border: '#000000',
          text: '#000000',
        };
      case 'error':
        return {
          bg: '#FF0000',
          border: '#000000',
          text: '#FFFFFF',
        };
      case 'warning':
        return {
          bg: '#FFFF00',
          border: '#000000',
          text: '#000000',
        };
      case 'info':
      default:
        return {
          bg: '#FF6600',
          border: '#000000',
          text: '#FFFFFF',
        };
    }
  };

  const styles = getStyles();

  return (
    <div
      className={`toast ${isExiting ? 'toast-exit' : 'toast-enter'}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '1rem 1.25rem',
        background: styles.bg,
        border: `4px solid ${styles.border}`,
        color: styles.text,
        boxShadow: '4px 4px 0 #000000',
        minWidth: '300px',
        maxWidth: '500px',
        marginBottom: '1rem',
        fontFamily: '"Courier New", "Courier", monospace',
        fontWeight: 700,
        textTransform: 'uppercase',
        fontSize: '0.875rem',
        letterSpacing: '0.05em',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {getIcon()}
      </div>
      <p
        style={{
          flex: 1,
          margin: 0,
          color: styles.text,
          lineHeight: '1.4',
        }}
      >
        {toast.message}
      </p>
      <button
        onClick={() => onClose(toast.id)}
        style={{
          background: styles.text,
          border: `2px solid ${styles.border}`,
          color: styles.bg,
          cursor: 'pointer',
          padding: '0.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.1s ease',
          fontWeight: 700,
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
        aria-label="Close notification"
      >
        <X size={16} strokeWidth={3} />
      </button>
    </div>
  );
};

interface ToastContainerProps {
  toasts: ToastMessage[];
  onClose: (id: string) => void;
}

export const ToastContainer = ({ toasts, onClose }: ToastContainerProps) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '2rem',
        right: '2rem',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
};
