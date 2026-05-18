import { Link } from 'react-router-dom'

const FOOTER_LINKS = [
  { label: 'Nosotros',  href: '/#nosotros'  },
  { label: 'Destinos',  href: '/#destinos'  },
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Novedades', to:   '/novedades'  },
  { label: 'Ofertas',   href: '/#ofertas'   },
  { label: 'Contacto',  href: '/#contacto'  },
]

const DESTINATION_LINKS = [
  { label: 'Disney',    to: '/disney'    },
  { label: 'Universal', to: '/universal' },
  { label: 'Europa',    to: '/europa'    },
  { label: 'Caribe',    to: '/caribe'    },
]

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="bg-brand-blue-dark text-white"
    >
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Marca */}
          <div>
            <Link to="/" aria-label="En Plan de Viajes — Inicio">
              <img
                src="/assets/img/Logos/SVG/EPDV HORIZONTAL BLANCO.svg"
                alt="En Plan de Viajes"
                width={160}
                height={40}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="font-body text-sm text-white/60 mt-4 leading-relaxed max-w-xs">
              Convertimos viajeros en fans y viajes soñados en viajes vividos.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="font-subheading text-xs uppercase tracking-widest text-white/40 mb-4">
              Navegación
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.map(({ label, href, to }) => (
                <li key={label}>
                  {to ? (
                    <Link
                      to={to}
                      className="font-body text-sm text-white/70 hover:text-white
                                 transition-colors duration-200 cursor-pointer"
                    >
                      {label}
                    </Link>
                  ) : (
                    <a
                      href={href}
                      className="font-body text-sm text-white/70 hover:text-white
                                 transition-colors duration-200 cursor-pointer"
                    >
                      {label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Destinos */}
          <div>
            <h3 className="font-subheading text-xs uppercase tracking-widest text-white/40 mb-4">
              Destinos
            </h3>
            <ul className="space-y-2">
              {DESTINATION_LINKS.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="font-body text-sm text-white/70 hover:text-white
                               transition-colors duration-200 cursor-pointer"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row
                        items-center justify-between gap-4">
          <p className="font-body text-xs text-white/40">
            © {new Date().getFullYear()} En Plan de Viajes. Todos los derechos reservados.
          </p>
          <img
            src="/assets/img/Logos/SVG/EPDV CIRCULAR BLANCO.svg"
            alt=""
            aria-hidden="true"
            className="h-8 w-8 object-contain opacity-30"
          />
        </div>
      </div>
    </footer>
  )
}
