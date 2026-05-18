import { Link } from 'react-router-dom'
import { asset } from '../utils/asset'
import Hero from '../components/sections/Hero'
import Destinos from '../components/sections/Destinos'
import ScrollReveal from '../components/ui/ScrollReveal'
import StickerPop from '../components/ui/StickerPop'


export default function HomePage() {
  return (
    /* ── Base Parchment + contenedor de la línea de trayectoria ── */
    <div className="relative bg-brand-parchment">

{/* ══════════════════════════════════════════════════════════════
          HERO — dark, pantalla completa
          ══════════════════════════════════════════════════════════════ */}
      <Hero />

      {/* ══════════════════════════════════════════════════════════════
          NOSOTROS — Overlapping: sube sobre el Hero con rounded top
          El marco del mapa (z-20 en Hero) queda "flotando" encima.
          ══════════════════════════════════════════════════════════════ */}
      <section
        id="nosotros"
        className="relative z-10 -mt-10 lg:-mt-24 rounded-t-[2rem]
                   bg-brand-parchment pt-16 lg:pt-28 pb-section"
      >
        <StickerPop src={asset('assets/img/Stickers/Vero y Diego.svg')}         rotate={-8}  delay={0}    className="top-20 left-[3%]  w-24 lg:w-32 hidden lg:block" />
        <StickerPop src={asset('assets/img/Stickers/nuestro-tip-favorito.svg')} rotate={7}   delay={0.15} className="bottom-20 right-[3%] w-28 lg:w-36 hidden lg:block" />

        <div className="section-container">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:items-stretch">

            {/* ── Foto con máscara mapa ──
                Todo en un único <svg>: defs + <image> en el mismo elemento.
                Esto evita los bugs de cross-reference que ocurren cuando el
                clipPath está en un <svg> oculto separado.
                Para cambiar la foto: editá el atributo href de <image>. */}
            <ScrollReveal>
              <div className="flex justify-center lg:justify-start">
                <svg
                  viewBox="0 0 666.3 748"
                  className="w-72 sm:w-80 lg:w-[440px] h-auto"
                  style={{ filter: 'drop-shadow(6px 10px 32px rgba(0,110,255,0.22))' }}
                  aria-label="Foto de Vero y Diego"
                  role="img"
                >
                  <defs>
                    <clipPath id="mapa-foto-clip">
                      <path d="M594.9,30.3l-128.4,65.2c-14,7.1-30.5,7.1-44.5,0L244.4,5.3c-14-7.1-30.5-7.1-44.5,0L26.9,93.1C10.4,101.4,0,118.4,0,136.9v536.9c0,36.7,38.7,60.5,71.4,43.8l128.4-65.2c14-7.1,30.5-7.1,44.5,0l177.6,90.1c14,7.1,30.5,7.1,44.5,0l172.9-87.7c16.5-8.4,26.9-25.3,26.9-43.8V74.1c0-36.7-38.7-60.5-71.4-43.8h0Z" />
                    </clipPath>
                  </defs>
                  {/* ↓ Cambiá href para usar otra foto */}
                  <image
                    href={asset('assets/img/vero-diego.png')}
                    x="0" y="0"
                    width="666.3" height="748"
                    preserveAspectRatio="xMidYMid slice"
                    clipPath="url(#mapa-foto-clip)"
                  />
                </svg>
              </div>
            </ScrollReveal>

            {/* ── Texto ── */}
            <ScrollReveal delay={180} className="h-full">
              <div className="h-full flex flex-col justify-center">
                <div className="space-y-5">
                  <p className="sticker">Quiénes somos</p>
                  <h2 className="section-title text-balance">
                    TRAVEL PLANNERS<br />CON PROPÓSITO
                  </h2>
                  <p className="font-body text-base text-brand-blue-dark/70 leading-relaxed">
                    Somos <strong className="font-bold text-brand-blue-dark">Vero y Diego</strong>,
                    dos apasionados del viaje que decidieron convertir esa pasión en un servicio
                    que transforma sueños en experiencias reales.
                  </p>
                  <p className="font-body text-base text-brand-blue-dark/70 leading-relaxed">
                    No solo asesoramos — contagiamos entusiasmo y organizamos con precisión
                    para que viajes con la tranquilidad de estar en las mejores manos.
                    De los viajes soñados, a los viajes vividos.
                  </p>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          DESTINOS — Parques Disney, Universal, Cruceros, Otros
          ══════════════════════════════════════════════════════════════ */}
      <Destinos />

      {/* ══════════════════════════════════════════════════════════════
          SERVICIOS — Parchment, sin cambio de fondo
          ══════════════════════════════════════════════════════════════ */}
      <section id="servicios" className="relative py-section">
        <StickerPop src={asset('assets/img/Stickers/Logo Circular.svg')} rotate={5}   delay={0}    className="top-[22%]  left-[3%]  w-20 lg:w-28 hidden lg:block" />
        <StickerPop src={asset('assets/img/Stickers/Aprobado.svg')}      rotate={-11} delay={0.15} className="bottom-10  right-[2%] w-24 lg:w-32 hidden lg:block" />
        <div className="section-container text-center">
          <ScrollReveal>
            <p className="sticker mb-4">Lo que hacemos</p>
            <h2 className="section-title text-balance">NUESTROS SERVICIOS</h2>
            <p className="font-body text-base text-brand-blue-dark/70 mt-6 max-w-xl mx-auto">
              Planificación personalizada, asesoramiento experto y acompañamiento
              en cada paso de tu viaje.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          NOVEDADES — Card blanca elevada, no bloque a pantalla completa
          ══════════════════════════════════════════════════════════════ */}
      <section id="novedades" className="relative pb-section">
        <StickerPop src={asset('assets/img/Stickers/Veranos en Disney.svg')}   rotate={9}   delay={0}    className="top-8     left-[2%]  w-24 lg:w-32 hidden lg:block" />
        <StickerPop src={asset('assets/img/Stickers/Nos Vimos En Disney.svg')} rotate={-7}  delay={0.15} className="bottom-12  right-[1%] w-24 lg:w-32 hidden lg:block" />
        <div className="section-container">
          <ScrollReveal>
            <div className="bg-white rounded-3xl shadow-card px-8 py-16 text-center">
              <p className="sticker-blue mb-4">Inspiración</p>
              <h2 className="section-title">NOVEDADES</h2>
              <p className="font-body text-base text-brand-blue-dark/70 mt-6 max-w-xl mx-auto">
                Consejos, guías y experiencias para que tu próximo viaje sea inolvidable.
              </p>
              <Link to="/novedades" className="btn-primary mt-8 inline-flex">
                Ver todas las novedades
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          OFERTAS — Parchment base, sin bloque contrastante
          ══════════════════════════════════════════════════════════════ */}
      <section id="ofertas" className="relative pb-section">
        <StickerPop src={asset('assets/img/Stickers/superpower.svg')}   rotate={-8} delay={0}    className="top-[18%] left-[3%]  w-24 lg:w-32 hidden lg:block" />
        <StickerPop src={asset('assets/img/Stickers/fan-numero-1.svg')} rotate={6}  delay={0.15} className="top-8    right-[2%] w-24 lg:w-32 hidden lg:block" />
        <div className="section-container text-center">
          <ScrollReveal>
            <p className="sticker mb-4">Tiempo limitado</p>
            <h2 className="section-title">OFERTAS</h2>
            <p className="font-body text-base text-brand-blue-dark/70 mt-6 max-w-xl mx-auto">
              Las mejores promociones seleccionadas para que tu viaje soñado
              esté al alcance de tu mano.
            </p>
            <button
              onClick={() => {
                const el = document.getElementById('contacto')
                if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
              }}
              className="btn-coral mt-8 inline-flex"
            >
              Consultar oferta
            </button>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CONTACTO — Card flotante con gradiente de marca
          Separado del fondo parchment por márgenes y rounded-3xl.
          ══════════════════════════════════════════════════════════════ */}
      <section id="contacto" className="relative pb-10">
        <StickerPop src={asset('assets/img/Stickers/Wow.svg')} rotate={-6} delay={0.1} className="top-6 left-[2%] w-20 lg:w-28 hidden lg:block" />
        <div className="section-container">
          <ScrollReveal>
            <div className="bg-gradient-brand rounded-3xl px-8 py-16 text-center shadow-card-lg">
              <h2 className="font-heading text-display-lg text-white uppercase text-balance">
                ¿LISTO PARA PLANIFICAR TU VIAJE?
              </h2>
              <p className="font-body text-white/80 mt-4 text-lg">
                Hablemos. Sin compromisos, con toda la info que necesitás.
              </p>
              <a
                href="mailto:hola@enplandeviajes.com"
                className="btn-coral mt-8 inline-flex"
              >
                Escribinos
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  )
}
