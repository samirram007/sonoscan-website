import { useState, useEffect, useCallback, type ImgHTMLAttributes } from 'react'
import { Link } from '@tanstack/react-router'
import SEO from '../ui/SEO'
import Reveal from '../ui/Reveal'
import { galleryImages, galleryCategories, virtualTour } from '../../data/gallery'
import type { GalleryImage, GalleryCategoryId } from './schema'
import BrandWave from '../ui/BrandWave'

/* ── Lightbox Component ── */
function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: GalleryImage[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const current = images[currentIndex]

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', handleKey)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = originalOverflow
    }
  }, [onClose, onPrev, onNext])

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in-up"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all"
        aria-label="Close lightbox"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="absolute top-4 left-4 text-white/70 text-sm font-medium">
        {currentIndex + 1} / {images.length}
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all"
        aria-label="Previous image"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>

      <div className="max-w-5xl max-h-[85vh] mx-16" onClick={(e) => e.stopPropagation()}>
        <FallbackImage
          src={current.src}
          alt={current.alt}
          className="w-full h-full object-contain rounded-lg shadow-2xl"
        />
        <div className="text-center mt-4">
          <h3 className="text-white text-lg font-semibold">{current.title}</h3>
          <p className="text-white/60 text-sm mt-1">{current.description}</p>
        </div>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all"
        aria-label="Next image"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  )
}

/* ── Broken-image fallback ── */
const FALLBACK_SRC = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgODAwIDYwMCI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiNlZmU1ZjYiLz48cGF0aCBkPSJNMzIwIDI1MGMtMzAgMC01NSAyNS01NSA1NXMyNSA1NSA1NSA1NSA1NS0yNSA1NS01NS0yNS01NS01NS01NXoiIGZpbGw9IiNjNGI1ZjQiLz48cGF0aCBkPSJNMjcwIDQwMGwxMTAtMTQwIDgwIDcwIDYwLTUwIDEyMCA5MHYxMTBoLTM5MHoiIGZpbGw9IiM5NGEzZjgiLz48dGV4dCB4PSI0MDAiIHk9IjUwMCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5NDAwZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4='

function FallbackImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const [errored, setErrored] = useState(false)
  if (errored) {
    const { src: _, alt, className, ...rest } = props
    return <img src={FALLBACK_SRC} alt={alt ?? 'Image not available'} className={className} {...rest} />
  }
  return <img {...props} onError={() => setErrored(true)} />
}

/* ── Main Gallery Page ── */
export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategoryId>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [showVideo, setShowVideo] = useState(false)

  const filteredImages =
    activeCategory === 'all'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory)

  useEffect(() => {
    if (window.location.hash === '#virtual-tour') {
      const el = document.getElementById('virtual-tour')
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 300)
      }
    }
  }, [])

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : null
    )
  }, [filteredImages.length])

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filteredImages.length : null
    )
  }, [filteredImages.length])

  return (
    <>
      <SEO
        title="Gallery | Sonoscan Healthcare"
        description="Take a virtual tour of Sonoscan Healthcare's modern medical facility. Browse photos of our advanced equipment, comfortable patient rooms, and expert medical team."
      />

      {/* ═══ Hero Section ═══ */}
      <section className="relative min-h-[60vh] lg:min-h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="../images/gallery.png"
            alt="Sonoscan Healthcare gallery"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #5552e7 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative min-h-[60vh] lg:min-h-[600px] max-w-7xl mx-auto px-6 flex items-center">
          <div className="max-w-2xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20">
              Gallery
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
              Take a Tour of Our{' '}
              <span className="text-violet-300">Facilities</span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-300 leading-relaxed max-w-xl mb-10">
              Explore our modern medical facility through photos and our virtual tour. See the comfortable environment we've created for our patients.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#virtual-tour"
                className="group relative inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-lg font-semibold text-lg overflow-hidden transition-all hover:shadow-xl hover:shadow-violet-500/25 active:scale-[0.97]"
              >
                <span className="relative z-10">View Virtual Tour</span>
                <svg className="w-5 h-5 relative z-10" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                </svg>
              </a>
              <Link
                to="/appointments"
                className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/50 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all"
              >
                Book a Visit
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <BrandWave variant="white" />
      </section>

      {/* ═══ Category Filters ═══ */}
      <section className="py-8 lg:py-10 bg-bg-surface border-b border-violet-200 sticky top-16 lg:top-20 z-30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-2 lg:gap-3">
            {galleryCategories.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all animate-fade-in-up ${
                  activeCategory === cat.id
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20'
                    : 'bg-bg-card text-slate-600 hover:text-violet-600 border border-violet-200 hover:border-violet-300'
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Image Grid ═══ */}
      <section className="py-12 lg:py-16 bg-bg-base">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal direction="up">
            <div className="mb-8">
              <p className="text-slate-500 text-sm">
                Showing{' '}
                <span className="text-slate-900 font-semibold">{filteredImages.length}</span>{' '}
                {filteredImages.length === 1 ? 'photo' : 'photos'}
                {activeCategory !== 'all' &&
                  ` in "${galleryCategories.find((c) => c.id === activeCategory)?.label}"`}
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredImages.map((image, i) => (
              <Reveal key={image.id} direction="up" delay={(i % 9) * 80} threshold={0.05}>
                <button
                  onClick={() => openLightbox(i)}
                  className="group relative bg-bg-card rounded-2xl overflow-hidden border border-violet-200 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 text-left w-full"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <FallbackImage
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                      <div className="flex items-center gap-2 text-white">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
                        </svg>
                        <span className="text-sm font-medium">View larger</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 lg:p-5">
                    <h3 className="font-semibold text-slate-900 group-hover:text-violet-600 transition-colors">
                      {image.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                      {image.description}
                    </p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <Reveal direction="up">
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-6 bg-violet-100 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-violet-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No photos yet</h3>
                <p className="text-slate-500">Check back soon — we're adding more photos to this category.</p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ═══ Virtual Tour Section ═══ */}
      <section
        id="virtual-tour"
        className="py-20 lg:py-28 bg-bg-surface relative overflow-hidden border-y border-violet-200 scroll-mt-28"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-3xl animate-float" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text */}
            <Reveal direction="left">
              <div>
                <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-violet-200">
                  Virtual Tour
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
                  {virtualTour.title}
                </h2>
                <p className="text-lg text-slate-500 leading-relaxed mb-8">
                  {virtualTour.description}
                </p>

                <div className="space-y-4">
                  {[
                    'State-of-the-art diagnostic equipment',
                    'Comfortable patient recovery suites',
                    'Modern consultation & treatment rooms',
                    'Friendly & professional staff areas',
                  ].map((feature, i) => (
                    <Reveal key={feature} direction="up" delay={(i + 1) * 100} threshold={0.1}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                        </div>
                        <span className="text-slate-700">{feature}</span>
                      </div>
                    </Reveal>
                  ))}
                </div>

                <Link
                  to="/appointments"
                  className="mt-10 inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-xl hover:shadow-violet-500/25 active:scale-95"
                >
                  Schedule Your Visit
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </Reveal>

            {/* Video / Tour Embed */}
            <Reveal direction="right" delay={150}>
              <div>
                <div className="bg-bg-card rounded-2xl border border-violet-200 shadow-xl shadow-violet-500/5 p-3 lg:p-4">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900">
                    {showVideo ? (
                      <iframe
                        src={virtualTour.videoSrc + '?autoplay=1&rel=0'}
                        title="Sonoscan Healthcare Virtual Tour"
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <>
                        <FallbackImage
                          src={virtualTour.thumbnailSrc}
                          alt="Virtual tour preview"
                          className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <button
                            onClick={() => setShowVideo(true)}
                            className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 hover:bg-white/30 hover:scale-105 transition-all cursor-pointer group"
                            aria-label="Play virtual tour"
                          >
                            <svg className="w-10 h-10 text-white ml-1 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </button>
                        </div>

                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-3 flex items-center justify-between">
                            <div>
                              <p className="text-white text-sm font-medium">Virtual Tour</p>
                              <p className="text-white/60 text-xs">2:45 min walkthrough</p>
                            </div>
                            <span className="text-white/80 text-xs border border-white/20 rounded-md px-2 py-1">HD</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ CTA Section ═══ */}
      <Reveal direction="up">
        <section className="py-20 lg:py-28 bg-bg-base relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-violet-500/5 rounded-full blur-3xl" />
            <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #5552e7 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          </div>
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              Ready to Experience Sonoscan Healthcare in Person?
            </h2>
            <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto">
              Schedule an appointment today and discover why thousands of patients trust us with their health.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/appointments"
                className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-2xl hover:shadow-violet-500/25 active:scale-95"
              >
                Book An Appointment
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border-2 border-violet-300 hover:border-violet-400 text-slate-600 hover:text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all"
              >
                Contact Us
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>

        <BrandWave />
        </section>
      </Reveal>

      {/* ═══ Lightbox ═══ */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </>
  )
}
