import FadeUp from '../components/FadeUp'
import RsvpForm from '../components/RsvpForm'

export default function Rsvp() {
  return (
    <section id="rsvp" className="py-24 px-6" style={{ backgroundColor: '#F8F3EC' }}>
      <div className="max-w-xl mx-auto">
        <FadeUp>
          <h2
            className="text-4xl md:text-5xl font-normal text-center mb-4"
            style={{ fontFamily: '"Playfair Display", serif', color: '#3D2B1F' }}
          >
            Ваш ответ
          </h2>
          <p
            className="text-center text-sm md:text-base mb-14"
            style={{ color: '#3D2B1F', opacity: 0.6, fontFamily: '"DM Sans", sans-serif' }}
          >
            Пожалуйста, подтвердите участие до 22 августа 2026 года.
          </p>
        </FadeUp>

        <FadeUp delay={0.12}>
          <RsvpForm />
        </FadeUp>
      </div>
    </section>
  )
}
