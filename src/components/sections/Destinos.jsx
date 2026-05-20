import { Link } from 'react-router-dom'
import StickerPop from '../ui/StickerPop'
import ScrollReveal from '../ui/ScrollReveal'
import { asset } from '../../utils/asset'

const Arrow = ({ className = '' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
)

const DESTINOS = [
  {
    id: 'orlando',
    label: 'Florida · Estados Unidos',
    title: 'Orlando',
    bg: 'bg-brand-blue-dark',
    titleClass: 'text-white',
    labelClass: 'text-white/40',
    arrowClass: 'text-white/30 group-hover:text-white/70',
    to: '/orlando',
    featured: true,
  },
  {
    id: 'california',
    label: 'California · Estados Unidos',
    title: 'California',
    bg: 'bg-brand-blue',
    titleClass: 'text-white',
    labelClass: 'text-white/50',
    arrowClass: 'text-white/30 group-hover:text-white/70',
    to: '/california',
  },
  {
    id: 'paris',
    label: 'Francia',
    title: 'París',
    bg: 'bg-brand-blue-dark',
    titleClass: 'text-white',
    labelClass: 'text-white/50',
    arrowClass: 'text-white/30 group-hover:text-white/70',
    to: '/paris',
  },
  {
    id: 'cruceros',
    label: 'Mar abierto',
    title: 'Cruceros',
    bg: 'bg-brand-frost-blue',
    titleClass: 'text-brand-blue-dark',
    labelClass: 'text-brand-blue-dark/50',
    arrowClass: 'text-brand-blue-dark/30 group-hover:text-brand-blue-dark/60',
    to: '/cruceros',
  },
  {
    id: 'europa',
    label: 'Viejo Mundo',
    title: 'Europa',
    bg: 'bg-brand-blue',
    titleClass: 'text-white',
    labelClass: 'text-white/50',
    arrowClass: 'text-white/30 group-hover:text-white/70',
    to: '/europa',
  },
  {
    id: 'otros',
    label: 'Más destinos',
    title: 'Otros Destinos',
    bg: 'bg-brand-coral',
    titleClass: 'text-white',
    labelClass: 'text-white/60',
    arrowClass: 'text-white/40 group-hover:text-white/90',
    to: '/otros-destinos',
  },
]

function DestinoCard({ d }) {
  return (
    <Link
      to={d.to}
      className={`group ${d.bg} rounded-3xl overflow-hidden flex flex-col relative min-h-[180px]
                  hover:shadow-card-lg transition-all duration-300`}
    >
      {/* Mapa decorativo */}
      <img
        src={asset('assets/img/Logos/SVG/MAPA AZUL.svg')}
        aria-hidden="true"
        className="absolute right-4 bottom-4 h-28 opacity-[0.06] pointer-events-none select-none"
      />

      <div className="relative z-10 p-5 flex items-start justify-between gap-3 flex-1">
        <div className="flex flex-col justify-between h-full">
          <span className={`font-body text-[10px] font-bold ${d.labelClass} uppercase tracking-[0.2em] block`}>
            {d.label}
          </span>
          <h3 className={`font-heading ${d.featured ? 'text-display-md' : 'text-display-sm'} ${d.titleClass} uppercase leading-tight mt-auto pt-6`}>
            {d.title}
          </h3>
        </div>
        <Arrow className={`w-5 h-5 ${d.arrowClass} transition-all duration-300 group-hover:translate-x-1 shrink-0`} />
      </div>
    </Link>
  )
}

export default function Destinos() {
  const [orlando, ...rest] = DESTINOS
  const fila1 = rest.slice(0, 2)   // California, París
  const fila2 = rest.slice(2)      // Cruceros, Europa, Otros

  return (
    <section id="destinos" className="pb-section relative">
      <StickerPop src={asset('assets/img/Stickers/home-disney.svg')}          rotate={10}  delay={0}    className="top-[10%]    left-[1%]  w-24 hidden lg:block" />
      <StickerPop src={asset('assets/img/Stickers/Aprobado.svg')}             rotate={-11} delay={0.1}  className="top-[5%]     right-[2%] w-20 lg:w-28 hidden lg:block" />
      <StickerPop src={asset('assets/img/Stickers/Logo Circular.svg')}        rotate={14}  delay={0.2}  className="bottom-[8%]  left-[2%]  w-16 lg:w-24 hidden lg:block" />
      <StickerPop src={asset('assets/img/Stickers/where-fans-come-true.svg')} rotate={-4}  delay={0.15} className="bottom-[15%] right-[1%] w-28 hidden lg:block" />

      <div className="section-container">

        <ScrollReveal>
          <div className="text-center mb-10">
            <p className="sticker-blue mb-3">Nuestros destinos</p>
            <h2 className="section-title">VIAJES QUE RECORDARÁS</h2>
          </div>
        </ScrollReveal>

        {/* Fila 1: Orlando (featured) + California + París */}
        <ScrollReveal delay={80}>
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-3 mb-3">
            <DestinoCard d={orlando} />
            {fila1.map(d => <DestinoCard key={d.id} d={d} />)}
          </div>
        </ScrollReveal>

        {/* Fila 2: Cruceros + Europa + Otros Destinos */}
        <ScrollReveal delay={160}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {fila2.map(d => <DestinoCard key={d.id} d={d} />)}
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
