import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'

export default function Header({ onPdfMenuClick }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { lang, toggleLang, t } = useLanguage()

  const toggleMenu = () => {
    setMenuOpen((prev) => {
      const next = !prev
      document.body.style.overflow = next ? 'hidden' : ''
      return next
    })
  }

  const closeMenu = () => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }

  /* Close on Escape key */
  useEffect(() => {
    if (!menuOpen) return
    const handleKey = (e) => {
      if (e.key === 'Escape') closeMenu()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [menuOpen])

  /* Mobile popup — rendered via portal so it escapes sticky header */
  const mobileMenu = menuOpen
    ? createPortal(
        <>
          <div className="nav-overlay" onClick={closeMenu} />
          <nav className="nav open" onClick={(e) => e.stopPropagation()}>
            <div className="nav__mob-header">
              <img src={`${import.meta.env.BASE_URL}img/logo.png`} alt="Diver Street Food" height={40} width={40} />
              <button className="nav__mob-close" onClick={closeMenu} aria-label="Kapat">✕</button>
            </div>
            <a href="#about" onClick={closeMenu}>{t('nav.about')}</a>
            <a href="#menu" onClick={closeMenu}>{t('nav.menu')}</a>
            <a href="#gallery" onClick={closeMenu}>{t('nav.gallery')}</a>
            <a href="#testimonials" onClick={closeMenu}>{t('nav.reviews')}</a>
            <a href="#contact" onClick={closeMenu}>{t('nav.contact')}</a>
            <div className="nav__mob-cta">
              <a
                className="btn"
                href="#"
                onClick={(e) => { e.preventDefault(); closeMenu(); onPdfMenuClick() }}
                style={{ width: '100%' }}
              >
                {t('header.pdfBtn')}
              </a>
            </div>
          </nav>
        </>,
        document.body
      )
    : null

  return (
    <header className="header" id="home">
      <div className="container header__inner">
        <a
          className="brand"
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <img className="brand__logo" src={`${import.meta.env.BASE_URL}img/logo.png`} alt="Diver Street Food" width={68} height={68} />
        </a>

        {/* Desktop nav — visible only above 980px */}
        <nav className="nav nav--desktop" id="mainNav">
          <a href="#about">{t('nav.about')}</a>
          <a href="#menu">{t('nav.menu')}</a>
          <a href="#gallery">{t('nav.gallery')}</a>
          <a href="#testimonials">{t('nav.reviews')}</a>
          <a href="#contact">{t('nav.contact')}</a>
        </nav>

        <button
          className={`hamburger${menuOpen ? ' active' : ''}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span></span><span></span><span></span>
        </button>

        <a
          className="btn btn--pdf header__cta"
          href="#"
          onClick={(e) => { e.preventDefault(); onPdfMenuClick() }}
        >
          {t('header.pdfBtn')}
        </a>

        <div className="lang-toggle">
          <button
            className={`lang-toggle__btn${lang === 'tr' ? ' lang-toggle__btn--active' : ''}`}
            onClick={lang !== 'tr' ? toggleLang : undefined}
          >
            TR
          </button>
          <button
            className={`lang-toggle__btn${lang === 'en' ? ' lang-toggle__btn--active' : ''}`}
            onClick={lang !== 'en' ? toggleLang : undefined}
          >
            EN
          </button>
        </div>

        <button className="theme-toggle" onClick={toggleTheme} aria-label="Tema değiştir">
          <div className="theme-toggle__track">
            <div className="theme-toggle__thumb" id="themeIcon">
              {theme === 'light' ? '☀️' : '🌙'}
            </div>
          </div>
        </button>
      </div>

      {mobileMenu}
    </header>
  )
}
