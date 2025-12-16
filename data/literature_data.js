var literatureRules = [
  {
    "id": "literary_genres",
    "title": "Литературные жанры",
    "subject": "literature",
    "group": "theory",
    "content": `
      <h3>Основные:</h3>
      <ul>
        <li>Эпос (роман, повесть, рассказ)</li>
        <li>Лирика (стихотворение)</li>
        <li>Драма (пьеса)</li>
      </ul>
    `
  },
  {
    "id": "poetry_styles",
    "title": "Стилистические приемы в поэзии",
    "subject": "literature",
    "group": "theory",
    "content": `
      <h3>Метафора:</h3>
      <p>Железный взгляд</p>
      <h3>Эпитет:</h3>
      <p>Тихий вечер</p>
      <h3>Сравнение:</h3>
      <p>Как лебедь бел</p>
    `
  },
  {
    "id": "pushkin_analysis",
    "title": "Анализ «Евгения Онегина»",
    "subject": "literature",
    "group": "analysis",
    "content": `
      <h3>Темы:</h3>
      <ul>
        <li>Любовь</li>
        <li>Образование</li>
        <li>Общество</li>
      </ul>
      <h3>Главные герои:</h3>
      <p>Евгений Онегин, Татьяна Ларина, Владимир Ленский</p>
    `
  },
  {
    "id": "gogol_analysis",
    "title": "«Мертвые души» Н.В. Гоголя",
    "subject": "literature",
    "group": "analysis",
    "content": `
      <h3>Главная идея:</h3>
      <p>Обличение общества и нравов.</p>
      <h3>Герои:</h3>
      <p>Чичиков, Манилов, Коробочка, Ноздрев.</p>
    `
  },
  {
    "id": "symbolism",
    "title": "Символизм в литературе",
    "subject": "literature",
    "group": "movements",
    "content": `
      <h3>Особенности:</h3>
      <ul>
        <li>Поиск скрытого смысла</li>
        <li>Использование символов</li>
        <li>Мистика, образность</li>
      </ul>
      <h4>Представители:</h4>
      <p>А. Блок, В. Брюсов</p>
    `
  },
  {
    "id": "realism",
    "title": "Реализм",
    "subject": "literature",
    "group": "movements",
    "content": `
      <h3>Особенности:</h3>
      <ul>
        <li>Изображение действительности</li>
        <li>Объективность</li>
        <li>Социальная критика</li>
      </ul>
      <h4>Представители:</h4>
      <p>Толстой, Достоевский, Тургенев</p>
    `
  },
  {
    "id": "romanticism",
    "title": "Романтизм",
    "subject": "literature",
    "group": "movements",
    "content": `
      <h3>Особенности:</h3>
      <ul>
        <li>Воображение, чувства</li>
        <li>Природа, народ</li>
        <li>Конфликт героя и общества</li>
      </ul>
      <h4>Представители:</h4>
      <p>Пушкин, Лермонтов</p>
    `
  },
  {
    "id": "literary_hero",
    "title": "Литературный герой",
    "subject": "literature",
    "group": "theory",
    "content": `
      <h3>Типы:</h3>
      <ul>
        <li>Положительный</li>
        <li>Отрицательный</li>
        <li>Типичный</li>
        <li>Трагический</li>
      </ul>
    `
  },
  {
    "id": "plot_composition",
    "title": "Сюжет и композиция",
    "subject": "literature",
    "group": "theory",
    "content": `
      <h3>Сюжет:</h3>
      <p>Цепь событий в произведении</p>
      <h3>Композиция:</h3>
      <p>Строение произведения (экспозиция, завязка, развитие, кульминация, развязка)</p>
    `
  },
  {
    "id": "poetic_rhythm",
    "title": "Ритм и размер в стихотворении",
    "subject": "literature",
    "group": "theory",
    "content": `
      <h3>Размер:</h3>
      <ul>
        <li>Ямб (ударение на 2-й слог)</li>
        <li>Хорей (ударение на 1-й слог)</li>
        <li>Анапест, дактиль</li>
      </ul>
    `
  },
  {
    "id": "folklore",
    "title": "Фольклор",
    "subject": "literature",
    "group": "theory",
    "content": `
      <h3>Виды:</h3>
      <ul>
        <li>Сказки</li>
        <li>Былины</li>
        <li>Песни</li>
        <li>Пословицы</li>
      </ul>
    `
  },
  {
    "id": "modernism",
    "title": "Модернизм",
    "subject": "literature",
    "group": "movements",
    "content": `
      <h3>Особенности:</h3>
      <ul>
        <li>Эксперименты с формой</li>
        <li>Нестандартные сюжеты</li>
        <li>Символизм, абстракция</li>
      </ul>
      <h4>Представители:</h4>
      <p>Блок, Бальмонт, Хлебников</p>
    `
  },
  {
    "id": "soviet_literature",
    "title": "Советская литература",
    "subject": "literature",
    "group": "movements",
    "content": `
      <h3>Особенности:</h3>
      <ul>
        <li>Социалистический реализм</li>
        <li>Героизация труда</li>
        <li>Патриотизм</li>
      </ul>
      <h4>Представители:</h4>
      <p>Шолохов, Пастернак, Солженицын</p>
    `
  },
  {
    "id": "foreign_classics",
    "title": "Зарубежная классика",
    "subject": "literature",
    "group": "analysis",
    "content": `
      <h3>Представители:</h3>
      <ul>
        <li>Шекспир — «Гамлет»</li>
        <li>Диккенс — «Приключения Оливера Твиста»</li>
        <li>Гёте — «Фауст»</li>
      </ul>
    `
  },
  {
    "id": "children_literature",
    "title": "Детская литература",
    "subject": "literature",
    "group": "theory",
    "content": `
      <h3>Особенности:</h3>
      <ul>
        <li>Простой язык</li>
        <li>Мораль</li>
        <li>Образность</li>
      </ul>
      <h4>Представители:</h4>
      <p>Чуковский, Носов, Маршак</p>
    `
  }
];