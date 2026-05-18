import { motion, useAnimation } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { asset } from '../../utils/asset'

/* ── Stickers decorativos del fondo ───────────────────────────────── */
const STICKERS = [
  { src: asset('assets/img/Stickers/Modo Avion.svg'),         rotate: -9, className: 'top-[7%]     left-[3%]  w-32 lg:w-44', hideOnMobile: false },
  { src: asset('assets/img/Stickers/Wow.svg'),                rotate:  7, className: 'top-[4%]     right-[4%] w-36 lg:w-52', hideOnMobile: false },
  { src: asset('assets/img/Stickers/Viajo Luego Existo.svg'), rotate: -6, className: 'top-[55%]    left-[1%]  w-28 lg:w-40', hideOnMobile: true  },
  { src: asset('assets/img/Stickers/I Love Magic.svg'),       rotate: 10, className: 'top-[70%]    right-[1%] w-28 lg:w-36', hideOnMobile: true  },
  { src: asset('assets/img/Stickers/Hacks.svg'),              rotate: 12, className: 'bottom-[10%] left-[5%]  w-24 lg:w-32', hideOnMobile: true  },
  { src: asset('assets/img/Stickers/No Muggles Allowed.svg'), rotate: -5, className: 'bottom-[8%]  right-[5%] w-28 lg:w-36', hideOnMobile: true  },
]

/* ── Proceso: 5 pasos ─────────────────────────────────────────────── */
const STEPS = [
  {
    step: 'Paso 01',
    titleLines: ['SOÑÁS', 'EL VIAJE'],
    items: ['Completás nuestro formulario', 'Contás tu idea de viaje', 'Fechas, destino y ganas'],
    ghost: '01',
    bg: 'bg-brand-blue-dark',
    text: 'text-white',
    divider: 'bg-white/25',
    ghostText: 'text-white',
    rotate: -3,
    yOffset: 0,
    cardWidth: 'w-44',
    swing: { deltas: [-2.5, 2, -1, 0.3, 0], times: [0, 0.25, 0.52, 0.76, 1], duration: 1.1 },
    sticker: { src: asset('assets/img/Stickers/nuestro-tip-favorito.svg'), rotate: -14, className: 'w-14 -right-5 -top-2' },
  },
  {
    step: 'Paso 02',
    titleLines: ['TE', 'CONTACTAMOS'],
    items: ['Te damos la bienvenida', 'Coordinamos los pasos', 'Sin esperas que desaniman'],
    ghost: '02',
    bg: 'bg-brand-blue',
    text: 'text-white',
    divider: 'bg-white/25',
    ghostText: 'text-white',
    rotate: 2,
    yOffset: 32,
    cardWidth: 'w-52',
    swing: { deltas: [-3, 2.2, -0.7, 0], times: [0, 0.20, 0.52, 1], duration: 0.85 },
    sticker: { src: asset('assets/img/Stickers/where-fans-come-true.svg'), rotate: 12, className: 'w-14 -right-6 -top-2' },
  },
  {
    step: 'Paso 03',
    titleLines: ['NOS', 'CONOCEMOS'],
    items: ['Videollamada personal', 'Entendemos tu viaje ideal', 'Una charla, no un formulario'],
    ghost: '03',
    bg: 'bg-brand-coral',
    text: 'text-white',
    divider: 'bg-white/25',
    ghostText: 'text-white',
    rotate: -1,
    yOffset: -12,
    cardWidth: 'w-48',
    swing: { deltas: [2.8, -1.8, 0.6, -0.2, 0], times: [0, 0.22, 0.50, 0.74, 1], duration: 1.0 },
    sticker: { src: asset('assets/img/Stickers/superpower.svg'), rotate: -8, className: 'w-14 -right-6 -top-3' },
  },
  {
    step: 'Paso 04',
    titleLines: ['ENCONTRAMOS', 'TU VIAJE'],
    items: ['Mejores opciones y precios', 'Propuesta a tu medida', 'Sin sorpresas ni letra chica'],
    ghost: '04',
    bg: 'bg-brand-frost-blue',
    text: 'text-brand-blue-dark',
    divider: 'bg-brand-blue-dark/20',
    ghostText: 'text-brand-blue-dark',
    rotate: 3,
    yOffset: 24,
    cardWidth: 'w-52',
    swing: { deltas: [-2.2, 1.4, -0.4, 0], times: [0, 0.28, 0.60, 1], duration: 0.9 },
    sticker: { src: asset('assets/img/Stickers/home-disney.svg'), rotate: 13, className: 'w-14 -right-5 -top-1' },
  },
  {
    step: 'Paso 05',
    titleLines: ['¡A', 'VIAJAR!'],
    items: ['Todo coordinado para vos', 'Con vos durante el viaje', 'Compartís, nosotros respondemos'],
    ghost: '05',
    bg: 'bg-brand-peach',
    text: 'text-brand-blue-dark',
    divider: 'bg-brand-blue-dark/20',
    ghostText: 'text-brand-blue-dark',
    rotate: -2,
    yOffset: 8,
    cardWidth: 'w-44',
    swing: { deltas: [-2, 1.8, -1.2, 0.5, -0.2, 0], times: [0, 0.18, 0.38, 0.58, 0.78, 1], duration: 1.15 },
    sticker: { src: asset('assets/img/Stickers/fan-numero-1.svg'), rotate: -11, className: 'w-14 -right-7 top-5' },
  },
]

/* ── Variantes de animación ───────────────────────────────────────── */
const stickerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.65 } },
}

const stickerItem = {
  hidden: { scale: 0, opacity: 0 },
  visible: (rotate) => ({
    scale: [0, 1.2, 1],
    opacity: 1,
    rotate,
    transition: {
      scale:   { duration: 0.45, times: [0, 0.6, 1], ease: ['easeIn', 'backOut'] },
      opacity: { duration: 0.12 },
      rotate:  { duration: 0.45, ease: 'backOut' },
    },
  }),
}

const logoAnim = {
  hidden:   { opacity: 0, scale: 0.9 },
  visible:  { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 } },
}

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay } },
})

/* ── StepCard ─────────────────────────────────────────────────────── */
function StepCard({ card, idx, isOnTop, onBringToTop }) {
  const controls = useAnimation()
  const animatingRef = useRef(false)

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: card.yOffset,
      rotate: card.rotate,
      transition: { duration: 0.55, delay: 0.5 + idx * 0.1, ease: [0.22, 1, 0.36, 1] },
    })
  }, [])

  const handleHoverStart = async () => {
    onBringToTop(idx)
    if (animatingRef.current) return
    animatingRef.current = true
    const { deltas, times, duration } = card.swing
    const rotateFrames = deltas.map((d) => card.rotate + d)
    await controls.start({
      rotate: rotateFrames,
      y: card.yOffset,
      opacity: 1,
      transition: { duration, times, ease: 'easeOut' },
    })
    animatingRef.current = false
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: card.yOffset + 40, rotate: card.rotate }}
      animate={controls}
      style={{ transformOrigin: 'top center', zIndex: isOnTop ? 20 : idx + 1 }}
      onHoverStart={handleHoverStart}
      className={[
        'relative flex-none snap-start',
        idx > 0 ? 'xl:-ml-16' : '',
      ].join(' ')}
    >
      {/* Sticker lateral — solo desktop ───────────────────────────── */}
      <img
        src={card.sticker.src}
        alt=""
        aria-hidden="true"
        className={[
          'absolute z-10 pointer-events-none select-none drop-shadow-md hidden xl:block',
          card.sticker.className,
        ].join(' ')}
        style={{ rotate: `${card.sticker.rotate}deg` }}
      />

      {/* Tarjeta ────────────────────────────────────────────────────── */}
      <article
        role="listitem"
        className={[
          `relative ${card.cardWidth} rounded-3xl px-5 pb-5 pt-9`,
          'flex flex-col overflow-hidden cursor-default',
          'shadow-md min-h-[360px]',
          card.bg,
          card.text,
        ].join(' ')}
      >
        {/* Número de paso */}
        <span className="font-subheading text-[10px] tracking-[0.2em] uppercase opacity-50 mb-2 flex-shrink-0">
          {card.step}
        </span>

        {/* Título */}
        <h3 className={`font-subheading text-2xl leading-[0.95] uppercase mb-3 flex-shrink-0 ${card.text}`}>
          {card.titleLines.map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </h3>

        {/* Divisor */}
        <div className={`w-full h-px mb-4 flex-shrink-0 ${card.divider}`} />

        {/* Lista */}
        <ul className="flex flex-col gap-2 flex-1 font-body text-[12.5px] leading-snug opacity-90">
          {card.items.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="opacity-60 flex-shrink-0 mt-[3px] text-[9px]">✦</span>
              {item}
            </li>
          ))}
        </ul>

        {/* Número fantasma decorativo */}
        <span
          aria-hidden="true"
          className={[
            'absolute bottom-2 right-3 font-heading text-[80px] leading-none',
            'opacity-[0.06] select-none pointer-events-none tracking-tight',
            card.ghostText,
          ].join(' ')}
        >
          {card.ghost}
        </span>
      </article>
    </motion.div>
  )
}

/* ── Hero ─────────────────────────────────────────────────────────── */
export default function Hero() {
  const [topCardIdx, setTopCardIdx] = useState(null)

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-brand-parchment overflow-hidden"
      aria-label="Sección principal"
    >

      {/* Stickers decorativos ─────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none select-none"
        variants={stickerContainer}
        initial="hidden"
        animate="visible"
        aria-hidden="true"
      >
        {STICKERS.map((s) => (
          <motion.img
            key={s.src}
            src={s.src}
            alt=""
            custom={s.rotate}
            variants={stickerItem}
            className={[
              'absolute object-contain drop-shadow-lg',
              s.className,
              s.hideOnMobile ? 'hidden lg:block' : '',
            ].join(' ')}
          />
        ))}
      </motion.div>

      {/* Layout principal ─────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen
                      max-w-7xl mx-auto px-6 lg:px-8">

        {/* COLUMNA IZQUIERDA — Logo + Titular + CTAs ─────────────── */}
        <div className="lg:w-5/12 flex flex-col items-start justify-center
                        pt-28 pb-10 lg:pt-0 lg:pb-0 text-left">

          <motion.img
            src={asset('assets/img/Logos/PNG/EPDV TRAVEL PLANNERS AZUL.png')}
            alt="En Plan de Viajes — Travel Planners"
            className="w-52 sm:w-64 lg:w-80 mb-7 lg:mb-9"
            variants={logoAnim}
            initial="hidden"
            animate="visible"
          />

          <motion.h1
            className="font-heading text-display-md text-brand-blue uppercase
                       leading-tight mb-8 lg:mb-10 max-w-xs lg:max-w-none"
            variants={fadeUp(0.35)}
            initial="hidden"
            animate="visible"
          >
            Convertimos<br />viajeros<br />en fans
          </motion.h1>

          <motion.div
            className="flex flex-col sm:flex-row items-start gap-4"
            variants={fadeUp(0.55)}
            initial="hidden"
            animate="visible"
          >
            <button
              onClick={() => {
                const el = document.getElementById('contacto')
                if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
              }}
              className="btn-coral text-base px-10 py-4 shadow-card-lg
                         hover:scale-[1.04] active:scale-[0.98] transition-transform duration-250"
            >
              Quiero mi presupuesto
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('nosotros')
                if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-2 px-8 py-[14px] rounded-full
                         border-2 border-brand-blue font-body font-bold text-sm uppercase
                         tracking-wide text-brand-blue hover:bg-brand-blue hover:text-white
                         transition-all duration-250 cursor-pointer"
            >
              Conócenos
            </button>
          </motion.div>
        </div>

        {/* COLUMNA DERECHA — Tarjetas del proceso (fan scrapbook) ── */}
        <div className="lg:w-7/12 flex flex-col justify-center
                        pb-12 lg:pb-0 lg:pl-6">

          {/* Título de sección */}
          <h2 className="font-heading text-2xl lg:text-3xl xl:text-4xl uppercase
                         text-brand-blue-dark leading-tight text-center
                         mb-6 xl:mb-10">
            ¿CÓMO VOLVEMOS<br />TU SUEÑO REALIDAD?
          </h2>

          {/* Fila de tarjetas: scroll horizontal en mobile, dispersas en desktop */}
          <div
            className="flex flex-row gap-4 xl:gap-0 overflow-x-auto xl:overflow-visible
                       snap-x snap-mandatory touch-pan-x
                       pb-4 xl:pb-0 w-full
                       [&::-webkit-scrollbar]:hidden [scrollbar-width:none]
                       [-ms-overflow-style:none]"
            role="list"
            aria-label="Pasos del proceso"
          >
            {STEPS.map((card, idx) => (
              <StepCard
                key={card.step}
                card={card}
                idx={idx}
                isOnTop={topCardIdx === idx}
                onBringToTop={setTopCardIdx}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Indicador de scroll lateral — solo mobile ─────────────────── */}
      <motion.div
        className="xl:hidden absolute bottom-6 left-1/2 -translate-x-1/2
                   flex items-center gap-2 text-brand-blue/50 font-body text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        aria-hidden="true"
      >
        <span>←</span>
        <span className="tracking-wide uppercase">Deslizá para ver los pasos</span>
        <span>→</span>
      </motion.div>
    </section>
  )
}
