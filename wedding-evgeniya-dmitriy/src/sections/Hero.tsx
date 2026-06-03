import { useEffect, useRef } from 'react'
import Countdown from '../components/Countdown'

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.38}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#1C0F0A' }}
    >
      {/* Parallax фон — TODO: замените background на реальное фото:
          background-image: url('/images/hero-bg.jpg'); background-size: cover; background-position: center; */}
      <div
        ref={bgRef}
        aria-hidden
        className="absolute inset-[-20%] will-change-transform"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 55%, #2E1510 0%, #1C0F0A 65%)',
        }}
      />

      <div className="absolute inset-0 bg-black/15" aria-hidden />

      {/* Контент */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto w-full">
        <p
          className="text-xs tracking-[0.4em] uppercase mb-8"
          style={{ color: '#EDD89A', fontFamily: '"DM Sans", sans-serif', opacity: 0.7 }}
        >
          26 сентября 2026
        </p>

        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.15] mb-8"
          style={{ fontFamily: '"Playfair Display", serif', color: '#F8F3EC' }}
        >
          Евгения{' '}
          <span style={{ color: '#EDD89A', fontStyle: 'italic' }}>&amp;</span>
          <br />
          Дмитрий
        </h1>

        <div
          className="w-10 h-px mx-auto mb-8"
          style={{ backgroundColor: '#7A4F3A' }}
        />

        <p
          className="text-sm md:text-base mb-14 tracking-wide"
          style={{ color: '#EFE6D8', fontFamily: '"DM Sans", sans-serif', opacity: 0.65 }}
        >
          Загородный Отель Раздолье · Косулино
        </p>

        <Countdown targetDate="2026-09-26T15:30:00+05:00" />

        <div className="mt-14">
          <a
            href="#rsvp"
            className="inline-block px-10 py-4 text-sm font-medium tracking-[0.12em] uppercase transition-all duration-300 hover:opacity-85 active:scale-[0.97]"
            style={{
              backgroundColor: '#7A4F3A',
              color: '#F8F3EC',
              borderRadius: '14px',
              fontFamily: '"DM Sans", sans-serif',
            }}
          >
            Подтвердить участие
          </a>
        </div>
      </div>
    </section>
  )
}
