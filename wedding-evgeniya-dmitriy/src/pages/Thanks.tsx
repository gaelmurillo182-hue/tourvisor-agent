import { useSearchParams, Link } from 'react-router-dom'

export default function Thanks() {
  const [params] = useSearchParams()
  const coming = params.get('coming')

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
      style={{ backgroundColor: '#F8F3EC' }}
    >
      <div className="max-w-lg w-full text-center">
        <div
          className="w-16 h-px mx-auto mb-12"
          style={{ backgroundColor: '#7A4F3A' }}
        />

        {coming === 'yes' ? (
          <>
            <h1
              className="text-4xl md:text-5xl font-normal mb-8 leading-tight"
              style={{ fontFamily: '"Playfair Display", serif', color: '#3D2B1F' }}
            >
              Спасибо!
            </h1>
            <p
              className="text-lg leading-relaxed mb-4"
              style={{ color: '#3D2B1F', fontFamily: '"DM Sans", sans-serif', opacity: 0.8 }}
            >
              Мы получили ваш ответ и очень рады, что вы будете с нами.
              До встречи 26 сентября — будем ждать.
            </p>
            <p
              className="text-xl italic mt-8 mb-12"
              style={{ fontFamily: '"Playfair Display", serif', color: '#7A4F3A' }}
            >
              Евгения &amp; Дмитрий
            </p>
          </>
        ) : (
          <>
            <h1
              className="text-4xl md:text-5xl font-normal mb-8 leading-tight"
              style={{ fontFamily: '"Playfair Display", serif', color: '#3D2B1F' }}
            >
              Спасибо
            </h1>
            <p
              className="text-lg leading-relaxed mb-12"
              style={{ color: '#3D2B1F', fontFamily: '"DM Sans", sans-serif', opacity: 0.8 }}
            >
              Спасибо, что сообщили нам. Жаль, что вы не сможете быть рядом,
              но мы ценим вашу заботу. Будем думать о вас в этот день.
            </p>
          </>
        )}

        <Link
          to="/"
          className="inline-block px-8 py-4 text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-90 active:scale-95"
          style={{
            backgroundColor: '#7A4F3A',
            color: '#F8F3EC',
            borderRadius: '14px',
            fontFamily: '"DM Sans", sans-serif',
          }}
        >
          На главную
        </Link>
      </div>
    </div>
  )
}
