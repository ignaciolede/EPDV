import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StickerPop from '../ui/StickerPop'
import ScrollReveal from '../ui/ScrollReveal'
import { asset } from '../../utils/asset'

/* ── Máscara de mapa para el avatar ──────────────────────────────── */
const MASK = 'M594.9,30.3l-128.4,65.2c-14,7.1-30.5,7.1-44.5,0L244.4,5.3c-14-7.1-30.5-7.1-44.5,0L26.9,93.1C10.4,101.4,0,118.4,0,136.9v536.9c0,36.7,38.7,60.5,71.4,43.8l128.4-65.2c14-7.1,30.5-7.1,44.5,0l177.6,90.1c14,7.1,30.5,7.1,44.5,0l172.9-87.7c16.5-8.4,26.9-25.3,26.9-43.8V74.1c0-36.7-38.7-60.5-71.4-43.8h0Z'

/* ── Datos — completar con fotos y textos reales ─────────────────── */
const TESTIMONIOS = [
  {
    nombre: 'Familia García',
    texto: 'Planificar nuestro primer viaje a Disney parecía imposible. Vero y Diego lo convirtieron en algo mágico desde el primer momento. Cada detalle estaba pensado para nosotros.',
    foto: null,
    fill: '#1B3B6F',
    bg: 'bg-brand-frost-blue',
    text: 'text-brand-blue-dark',
  },
  {
    nombre: 'Caro y Martín',
    texto: 'Fuimos al estreno de Epic Universe y fue increíble. Sin ellos jamás hubiéramos conseguido esas entradas ni sabido cómo aprovechar cada minuto del parque.',
    foto: null,
    fill: '#C97B45',
    bg: 'bg-brand-peach',
    text: 'text-brand-blue-dark',
  },
  {
    nombre: 'Los Rodríguez',
    texto: 'Viajamos con tres chicos y todo salió perfecto. Nos acompañaron durante todo el viaje y cualquier duda la teníamos resuelta en minutos. Volvemos el año que viene.',
    foto: null,
    fill: '#4A90D9',
    bg: 'bg-brand-blue-dark',
    text: 'text-white',
  },
  {
    nombre: 'Sofi y Nico',
    texto: 'Nuestro viaje de luna de miel fue un sueño. Nunca imaginamos que un crucero Disney podía superar todas las expectativas. Gracias por hacerlo posible.',
    foto: null,
    fill: '#2B5EA7',
    bg: 'bg-brand-blue',
    text: 'text-white',
  },
  {
    nombre: 'Familia López',
    texto: 'El viaje de fin de año de los chicos a París fue impecable. Vero y Diego saben exactamente cómo hacer que cada momento sea especial.',
    foto: null,
    fill: '#B83226',
    bg: 'bg-brand-coral',
    text: 'text-white',
  },
  {
    nombre: 'Andrés y Laura',
    texto: 'Ya era nuestro cuarto viaje a Disney y aún así aprendimos cosas nuevas. Su conocimiento no tiene comparación. Nos vemos en el próximo.',
    foto: null,
    fill: '#1B3B6F',
    bg: 'bg-brand-parchment',
    text: 'text-brand-blue-dark',
  },
]

/* ── Avatar con máscara de mapa ───────────────────────────────────── */
function Avatar({ nombre, foto, fill, idx }) {
  const id = `tc-av-${idx}`
  return (
    <svg viewBox="0 0 666.3 748" className="w-24 sm:w-28 h-auto flex-shrink-0 drop-shadow-lg" aria-hidden="true">
      <defs>
        <clipPath id={id}><path d={MASK} /></clipPath>
      </defs>
      {foto ? (
        <image href={foto} x="0" y="0" width="666.3" height="748"
               preserveAspectRatio="xMidYMid slice" clipPath={`url(#${id})`} />
      ) : (
        <>
          <rect x="0" y="0" width="666.3" height="748" fill={fill} clipPath={`url(#${id})`} />
          <text x="333" y="374" textAnchor="middle" dominantBaseline="middle"
                fontSize="300" fill="white" fillOpacity="0.45" fontFamily="sans-serif">
            {nombre.charAt(0)}
          </text>
        </>
      )}
      <path d={MASK} fill="none" stroke="rgba(0,110,255,0.18)" strokeWidth="18" />
    </svg>
  )
}

/* ── Variantes de animación para el slide ────────────────────────── */
const variants = {
  enter: (dir) => ({ x: dir * 56, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir) => ({ x: -dir * 56, opacity: 0 }),
}

const ChevronLeft  = () => <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
const ChevronRight = () => <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>

/* ── Sección principal ────────────────────────────────────────────── */
export default function Testimonios() {
  const [current, setCurrent] = useState(0)
  const [dir, setDir] = useState(1)

  const prev = () => {
    setDir(-1)
    setCurrent(c => (c - 1 + TESTIMONIOS.length) % TESTIMONIOS.length)
  }

  const next = () => {
    setDir(1)
    setCurrent(c => (c + 1) % TESTIMONIOS.length)
  }

  const goTo = (idx) => {
    setDir(idx > current ? 1 : -1)
    setCurrent(idx)
  }

  useEffect(() => {
    const id = setInterval(() => {
      setDir(1)
      setCurrent(c => (c + 1) % TESTIMONIOS.length)
    }, 5500)
    return () => clearInterval(id)
  }, [])

  const t = TESTIMONIOS[current]

  return (
    <section id="testimonios" className="relative pb-section">
      <StickerPop src={asset('assets/img/Stickers/Aprobado.svg')}      rotate={-9}  delay={0}    className="top-8     left-[2%]  w-20 lg:w-28 hidden lg:block" />
      <StickerPop src={asset('assets/img/Stickers/Logo Circular.svg')} rotate={11}  delay={0.15} className="bottom-10 right-[2%] w-16 lg:w-24 hidden lg:block" />

      <div className="section-container">

        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="sticker-blue mb-3">Experiencias reales</p>
            <h2 className="section-title">FANS QUE YA LO VIVIERON</h2>
          </div>
        </ScrollReveal>

        {/* Carrusel */}
        <div className="relative max-w-3xl mx-auto">

          {/* Flechas */}
          <button
            onClick={prev}
            aria-label="Anterior"
            className="absolute -left-4 sm:-left-12 top-1/2 -translate-y-1/2 z-10
                       w-9 h-9 rounded-full flex items-center justify-center
                       bg-white/80 text-brand-blue-dark shadow-md
                       hover:bg-white hover:scale-110 active:scale-95
                       transition-all duration-200"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={next}
            aria-label="Siguiente"
            className="absolute -right-4 sm:-right-12 top-1/2 -translate-y-1/2 z-10
                       w-9 h-9 rounded-full flex items-center justify-center
                       bg-white/80 text-brand-blue-dark shadow-md
                       hover:bg-white hover:scale-110 active:scale-95
                       transition-all duration-200"
          >
            <ChevronRight />
          </button>

          {/* Tarjeta */}
          <div className="relative overflow-hidden rounded-3xl shadow-card-lg min-h-[260px] sm:min-h-[280px]">
            <AnimatePresence initial={false} custom={dir}>
              <motion.div
                key={current}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute inset-0 ${t.bg} ${t.text}
                            flex flex-col sm:flex-row items-center gap-8 p-8 sm:p-10 lg:p-12`}
              >
                {/* Foto — columna izquierda en desktop, arriba en mobile */}
                <div className="flex-shrink-0 flex flex-col items-center gap-3">
                  <Avatar nombre={t.nombre} foto={t.foto} fill={t.fill} idx={current} />
                  <span className="font-subheading text-[10px] uppercase tracking-widest opacity-55 text-center">
                    {t.nombre}
                  </span>
                </div>

                {/* Divisor vertical desktop / horizontal mobile */}
                <div className="hidden sm:block w-px self-stretch bg-current opacity-15 flex-shrink-0" />
                <div className="sm:hidden w-16 h-px bg-current opacity-15 flex-shrink-0" />

                {/* Texto — columna derecha */}
                <p className="font-body text-base sm:text-lg leading-relaxed opacity-80
                              text-center sm:text-left flex-1">
                  {t.texto}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-5">
            {TESTIMONIOS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Testimonio ${i + 1}`}
                className={[
                  'rounded-full transition-all duration-300',
                  i === current
                    ? 'w-5 h-1.5 bg-brand-blue'
                    : 'w-1.5 h-1.5 bg-brand-blue/25 hover:bg-brand-blue/50',
                ].join(' ')}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
