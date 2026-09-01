import { Component, type ErrorInfo, type ReactNode } from "react";
import { RefreshCcw, TriangleAlert } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled error in Tuma:", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="error-boundary">
          <div className="error-boundary-card">
            <TriangleAlert size={28} />
            <h1>Something went sideways.</h1>
            <p>This part of Tuma hit an unexpected error. Your activity and saved details are still safe.</p>
            <a className="btn btn-primary btn-lg" href="/">
              <RefreshCcw size={18} /> Reload Tuma
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
