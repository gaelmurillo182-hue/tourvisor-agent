import { useRef, useState } from 'react'

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  return (
    <>
      {/* TODO: добавьте файл /public/music.mp3
          Убедитесь, что у вас есть права на использование трека.
          Michael Bublé "Feeling Good" защищён авторским правом — для личного сайта
          рекомендуем использовать лицензионную версию или роялти-фри аналог. */}
      <audio ref={audioRef} src="/music.mp3" loop preload="none" />

      <button
        onClick={toggle}
        aria-label={playing ? 'Выключить музыку' : 'Включить музыку'}
        title={playing ? 'Выключить музыку' : 'Включить музыку'}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
        style={{ backgroundColor: '#7A4F3A', color: '#F8F3EC' }}
      >
        {playing ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <rect x="5" y="4" width="4" height="16" rx="1.5" />
            <rect x="15" y="4" width="4" height="16" rx="1.5" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l10-6.86a1 1 0 0 0 0-1.72l-10-6.86A1 1 0 0 0 8 5.14z" />
          </svg>
        )}
      </button>
    </>
  )
}
