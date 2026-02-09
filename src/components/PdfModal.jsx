import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { fadeIn, scaleIn } from '../utils/animations'

export default function PdfModal({ onClose }) {
  const { t } = useLanguage()

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

  return (
    <motion.div
      className="modal-overlay"
      style={{ display: 'flex' }}
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        className="modal"
        style={{ animation: 'none' }}
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="modal__header">
          <strong>{t('modal.menuTitle')}</strong>
          <button className="modal__close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal__body">
          <iframe src={`${import.meta.env.BASE_URL}assets/Menu.pdf`} className="modal__pdf" title="Menu PDF"></iframe>
        </div>
      </motion.div>
    </motion.div>
  )
}
