import { useLanguage } from '../context/LanguageContext'

export default function SEOHead() {
  const { lang } = useLanguage()

  const title = 'Diver Street Food | Smash Burger & Street Food'

  const description =
    lang === 'en'
      ? 'Premium beef rib mince, homemade sauces, Nashville tenders. The new address of street food — 4 branches in Sakarya & Kocaeli.'
      : 'Dana kaburga kıyma, ev yapımı soslar, Nashville tenders. Sokak lezzetinin yeni adresi — 4 şubede.'

  const twitterDesc =
    lang === 'en'
      ? 'Smash burger, Nashville tenders, BBQ wings — Serdivan, İzmit, Sapanca, Adapazarı'
      : 'Smash burger, Nashville tenders, BBQ wings — Serdivan, İzmit, Sapanca, Adapazarı'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Diver Street Food',
    image: `${import.meta.env.BASE_URL}img/logo.png`,
    url: 'https://diverstreetfood.com',
    telephone: '+905305415445',
    servesCuisine: ['American', 'Street Food', 'Burger'],
    priceRange: '₺₺',
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: 'Kemalpaşa, 92. SK NO: 3 C',
        addressLocality: 'Serdivan',
        addressRegion: 'Sakarya',
        postalCode: '54050',
        addressCountry: 'TR',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Alikahya Fatih, Akarca Cd. No:8/A',
        addressLocality: 'İzmit',
        addressRegion: 'Kocaeli',
        postalCode: '41310',
        addressCountry: 'TR',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'İstasyon Caddesi, Fevzi Çakmak Cd.',
        addressLocality: 'Sapanca',
        addressRegion: 'Sakarya',
        postalCode: '54600',
        addressCountry: 'TR',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Soğanpazarı Cd. No:66/B',
        addressLocality: 'Adapazarı',
        addressRegion: 'Sakarya',
        postalCode: '54100',
        addressCountry: 'TR',
      },
    ],
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Tuesday', opens: '11:00', closes: '23:30' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Wednesday', opens: '11:00', closes: '23:30' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Thursday', opens: '11:00', closes: '23:30' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '11:00', closes: '23:30' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '12:00', closes: '00:30' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '12:00', closes: '22:00' },
    ],
  }

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content={lang === 'en' ? 'en_US' : 'tr_TR'} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={twitterDesc} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
