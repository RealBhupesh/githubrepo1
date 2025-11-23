import { Component } from 'react';
import type { ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);

    // Here you would send error to logging service in production
    // Example: logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '2rem',
          }}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '3rem',
              maxWidth: '500px',
              textAlign: 'center',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            }}
          >
            <AlertCircle
              size={64}
              style={{ color: '#ef4444', marginBottom: '1.5rem' }}
            />
            <h1
              style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#333',
                marginBottom: '1rem',
              }}
            >
              Oops! Something went wrong
            </h1>
            <p
              style={{
                color: '#666',
                marginBottom: '2rem',
                lineHeight: '1.6',
              }}
            >
              We encountered an unexpected error. Don't worry, your data is safe.
              Try refreshing the page to continue.
            </p>
            {this.state.error && (
              <details
                style={{
                  marginBottom: '2rem',
                  textAlign: 'left',
                  padding: '1rem',
                  background: '#f5f5f5',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  color: '#666',
                }}
              >
                <summary style={{ cursor: 'pointer', fontWeight: '500' }}>
                  Error details
                </summary>
                <pre
                  style={{
                    marginTop: '1rem',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <button
              onClick={this.handleReset}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 2rem',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#5568d3';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#667eea';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <RefreshCw size={20} />
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
