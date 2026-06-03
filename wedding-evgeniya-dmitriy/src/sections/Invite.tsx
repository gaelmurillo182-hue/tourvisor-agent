import FadeUp from '../components/FadeUp'

export default function Invite() {
  return (
    <section id="invite" className="py-24 px-6" style={{ backgroundColor: '#F8F3EC' }}>
      <div className="max-w-3xl mx-auto text-center">
        <FadeUp>
          <h2
            className="text-4xl md:text-5xl font-normal mb-16"
            style={{ fontFamily: '"Playfair Display", serif', color: '#3D2B1F' }}
          >
            Вы держите его в руках
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
            {/* Слот под фото пригласительного */}
            <div
              className="aspect-[3/4] rounded-2xl flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: '#EFE6D8' }}
            >
              {/* TODO: замените на реальное фото пригласительного:
                  <img src="/images/invite.jpg" alt="Пригласительное"
                       className="w-full h-full object-cover" loading="lazy" /> */}
              <span
                className="text-xs tracking-wide"
                style={{ color: '#8FA68A', opacity: 0.7 }}
              >
                фото пригласительного
              </span>
            </div>

            {/* Слот под видео */}
            <div
              className="aspect-[3/4] rounded-2xl flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: '#D9CDBF' }}
            >
              {/* TODO: замените на реальное видео:
                  <video
                    src="/video/invite.mp4"
                    poster="/images/video-poster.jpg"
                    controls
                    playsInline
                    preload="none"
                    className="w-full h-full object-cover"
                  /> */}
              <span
                className="text-xs tracking-wide"
                style={{ color: '#8FA68A', opacity: 0.7 }}
              >
                видео
              </span>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p
            className="text-lg md:text-xl italic"
            style={{ fontFamily: '"Playfair Display", serif', color: '#7A4F3A' }}
          >
            Каждая деталь — с любовью и вниманием.
          </p>
        </FadeUp>
      </div>
    </section>
  )
}
