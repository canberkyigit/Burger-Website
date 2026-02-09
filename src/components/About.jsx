import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { useLanguage } from '../context/LanguageContext'
import { staggerContainer, fadeInUp } from '../utils/animations'

const stats = [
  { end: 4, prefix: '', suffix: '', labelKey: 'about.statBranches' },
  { end: 15, prefix: '', suffix: '+', labelKey: 'about.statVarieties' },
  { end: 10, prefix: '', suffix: '+', labelKey: 'about.statSauces' },
  { end: 100, prefix: '%', suffix: '', labelKey: 'about.statBeef' },
]

const features = [
  { ico: '🥩', titleKey: 'about.featBeefTitle', descKey: 'about.featBeefDesc' },
  { ico: '🧪', titleKey: 'about.featSaucesTitle', descKey: 'about.featSaucesDesc' },
  { ico: '🍗', titleKey: 'about.featNashvilleTitle', descKey: 'about.featNashvilleDesc' },
  { ico: '🍟', titleKey: 'about.featFriesTitle', descKey: 'about.featFriesDesc' },
]

const hoursData = [
  { closed: true, ico: '🔴', hours: '' },
  { closed: false, ico: '🟢', hours: '11:00 – 23:30' },
  { closed: false, ico: '🟢', hours: '11:00 – 23:30' },
  { closed: false, ico: '🟢', hours: '11:00 – 23:30' },
  { closed: false, ico: '🟢', hours: '11:00 – 23:30' },
  { closed: false, ico: '🟢', hours: '12:00 – 00:30' },
  { closed: false, ico: '🟢', hours: '12:00 – 22:00' },
]

function getTodayIndex() {
  const jsDay = new Date().getDay()
  return jsDay === 0 ? 6 : jsDay - 1
}

function isCurrentlyOpen() {
  const now = new Date()
  const jsDay = now.getDay()
  const time = now.getHours() * 60 + now.getMinutes()
  if (jsDay === 1) return false
  if (jsDay >= 2 && jsDay <= 5) return time >= 660 && time <= 1410
  if (jsDay === 6) return time >= 720
  if (jsDay === 0) {
    if (time <= 30) return true
    return time >= 720 && time <= 1320
  }
  return false
}

export default function About() {
  const { t } = useLanguage()
  const [todayIndex] = useState(getTodayIndex)
  const [isOpen, setIsOpen] = useState(isCurrentlyOpen)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOpen(isCurrentlyOpen())
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  const dayNames = t('days')

  return (
    <section className="section" id="about">
      <div className="container">
        <div className="about-hero">
          <div className="section__head" style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 className="section__title">{t('about.title')}</h2>
            <p className="section__lead" style={{ marginInline: 'auto' }}>{t('about.lead')}</p>
          </div>

          <motion.div
            className="stats-row"
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {stats.map((s, i) => (
              <motion.div key={i} className="stat" variants={fadeInUp}>
                <div className="stat__number">
                  <CountUp
                    end={s.end}
                    prefix={s.prefix}
                    suffix={s.suffix}
                    duration={2.5}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </div>
                <div className="stat__label">{t(s.labelKey)}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="about-features"
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {features.map((f, i) => (
              <motion.div key={i} className="about-feat" variants={fadeInUp}>
                <div className="about-feat__ico">{f.ico}</div>
                <h3>{t(f.titleKey)}</h3>
                <p className="muted">{t(f.descKey)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="hours-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="hours-card__header">
            <div className="hours-card__ico">🕐</div>
            <div>
              <h3>{t('about.hoursTitle')}</h3>
              <p className="muted small">{t('about.hoursSub')}</p>
            </div>
            <div className={`hours-card__status${isOpen ? '' : ' hours-card__status--closed'}`}>
              <span className="hours-status-dot"></span>
              <span className="hours-status-text">
                {isOpen ? t('about.hoursOpen') : t('about.hoursClosed')}
              </span>
            </div>
          </div>
          <div className="hours-card__grid">
            {hoursData.map((h, i) => {
              let rowClass = 'hours__row'
              if (h.closed) rowClass += ' hours__row--closed'
              if (i === todayIndex) rowClass += ' hours__row--today'
              return (
                <div key={i} className={rowClass}>
                  <span>
                    <span className="hours__day-ico">{h.ico}</span> {dayNames[i]}
                  </span>
                  <strong>{h.closed ? t('about.daysClosed') : h.hours}</strong>
                </div>
              )
            })}
          </div>
          <div className="hours-card__today" id="hoursToday">
            {hoursData[todayIndex].closed
              ? t('about.hoursTodayClosed')
              : t('about.hoursTodayOpen', { hours: hoursData[todayIndex].hours })
            }
          </div>
        </motion.div>
      </div>
    </section>
  )
}
