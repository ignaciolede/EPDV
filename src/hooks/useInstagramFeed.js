import { useState, useEffect } from 'react'

/*
 * Lee el archivo /data/instagram-feed.json que genera el GitHub Action diario.
 * No hay tokens ni llamadas a Instagram desde el navegador.
 */
export function useInstagramFeed() {
  const [posts,   setPosts]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/instagram-feed.json`)
      .then(r => r.json())
      .then(data => setPosts(Array.isArray(data) ? data : []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }, [])

  return { posts, loading }
}
