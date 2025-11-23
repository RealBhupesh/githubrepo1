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

  const getColor = () => {
    switch (toast.type) {
      case 'success':
        return '#10b981';
      case 'error':
        return '#ef4444';
      case 'warning':
        return '#f59e0b';
      case 'info':
      default:
        return '#3b82f6';
    }
  };

  return (
    <div
      className={`toast ${isExiting ? 'toast-exit' : 'toast-enter'}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '1rem 1.25rem',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
        borderLeft: `4px solid ${getColor()}`,
        minWidth: '300px',
        maxWidth: '500px',
        marginBottom: '1rem',
      }}
    >
      <div style={{ color: getColor(), display: 'flex', alignItems: 'center' }}>
        {getIcon()}
      </div>
      <p
        style={{
          flex: 1,
          margin: 0,
          color: '#333',
          fontSize: '0.95rem',
          lineHeight: '1.5',
        }}
      >
        {toast.message}
      </p>
      <button
        onClick={() => onClose(toast.id)}
        style={{
          background: 'none',
          border: 'none',
          color: '#666',
          cursor: 'pointer',
          padding: '0.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '4px',
          transition: 'all 0.2s ease',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = '#f0f0f0';
          e.currentTarget.style.color = '#333';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'none';
          e.currentTarget.style.color = '#666';
        }}
      >
        <X size={18} />
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
