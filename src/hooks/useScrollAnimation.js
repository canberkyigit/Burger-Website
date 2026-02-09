import { useEffect } from 'react'

export default function useScrollAnimation() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    const observeNew = () => {
      document.querySelectorAll('.anim:not(.visible)').forEach((el) => {
        io.observe(el)
      })
    }

    observeNew()

    // Watch for dynamically added .anim elements (lazy loading)
    const mo = new MutationObserver(observeNew)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])
}
