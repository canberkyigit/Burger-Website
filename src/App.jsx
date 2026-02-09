import { useState, useEffect, useCallback, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import useScrollAnimation from './hooks/useScrollAnimation'
import ErrorBoundary from './components/ErrorBoundary'

/* Eager — above the fold */
import SEOHead from './components/SEOHead'
import Topbar from './components/Topbar'
import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'
import BottomNav from './components/BottomNav'
import ScrollToTop from './components/ScrollToTop'
import SectionSkeleton from './components/SectionSkeleton'

/* Lazy — below the fold (code-split) */
const About = lazy(() => import('./components/About'))
const MenuBurgers = lazy(() => import('./components/MenuBurgers'))
const MenuChicken = lazy(() => import('./components/MenuChicken'))
const SharedPlates = lazy(() => import('./components/SharedPlates'))
const Sauces = lazy(() => import('./components/Sauces'))
const Drinks = lazy(() => import('./components/Drinks'))
const Gallery = lazy(() => import('./components/Gallery'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const Contact = lazy(() => import('./components/Contact'))

/* Lazy — on-demand */
const NotFound = lazy(() => import('./pages/NotFound'))

/* Modals — eager so AnimatePresence works correctly */
import ProductModal from './components/ProductModal'
import PdfModal from './components/PdfModal'

function HomePage({ onCardClick }) {
  return (
    <>
      <Hero />
      <ErrorBoundary>
        <Suspense fallback={<SectionSkeleton />}>
          <About />
          <MenuBurgers onCardClick={onCardClick} />
          <MenuChicken onCardClick={onCardClick} />
          <SharedPlates onCardClick={onCardClick} />
          <Sauces />
          <Drinks />
          <Gallery />
          <Testimonials />
          <Contact />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

export default function App() {
  const [productModal, setProductModal] = useState({ isOpen: false, product: null })
  const [pdfModalOpen, setPdfModalOpen] = useState(false)
  const location = useLocation()

  useScrollAnimation()

  /* Smooth scroll for anchor links */
  useEffect(() => {
    const handler = (e) => {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return
      const targetId = anchor.getAttribute('href')
      if (targetId === '#') return
      const target = document.querySelector(targetId)
      if (target) {
        e.preventDefault()
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  /* Scroll to hash on direct URL access */
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 400)
    }
  }, [location])

  const openProductModal = useCallback((product) => {
    setProductModal({ isOpen: true, product })
  }, [])

  const closeProductModal = useCallback(() => {
    setProductModal({ isOpen: false, product: null })
  }, [])

  return (
    <LanguageProvider>
      <ThemeProvider>
        <SEOHead />
        <Topbar />
        <Header onPdfMenuClick={() => setPdfModalOpen(true)} />

        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={<HomePage onCardClick={openProductModal} />}
            />
            <Route
              path="*"
              element={
                <Suspense fallback={null}>
                  <NotFound />
                </Suspense>
              }
            />
          </Routes>
        </AnimatePresence>

        <Footer />
        <BottomNav />
        <ScrollToTop />

        {/* Modals — AnimatePresence for smooth enter/exit */}
        <AnimatePresence>
          {productModal.isOpen && productModal.product && (
            <ProductModal
              product={productModal.product}
              onClose={closeProductModal}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {pdfModalOpen && (
            <PdfModal onClose={() => setPdfModalOpen(false)} />
          )}
        </AnimatePresence>
      </ThemeProvider>
    </LanguageProvider>
  )
}
