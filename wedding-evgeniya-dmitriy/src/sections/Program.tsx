import { useEffect, useRef, useState } from 'react'
import FadeUp from '../components/FadeUp'

const EVENTS = [
  {
    time: '15:30',
    title: 'Встреча гостей',
    desc: 'Добро пожаловать. Шампанское, живая музыка и первые объятия.',
  },
  {
    time: '16:00',
    title: 'Церемония',
    desc: 'Момент, ради которого мы здесь.',
  },
  {
    time: '16:20',
    title: 'Прогулка и общие фотографии',
    desc: 'Пока мы делаем портреты — вас ждут напитки и закуски. Успеем запечатлеть всех вместе.',
  },
  {
    time: '17:00',
    title: 'Банкет',
    desc: 'Ужин, музыка, танцы и всё, что делает вечер незабываемым.',
  },
  {
    time: '23:00',
    title: 'До новых встреч',
    desc: 'Окончание вечера.',
  },
]

function TimelineItem({
  event,
  index,
  isLast,
}: {
  event: (typeof EVENTS)[0]
  index: number
  isLast: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="flex gap-6 md:gap-8"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(22px)',
        transition: `opacity 0.7s ease-out ${index * 0.1}s, transform 0.7s ease-out ${index * 0.1}s`,
      }}
    >
      {/* Линия + точка */}
      <div className="flex flex-col items-center pt-1 flex-shrink-0">
        <div
          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: '#7A4F3A' }}
        />
        {!isLast && (
          <div
            className="w-px flex-1 mt-2"
            style={{
              background: 'linear-gradient(to bottom, #8FA68A 0%, #C8B89A 100%)',
              minHeight: '48px',
            }}
          />
        )}
      </div>

      {/* Текст */}
      <div className={isLast ? 'pb-0' : 'pb-10'}>
        <span
          className="text-xs font-medium tracking-[0.25em] uppercase"
          style={{ color: '#8FA68A', fontFamily: '"DM Sans", sans-serif' }}
        >
          {event.time}
        </span>
        <h3
          className="text-xl md:text-2xl mt-1 mb-2"
          style={{ fontFamily: '"Playfair Display", serif', color: '#3D2B1F' }}
        >
          {event.title}
        </h3>
        <p
          className="text-sm md:text-base leading-relaxed max-w-sm"
          style={{ color: '#3D2B1F', opacity: 0.7, fontFamily: '"DM Sans", sans-serif' }}
        >
          {event.desc}
        </p>
      </div>
    </div>
  )
}

export default function Program() {
  return (
    <section id="program" className="py-24 px-6" style={{ backgroundColor: '#F8F3EC' }}>
      <div className="max-w-2xl mx-auto">
        <FadeUp>
          <h2
            className="text-4xl md:text-5xl font-normal text-center mb-20"
            style={{ fontFamily: '"Playfair Display", serif', color: '#3D2B1F' }}
          >
            Наш день
          </h2>
        </FadeUp>

        <div>
          {EVENTS.map((event, i) => (
            <TimelineItem
              key={event.time}
              event={event}
              index={i}
              isLast={i === EVENTS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
