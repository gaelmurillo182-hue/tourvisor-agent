import { useEffect, useState } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(targetDate: string): TimeLeft {
  const diff = Math.max(0, new Date(targetDate).getTime() - Date.now())
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  }
}

const UNITS = ['дней', 'часов', 'минут', 'секунд'] as const

export default function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate))

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000)
    return () => clearInterval(id)
  }, [targetDate])

  const values = [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds]

  return (
    <div className="flex items-start justify-center gap-6 md:gap-10">
      {UNITS.map((label, i) => (
        <div key={label} className="flex flex-col items-center">
          <span
            className="text-3xl md:text-5xl tabular-nums leading-none"
            style={{ fontFamily: '"Playfair Display", serif', color: '#F8F3EC' }}
          >
            {String(values[i]).padStart(2, '0')}
          </span>
          <span
            className="text-xs uppercase tracking-[0.2em] mt-2"
            style={{ color: '#EDD89A', opacity: 0.65 }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
