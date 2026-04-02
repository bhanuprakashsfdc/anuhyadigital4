import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-8 text-center">
          <div className="w-16 h-16 rotate-45 border-2 border-primary/30 mb-8 animate-pulse" />
          <h1 className="text-4xl font-bold font-headline tracking-tighter mb-4">Something went wrong</h1>
          <p className="text-on-surface-variant mb-10 max-w-md">We encountered an unexpected error. Please try refreshing the page.</p>
          <button
            onClick={() => window.location.reload()}
            className="cyber-gradient text-[#062100] px-10 py-4 rounded-md font-label font-black uppercase text-sm tracking-widest hover:scale-105 transition-all"
          >
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
