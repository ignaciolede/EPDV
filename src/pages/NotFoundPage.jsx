import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-brand-parchment flex items-center justify-center px-4">
      <div className="text-center">
        <img
          src="/assets/img/Logos/SVG/MAPA AZUL.svg"
          alt=""
          aria-hidden="true"
          className="h-24 w-24 mx-auto opacity-20 mb-8"
        />
        <h1 className="font-heading text-display-lg text-brand-blue-dark uppercase">
          PÁGINA NO ENCONTRADA
        </h1>
        <p className="font-body text-brand-blue-dark/60 mt-4">
          La página que buscás no existe o fue movida.
        </p>
        <Link to="/" className="btn-primary mt-8 inline-flex">
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
