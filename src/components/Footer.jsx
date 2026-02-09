import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img className="footer__logo" src={`${import.meta.env.BASE_URL}img/logo.png`} alt="Diver Street Food" loading="lazy" decoding="async" width={44} height={44} />
          <p className="muted small">{t('footer.copyright')}</p>
        </div>
        <div className="footer__links">
          <a href="#menu">{t('footer.menu')}</a>
          <a href="#contact">{t('footer.contact')}</a>
        </div>
      </div>
    </footer>
  )
}
