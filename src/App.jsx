import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          {/* Páginas de destino — contenido próximamente */}
          <Route path="orlando"        element={<ComingSoon name="Orlando"        />} />
          <Route path="california"     element={<ComingSoon name="California"     />} />
          <Route path="cruceros"       element={<ComingSoon name="Cruceros"       />} />
          <Route path="europa"         element={<ComingSoon name="Europa"         />} />
          <Route path="otros-destinos" element={<ComingSoon name="Otros Destinos" />} />
          <Route path="novedades"      element={<ComingSoon name="Novedades"      />} />
          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

/* Placeholder temporal para páginas aún no desarrolladas */
function ComingSoon({ name }) {
  return (
    <div className="min-h-screen bg-brand-parchment flex items-center justify-center px-4 pt-18">
      <div className="text-center">
        <p className="sticker mb-6">Próximamente</p>
        <h1 className="font-heading text-display-lg text-brand-blue-dark uppercase">
          {name}
        </h1>
        <p className="font-body text-brand-blue-dark/60 mt-4">
          Estamos preparando esta sección. ¡Volvé pronto!
        </p>
        <a href="/" className="btn-primary mt-8 inline-flex">
          Volver al inicio
        </a>
      </div>
    </div>
  )
}
