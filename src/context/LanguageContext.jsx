import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const translations = {
  tr: {
    nav: { home: 'Ana Sayfa', about: 'Hakkımızda', menu: 'Menü', gallery: 'Galeri', reviews: 'Yorumlar', contact: 'İletişim' },
    header: { pdfBtn: 'PDF Menü İçin Tıkla' },
    hero: {
      desc: 'Dana kaburga kıyma, ev yapımı soslar, Nashville tenders ve çok daha fazlası. Sokak lezzetinin yeni adresi.',
      menuBtn: 'Menüyü İncele',
      locationBtn: 'Konum / İletişim',
    },
    about: {
      title: 'Neden Diver Street Food?',
      lead: 'Sokak lezzetinin yeni adresi. Taze malzeme, ev yapımı soslar, tutkuyla hazırlanan her porsiyon.',
      statBranches: 'Şube',
      statVarieties: 'Burger Çeşidi',
      statSauces: 'Ev Yapımı Sos',
      statBeef: 'Dana Kaburga',
      featBeefTitle: 'Dana Kaburga Kıyma',
      featBeefDesc: '90g tek veya 180g double — smash tekniğiyle pişirilen gerçek lezzet.',
      featSaucesTitle: 'Ev Yapımı Soslar',
      featSaucesDesc: 'Diver Sos, Deep Diver, Chipotle, Korean, Trüflü Mayo ve daha fazlası.',
      featNashvilleTitle: 'Nashville & Wings',
      featNashvilleDesc: 'Çıtır tavuk tenders, BBQ kanat, taco ve paylaşımlık tabaklar.',
      featFriesTitle: 'Cajun & Trüflü Patates',
      featFriesDesc: 'El yapımı patates, cajun baharatı, trüf mantar, tulum peynir.',
      hoursTitle: 'Çalışma Saatleri',
      hoursSub: 'Her gün taze, her gün sıcak.',
      hoursOpen: 'Şu an açık',
      hoursClosed: 'Şu an kapalı',
      hoursTodayOpen: 'Bugün {hours} arası hizmetinizdeyiz.',
      hoursTodayClosed: 'Bugün kapalıyız. Yarın görüşmek üzere!',
      daysClosed: 'Kapalı',
    },
    days: ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'],
    burgers: {
      title: '🍔 Burgerler',
      lead: 'Dana kaburga kıyma, smash tekniği, ev yapımı soslar.',
      note: '🍟 Menü patatesi trüflü olarak değişim: +₺85 · Burger servisimizin yanına içecek dahil değildir.',
    },
    chicken: {
      title: '🍗 Tavuk Burgerler',
      lead: 'Çıtır tavuk, Nashville tarzı, özel soslarla.',
    },
    shared: {
      title: '🍟 Paylaşımlık Tabaklar',
      lead: 'Tenders, wings, taco, patates… paylaş ya da paylaşma.',
    },
    sauces: {
      title: '🥫 Ekstra Soslar',
      lead: "Her biri ₺40 — burger'ının yanına ekle.",
    },
    drinks: {
      title: '🥤 İçecekler',
      lead: 'Soğuk içecekler, ayran ve daha fazlası.',
    },
    gallery: {
      title: '📸 Galeri',
      lead: 'Lezzetlerimizden kareler — yakında gerçek fotoğraflarla güncellenecek.',
    },
    testimonials: {
      title: '💬 Müşteri Yorumları',
      lead: 'Misafirlerimiz ne diyor?',
    },
    contact: {
      title: 'İletişim',
      lead: 'Şubelerimizi ziyaret edin',
      mapLink: '📍 Haritada Aç',
      note: 'Fiyatlarımız 23 Aralık 2025 tarihi ile geçerlidir. Satışlarımıza tüm vergiler dahildir. Burger servisimizin yanına içecek dahil değildir. Şube lokasyonlarına bağlı kira farklılıkları sebebiyle fiyatlar %10 civarında değişiklik gösterebilir.',
    },
    footer: {
      copyright: '© 2026 Tüm hakları saklıdır.',
      menu: 'Menü',
      contact: 'İletişim',
    },
    modal: { menuTitle: 'Menü' },
  },
  en: {
    nav: { home: 'Home', about: 'About Us', menu: 'Menu', gallery: 'Gallery', reviews: 'Reviews', contact: 'Contact' },
    header: { pdfBtn: 'Click for PDF Menu' },
    hero: {
      desc: 'Premium beef rib mince, homemade sauces, Nashville tenders and much more. The new address of street food.',
      menuBtn: 'Explore Menu',
      locationBtn: 'Location / Contact',
    },
    about: {
      title: 'Why Diver Street Food?',
      lead: 'The new address of street food. Fresh ingredients, homemade sauces, every portion prepared with passion.',
      statBranches: 'Branches',
      statVarieties: 'Burger Varieties',
      statSauces: 'Homemade Sauces',
      statBeef: 'Beef Rib',
      featBeefTitle: 'Beef Rib Mince',
      featBeefDesc: 'Single 90g or double 180g — real flavor cooked with the smash technique.',
      featSaucesTitle: 'Homemade Sauces',
      featSaucesDesc: 'Diver Sauce, Deep Diver, Chipotle, Korean, Truffle Mayo and more.',
      featNashvilleTitle: 'Nashville & Wings',
      featNashvilleDesc: 'Crispy chicken tenders, BBQ wings, tacos and sharing plates.',
      featFriesTitle: 'Cajun & Truffle Fries',
      featFriesDesc: 'Handmade fries, cajun spice, truffle mushroom, tulum cheese.',
      hoursTitle: 'Working Hours',
      hoursSub: 'Fresh every day, hot every day.',
      hoursOpen: 'Open now',
      hoursClosed: 'Closed now',
      hoursTodayOpen: 'Today we serve between {hours}.',
      hoursTodayClosed: "We're closed today. See you tomorrow!",
      daysClosed: 'Closed',
    },
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    burgers: {
      title: '🍔 Burgers',
      lead: 'Beef rib mince, smash technique, homemade sauces.',
      note: '🍟 Truffle fries upgrade: +₺85 · Drinks are not included with burger service.',
    },
    chicken: {
      title: '🍗 Chicken Burgers',
      lead: 'Crispy chicken, Nashville style, with special sauces.',
    },
    shared: {
      title: '🍟 Sharing Plates',
      lead: "Tenders, wings, taco, fries… share or don't share.",
    },
    sauces: {
      title: '🥫 Extra Sauces',
      lead: 'Each ₺40 — add to your burger.',
    },
    drinks: {
      title: '🥤 Beverages',
      lead: 'Cold drinks, ayran and more.',
    },
    gallery: {
      title: '📸 Gallery',
      lead: 'Snapshots of our flavors — to be updated with real photos soon.',
    },
    testimonials: {
      title: '💬 Customer Reviews',
      lead: 'What do our guests say?',
    },
    contact: {
      title: 'Contact',
      lead: 'Visit our branches',
      mapLink: '📍 Open on Map',
      note: 'Our prices are valid as of December 23, 2025. All taxes are included. Drinks are not included with burger service. Prices may vary approximately 10% due to rent differences between branch locations.',
    },
    footer: {
      copyright: '© 2026 All rights reserved.',
      menu: 'Menu',
      contact: 'Contact',
    },
    modal: { menuTitle: 'Menu' },
  },
}

const LanguageContext = createContext()

const STORAGE_KEY = 'diver-lang'

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'tr'
    } catch {
      return 'tr'
    }
  })

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang)
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // localStorage not available
    }
  }, [lang])

  const toggleLang = () => {
    setLang((prev) => (prev === 'tr' ? 'en' : 'tr'))
  }

  const t = useCallback((key, params) => {
    const keys = key.split('.')
    let val = translations[lang]
    for (const k of keys) {
      if (val == null) return key
      val = val[k]
    }
    if (typeof val === 'string' && params) {
      return val.replace(/\{(\w+)\}/g, (_, k) => params[k] ?? '')
    }
    return val ?? key
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
