import { motion, useAnimation } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { asset } from '../../utils/asset'

/* ── Path del mapa (forma de marco para fotos) ───────────────────── */
const MAP_OUTER = 'M1029.28,195.95l-165.36,83.91c-18.01,9.14-39.3,9.14-57.31,0l-228.68-116.04c-18.01-9.14-39.3-9.14-57.31,0l-222.67,112.99c-21.27,10.79-34.67,32.62-34.67,56.47v691.37c0,47.24,49.85,77.84,91.98,56.47l165.36-83.91c18.01-9.14,39.3-9.14,57.31,0l228.68,116.04c18.01,9.14,39.3,9.14,57.31,0l222.67-112.99c21.27-10.79,34.67-32.62,34.67-56.47V252.42c0-47.24-49.85-77.84-91.98-56.47Z'
const MAP_STAR  = 'M924.33,666.66c-119.6,36.13-167.79,84.32-203.92,203.92-8.45,27.97-47.82,27.97-56.27,0-36.13-119.6-84.32-167.79-203.92-203.92-27.97-8.45-27.97-47.82,0-56.27,119.6-36.13,167.79-84.32,203.92-203.92,8.45-27.97,47.82-27.97,56.27,0,36.13,119.6,84.32,167.79,203.92,203.92,27.97,8.45,27.97,47.82,0,56.27Z'

const MAP_PHOTOS = [
  asset('assets/img/Parques/Magic Kingdom.png'),
  asset('assets/img/Parques/Epcot.png'),
  asset('assets/img/Parques/Hollywood Studios.png'),
  asset('assets/img/Parques/New York.png'),
  asset('assets/img/Parques/Crucero.png'),
]

/* ── Stickers decorativos del fondo ───────────────────────────────── */
const STICKERS = [
  { src: asset('assets/img/Stickers/Modo Avion.svg'),         rotate: -9, className: 'top-[7%]     left-[3%]   w-32 lg:w-44', hideOnMobile: false },
  { src: asset('assets/img/Stickers/Wow.svg'),                rotate:  7, className: 'top-[4%]     right-[4%]  w-36 lg:w-52', hideOnMobile: false },
  { src: asset('assets/img/Stickers/Viajo Luego Existo.svg'), rotate: -6, className: 'top-[55%]    -left-[2%]  w-28 lg:w-40', hideOnMobile: true  },
  { src: asset('assets/img/Stickers/I Love Magic.svg'),       rotate: 10, className: 'top-[68%]    -right-[1%] w-28 lg:w-36', hideOnMobile: true  },
  { src: asset('assets/img/Stickers/Hacks.svg'),              rotate: 12, className: 'bottom-[8%]  left-[1%]   w-24 lg:w-32', hideOnMobile: true  },
  { src: asset('assets/img/Stickers/No Muggles Allowed.svg'), rotate: -5, className: 'bottom-[6%]  right-[1%]  w-28 lg:w-36', hideOnMobile: true  },
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
    cardWidth: 'w-52',
    swing: { deltas: [-2.5, 2, -1, 0.3, 0], times: [0, 0.25, 0.52, 0.76, 1], duration: 1.1 },
    sticker: { src: asset('assets/img/Stickers/nuestro-tip-favorito.svg'), rotate: -14, className: 'w-16 -right-6 -top-2' },
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
    cardWidth: 'w-60',
    swing: { deltas: [-3, 2.2, -0.7, 0], times: [0, 0.20, 0.52, 1], duration: 0.85 },
    sticker: { src: asset('assets/img/Stickers/where-fans-come-true.svg'), rotate: 12, className: 'w-16 -right-7 -top-2' },
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
    cardWidth: 'w-56',
    swing: { deltas: [2.8, -1.8, 0.6, -0.2, 0], times: [0, 0.22, 0.50, 0.74, 1], duration: 1.0 },
    sticker: { src: asset('assets/img/Stickers/superpower.svg'), rotate: -8, className: 'w-16 -right-7 -top-3' },
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
    cardWidth: 'w-60',
    swing: { deltas: [-2.2, 1.4, -0.4, 0], times: [0, 0.28, 0.60, 1], duration: 0.9 },
    sticker: { src: asset('assets/img/Stickers/home-disney.svg'), rotate: 13, className: 'w-16 -right-6 -top-1' },
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
    cardWidth: 'w-52',
    swing: { deltas: [-2, 1.8, -1.2, 0.5, -0.2, 0], times: [0, 0.18, 0.38, 0.58, 0.78, 1], duration: 1.15 },
    sticker: { src: asset('assets/img/Stickers/fan-numero-1.svg'), rotate: -11, className: 'w-16 -right-7 top-5' },
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

/* ── Ícono flecha para botones ────────────────────────────────────── */
const ArrowRight = () => (
  <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true">
    <path d="M4 10h12M11 6l5 4-5 4" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/* ── Máscara de mapa con fotos rotativas ──────────────────────────── */
function MapPhotoDisplay() {
  const [current, setCurrent] = useState(0)
  const [prev,    setPrev]    = useState(null)

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent(i => {
        setPrev(i)
        return (i + 1) % MAP_PHOTOS.length
      })
    }, 4200)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      className="relative w-[350px] sm:w-[420px] lg:w-[510px] xl:w-[590px] mx-auto"
      variants={fadeUp(0.25)}
      initial="hidden"
      animate="visible"
    >
      {/* Resplandor detrás */}
      <div className="absolute inset-[10%] bg-brand-blue/15 blur-3xl rounded-full pointer-events-none" />

      <svg
        viewBox="0 0 1384.54 1277.06"
        className="relative w-full h-auto drop-shadow-2xl"
        aria-label="Galería de destinos"
      >
        <defs>
          <clipPath id="map-photo-clip">
            <path d={MAP_OUTER} />
          </clipPath>
        </defs>

        {/* Fotos: la anterior se desvanece, la actual entra con ken-burns */}
        {MAP_PHOTOS.map((src, i) => {
          const isActive = i === current
          const isLeaving = i === prev
          return (
            <image
              key={src}
              href={src}
              x="0" y="0"
              width="1384.54" height="1277.06"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#map-photo-clip)"
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'scale(1.07)' : 'scale(1)',
                transformOrigin: '692px 638px',
                transition: isActive
                  ? 'opacity 1s ease-in-out, transform 5s ease-out'
                  : isLeaving
                    ? 'opacity 1s ease-in-out'
                    : 'none',
              }}
            />
          )
        })}

        {/* Borde exterior del mapa */}
        <path
          d={MAP_OUTER}
          fill="none"
          stroke="rgba(0,110,255,0.2)"
          strokeWidth="14"
        />
      </svg>

      {/* Indicadores de foto */}
      <div className="flex justify-center gap-1.5 mt-3">
        {MAP_PHOTOS.map((_, i) => (
          <button
            key={i}
            onClick={() => { setPrev(current); setCurrent(i) }}
            aria-label={`Foto ${i + 1}`}
            className={[
              'rounded-full transition-all duration-300',
              i === current
                ? 'w-5 h-1.5 bg-brand-blue'
                : 'w-1.5 h-1.5 bg-brand-blue/25 hover:bg-brand-blue/50',
            ].join(' ')}
          />
        ))}
      </div>
    </motion.div>
  )
}

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
          'shadow-md min-h-[420px]',
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
      className="relative min-h-screen bg-brand-parchment overflow-x-hidden"
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
      <div className="relative z-10 flex flex-col min-h-screen
                      max-w-7xl mx-auto px-6 lg:px-8
                      pt-18 lg:pt-20 pb-6">

        {/* LOGO TÍTULO — centrado en el espacio entre nav y contenido */}
        <motion.div
          className="flex justify-center items-center py-5 lg:py-8"
          variants={logoAnim}
          initial="hidden"
          animate="visible"
        >
          <img
            src={asset('assets/img/Logos/SVG/EPDV HORIZONTAL CON MAPA AZUL.svg')}
            alt="En Plan de Viajes"
            className="w-80 sm:w-[26rem] lg:w-[32rem] h-auto mx-auto"
          />
        </motion.div>

        {/* FILA DE CONTENIDO ───────────────────────────────────────── */}
        {/* FILA DE CONTENIDO ───────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row flex-1 items-stretch justify-center gap-8 lg:gap-16">

        {/* COLUMNA IZQUIERDA — Foto + CTAs ────────────────────────── */}
        <div className="shrink-0 flex flex-col items-center justify-center
                        pb-10 lg:pb-0 gap-6 lg:gap-8 lg:-translate-y-4">

          {/* Máscara de mapa con fotos */}
          <MapPhotoDisplay />

          {/* Botones */}
          <motion.div
            className="flex flex-row items-center justify-center gap-3 w-[350px] sm:w-[420px] lg:w-[510px] xl:w-[590px]"
            variants={fadeUp(0.55)}
            initial="hidden"
            animate="visible"
          >
            <button
              onClick={() => {
                const el = document.getElementById('contacto')
                if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
              }}
              className="group inline-flex items-center justify-center gap-2
                         px-7 py-3.5 rounded-full
                         bg-brand-coral text-white font-body font-bold text-sm uppercase tracking-wide
                         shadow-lg shadow-brand-coral/30
                         hover:shadow-xl hover:shadow-brand-coral/40 hover:scale-[1.03]
                         active:scale-[0.97] transition-all duration-250 cursor-pointer select-none"
            >
              Comenzar mi viaje
              <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                <ArrowRight />
              </span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('nosotros')
                if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
              }}
              className="group inline-flex items-center justify-center gap-1.5
                         px-5 py-3 rounded-full
                         font-body font-semibold text-sm text-brand-blue-dark/50
                         hover:text-brand-blue hover:bg-brand-blue/8
                         active:scale-[0.97] transition-all duration-250 cursor-pointer select-none"
            >
              Conócenos
              <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200">
                <ArrowRight />
              </span>
            </button>
          </motion.div>
        </div>

        {/* COLUMNA DERECHA — Tarjetas del proceso (fan scrapbook) ── */}
        <div className="shrink-0 flex flex-col justify-center
                        pb-12 lg:pb-0">

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
        </div>{/* fin fila contenido */}
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
