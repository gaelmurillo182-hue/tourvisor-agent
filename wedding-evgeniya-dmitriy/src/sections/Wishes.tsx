import FadeUp from '../components/FadeUp'

const CARDS = [
  {
    title: 'Подарки',
    text: 'Если вы думаете о подарке — самым тёплым будет конверт. Ваше присутствие, искренние слова и хорошее настроение — уже больше, чем можно пожелать.',
    line: '#7A4F3A',
  },
  {
    title: 'Цветы',
    text: 'Цветы на нашей свадьбе уже продуманы — мы позаботились об этом заранее. Поэтому, пожалуйста, приходите с пустыми руками и открытым сердцем. Этого достаточно.',
    line: '#8FA68A',
  },
  {
    title: 'О детях',
    text: 'Дети — это огромное счастье, но на нашей свадьбе мы дарим вам законный выходной! Наш праздник пройдёт в уютной взрослой компании, чтобы вы могли как следует расслабиться и ни на что не отвлекаться.',
    line: '#EDD89A',
  },
]

export default function Wishes() {
  return (
    <section id="wishes" className="py-24 px-6" style={{ backgroundColor: '#EFE6D8' }}>
      <div className="max-w-4xl mx-auto">
        <FadeUp>
          <h2
            className="text-4xl md:text-5xl font-normal text-center mb-16"
            style={{ fontFamily: '"Playfair Display", serif', color: '#3D2B1F' }}
          >
            Пара слов
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CARDS.map((card, i) => (
            <FadeUp key={card.title} delay={i * 0.1}>
              <div
                className="p-8 rounded-2xl h-full"
                style={{ backgroundColor: '#F8F3EC' }}
              >
                <div
                  className="w-8 h-[3px] rounded-full mb-6"
                  style={{ backgroundColor: card.line }}
                />
                <h3
                  className="text-xl mb-4"
                  style={{ fontFamily: '"Playfair Display", serif', color: '#3D2B1F' }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: '#3D2B1F', opacity: 0.72, fontFamily: '"DM Sans", sans-serif' }}
                >
                  {card.text}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
