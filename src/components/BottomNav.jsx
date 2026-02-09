import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

const navItems = [
  { id: 'home', icon: '🏠', labelKey: 'nav.home' },
  { id: 'menu', icon: '🍔', labelKey: 'nav.menu' },
  { id: 'gallery', icon: '📸', labelKey: 'nav.gallery' },
  { id: 'testimonials', icon: '⭐', labelKey: 'nav.reviews' },
  { id: 'contact', icon: '📍', labelKey: 'nav.contact' },
]

export default function BottomNav() {
  const { t } = useLanguage()
  const [active, setActive] = useState('home')

  useEffect(() => {
    const ids = navItems.map((item) => item.id)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    /* Highlight contact when scrolled to bottom */
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 80) {
        setActive('contact')
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`bottom-nav__item${active === item.id ? ' bottom-nav__item--active' : ''}`}
        >
          <span className="bottom-nav__icon">{item.icon}</span>
          <span className="bottom-nav__label">{t(item.labelKey)}</span>
        </a>
      ))}
    </nav>
  )
}
