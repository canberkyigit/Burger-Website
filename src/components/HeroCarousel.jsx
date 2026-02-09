import { useState, useEffect, useCallback, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

const slides = [
  {
    name: 'Hamburger',
    desc: { tr: 'Dana kaburga kıyma 90g, karamelize soğan, alman turşusu, diver sos', en: '90g beef rib mince, caramelized onions, German pickles, diver sauce' },
    price: '₺400',
    layers: ['bun bun--top', 'lettuce', 'tomato', 'cheese', 'patty', 'bun bun--bottom'],
    burgerClass: 'burger',
  },
  {
    name: 'Cheese Burger',
    desc: { tr: 'Dana kaburga kıyma 90g, karamelize soğan, cheddar peynir, alman turşusu, diver sos', en: '90g beef rib mince, caramelized onions, cheddar cheese, German pickles, diver sauce' },
    price: '₺410',
    layers: ['bun bun--top', 'lettuce', 'cheese', 'patty', 'bun bun--bottom'],
    burgerClass: 'burger',
  },
  {
    name: 'Mushroom Burger',
    desc: { tr: 'Dana kaburga kıyma 90g, cheddar, porcini, kestane & kültür mantarı, trüf yağ, scalt cream sos', en: '90g beef rib mince, cheddar, porcini, chestnut & cultivated mushrooms, truffle oil, scalt cream sauce' },
    price: '₺420',
    layers: ['bun bun--top', 'lettuce', 'cheese', 'patty patty--mushroom', 'bun bun--bottom'],
    burgerClass: 'burger',
  },
  {
    name: 'BBQ Cheese Burger',
    desc: { tr: 'Dana kaburga kıyma 90g, karamelize soğan, cheddar peynir, alman turşusu, BBQ sos, diver sos', en: '90g beef rib mince, caramelized onions, cheddar cheese, German pickles, BBQ sauce, diver sauce' },
    price: '₺420',
    layers: ['bun bun--top', 'lettuce', 'tomato', 'cheese', 'patty', 'bun bun--bottom'],
    burgerClass: 'burger',
  },
  {
    name: 'Korean Cheese Burger',
    desc: { tr: 'Dana kaburga kıyma 90g, karamelize soğan, cheddar peynir, alman turşusu, Korean sos, diver sos', en: '90g beef rib mince, caramelized onions, cheddar cheese, German pickles, Korean sauce, diver sauce' },
    price: '₺420',
    layers: ['bun bun--top', 'lettuce', 'tomato', 'cheese', 'patty', 'bun bun--bottom'],
    burgerClass: 'burger',
  },
  {
    name: 'Double Cheese Burger',
    desc: { tr: 'Dana kaburga kıyma 180g, karamelize soğan, cheddar 2x, alman turşusu 4x, diver sos', en: '180g beef rib mince, caramelized onions, cheddar 2x, German pickles 4x, diver sauce' },
    price: '₺530',
    layers: ['bun bun--top', 'lettuce', 'cheese', 'patty', 'cheese', 'patty', 'bun bun--bottom'],
    burgerClass: 'burger burger--double',
  },
  {
    name: 'Double Mushroom Burger',
    desc: { tr: 'Dana kaburga kıyma 180g, cheddar, porcini, kestane & kültür mantarı, trüf yağ, scalt cream sos', en: '180g beef rib mince, cheddar, porcini, chestnut & cultivated mushrooms, truffle oil, scalt cream sauce' },
    price: '₺535',
    layers: ['bun bun--top', 'lettuce', 'cheese', 'patty patty--mushroom', 'cheese', 'patty patty--mushroom', 'bun bun--bottom'],
    burgerClass: 'burger burger--double',
  },
  {
    name: 'LA Smash Burger',
    desc: { tr: 'Dana kaburga kıyma 90g, cheddar peynir, çıtır soğan, pickle mustard sos, maydanoz', en: '90g beef rib mince, cheddar cheese, crispy onions, pickle mustard sauce, parsley' },
    price: '₺455',
    layers: ['bun bun--top', 'lettuce', 'cheese', 'patty', 'bun bun--bottom'],
    burgerClass: 'burger',
  },
  {
    name: 'American Smash Burger',
    desc: { tr: 'Dana kaburga kıyma 90g, cheddar peynir, turşu relish, confi garlic mayonez, chipotle', en: '90g beef rib mince, cheddar cheese, pickle relish, confi garlic mayo, chipotle' },
    price: '₺455',
    layers: ['bun bun--top', 'lettuce', 'tomato', 'cheese', 'patty', 'bun bun--bottom'],
    burgerClass: 'burger',
  },
  {
    name: 'Kids Burger',
    desc: { tr: 'Dana kaburga kıyma 90g, brioche ekmek, el yapımı ketçap', en: '90g beef rib mince, brioche bun, homemade ketchup' },
    price: '₺300',
    layers: ['bun bun--top', 'cheese', 'patty', 'bun bun--bottom'],
    burgerClass: 'burger burger--small',
  },
]

export default function HeroCarousel() {
  const { lang } = useLanguage()
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)
  const startX = useRef(0)
  const dragging = useRef(false)

  const goTo = useCallback((idx) => {
    setCurrent(idx)
  }, [])

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length)
  }, [])

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(next, 4000)
  }, [next])

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [startTimer])

  const handleSwipe = useCallback((endX) => {
    const diff = startX.current - endX
    if (Math.abs(diff) > 40) {
      if (diff > 0) next()
      else prev()
      startTimer()
    }
  }, [next, prev, startTimer])

  /* Touch (mobile) */
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e) => {
    handleSwipe(e.changedTouches[0].clientX)
  }

  /* Pointer / mouse (desktop drag) */
  const handlePointerDown = (e) => {
    startX.current = e.clientX
    dragging.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const handlePointerUp = (e) => {
    if (!dragging.current) return
    dragging.current = false
    handleSwipe(e.clientX)
  }

  const slide = slides[current]

  return (
    <div className="carousel">
      <button
        className="carousel__btn carousel__btn--prev"
        onClick={() => { prev(); startTimer() }}
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        className="carousel__btn carousel__btn--next"
        onClick={() => { next(); startTimer() }}
        aria-label="Next"
      >
        ›
      </button>

      <div
        className="carousel__track"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        style={{ cursor: 'grab', touchAction: 'pan-y' }}
      >
        <div key={current} className="carousel__slide">
          <div className="burger-card">
            <div className="burger-card__shine"></div>
            <div className="burger-card__img">
              <div className={slide.burgerClass}>
                {slide.layers.map((layer, j) => (
                  <div key={j} className={layer}></div>
                ))}
              </div>
            </div>
            <div className="burger-card__info">
              <strong>{slide.name}</strong>
              <span>{slide.desc[lang]}</span>
              <div className="price">
                <span className="new">{slide.price}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="carousel__dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`carousel__dot${i === current ? ' carousel__dot--active' : ''}`}
            onClick={() => {
              goTo(i)
              startTimer()
            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
