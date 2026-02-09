import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { staggerContainer, fadeInUp } from '../utils/animations'

const drinks = [
  { name: 'Pepsi / Pepsi Max', sub: null, price: '₺80' },
  { name: 'Ice Tea', sub: { tr: 'Şeftali / Limon / Mango', en: 'Peach / Lemon / Mango' }, price: '₺80' },
  { name: 'Sarıyer', sub: { tr: 'Kola / Gazoz / Portakal', en: 'Cola / Soda / Orange' }, price: '₺80' },
  { name: 'Sprite / Fanta', sub: null, price: '₺80' },
  { name: 'Özerhisar Ayran', sub: null, price: '₺80' },
  { name: { tr: 'Büyük Ayran', en: 'Large Ayran' }, sub: null, price: '₺80' },
  { name: 'Ayran', sub: null, price: '₺50' },
  { name: { tr: 'Soda', en: 'Sparkling Water' }, sub: null, price: '₺45' },
  { name: { tr: 'Su', en: 'Water' }, sub: null, price: '₺30' },
]

export default function Drinks() {
  const { lang, t } = useLanguage()

  return (
    <section className="section section--dark" id="drinks">
      <div className="container">
        <div className="section__head">
          <h2 className="section__title anim" data-anim="fade-up">{t('drinks.title')}</h2>
          <p className="section__lead">{t('drinks.lead')}</p>
        </div>

        <motion.div
          className="cards cards--drinks"
          variants={staggerContainer(0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {drinks.map((drink, i) => (
            <motion.article key={i} className="card card--drink" variants={fadeInUp}>
              <h3>{typeof drink.name === 'object' ? drink.name[lang] : drink.name}</h3>
              {drink.sub && (
                <p className="muted">
                  {typeof drink.sub === 'object' ? drink.sub[lang] : drink.sub}
                </p>
              )}
              <div className="card__bottom">
                <strong className="card__price">{drink.price}</strong>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
