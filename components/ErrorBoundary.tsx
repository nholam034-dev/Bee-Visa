
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-background-light flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 max-w-lg w-full text-center">
            {/* Logo */}
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-black text-2xl">B</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-black text-slate-900 mb-3">
              Đã Xảy Ra Lỗi
            </h1>
            <p className="text-slate-500 mb-6 text-sm leading-relaxed">
              Rất tiếc, đã có lỗi ngoài dự kiến. Vui lòng thử tải lại trang hoặc liên hệ hotline nếu lỗi tiếp tục xảy ra.
            </p>

            {/* Error detail (dev only) */}
            {import.meta.env.DEV && this.state.error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-left">
                <p className="text-xs font-bold text-red-700 uppercase tracking-wider mb-1">Chi tiết lỗi</p>
                <p className="text-red-600 text-sm font-mono break-all">{this.state.error.message}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors"
              >
                <span className="flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-lg">refresh</span>
                  Tải Lại Trang
                </span>
              </button>
              <a
                href="tel:19000310"
                className="px-6 py-3 bg-secondary text-slate-900 font-bold rounded-xl hover:brightness-110 transition-all"
              >
                <span className="flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-lg">call</span>
                  Gọi 1900-0310
                </span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
