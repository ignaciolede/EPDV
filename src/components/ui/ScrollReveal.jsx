import { useEffect, useRef, useState } from 'react'

/**
 * Envuelve cualquier elemento y lo anima al entrar al viewport.
 * Usa IntersectionObserver — no depende de librerías externas.
 *
 * Props:
 *   delay   (ms) — retraso de entrada, útil para stagger entre cards
 *   as      — tag HTML del wrapper (default: 'div')
 *   className — clases extra (posición, tamaño, etc.)
 */
export default function ScrollReveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
    >
      {children}
    </Tag>
  )
}
