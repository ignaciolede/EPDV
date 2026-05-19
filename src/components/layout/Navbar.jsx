import { useState, useEffect, useCallback } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { asset } from '../../utils/asset'

/* ── Íconos SVG inline ──────────────────────────────────────────── */
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="w-6 h-6" aria-hidden="true">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="w-6 h-6" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const ChevronDown = ({ open }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

/* ── Estructura de navegación ───────────────────────────────────────
   `href` → ancla en la home  (usa <a>)
   `to`   → ruta React Router (usa <Link>)
   ────────────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  {
    label: 'Destinos',
    href: '/#destinos',
    children: [
      { label: 'Orlando',         to: '/orlando'        },
      { label: 'California',      to: '/california'     },
      { label: 'París',           to: '/paris'          },
      { label: 'Cruceros',        to: '/cruceros'       },
      { label: 'Europa',          to: '/europa'         },
      { label: 'Otros destinos',  to: '/otros-destinos' },
    ],
  },
  { label: 'Nosotros',  href: '/#nosotros' },
  { label: 'Novedades', href: '/#novedades' },
  { label: 'Contacto',  href: '/#contacto' },
]

/* ── Helper: renderiza <Link> o <a> según tipo de enlace ─────────── */
function NavAnchor({ link, className, onClick, children }) {
  const navigate  = useNavigate()
  const { pathname } = useLocation()

  function handleAnchorClick(e) {
    if (!link.href?.startsWith('/#')) return
    e.preventDefault()
    const id = link.href.slice(2)
    if (pathname === '/') {
      smoothScroll(id)
    } else {
      navigate(link.href)
    }
    onClick?.()
  }

  if (link.to) {
    return (
      <NavLink
        to={link.to}
        onClick={onClick}
        className={({ isActive }) =>
          typeof className === 'function' ? className(isActive) : className
        }
      >
        {children ?? link.label}
      </NavLink>
    )
  }
  return (
    <a
      href={link.href}
      onClick={handleAnchorClick}
      className={typeof className === 'function' ? className(false) : className}
    >
      {children ?? link.label}
    </a>
  )
}

/* ── Navbar ─────────────────────────────────────────────────────── */
function smoothScroll(id) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 80
  window.scrollTo({ top, behavior: 'smooth' })
}

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false)
  const [menuOpen,       setMenuOpen]       = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const navigate      = useNavigate()
  const { pathname }  = useLocation()

  function goToSection(id, callback) {
    if (pathname === '/') {
      smoothScroll(id)
    } else {
      navigate(`/#${id}`)
    }
    callback?.()
  }

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onResize = (e) => { if (e.matches) setMenuOpen(false) }
    mq.addEventListener('change', onResize)
    return () => mq.removeEventListener('change', onResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeAll = () => {
    setMenuOpen(false)
    setActiveDropdown(null)
  }

  /* Clases de link según estado de scroll */
  const linkCls = (isActive = false) => [
    'block px-4 py-2 rounded-full',
    'font-body font-bold text-sm uppercase tracking-wide',
    'transition-colors duration-200 cursor-pointer',
    scrolled
      ? `text-brand-blue-dark hover:text-brand-blue hover:bg-brand-blue/8 ${isActive ? 'text-brand-blue' : ''}`
      : `text-brand-blue-dark hover:text-brand-blue hover:bg-brand-blue/8 ${isActive ? 'text-brand-blue' : ''}`,
  ].join(' ')

  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          HEADER PRINCIPAL
          Técnica: flex + absolute center
          ─ Left  (w-52, shrink-0) → logo alineado a la izquierda
          ─ Center (absolute left-1/2 -translate-x-1/2) → siempre
            en el 50% exacto del contenedor, sin importar anchos
          ─ Right (w-52, shrink-0) → CTA / hamburger alineado derecha
          Left y Right tienen el mismo ancho fijo → simetría garantizada.
          ════════════════════════════════════════════════════════════ */}
      <header
        role="banner"
        className={[
          'fixed top-0 left-0 right-0 z-navbar',
          'transition-all duration-350',
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-card border-b border-brand-blue/10'
            : 'bg-transparent',
        ].join(' ')}
      >
        <nav
          aria-label="Navegación principal"
          className="section-container h-18 relative flex items-center"
        >
          {/* ── Izquierda: Logo ────────────────────────────────── */}
          <Link
            to="/"
            aria-label="En Plan de Viajes — Inicio"
            className="shrink-0 lg:ml-12 cursor-pointer"
          >
            <img
              src={asset('assets/img/Logos/SVG/EPDV AZUL.svg')}
              alt="En Plan de Viajes"
              width={2014}
              height={950}
              className="h-10 w-auto object-contain"
            />
          </Link>
          {/* Spacer — empuja CTA al borde derecho */}
          <div className="flex-1" />

          {/* ── Centro: Links (absolutamente centrados) ────────── */}
          <div
            className="hidden lg:flex absolute left-1/2 -translate-x-1/2
                       pointer-events-none"
          >
            <ul
              className="flex items-center gap-1 pointer-events-auto"
              role="menubar"
              aria-label="Menú principal"
            >
              {NAV_LINKS.map((link) =>
                link.children ? (
                  /* Destinos con dropdown */
                  <li
                    key={link.label}
                    role="none"
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      role="menuitem"
                      aria-haspopup="true"
                      aria-expanded={activeDropdown === link.label}
                      onClick={() =>
                        setActiveDropdown((p) => (p === link.label ? null : link.label))
                      }
                      className={[
                        'flex items-center gap-1 px-4 py-2 rounded-full',
                        'font-body font-bold text-sm uppercase tracking-wide',
                        'transition-colors duration-200 cursor-pointer',
                        scrolled
                          ? 'text-brand-blue-dark hover:text-brand-blue hover:bg-brand-blue/8'
                          : 'text-brand-blue-dark hover:text-brand-blue hover:bg-brand-blue/8',
                      ].join(' ')}
                    >
                      {link.label}
                      <ChevronDown open={activeDropdown === link.label} />
                    </button>

                    {/* Puente invisible: tapa el gap entre botón y panel */}
                    <div className="absolute top-full left-0 right-0 h-2" />

                    {/* Panel dropdown */}
                    <div
                      role="menu"
                      aria-label={`Submenú ${link.label}`}
                      className={[
                        'absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-48',
                        'bg-white rounded-2xl shadow-card-lg border border-brand-blue/8 overflow-hidden',
                        'transition-all duration-200 origin-top',
                        activeDropdown === link.label
                          ? 'opacity-100 scale-100 pointer-events-auto'
                          : 'opacity-0 scale-95 pointer-events-none',
                      ].join(' ')}
                    >
                      {link.children.map((child, i) => (
                        <Link
                          key={child.label}
                          to={child.to}
                          role="menuitem"
                          onClick={() => setActiveDropdown(null)}
                          className={[
                            'block px-5 py-2.5 text-sm font-body font-bold uppercase',
                            'text-brand-blue-dark hover:text-brand-blue hover:bg-brand-parchment',
                            'transition-colors duration-150 cursor-pointer',
                            i === 0 ? 'pt-4' : '',
                            i === link.children.length - 1 ? 'pb-4' : '',
                          ].join(' ')}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </li>
                ) : (
                  /* Link simple */
                  <li key={link.label} role="none">
                    <NavAnchor link={link} className={linkCls} />
                  </li>
                )
              )}
            </ul>
          </div>

          {/* ── Derecha: CTA + Hamburger ───────────────────────── */}
          {/* CTA — solo desktop */}
          <button
            onClick={() => goToSection('contacto')}
            className="btn-coral text-sm hidden lg:inline-flex shrink-0"
          >
            Planificar mi viaje
          </button>

          {/* Hamburger — solo mobile */}
          <button
            type="button"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className={[
              'lg:hidden flex items-center justify-center shrink-0',
              'w-11 h-11 rounded-full transition-colors duration-200 cursor-pointer',
              scrolled
                ? 'text-brand-blue-dark hover:bg-brand-blue/8'
                : 'text-brand-blue-dark hover:bg-brand-blue/8',
            ].join(' ')}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </nav>
      </header>

      {/* ════════════════════════════════════════════════════════════
          MENÚ MOBILE — panel deslizable desde la derecha
          ════════════════════════════════════════════════════════════ */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={[
          'fixed inset-0 z-40 lg:hidden',
          'transition-all duration-350',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-brand-blue-dark/60 backdrop-blur-sm"
          onClick={closeAll}
          aria-hidden="true"
        />

        {/* Panel */}
        <nav
          aria-label="Menú mobile"
          className={[
            'absolute top-0 right-0 h-full w-80 max-w-full bg-white flex flex-col',
            'shadow-card-lg transition-transform duration-350',
            menuOpen ? 'translate-x-0' : 'translate-x-full',
          ].join(' ')}
        >
          {/* Encabezado del panel */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-brand-parchment">
            <Link to="/" onClick={closeAll} aria-label="En Plan de Viajes">
              <img
                src={asset('assets/img/Logos/SVG/EPDV AZUL.svg')}
                alt="En Plan de Viajes"
                width={2014}
                height={950}
                className="h-8 w-auto"
              />
            </Link>
            <button
              type="button"
              aria-label="Cerrar menú"
              onClick={closeAll}
              className="flex items-center justify-center w-10 h-10 rounded-full
                         text-brand-blue-dark hover:bg-brand-parchment
                         transition-colors duration-200 cursor-pointer"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Lista de links */}
          <ul className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <li key={link.label}>
                  {/* Acordeón para Destinos */}
                  <button
                    onClick={() =>
                      setActiveDropdown((p) => (p === link.label ? null : link.label))
                    }
                    aria-expanded={activeDropdown === link.label}
                    className="w-full flex items-center justify-between
                               px-4 py-3.5 rounded-2xl
                               font-body font-bold text-sm uppercase tracking-wide
                               text-brand-blue-dark hover:text-brand-blue hover:bg-brand-parchment
                               transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                    <ChevronDown open={activeDropdown === link.label} />
                  </button>

                  {activeDropdown === link.label && (
                    <ul className="mt-1 ml-4 space-y-1">
                      {link.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            to={child.to}
                            onClick={closeAll}
                            className="block px-4 py-3 rounded-xl
                                       font-body text-sm font-bold uppercase tracking-wide
                                       text-brand-blue hover:bg-brand-blue/8
                                       transition-colors duration-150 cursor-pointer"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={link.label}>
                  <NavAnchor
                    link={link}
                    onClick={closeAll}
                    className="block px-4 py-3.5 rounded-2xl
                               font-body font-bold text-sm uppercase tracking-wide
                               text-brand-blue-dark hover:text-brand-blue hover:bg-brand-parchment
                               transition-colors duration-200 cursor-pointer"
                  />
                </li>
              )
            )}
          </ul>

          {/* CTA mobile */}
          <div className="px-6 py-6 border-t border-brand-parchment">
            <button
              onClick={() => goToSection('contacto', closeAll)}
              className="btn-coral w-full text-center block"
            >
              Planificar mi viaje
            </button>
          </div>
        </nav>
      </div>
    </>
  )
}
