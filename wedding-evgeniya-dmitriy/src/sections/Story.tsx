import FadeUp from '../components/FadeUp'
import GalleryGrid from '../components/GalleryGrid'

export default function Story() {
  return (
    <section id="story" className="py-24 px-6" style={{ backgroundColor: '#EFE6D8' }}>
      <div className="max-w-3xl mx-auto">
        <FadeUp>
          <h2
            className="text-4xl md:text-5xl font-normal text-center mb-16"
            style={{ fontFamily: '"Playfair Display", serif', color: '#3D2B1F' }}
          >
            Как это началось
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p
            className="text-base md:text-lg leading-relaxed text-center mb-16"
            style={{ color: '#3D2B1F', fontFamily: '"DM Sans", sans-serif', opacity: 0.82 }}
          >
            Нас познакомили друзья, и наше знакомство мгновенно переросло в большую любовь. От первых
            робких встреч до путешествий по горному Алтаю, где должна была случиться наша сказка. Он искал
            самую красивую точку для предложения, нашёл её, но в суете оставил кольцо в машине. И знаете что?
            Это сделало тот момент по-настоящему нашим: искренним, смешным и самым тёплым, прямо в стенах
            отеля. Теперь мы измеряем нашу любовь не километрами, а тем, как широко мы можем развести руки,
            показывая, как сильно любим друг друга. Приходите разделить с нами эту радость, смех и самые
            трогательные моменты нашего дня!
          </p>
        </FadeUp>

        <FadeUp delay={0.2}>
          <GalleryGrid />
        </FadeUp>
      </div>
    </section>
  )
}
