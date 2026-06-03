import FadeUp from '../components/FadeUp'
import ColorSwatch from '../components/ColorSwatch'

export default function DressCode() {
  return (
    <section id="dresscode" className="py-24 px-6" style={{ backgroundColor: '#F8F3EC' }}>
      <div className="max-w-2xl mx-auto text-center">
        <FadeUp>
          <h2
            className="text-4xl md:text-5xl font-normal mb-10"
            style={{ fontFamily: '"Playfair Display", serif', color: '#3D2B1F' }}
          >
            Дресс-код
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p
            className="text-base md:text-lg leading-relaxed mb-14"
            style={{ color: '#3D2B1F', opacity: 0.78, fontFamily: '"DM Sans", sans-serif' }}
          >
            Нам будет очень приятно, если вы поддержите цветовую гамму нашего праздника.
            Мы выбирали эти оттенки с душой — и будем рады видеть их на вас.
            Формат вечера — нарядный и элегантный.
          </p>
        </FadeUp>

        <FadeUp delay={0.2}>
          <ColorSwatch />
        </FadeUp>

        <FadeUp delay={0.3}>
          {/* Слоты под референс-образы */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-[3/4] rounded-2xl flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: '#EFE6D8' }}
              >
                {/* TODO: замените на реальный образ:
                    <img src={`/images/dresscode-${i}.jpg`} alt={`Образ ${i}`}
                         className="w-full h-full object-cover" loading="lazy" /> */}
                <span
                  className="text-xs tracking-wide"
                  style={{ color: '#8FA68A', opacity: 0.7 }}
                >
                  образ {i}
                </span>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
