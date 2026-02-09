import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <div className="error-fallback__inner">
            <div className="error-fallback__emoji">🍔</div>
            <h2 className="error-fallback__title">Bir şeyler ters gitti</h2>
            <p className="error-fallback__desc">
              Sayfa yüklenirken bir hata oluştu.<br />
              <span className="error-fallback__sub">Something went wrong while loading the page.</span>
            </p>
            <button
              className="btn"
              onClick={() => window.location.reload()}
            >
              Sayfayı Yenile / Reload
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
