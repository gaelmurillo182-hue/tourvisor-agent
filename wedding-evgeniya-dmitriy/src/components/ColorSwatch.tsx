const SWATCHES = [
  { name: 'Шоколад',     hex: '#3B1F10' },
  { name: 'Мокко',       hex: '#6B4226' },
  { name: 'Тауп',        hex: '#B5A090' },
  { name: 'Песок',       hex: '#C8B89A' },
  { name: 'Крем-жёлтый', hex: '#EDD89A' },
  { name: 'Сливочный',   hex: '#F5EDD8' },
  { name: 'Шалфей',      hex: '#8FA68A' },
  { name: 'Олива',       hex: '#6B7A56' },
]

export default function ColorSwatch() {
  return (
    <div className="flex flex-wrap justify-center gap-5 md:gap-7">
      {SWATCHES.map((s) => (
        <div key={s.name} className="flex flex-col items-center gap-2">
          <div
            className="w-12 h-12 md:w-14 md:h-14 rounded-full shadow-sm"
            style={{
              backgroundColor: s.hex,
              border: s.hex === '#F5EDD8' ? '1.5px solid #D9CDBF' : '1.5px solid transparent',
            }}
          />
          <span
            className="text-xs tracking-wide text-center leading-tight"
            style={{ color: '#3D2B1F', opacity: 0.65, maxWidth: '60px' }}
          >
            {s.name}
          </span>
        </div>
      ))}
    </div>
  )
}
