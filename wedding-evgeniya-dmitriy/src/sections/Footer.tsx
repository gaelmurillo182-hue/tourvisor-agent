export default function Footer() {
  return (
    <footer
      className="py-16 px-6 text-center"
      style={{ backgroundColor: '#1C0F0A' }}
    >
      <p
        className="text-xl md:text-2xl mb-3"
        style={{ fontFamily: '"Playfair Display", serif', color: '#F8F3EC' }}
      >
        Евгения{' '}
        <span style={{ color: '#EDD89A', fontStyle: 'italic' }}>&amp;</span>
        {' '}Дмитрий
      </p>
      <p
        className="text-xs tracking-[0.3em] uppercase mb-10"
        style={{ color: '#EDD89A', opacity: 0.5 }}
      >
        26.09.2026
      </p>

      <div
        className="w-10 h-px mx-auto mb-10"
        style={{ backgroundColor: '#7A4F3A' }}
      />

      <p
        className="text-sm"
        style={{ color: '#F8F3EC', opacity: 0.45, fontFamily: '"DM Sans", sans-serif' }}
      >
        По вопросам:{' '}
        <a
          href="tel:+79193676230"
          className="underline underline-offset-4 transition-opacity duration-200 hover:opacity-80"
          style={{ color: '#EDD89A', opacity: 0.8 }}
        >
          Дмитрий, +7&nbsp;919&nbsp;367&nbsp;62&nbsp;30
        </a>
      </p>
    </footer>
  )
}
