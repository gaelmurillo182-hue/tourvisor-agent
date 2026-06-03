import FadeUp from '../components/FadeUp'

const YANDEX_ROUTE =
  'https://yandex.ru/maps/?text=%D0%97%D0%B0%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%BD%D1%8B%D0%B9+%D0%9E%D1%82%D0%B5%D0%BB%D1%8C+%D0%A0%D0%B0%D0%B7%D0%B4%D0%BE%D0%BB%D1%8C%D0%B5+%D0%9A%D0%BE%D1%81%D1%83%D0%BB%D0%B8%D0%BD%D0%BE'

export default function Location() {
  return (
    <section id="location" className="py-24 px-6" style={{ backgroundColor: '#EFE6D8' }}>
      <div className="max-w-3xl mx-auto">
        <FadeUp>
          <h2
            className="text-4xl md:text-5xl font-normal text-center mb-6"
            style={{ fontFamily: '"Playfair Display", serif', color: '#3D2B1F' }}
          >
            Где нас найти
          </h2>
        </FadeUp>

        <FadeUp delay={0.08}>
          <p
            className="text-center text-base font-medium mb-1"
            style={{ color: '#3D2B1F', fontFamily: '"DM Sans", sans-serif' }}
          >
            Загородный Отель Раздолье
          </p>
          <p
            className="text-center text-sm mb-12"
            style={{ color: '#3D2B1F', opacity: 0.55, fontFamily: '"DM Sans", sans-serif' }}
          >
            ул. Ленина, 55, Косулино, Свердловская обл.
          </p>
        </FadeUp>

        <FadeUp delay={0.14}>
          {/* TODO: Яндекс-карта. Инструкция:
              1. Зайдите на https://yandex.ru/map-widget/v1/
              2. Найдите "Загородный Отель Раздолье, Косулино"
              3. Нажмите «Поделиться» → «HTML-код»
              4. Скопируйте <iframe ...> и вставьте вместо этого блока
              Пример iframe:
              <iframe src="https://yandex.ru/map-widget/v1/?ll=60.9300,55.6870&z=14&pt=60.9300,55.6870,pm2rdm"
                width="100%" height="340" frameBorder="0" allowFullScreen title="Карта" style={{borderRadius:'16px'}} />
          */}
          <div
            className="w-full rounded-2xl mb-8 flex items-center justify-center overflow-hidden"
            style={{ height: '340px', backgroundColor: '#C8B89A' }}
          >
            <span
              className="text-sm tracking-wide"
              style={{ color: '#6B4226', opacity: 0.7 }}
            >
              вставьте iframe Яндекс.Карты
            </span>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="text-center mb-8">
            <a
              href={YANDEX_ROUTE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-90 active:scale-[0.97]"
              style={{
                backgroundColor: '#7A4F3A',
                color: '#F8F3EC',
                borderRadius: '14px',
                fontFamily: '"DM Sans", sans-serif',
              }}
            >
              Построить маршрут
            </a>
          </div>
          <p
            className="text-center text-sm leading-relaxed max-w-sm mx-auto"
            style={{ color: '#3D2B1F', opacity: 0.6, fontFamily: '"DM Sans", sans-serif' }}
          >
            Отель находится примерно в 35 км от Екатеринбурга.
            Рекомендуем выехать заранее — место того стоит.
          </p>
        </FadeUp>
      </div>
    </section>
  )
}
