import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

interface FormState {
  name: string
  attending: 'yes' | 'no' | ''
  plusOne: 'yes' | 'no' | ''
  partnerName: string
  food: string
  accommodation: 'yes' | 'no' | ''
  wish: string
}

type Status = 'idle' | 'loading' | 'error'

const INITIAL: FormState = {
  name: '',
  attending: '',
  plusOne: '',
  partnerName: '',
  food: '',
  accommodation: '',
  wish: '',
}

function RadioGroup({
  name,
  options,
  value,
  onChange,
}: {
  name: string
  options: { value: string; label: string }[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {options.map((opt) => {
        const selected = value === opt.value
        return (
          <label
            key={opt.value}
            className="flex items-center gap-3 cursor-pointer px-5 py-4 rounded-soft transition-all duration-200 flex-1 select-none"
            style={{
              backgroundColor: selected ? '#7A4F3A' : '#F8F3EC',
              border: `1.5px solid ${selected ? '#7A4F3A' : '#D9CDBF'}`,
              color: selected ? '#F8F3EC' : '#3D2B1F',
              fontFamily: '"DM Sans", sans-serif',
            }}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={selected}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            <span className="text-sm font-medium">{opt.label}</span>
          </label>
        )
      })}
    </div>
  )
}

const inputBase =
  'w-full px-5 py-4 rounded-soft text-base outline-none transition-colors duration-200 focus:ring-2 focus:ring-offset-0'
const inputStyle = {
  backgroundColor: '#F8F3EC',
  color: '#3D2B1F',
  border: '1.5px solid #D9CDBF',
  fontFamily: '"DM Sans", sans-serif',
}

export default function RsvpForm() {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [status, setStatus] = useState<Status>('idle')
  const navigate = useNavigate()

  const declined = form.attending === 'no'
  const attending = form.attending === 'yes'
  const showExtras = attending
  const showPlusOne = attending
  const showPartnerName = attending && form.plusOne === 'yes'

  const set = <K extends keyof FormState>(key: K, val: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: val }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.attending) return
    setStatus('loading')
    try {
      const payload = {
        name: form.name.trim(),
        attending: form.attending,
        plusOne: declined ? 'no' : form.plusOne || 'no',
        partnerName: showPartnerName ? form.partnerName.trim() : '',
        food: showExtras ? form.food.trim() : '',
        accommodation: declined ? 'no' : form.accommodation || 'no',
        wish: showExtras ? form.wish.trim() : '',
      }
      const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('server error')
      navigate(`/thanks?coming=${form.attending}`)
    } catch {
      setStatus('error')
    }
  }

  const isReady = form.name.trim().length > 0 && form.attending !== ''

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-7">
      {/* Имя */}
      <div>
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: '#3D2B1F' }}
          htmlFor="rsvp-name"
        >
          Ваше имя <span style={{ color: '#B36B6B' }}>*</span>
        </label>
        <input
          id="rsvp-name"
          type="text"
          required
          placeholder="Иван Иванов"
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
          className={inputBase}
          style={inputStyle}
        />
      </div>

      {/* Придёте? */}
      <div>
        <p className="text-sm font-medium mb-3" style={{ color: '#3D2B1F' }}>
          Сможете прийти на свадьбу? <span style={{ color: '#B36B6B' }}>*</span>
        </p>
        <RadioGroup
          name="attending"
          value={form.attending}
          options={[
            { value: 'yes', label: 'Приду' },
            { value: 'no', label: 'К сожалению, не смогу' },
          ]}
          onChange={(v) =>
            setForm((f) => ({
              ...f,
              attending: v as 'yes' | 'no',
              plusOne: '',
              partnerName: '',
              accommodation: '',
              wish: '',
            }))
          }
        />
      </div>

      {/* Поля только для тех, кто придёт */}
      {showPlusOne && (
        <div>
          <p className="text-sm font-medium mb-3" style={{ color: '#3D2B1F' }}>
            Придёте вдвоём?
          </p>
          <RadioGroup
            name="plusOne"
            value={form.plusOne}
            options={[
              { value: 'yes', label: 'Да, вдвоём' },
              { value: 'no', label: 'Приду один(одна)' },
            ]}
            onChange={(v) =>
              setForm((f) => ({ ...f, plusOne: v as 'yes' | 'no', partnerName: '' }))
            }
          />
        </div>
      )}

      {showPartnerName && (
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: '#3D2B1F' }}
            htmlFor="rsvp-partner"
          >
            Имя второго гостя
          </label>
          <input
            id="rsvp-partner"
            type="text"
            placeholder="Мария Иванова"
            value={form.partnerName}
            onChange={(e) => set('partnerName', e.target.value)}
            className={inputBase}
            style={inputStyle}
          />
        </div>
      )}

      {showExtras && (
        <>
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: '#3D2B1F' }}
              htmlFor="rsvp-food"
            >
              Пожелания по еде или аллергия{' '}
              <span className="font-normal" style={{ opacity: 0.5 }}>
                (необязательно)
              </span>
            </label>
            <textarea
              id="rsvp-food"
              rows={3}
              placeholder="Вегетарианское меню, аллергия на орехи..."
              value={form.food}
              onChange={(e) => set('food', e.target.value)}
              className={inputBase}
              style={{ ...inputStyle, resize: 'none' }}
            />
          </div>

          <div>
            <p className="text-sm font-medium mb-3" style={{ color: '#3D2B1F' }}>
              Нужно ли проживание в г. Екатеринбург?
            </p>
            <RadioGroup
              name="accommodation"
              value={form.accommodation}
              options={[
                { value: 'yes', label: 'Да' },
                { value: 'no', label: 'Нет' },
              ]}
              onChange={(v) => set('accommodation', v as 'yes' | 'no')}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: '#3D2B1F' }}
              htmlFor="rsvp-wish"
            >
              Пожелание нам{' '}
              <span className="font-normal" style={{ opacity: 0.5 }}>
                (необязательно)
              </span>
            </label>
            <textarea
              id="rsvp-wish"
              rows={4}
              placeholder="Несколько тёплых слов..."
              value={form.wish}
              onChange={(e) => set('wish', e.target.value)}
              className={inputBase}
              style={{ ...inputStyle, resize: 'none' }}
            />
          </div>
        </>
      )}

      {status === 'error' && (
        <p className="text-sm rounded-soft px-4 py-3" style={{ backgroundColor: '#F9E8E8', color: '#A04040' }}>
          Что-то пошло не так. Проверьте интернет или напишите Дмитрию:{' '}
          <a href="tel:+79193676230" className="underline">
            +7 919 367 62 30
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading' || !isReady}
        className="w-full py-5 text-base font-medium tracking-wide transition-all duration-300 hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          backgroundColor: '#7A4F3A',
          color: '#F8F3EC',
          borderRadius: '14px',
          fontFamily: '"DM Sans", sans-serif',
        }}
      >
        {status === 'loading' ? 'Отправляем...' : 'Отправить ответ'}
      </button>
    </form>
  )
}
