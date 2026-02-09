import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { staggerContainer, fadeInUp } from '../utils/animations'

const sauces = [
  { tr: 'Trüflü Mayonez', en: 'Truffle Mayo' },
  { tr: 'Chipotle Mayonez', en: 'Chipotle Mayo' },
  { tr: 'Deep Diver Sos', en: 'Deep Diver Sauce' },
  { tr: 'Ranch Sos', en: 'Ranch Sauce' },
  { tr: 'BBQ Sos', en: 'BBQ Sauce' },
  { tr: 'Confi Sarımsak Mayonez', en: 'Confi Garlic Mayo' },
  { tr: 'Korean Sos', en: 'Korean Sauce' },
  { tr: 'Diver Sos', en: 'Diver Sauce' },
  { tr: 'Ketçap', en: 'Ketchup' },
  { tr: 'Pickle Mustard Sos', en: 'Pickle Mustard Sauce' },
  { tr: 'Extra Chedar Peyniri', en: 'Extra Cheddar Cheese' },
]

export default function Sauces() {
  const { lang, t } = useLanguage()

  return (
    <section className="section section--soft" id="soslar">
      <div className="container">
        <div className="section__head">
          <h2 className="section__title anim" data-anim="fade-up">{t('sauces.title')}</h2>
          <p className="section__lead">{t('sauces.lead')}</p>
        </div>

        <motion.div
          className="sos-grid"
          variants={staggerContainer(0.04)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {sauces.map((sauce, i) => (
            <motion.div key={i} className="sos-item" variants={fadeInUp}>
              {sauce[lang]}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
