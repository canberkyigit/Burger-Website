import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { staggerContainer, fadeInUp } from '../utils/animations'

const burgers = [
  { tag: { tr: 'Klasik', en: 'Classic' }, name: 'Hamburger', desc: { tr: 'Dana kaburga kıyma 90g, karamelize soğan, alman turşusu, diver sos', en: '90g beef rib mince, caramelized onions, German pickles, diver sauce' }, price: '₺400', type: 'single' },
  { tag: { tr: 'Popüler', en: 'Popular' }, name: 'Cheese Burger', desc: { tr: 'Dana kaburga kıyma 90g, karamelize soğan, cheddar peynir, alman turşusu, diver sos', en: '90g beef rib mince, caramelized onions, cheddar cheese, German pickles, diver sauce' }, price: '₺410', type: 'single' },
  { tag: { tr: 'Trüf', en: 'Truffle' }, name: 'Mushroom Burger', desc: { tr: 'Dana kaburga kıyma 90g, cheddar, porcini, kestane & kültür mantarı, trüf yağ, scalt cream sos, karamelize soğan', en: '90g beef rib mince, cheddar, porcini, chestnut & cultivated mushrooms, truffle oil, scalt cream sauce, caramelized onions' }, price: '₺420', type: 'mushroom' },
  { tag: { tr: 'BBQ', en: 'BBQ' }, name: 'BBQ Cheese Burger', desc: { tr: 'Dana kaburga kıyma 90g, karamelize soğan, cheddar peynir, alman turşusu, BBQ sos, diver sos', en: '90g beef rib mince, caramelized onions, cheddar cheese, German pickles, BBQ sauce, diver sauce' }, price: '₺420', type: 'single' },
  { tag: { tr: 'Korean', en: 'Korean' }, name: 'Korean Cheese Burger', desc: { tr: 'Dana kaburga kıyma 90g, karamelize soğan, cheddar peynir, alman turşusu, Korean sos, diver sos', en: '90g beef rib mince, caramelized onions, cheddar cheese, German pickles, Korean sauce, diver sauce' }, price: '₺420', type: 'single' },
  { tag: { tr: 'Double', en: 'Double' }, name: 'Double Cheese Burger', desc: { tr: 'Dana kaburga kıyma 180g, karamelize soğan, cheddar 2x, alman turşusu 4x, diver sos', en: '180g beef rib mince, caramelized onions, cheddar 2x, German pickles 4x, diver sauce' }, price: '₺530', type: 'double' },
  { tag: { tr: 'Double', en: 'Double' }, name: 'Double Mushroom Burger', desc: { tr: 'Dana kaburga kıyma 180g, cheddar peynir, porcini, kestane & kültür mantarı, trüf yağ, scalt cream sos, karamelize soğan', en: '180g beef rib mince, cheddar cheese, porcini, chestnut & cultivated mushrooms, truffle oil, scalt cream sauce, caramelized onions' }, price: '₺535', type: 'double-mushroom' },
  { tag: { tr: 'Smash', en: 'Smash' }, name: 'LA Smash Burger', desc: { tr: 'Dana kaburga kıyma 90g, cheddar peynir, çıtır soğan, pickle mustard sos, maydanoz', en: '90g beef rib mince, cheddar cheese, crispy onions, pickle mustard sauce, parsley' }, price: '₺455', type: 'single' },
  { tag: { tr: 'Smash', en: 'Smash' }, name: 'American Smash Burger', desc: { tr: 'Dana kaburga kıyma 90g, cheddar peynir, turşu relish, confi garlic mayonez, chipotle', en: '90g beef rib mince, cheddar cheese, pickle relish, confi garlic mayo, chipotle' }, price: '₺455', type: 'single' },
  { tag: { tr: 'Çocuk', en: 'Kids' }, name: 'Kids Burger', desc: { tr: 'Dana kaburga kıyma 90g, brioche ekmek, el yapımı ketçap', en: '90g beef rib mince, brioche bun, homemade ketchup' }, price: '₺300', type: 'kids' },
]

export default function MenuBurgers({ onCardClick }) {
  const { lang, t } = useLanguage()

  return (
    <section className="section section--dark" id="menu">
      <div className="container">
        <div className="section__head">
          <h2 className="section__title anim" data-anim="fade-up">{t('burgers.title')}</h2>
          <p className="section__lead">{t('burgers.lead')}</p>
        </div>

        <motion.div
          className="cards"
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {burgers.map((burger, i) => (
            <motion.article
              key={i}
              className="card card--clickable"
              data-type={burger.type}
              variants={fadeInUp}
              whileTap={{ scale: 0.97 }}
              onClick={() => onCardClick(burger)}
            >
              <div className="card__tag">{burger.tag[lang]}</div>
              <h3>{burger.name}</h3>
              <p className="muted">{burger.desc[lang]}</p>
              <div className="card__bottom">
                <strong className="card__price">{burger.price}</strong>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <p className="muted small" style={{ marginTop: '14px', textAlign: 'center' }}>
          {t('burgers.note')}
        </p>
      </div>
    </section>
  )
}
