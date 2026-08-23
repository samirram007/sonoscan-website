import { useEffect } from 'react'

export default function SEO({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  useEffect(() => {
    document.title = title

    if (description) {
      const meta = document.querySelector('meta[name="description"]')
      if (meta) {
        meta.setAttribute('content', description)
      }
    }
  }, [title, description])

  return null
}
