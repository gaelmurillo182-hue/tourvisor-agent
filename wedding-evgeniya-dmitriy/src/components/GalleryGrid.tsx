const SLOTS = 4

export default function GalleryGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {Array.from({ length: SLOTS }).map((_, i) => (
        <div
          key={i}
          className="aspect-square rounded-2xl flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#D9CDBF' }}
        >
          {/* TODO: заменить на реальное фото — добавьте в /public/images/story-N.jpg
              и замените этот div на:
              <img src={`/images/story-${i + 1}.jpg`} alt={`Фото ${i + 1}`} loading="lazy"
                   className="w-full h-full object-cover" /> */}
          <span className="text-xs tracking-wide" style={{ color: '#8FA68A', opacity: 0.7 }}>
            фото {i + 1}
          </span>
        </div>
      ))}
    </div>
  )
}
