# Евгения & Дмитрий — Свадебный сайт-приглашение

Одностраничный свадебный сайт. Стек: **React 18 + TypeScript + Vite + Tailwind CSS**.

---

## Установка и запуск

```bash
cd wedding-evgeniya-dmitriy
npm install
npm run dev
```

Откройте [http://localhost:5173](http://localhost:5173).

Сборка для деплоя:
```bash
npm run build
# папка dist/ готова для загрузки
```

---

## Настройка webhook (RSVP)

1. Скопируйте файл примера:
   ```bash
   cp .env.example .env
   ```
2. Откройте `.env` и вставьте URL вашего n8n-webhook:
   ```
   VITE_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/your-id
   ```
3. Форма будет отправлять POST-запрос с JSON:
   ```json
   {
     "name": "Иван Иванов",
     "attending": "yes",
     "plusOne": "yes",
     "partnerName": "Мария Иванова",
     "food": "",
     "accommodation": "no",
     "wish": "Желаем счастья!"
   }
   ```

---

## Куда класть медиафайлы

Все файлы кладите в папку `public/`:

| Что               | Путь                          | Где используется                  |
|-------------------|-------------------------------|-----------------------------------|
| Фон Hero          | `public/images/hero-bg.jpg`   | `src/sections/Hero.tsx`           |
| Фото истории (4)  | `public/images/story-1.jpg` … `story-4.jpg` | `src/components/GalleryGrid.tsx` |
| Фото приглашения  | `public/images/invite.jpg`    | `src/sections/Invite.tsx`         |
| Постер видео      | `public/images/video-poster.jpg` | `src/sections/Invite.tsx`      |
| Видео             | `public/video/invite.mp4`     | `src/sections/Invite.tsx`         |
| Образы дресс-кода | `public/images/dresscode-1.jpg` … `dresscode-3.jpg` | `src/sections/DressCode.tsx` |
| Музыка            | `public/music.mp3`            | `src/components/MusicToggle.tsx`  |

В каждом файле рядом с плейсхолдером есть комментарий `TODO` с точными инструкциями по замене.

### Яндекс-карта (секция «Где нас найти»)

1. Зайдите на [yandex.ru/map-widget/v1](https://yandex.ru/map-widget/v1/)
2. Найдите «Загородный Отель Раздолье, Косулино»
3. Нажмите «Поделиться» → «HTML-код»
4. Скопируйте `<iframe ...>` и вставьте в `src/sections/Location.tsx` вместо блока-плейсхолдера

---

## Авторские права на музыку

Michael Bublé «Feeling Good» защищён авторским правом.
Варианты:
- Приобрести лицензию через [Musicbed](https://www.musicbed.com) или [Artlist](https://artlist.io)
- Использовать роялти-фри кавер или инструментальную версию
- Попросить исполнителя-знакомого записать специально для вас

Для личного свадебного сайта (без монетизации) риск минимален, но мы рекомендуем легальный вариант.

---

## Деплой на Vercel

1. Установите [Vercel CLI](https://vercel.com/docs/cli): `npm i -g vercel`
2. В корне папки `wedding-evgeniya-dmitriy/`:
   ```bash
   vercel
   ```
3. В настройках проекта на Vercel добавьте переменную окружения:
   `VITE_N8N_WEBHOOK_URL` = ваш webhook URL
4. Для корректной работы react-router создайте файл `public/_redirects`:
   ```
   /*  /index.html  200
   ```
   Или `vercel.json`:
   ```json
   { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
   ```

---

## Структура проекта

```
src/
├── App.tsx
├── main.tsx
├── index.css
├── vite-env.d.ts
├── pages/
│   ├── MainPage.tsx      — рендерит все 9 секций
│   └── Thanks.tsx        — страница /thanks?coming=yes|no
├── sections/
│   ├── Hero.tsx          — тёмный hero + таймер + parallax
│   ├── Program.tsx       — таймлайн дня
│   ├── Story.tsx         — история пары + галерея
│   ├── Invite.tsx        — фото + видео пригласительного
│   ├── Location.tsx      — карта + кнопка маршрута
│   ├── DressCode.tsx     — цветовые свотчи + образы
│   ├── Wishes.tsx        — 3 карточки (подарки/цветы/дети)
│   ├── Rsvp.tsx          — форма подтверждения
│   └── Footer.tsx        — тёмный подвал + контакт
└── components/
    ├── Countdown.tsx     — таймер обратного отсчёта
    ├── ColorSwatch.tsx   — ряд цветовых кружков
    ├── FadeUp.tsx        — анимация появления (IntersectionObserver)
    ├── GalleryGrid.tsx   — сетка фотографий
    ├── MusicToggle.tsx   — плавающая кнопка музыки
    └── RsvpForm.tsx      — форма с условной логикой полей
```
