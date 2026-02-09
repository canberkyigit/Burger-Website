import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import HeroCarousel from './HeroCarousel'
import { useLanguage } from '../context/LanguageContext'
import { heroStagger, heroItem } from '../utils/animations'

export default function Hero() {
  const { t } = useLanguage()
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  /* Parallax transforms — different speeds create depth */
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 40])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -25])

  return (
    <section className="hero" ref={ref}>
      <motion.div className="hero__bg" style={{ y: bgY }} />

      <div className="container hero__inner">
        <motion.div
          className="hero__content"
          style={{ y: contentY, opacity: contentOpacity }}
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={heroItem}>
            <span className="hero__kicker">DIVER</span>
            <span className="hero__title">STREET</span>
            <span className="hero__title hero__title--outline">FOO<span className="hero__title-burger">🍔</span></span>
          </motion.h1>

          <motion.p className="hero__desc" variants={heroItem}>
            {t('hero.desc')}
          </motion.p>

          <motion.div className="hero__cta" variants={heroItem}>
            <a className="btn" href="#menu">{t('hero.menuBtn')}</a>
            <a className="btn btn--secondary" href="#contact">{t('hero.locationBtn')}</a>
          </motion.div>
        </motion.div>

        <motion.div className="hero__visual" style={{ y: visualY }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <HeroCarousel />
          </motion.div>
        </motion.div>
      </div>

      <div className="hero__wave"></div>
    </section>
  )
}
