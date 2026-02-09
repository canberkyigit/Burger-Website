import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

export default function NotFound() {
  const { lang } = useLanguage()

  return (
    <motion.section
      className="section"
      style={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div style={{ textAlign: 'center' }}>
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 12, stiffness: 200 }}
          style={{ fontSize: '80px', marginBottom: '8px' }}
        >
          🍔
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: '64px', margin: '0 0 8px', fontWeight: 1000 }}
        >
          404
        </motion.h1>
        <motion.p
          className="muted"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          style={{ marginBottom: '28px', fontSize: '18px' }}
        >
          {lang === 'en' ? 'This page was not found.' : 'Bu sayfa bulunamadı.'}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/" className="btn">
            {lang === 'en' ? 'Back to Home' : 'Ana Sayfaya Dön'}
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}
