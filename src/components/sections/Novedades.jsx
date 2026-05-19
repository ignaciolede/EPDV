import ScrollReveal from '../ui/ScrollReveal'
import StickerPop from '../ui/StickerPop'
import { useInstagramFeed } from '../../hooks/useInstagramFeed'
import { asset } from '../../utils/asset'

const IG_PROFILE = 'https://www.instagram.com/enplandeviajes'

function formatDate(ts) {
  return new Date(ts).toLocaleDateString('es-AR', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

function cleanCaption(raw = '') {
  return raw.replace(/#\w+/g, '').replace(/\s{2,}/g, ' ').trim().slice(0, 140)
}

/* ── Card de post ─────────────────────────────────────────────── */
function PostCard({ post, className = '' }) {
  const image = post.mediaType === 'VIDEO'
    ? post.thumbnailUrl
    : (post.sizes?.large?.url || post.mediaUrl)
  const caption = post.prunedCaption || cleanCaption(post.caption || '')

  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative rounded-3xl overflow-hidden bg-brand-blue-dark
                  block hover:shadow-card-lg transition-all duration-300 ${className}`}
    >
      {/* Imagen */}
      {image && (
        <img
          src={image}
          alt={caption || 'Novedad En Plan de Viajes'}
          className="absolute inset-0 w-full h-full object-cover
                     transition-transform duration-500 group-hover:scale-105"
        />
      )}

      {/* Gradiente inferior */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/85 via-brand-blue-dark/20 to-transparent" />

      {/* Texto */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
        {post.timestamp && (
          <span className="font-body text-[10px] text-white/50 uppercase tracking-widest block mb-1">
            {formatDate(post.timestamp)}
          </span>
        )}
        {caption && (
          <p className="font-body text-sm text-white leading-snug line-clamp-2">
            {caption}
          </p>
        )}
      </div>

      {/* Ícono Instagram */}
      <div className="absolute top-3 right-3 z-10 opacity-40 group-hover:opacity-70 transition-opacity duration-200">
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      </div>
    </a>
  )
}

/* ── Skeleton de carga ────────────────────────────────────────── */
function Skeleton({ className = '' }) {
  return <div className={`rounded-3xl bg-brand-blue-dark/10 animate-pulse ${className}`} />
}

/* ── Componente principal ─────────────────────────────────────── */
export default function Novedades() {
  const { posts, loading } = useInstagramFeed()

  const hasData = !loading && posts.length > 0
  const isEmpty = !loading && posts.length === 0

  return (
    <section id="novedades" className="relative pb-section">
      <StickerPop src={asset('assets/img/Stickers/Veranos en Disney.svg')}   rotate={9}   delay={0}    className="top-8     left-[2%]  w-24 lg:w-32 hidden lg:block" />
      <StickerPop src={asset('assets/img/Stickers/Nos Vimos En Disney.svg')} rotate={-7}  delay={0.15} className="bottom-12  right-[1%] w-24 lg:w-32 hidden lg:block" />

      <div className="section-container">

        {/* Encabezado */}
        <ScrollReveal>
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="sticker-blue mb-3">Inspiración</p>
              <h2 className="section-title">NOVEDADES</h2>
            </div>
            <a
              href={IG_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline hidden sm:inline-flex shrink-0"
            >
              Ver en Instagram
            </a>
          </div>
        </ScrollReveal>

        {/* ── Loading ── */}
        {loading && (
          <div className="grid grid-cols-3 gap-3">
            <Skeleton className="col-span-2 h-72" />
            <Skeleton className="h-72" />
            <Skeleton className="h-56" />
            <Skeleton className="h-56" />
            <Skeleton className="h-56" />
          </div>
        )}

        {/* ── Sin token / sin posts ── */}
        {isEmpty && (
          <ScrollReveal>
            <div className="bg-brand-blue-dark/5 rounded-3xl p-14 text-center">
              <p className="font-body text-brand-blue-dark/50 mb-4">
                Próximamente. Seguinos en Instagram para las últimas novedades.
              </p>
              <a href={IG_PROFILE} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex">
                @enplandeviajes
              </a>
            </div>
          </ScrollReveal>
        )}

        {/* ── Grid asimétrico ── */}
        {hasData && (
          <ScrollReveal delay={80}>
            {/*
              Layout desktop (3 cols):
                Fila 1: [Post 1 — 2 cols, alto] [Post 2 — 1 col, alto]
                Fila 2: [Post 3] [Post 4] [Post 5]  — tercios iguales, más bajos
            */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <PostCard post={posts[0]} className="md:col-span-2 h-64 md:h-80" />
              {posts[1] && <PostCard post={posts[1]} className="h-64 md:h-80" />}
              {posts[2] && <PostCard post={posts[2]} className="h-56 md:h-60" />}
              {posts[3] && <PostCard post={posts[3]} className="h-56 md:h-60" />}
              {posts[4] && <PostCard post={posts[4]} className="h-56 md:h-60" />}
            </div>
          </ScrollReveal>
        )}

        {/* CTA mobile */}
        <div className="text-center mt-6 sm:hidden">
          <a href={IG_PROFILE} target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex">
            Ver en Instagram
          </a>
        </div>

      </div>
    </section>
  )
}
