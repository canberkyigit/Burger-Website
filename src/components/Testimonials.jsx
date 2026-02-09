import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { useLanguage } from '../context/LanguageContext'
import 'swiper/css'
import 'swiper/css/pagination'

const allReviews = [
  { stars: '★★★★★', text: '"Yediğim en iyi burger. Et ve ekmeğinin tadı mükemmel. Kombinasyon olarak daha iyisi olamazdı. Mutlaka denemelisiniz."', avatar: 'C', name: 'Canberk Y.', source: 'Google Reviews' },
  { stars: '★★★★★', text: '"Çalışanların gülen yüzü, hizmetin hızlılığı, samimi ortam... Her şey o kadar güzeldi ki emeklerinize ellerinize sağlık."', avatar: 'Y', name: 'Yaren S.', source: 'Google Reviews' },
  { stars: '★★★★★', text: '"Açık konuşayım yediğim en iyi hamburgerlerden biriydi. İzmit\'te yediğim en iyisiydi. Lezzetiyle doyuruculuğu 9/10. Kesinlikle tavsiye ederim."', avatar: 'M', name: 'Muhammet K.', source: 'Google Reviews' },
  { stars: '★★★★★', text: '"Bu burger tam anlamıyla harika. Türkiye\'nin birçok şehrinde yemediğim yer yoktur. İddia ediyorum mushroom burger üstüne tanımam. Lezzet abidesi."', avatar: 'T', name: 'Tuna S.', source: 'Google Reviews' },
  { stars: '★★★★★', text: '"İzmit\'te yaşamıyorum Gebze\'de yaşıyorum. O kadar lezzetli ki artık başka yere gitmez oldum. Sadece bu lezzet için Gebze\'den buraya gelmeye razıyım."', avatar: 'İ', name: 'İbrahim Z.', source: 'Google Reviews' },
  { stars: '★★★★★', text: '"Hamburgerler çok lezzetliydi, tat bakımından değişik bir atmosfere sahip. Çalışanlar çok güler yüzlü ve ilgiliydi. Herkese tavsiye ederim, başarılı."', avatar: 'G', name: 'Gamze A.', source: 'Google Reviews' },
  { stars: '★★★★★', text: '"İzmit\'te yiyebileceğiniz en iyi burger net. Mushroom Burger denedim inanılmaz lezzetliydi. Hiç tereddüt etmeden gelebilirsiniz. Müdavimi olduk."', avatar: 'F', name: 'Fatma G.', source: 'Google Reviews' },
  { stars: '★★★★★', text: '"İzmit\'in gerçekten böyle bir hamburgerciye ihtiyacı vardı. Burgerler bayağı lezzetli. Hizmet güzel."', avatar: 'G', name: 'Gülse Ö.', source: 'Google Reviews' },
  { stars: '★★★★★', text: '"Kocaeli\'de son zamanlarda yediğim en iyi burger deneyimiydi. Double Mushroom Burger efsane."', avatar: 'S', name: 'Serkan T.', source: 'Google Reviews' },
  { stars: '★★★★★', text: '"Her şey çok güzeldi, iyi bir burger yedik. Çalışanlar ilgili ve güler yüzlüydü. Siparişimiz hemen alındı ve hemen geldi, bayağı hızlılar."', avatar: 'M', name: 'Melisa Y.', source: 'Google Reviews' },
  { stars: '★★★★★', text: '"Tertemiz bir mekan. Hamburger ve soslarına bayıldım, yediğim en lezzetli hamburgerdi. Grup buluşmaları için uygun."', avatar: 'N', name: 'Nedime A.', source: 'Google Reviews' },
  { stars: '★★★★★', text: '"Burgerleri gerçekten efsane! Etin lezzeti, ekmeğin tazeliği ve sosların uyumu harikaydı. Sunum çok özenli, ortam sıcak ve keyifli."', avatar: 'J', name: 'Javid K.', source: 'Google Reviews' },
  { stars: '★★★★★', text: '"Honey mustard tavuk burger favorim. Klasik tavuk burgerler gibi kuru ve tatsız değil, bayağı lezzetli. İlk defa bir burgeri canım çekti ikinci kez gelmek istedim."', avatar: 'B', name: 'Beyza Y.', source: 'Google Reviews' },
  { stars: '★★★★★', text: '"Double cheese burger denedim, açık ara yediğim en iyisiydi. Sonunda İzmit\'te tam anlamıyla burger lezzeti alabileceğim bir yer açıldı."', avatar: 'E', name: 'Ebrar Ş.', source: 'Google Reviews' },
  { stars: '★★★★★', text: '"Her şeyden önce HİJYEN ÇOK İYİ DURUMDA. Açık mutfak çok güven verici. Ekmek el yapımı, et gerçek et, tüm soslar el yapımı ve taze. Şiddetle tavsiye ederim."', avatar: 'B', name: 'Birol A.', source: 'Google Reviews' },
  { stars: '★★★★★', text: '"İzmit için harika bir yatırım olmuş. Herhangi bir AVM\'de ödeyeceğiniz hamburger fiyatına burada damağınızda gün boyu tadını alacağınız bir lezzet yiyeceksiniz. Şans vermeden geçmeyin, ağzınız bayram etsin."', avatar: 'İ', name: 'İlay T.', source: 'Google Reviews' },
]

export default function Testimonials() {
  const { t } = useLanguage()

  return (
    <section className="section section--soft" id="testimonials">
      <div className="container">
        <div className="section__head" style={{ textAlign: 'center' }}>
          <h2 className="section__title anim" data-anim="fade-up">{t('testimonials.title')}</h2>
          <p className="section__lead" style={{ marginInline: 'auto' }}>{t('testimonials.lead')}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            spaceBetween={14}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 14 },
              980: { slidesPerView: 4, spaceBetween: 14 },
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true }}
            loop
            grabCursor
            className="review-swiper"
          >
            {allReviews.map((review, i) => (
              <SwiperSlide key={i}>
                <article className="testimonial">
                  <div className="testimonial__stars">{review.stars}</div>
                  <p className="testimonial__text">{review.text}</p>
                  <div className="testimonial__author">
                    <div className="testimonial__avatar">{review.avatar}</div>
                    <div>
                      <strong>{review.name}</strong><br />
                      <span className="muted small">{review.source}</span>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}
