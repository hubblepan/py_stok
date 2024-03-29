import React, { ErrorInfo } from 'react';

import { Result } from 'antd';

class ErrorBoundary extends React.Component {
  state = { hasError: false, errorInfo: '' };

  static getDerivedStateFromError(error) {
    return { hasError: true, errorInfo: error.message };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // eslint-disable-next-line no-console
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <Result status="error" title="Something went wrong." extra={this.state.errorInfo} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
