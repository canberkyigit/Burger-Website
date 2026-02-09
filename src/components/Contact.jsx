import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { staggerContainer, fadeInUp } from '../utils/animations'

const branches = [
  {
    name: { tr: 'Serdivan Şube', en: 'Serdivan Branch' },
    address: 'Kemalpaşa, 92. SK NO: 3 C, 54050 Serdivan/Sakarya',
    mapUrl: 'https://share.google/A8pVF0VyYRBIYdtDb',
    mapQuery: 'Diver Street Food, Serdivan, Sakarya',
    phone: '+90 530 541 54 45',
    phoneRaw: '+905305415445',
  },
  {
    name: { tr: 'İzmit Şube', en: 'İzmit Branch' },
    address: 'Alikahya Fatih, Akarca Cd. Kocaeli Spor tesis yanı No:8/A, 41310 İzmit/Kocaeli',
    mapUrl: 'https://share.google/qmRrbZYHqnK6O4tYg',
    mapQuery: 'Diver Street Food, İzmit, Kocaeli',
    phone: '+90 501 627 39 07',
    phoneRaw: '+905016273907',
  },
  {
    name: { tr: 'Sapanca Şube', en: 'Sapanca Branch' },
    address: 'İstasyon Caddesi, Fevzi Çakmak Cd., 54600 Sapanca/Sakarya',
    mapUrl: 'https://share.google/YC48sgMNxVsj5s2Y0',
    mapQuery: 'İstasyon Caddesi, Fevzi Çakmak Cd., Sapanca, Sakarya',
    phone: '+90 501 599 50 54',
    phoneRaw: '+905015995054',
  },
  {
    name: { tr: 'Adapazarı Şube', en: 'Adapazarı Branch' },
    address: 'Nadide Apt, Orta, Soğanpazarı Cd. No:66/B, 54100 Adapazarı/Sakarya',
    mapUrl: 'https://share.google/C8xaxbekwv9YrRmTg',
    mapQuery: 'Diver Street Food, Adapazarı, Sakarya',
    phone: '+90 533 133 65 54',
    phoneRaw: '+905331336554',
  },
]

export default function Contact() {
  const { lang, t } = useLanguage()

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section__head">
          <h2 className="section__title anim" data-anim="fade-up">{t('contact.title')}</h2>
          <p className="section__lead">{t('contact.lead')}</p>
        </div>

        <motion.div
          className="contact-grid"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {branches.map((branch, i) => (
            <motion.div key={i} className="contact-card" variants={fadeInUp}>
              <div className="contact-card__top">
                <strong>{branch.name[lang]}</strong>
                <p className="muted small">{branch.address}</p>
              </div>

              <div className="contact-card__map">
                <iframe
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(branch.mapQuery)}&z=15&output=embed`}
                  className="contact-map"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={branch.name[lang]}
                  allowFullScreen
                />
              </div>

              <div className="contact-card__links">
                <a className="contact-link" href={branch.mapUrl} target="_blank" rel="noopener noreferrer">
                  {t('contact.mapLink')}
                </a>
                <a className="contact-link" href={`tel:${branch.phoneRaw}`}>
                  📞 {branch.phone}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="social">
          <a className="pill" href="https://www.instagram.com/diverstreetfood" target="_blank" rel="noopener noreferrer">
            📸 @diverstreetfood
          </a>
        </div>

        <p className="muted small" style={{ marginTop: '18px' }}>
          {t('contact.note')}
        </p>
      </div>
    </section>
  )
}
