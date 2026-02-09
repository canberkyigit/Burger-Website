import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { staggerContainer, fadeInUp, fadeIn, scaleIn } from '../utils/animations'

const items = [
  { emoji: '🍔', label: 'Smash Burger', wide: true },
  { emoji: '🍗', label: 'Nashville Tenders', wide: false },
  { emoji: '🍟', label: { tr: 'Cajun Patates', en: 'Cajun Fries' }, wide: false },
  { emoji: '🌮', label: 'Tenders Taco', wide: false },
  { emoji: '🍗', label: 'BBQ Wings', wide: false },
  { emoji: '🏪', label: { tr: 'Mekan', en: 'The Place' }, wide: true },
]

export default function Gallery() {
  const { lang, t } = useLanguage()
  const [lightbox, setLightbox] = useState(null)

  /* Body scroll lock + Escape close */
  useEffect(() => {
    if (!lightbox) return
    document.body.style.overflow = 'hidden'
    const handler = (e) => { if (e.key === 'Escape') setLightbox(null) }
    document.addEventListener('keydown', handler)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handler)
    }
  }, [lightbox])

  const getLabel = (label) => (typeof label === 'object' ? label[lang] : label)

  return (
    <>
      <section className="section" id="gallery">
        <div className="container">
          <div className="section__head" style={{ textAlign: 'center' }}>
            <h2 className="section__title">{t('gallery.title')}</h2>
            <p className="section__lead" style={{ marginInline: 'auto' }}>{t('gallery.lead')}</p>
          </div>

          <motion.div
            className="gallery"
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {items.map((item, i) => (
              <motion.div
                key={i}
                className={`gallery__item${item.wide ? ' gallery__item--wide' : ''}`}
                variants={fadeInUp}
                onClick={() => setLightbox(item)}
                style={{ cursor: 'pointer' }}
              >
                <div className="gallery__placeholder">
                  <span className="gallery__emoji">{item.emoji}</span>
                  <strong>{getLabel(item.label)}</strong>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="lightbox-overlay"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="lightbox"
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="lightbox__close" onClick={() => setLightbox(null)}>&times;</button>
              <span className="lightbox__emoji">{lightbox.emoji}</span>
              <strong className="lightbox__label">{getLabel(lightbox.label)}</strong>
              <span className="lightbox__hint">
                {lang === 'en' ? 'Real photos coming soon!' : 'Gerçek fotoğraflar yakında!'}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
