import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    // Log or store the error
    console.error(error, errorInfo);
  }

  render() {
    return this.state.error ? this.props.fallback : this.props.children;
  }
}

export default ErrorBoundary;
