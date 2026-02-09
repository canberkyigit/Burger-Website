import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { staggerContainer, fadeInUp } from '../utils/animations'

const items = [
  { tag: { tr: 'Tenders', en: 'Tenders' }, name: { tr: 'Chicken Tenders', en: 'Chicken Tenders' }, desc: { tr: 'Nashville tenders, diver honey sos, alman turşusu, kızarmış ekmek, maydanoz', en: 'Nashville tenders, diver honey sauce, German pickles, fried bread, parsley' }, price: '₺275', type: 'tenders' },
  { tag: { tr: 'Wings', en: 'Wings' }, name: { tr: 'BBQ Wings', en: 'BBQ Wings' }, desc: { tr: '7 adet tavuk kanat, BBQ sos, maydanoz, meksika biberi, confi garlic mayonez', en: '7 chicken wings, BBQ sauce, parsley, jalapeño, confi garlic mayo' }, price: '₺285', type: 'wings' },
  { tag: { tr: 'Kutu', en: 'Box' }, name: { tr: 'Deep Diver Box', en: 'Deep Diver Box' }, desc: { tr: '2x tavuk kroket, 10x tavuk toplari, 2x tavuk parçaları, 2x Nashville tenders, 3x soğan halkası, patates', en: '2x chicken croquette, 10x chicken balls, 2x chicken pieces, 2x Nashville tenders, 3x onion rings, fries' }, price: '₺375', type: 'box' },
  { tag: { tr: 'Taco', en: 'Taco' }, name: { tr: 'Tenders Taco', en: 'Tenders Taco' }, desc: { tr: 'Nashville tenders 2x, tortilla 2x, coleslaw, deep diver sos, şerit kök sebzeler', en: 'Nashville tenders 2x, tortilla 2x, coleslaw, deep diver sauce, julienne root vegetables' }, price: '₺240', type: 'taco' },
  { tag: { tr: 'Patates', en: 'Fries' }, name: { tr: 'Fries Fries Baby', en: 'Fries Fries Baby' }, desc: { tr: 'Amerikan patates, cajun, sarımsaklı manda yoğurdu, el yapımı ketçap, maydanoz', en: 'American fries, cajun, garlic buffalo yogurt, homemade ketchup, parsley' }, price: '₺225', type: 'fries' },
  { tag: { tr: 'Trüf', en: 'Truffle' }, name: { tr: 'Trüflü Patates Kızartması', en: 'Truffle Fries' }, desc: { tr: 'Bergama tulum peynir, trüf mantar, maydanoz, trüflü mayonez, deep diver sos, ranch sos', en: 'Bergama tulum cheese, truffle mushroom, parsley, truffle mayo, deep diver sauce, ranch sauce' }, price: '₺200', type: 'fries' },
  { tag: { tr: 'Klasik', en: 'Classic' }, name: { tr: 'Patates Kızartması', en: 'French Fries' }, desc: { tr: 'Cajun baharatı, deep diver sos, BBQ sos, ranch sos', en: 'Cajun spice, deep diver sauce, BBQ sauce, ranch sauce' }, price: '₺140', type: 'fries' },
]

export default function SharedPlates({ onCardClick }) {
  const { lang, t } = useLanguage()

  return (
    <section className="section section--dark" id="shared">
      <div className="container">
        <div className="section__head">
          <h2 className="section__title anim" data-anim="fade-up">{t('shared.title')}</h2>
          <p className="section__lead">{t('shared.lead')}</p>
        </div>

        <motion.div
          className="cards"
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {items.map((item, i) => (
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
