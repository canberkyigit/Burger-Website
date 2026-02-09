import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { staggerContainer, fadeInUp } from '../utils/animations'

const chickenBurgers = [
  { tag: { tr: 'Nashville', en: 'Nashville' }, name: { tr: 'Nashville Tavuk Burger', en: 'Nashville Chicken Burger' }, desc: { tr: 'Cheddar peynir, deep diver sos, diver sos', en: 'Cheddar cheese, deep diver sauce, diver sauce' }, price: '₺360', type: 'chicken' },
  { tag: { tr: 'Korean', en: 'Korean' }, name: { tr: 'Korean Tavuk Burger', en: 'Korean Chicken Burger' }, desc: { tr: 'Tempura tavuk, Korean sos, coleslaw, cheddar peynir', en: 'Tempura chicken, Korean sauce, coleslaw, cheddar cheese' }, price: '₺360', type: 'chicken' },
  { tag: { tr: 'Honey', en: 'Honey' }, name: { tr: 'Deep Honey Tavuk Burger', en: 'Deep Honey Chicken Burger' }, desc: { tr: 'Diver honey sos, alman turşusu, deep diver sos, coleslaw, cheddar peynir', en: 'Diver honey sauce, German pickles, deep diver sauce, coleslaw, cheddar cheese' }, price: '₺360', type: 'chicken' },
  { tag: { tr: 'Texas', en: 'Texas' }, name: { tr: 'Texas Chipotle Tavuk Burger', en: 'Texas Chipotle Chicken Burger' }, desc: { tr: 'Chipotle mayonez, diver sos, mor soğan turşusu, cheddar peynir', en: 'Chipotle mayo, diver sauce, purple onion pickles, cheddar cheese' }, price: '₺360', type: 'chicken' },
  { tag: { tr: 'Mustard', en: 'Mustard' }, name: { tr: 'Honey Mustard Tavuk Burger', en: 'Honey Mustard Chicken Burger' }, desc: { tr: 'Pickle mustard sos, diver sos, coleslaw, cheddar peynir', en: 'Pickle mustard sauce, diver sauce, coleslaw, cheddar cheese' }, price: '₺360', type: 'chicken' },
]

export default function MenuChicken({ onCardClick }) {
  const { lang, t } = useLanguage()

  return (
    <section className="section" id="tavuk">
      <div className="container">
        <div className="section__head">
          <h2 className="section__title anim" data-anim="fade-up">{t('chicken.title')}</h2>
          <p className="section__lead">{t('chicken.lead')}</p>
        </div>

        <motion.div
          className="cards"
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {chickenBurgers.map((item, i) => (
            <motion.article
              key={i}
              className="card card--clickable"
              data-type={item.type}
              variants={fadeInUp}
              whileTap={{ scale: 0.97 }}
              onClick={() => onCardClick(item)}
            >
              <div className="card__tag">{item.tag[lang]}</div>
              <h3>{typeof item.name === 'object' ? item.name[lang] : item.name}</h3>
              <p className="muted">{item.desc[lang]}</p>
              <div className="card__bottom">
                <strong className="card__price">{item.price}</strong>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
