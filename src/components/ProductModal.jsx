import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { fadeIn, scaleIn } from '../utils/animations'

const burgerVisuals = {
  single: (
    <div className="burger">
      <div className="bun bun--top"></div>
      <div className="lettuce"></div>
      <div className="tomato"></div>
      <div className="cheese"></div>
      <div className="patty"></div>
      <div className="bun bun--bottom"></div>
    </div>
  ),
  mushroom: (
    <div className="burger">
      <div className="bun bun--top"></div>
      <div className="lettuce"></div>
      <div className="cheese"></div>
      <div className="patty patty--mushroom"></div>
      <div className="bun bun--bottom"></div>
    </div>
  ),
  double: (
    <div className="burger burger--double">
      <div className="bun bun--top"></div>
      <div className="lettuce"></div>
      <div className="cheese"></div>
      <div className="patty"></div>
      <div className="cheese"></div>
      <div className="patty"></div>
      <div className="bun bun--bottom"></div>
    </div>
  ),
  'double-mushroom': (
    <div className="burger burger--double">
      <div className="bun bun--top"></div>
      <div className="lettuce"></div>
      <div className="cheese"></div>
      <div className="patty patty--mushroom"></div>
      <div className="cheese"></div>
      <div className="patty patty--mushroom"></div>
      <div className="bun bun--bottom"></div>
    </div>
  ),
  kids: (
    <div className="burger burger--small">
      <div className="bun bun--top"></div>
      <div className="cheese"></div>
      <div className="patty"></div>
      <div className="bun bun--bottom"></div>
    </div>
  ),
  chicken: <div className="product-emoji">🍗</div>,
  tenders: <div className="product-emoji">🍗</div>,
  wings: <div className="product-emoji">🍗</div>,
  box: <div className="product-emoji">📦</div>,
  taco: <div className="product-emoji">🌮</div>,
  fries: <div className="product-emoji">🍟</div>,
}

function getLocalizedText(val, lang) {
  if (val == null) return ''
  if (typeof val === 'object' && val[lang] !== undefined) return val[lang]
  return val
}

export default function ProductModal({ product, onClose }) {
  const { lang } = useLanguage()

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  /* Close on Escape */
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  if (!product) return null

  const visual = burgerVisuals[product.type] || burgerVisuals.single
  const tag = getLocalizedText(product.tag, lang)
  const name = getLocalizedText(product.name, lang)
  const desc = getLocalizedText(product.desc, lang)

  return (
    <motion.div
      className="product-modal-overlay"
      style={{ display: 'flex' }}
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        className="product-modal"
        style={{ animation: 'none' }}
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <button className="product-modal__close" onClick={onClose}>&times;</button>
        <div className="product-modal__visual">{visual}</div>
        <div className="product-modal__content">
          <div className="product-modal__tag">{tag}</div>
          <h2 className="product-modal__name">{name}</h2>
          <p className="product-modal__desc">{desc}</p>
          <div className="product-modal__price">{product.price}</div>
        </div>
      </motion.div>
    </motion.div>
  )
}
