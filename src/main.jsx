import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'

/* Font */
import '@fontsource-variable/inter'

/* CSS Components */
import './styles/variables.css'
import './styles/base.css'
import './styles/error-boundary.css'
import './styles/topbar.css'
import './styles/header.css'
import './styles/hero.css'
import './styles/carousel.css'
import './styles/about.css'
import './styles/menu.css'
import './styles/gallery.css'
import './styles/testimonials.css'
import './styles/contact.css'
import './styles/footer.css'
import './styles/modals.css'
import './styles/animations.css'
import './styles/theme-toggle.css'
import './styles/light-mode.css'
import './styles/responsive.css'
import './styles/skeleton.css'
import './styles/bottom-nav.css'
import './styles/lightbox.css'
import './styles/swiper-custom.css'
import './styles/scroll-top.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
)
