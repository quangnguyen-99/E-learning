import { Component, ErrorInfo, ReactNode } from "react";
import errorImg from "Assets/img/Error/error.jpg";
interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: "center" }}>
          <img
            src={errorImg}
            alt="errorImg"
            style={{ height: "90vh", width: "90vw", objectFit: "contain" }}
          />
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
