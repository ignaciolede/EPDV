import { Link } from 'react-router-dom'
import StickerPop from '../ui/StickerPop'
import { asset } from '../../utils/asset'

/* ── Datos ───────────────────────────────────────────────────────────── */
const DISNEY_ORLANDO = [
  { nombre: 'Magic Kingdom',     logo: asset('assets/img/Parques/magic-kingdom.png'),     to: '/magic-kingdom'     },
  { nombre: 'EPCOT',             logo: asset('assets/img/Parques/epcot.png'),             to: '/epcot'             },
  { nombre: 'Animal Kingdom',    logo: asset('assets/img/Parques/animal-kingdom.png'),    to: '/animal-kingdom'    },
  { nombre: 'Hollywood Studios', logo: asset('assets/img/Parques/hollywood-studios.png'), to: '/hollywood-studios' },
]

const UNIVERSAL_ORLANDO = [
  { nombre: 'Islands of Adventure', logo: asset('assets/img/Parques/islands-of-adventure.png'), to: '/islands-of-adventure' },
  { nombre: 'Epic Universe',         logo: asset('assets/img/Parques/epic-universe.png'),         to: '/epic-universe'        },
  { nombre: 'Universal Studios',     logo: asset('assets/img/Parques/universal-studios.png'),     to: '/universal-studios'    },
]

const DISNEYLAND_CA = [
  { nombre: 'Disneyland Park',           logo: asset('assets/img/Parques/disneyland-park.png'),      to: '/disneyland-park'      },
  { nombre: 'California Adventure Park', logo: asset('assets/img/Parques/california-adventure.png'), to: '/california-adventure' },
]

const DISNEYLAND_PARIS = [
  { nombre: 'Disneyland Park',        logo: asset('assets/img/Parques/disneyland-paris.png'),       to: '/disneyland-paris'       },
  { nombre: 'Disney Adventure World', logo: asset('assets/img/Parques/disney-adventure-world.png'), to: '/disney-adventure-world' },
]

const OTROS = [
  { nombre: 'Miami',    sub: 'Florida',        logo: asset('assets/img/Parques/miami.png'),    to: '/miami',    bg: 'bg-brand-coral'     },
  { nombre: 'New York', sub: 'Estados Unidos', logo: asset('assets/img/Parques/new-york.png'), to: '/new-york', bg: 'bg-brand-blue-dark' },
]

const hideMissing = (e) => { e.currentTarget.style.display = 'none' }

const Arrow = ({ className = '' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
)

/* Etiqueta de bloque */
function BlockLabel({ text, dark = true }) {
  return (
    <div className="px-4 pt-3 pb-1.5 shrink-0">
      <span className={`font-body text-[10px] font-bold uppercase tracking-[0.22em] ${dark ? 'text-white/40' : 'text-brand-blue-dark/50'}`}>
        {text}
      </span>
    </div>
  )
}

/* Tarjeta parque — fondo oscuro (Disney): centrada, icono + nombre igual */
function DarkCard({ park }) {
  return (
    <Link
      to={park.to}
      className="group rounded-2xl bg-white/[0.06] hover:bg-white/[0.11] border border-white/[0.07]
                 flex flex-col items-center justify-center gap-1.5 p-3 min-h-0
                 transition-all duration-300 hover:border-white/20"
    >
      <img src={park.logo} alt={park.nombre} onError={hideMissing}
           className="h-7 w-auto object-contain shrink-0" />
      <span className="font-subheading text-white uppercase text-[10px] text-center tracking-wide leading-tight">
        {park.nombre}
      </span>
    </Link>
  )
}

/* Tarjeta parque — fondo azul (Universal): horizontal, igual altura */
function BlueCard({ park }) {
  return (
    <Link
      to={park.to}
      className="group rounded-2xl bg-white/[0.1] hover:bg-white/[0.18] border border-white/[0.1]
                 flex items-center gap-3 px-4 flex-1 min-h-0
                 transition-all duration-300 hover:border-white/25"
    >
      <img src={park.logo} alt={park.nombre} onError={hideMissing}
           className="h-7 w-9 object-contain shrink-0" />
      <span className="font-subheading text-white uppercase text-[10px] tracking-wide leading-tight flex-1">
        {park.nombre}
      </span>
      <Arrow className="w-3.5 h-3.5 text-white/30 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all duration-300 shrink-0" />
    </Link>
  )
}

export default function Destinos() {
  return (
    <section id="destinos" className="min-h-screen flex flex-col pt-24 pb-8 relative">

      <StickerPop src={asset('assets/img/Stickers/Home Disney.svg')}          rotate={10}  delay={0}    className="top-[20%] left-[1%]  w-24 hidden lg:block" />
      <StickerPop src={asset('assets/img/Stickers/Where Fans Come True.svg')} rotate={-4}  delay={0.15} className="top-[65%] right-[1%] w-28 hidden lg:block" />

      <div className="section-container flex-1 flex flex-col gap-3 min-h-0">

        {/* ── Encabezado ── */}
        <div className="text-center shrink-0 mb-1">
          <p className="sticker-blue mb-3">Nuestros destinos</p>
          <h2 className="section-title">VIAJES QUE RECORDARÁS</h2>
        </div>

        {/* ── Grilla de destinos — ocupa el espacio restante ── */}
        <div className="flex-1 flex flex-col gap-3 min-h-0">

          {/* ══ FILA 1: Disney Orlando + Universal Orlando ══ */}
          <div className="flex-[5] grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-3 min-h-0">

            {/* Disney Parks · Orlando — 2×2, todos iguales */}
            <div className="rounded-3xl bg-brand-blue-dark overflow-hidden flex flex-col min-h-0">
              <BlockLabel text="Disney Parks · Orlando" />
              <div className="flex-1 px-3 pb-3 grid grid-cols-2 grid-rows-2 gap-2 min-h-0">
                {DISNEY_ORLANDO.map(p => <DarkCard key={p.nombre} park={p} />)}
              </div>
            </div>

            {/* Universal · Orlando — 3 filas iguales */}
            <div className="rounded-3xl bg-brand-blue overflow-hidden flex flex-col min-h-0">
              <BlockLabel text="Universal · Orlando" />
              <div className="flex-1 px-3 pb-3 flex flex-col gap-2 min-h-0">
                {UNIVERSAL_ORLANDO.map(p => <BlueCard key={p.nombre} park={p} />)}
              </div>
            </div>

          </div>

          {/* ══ FILA 2: Disneyland CA + Universal Hollywood + Disneyland París ══ */}
          <div className="flex-[3] grid grid-cols-1 sm:grid-cols-3 gap-3 min-h-0">

            {/* Disneyland · California — 2 columnas iguales */}
            <div className="rounded-3xl bg-brand-blue-dark overflow-hidden flex flex-col min-h-0">
              <BlockLabel text="Disneyland · California" />
              <div className="flex-1 px-3 pb-3 grid grid-cols-2 gap-2 min-h-0">
                {DISNEYLAND_CA.map(p => <DarkCard key={p.nombre} park={p} />)}
              </div>
            </div>

            {/* Universal Studios · Hollywood — destino único */}
            <Link
              to="/universal-hollywood"
              className="group rounded-3xl bg-brand-blue overflow-hidden flex flex-col min-h-0
                         hover:shadow-card-lg transition-all duration-300"
            >
              <BlockLabel text="Universal Studios · Hollywood" />
              <div className="flex-1 flex items-center justify-center gap-3 px-4 pb-4 min-h-0">
                <img
                  src={asset('assets/img/Parques/universal-hollywood.png')}
                  alt="Universal Studios Hollywood"
                  onError={hideMissing}
                  className="h-9 w-auto object-contain shrink-0"
                />
                <span className="font-subheading text-white uppercase text-[11px] text-center tracking-wide leading-tight">
                  Universal Studios Hollywood
                </span>
                <Arrow className="w-4 h-4 text-white/30 group-hover:text-white/70 group-hover:translate-x-0.5 transition-all duration-300 shrink-0" />
              </div>
            </Link>

            {/* Disneyland · París — 2 columnas iguales */}
            <div className="rounded-3xl bg-brand-blue-dark overflow-hidden flex flex-col min-h-0">
              <BlockLabel text="Disneyland · París" />
              <div className="flex-1 px-3 pb-3 grid grid-cols-2 gap-2 min-h-0">
                {DISNEYLAND_PARIS.map(p => <DarkCard key={p.nombre} park={p} />)}
              </div>
            </div>

          </div>

          {/* ══ FILA 3: Cruceros + Otros Destinos ══ */}
          <div className="flex-[3] grid grid-cols-1 lg:grid-cols-[5fr_3fr] gap-3 min-h-0">

            {/* Cruceros */}
            <Link
              to="/cruceros"
              className="group rounded-3xl bg-brand-frost-blue flex items-center justify-between
                         px-8 overflow-hidden relative min-h-0
                         hover:shadow-card-lg transition-all duration-300"
            >
              <img
                src={asset('assets/img/Logos/SVG/MAPA AZUL.svg')}
                aria-hidden="true"
                className="absolute right-20 top-1/2 -translate-y-1/2 h-36 opacity-[0.07] pointer-events-none select-none"
              />
              <div className="relative z-10 py-6">
                <span className="font-body text-[10px] font-bold text-brand-blue-dark/50 uppercase tracking-[0.22em] block mb-2">
                  Cruceros
                </span>
                <h3 className="font-heading text-display-sm text-brand-blue-dark uppercase leading-tight">
                  EL MAR<br className="hidden sm:block" /> COMO DESTINO
                </h3>
                <p className="font-body text-xs text-brand-blue-dark/60 mt-2">
                  Disney Cruise Line · MSC · Royal Caribbean
                </p>
              </div>
              <Arrow className="relative z-10 hidden lg:block w-8 h-8 text-brand-blue-dark/30 group-hover:text-brand-blue group-hover:translate-x-1.5 transition-all duration-300 shrink-0" />
            </Link>

            {/* Otros Destinos — 2 tarjetas iguales */}
            <div className="grid grid-cols-2 gap-3 min-h-0">
              {OTROS.map(d => (
                <Link
                  key={d.nombre}
                  to={d.to}
                  className={`group rounded-3xl ${d.bg} flex flex-col justify-between
                              px-5 py-5 min-h-0
                              hover:shadow-card-lg hover:-translate-y-0.5 transition-all duration-300`}
                >
                  <div className="flex items-start justify-between">
                    <span className="font-body text-[9px] font-bold text-white/50 uppercase tracking-[0.18em]">
                      Otros destinos
                    </span>
                    <Arrow className="w-3.5 h-3.5 text-white/30 group-hover:text-white/80 group-hover:translate-x-0.5 transition-all duration-300" />
                  </div>
                  <div>
                    <img src={d.logo} alt={d.nombre} onError={hideMissing} className="h-6 mb-2 object-contain" />
                    <p className="font-body text-[9px] text-white/50 uppercase tracking-widest mb-0.5">{d.sub}</p>
                    <h3 className="font-heading text-display-sm text-white uppercase">{d.nombre}</h3>
                  </div>
                </Link>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
