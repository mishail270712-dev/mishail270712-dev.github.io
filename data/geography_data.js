var geographyRules = [
  {
    "id": "climate_zones",
    "title": "Климатические пояса",
    "subject": "geography",
    "group": "climate",
    "content": `
      <h3>Типы:</h3>
      <ul>
        <li>Экваториальный</li>
        <li>Тропический</li>
        <li>Умеренный</li>
        <li>Арктический</li>
      </ul>
    `
  },
  {
    "id": "relief_forms",
    "title": "Формы рельефа",
    "subject": "geography",
    "group": "topography",
    "content": `
      <h3>Горы:</h3>
      <p>Высокие участки суши (Эверест, Кавказ)</p>
      <h3>Равнины:</h3>
      <p>Плоские участки (Восточно-Европейская)</p>
    `
  },
  {
    "id": "countries_capitals",
    "title": "Страны и столицы мира",
    "subject": "geography",
    "group": "political",
    "content": `
      <h3>Примеры:</h3>
      <ul>
        <li>Франция — Париж</li>
        <li>Япония — Токио</li>
        <li>Россия — Москва</li>
      </ul>
    `
  },
  {
    "id": "oceans_seas",
    "title": "Океаны и моря",
    "subject": "geography",
    "group": "hydrosphere",
    "content": `
      <h3>Океаны:</h3>
      <ul>
        <li>Тихий</li>
        <li>Атлантический</li>
        <li>Индийский</li>
        <li>Северный Ледовитый</li>
      </ul>
    `
  },
  {
    "id": "maps_symbols",
    "title": "Условные обозначения на карте",
    "subject": "geography",
    "group": "cartography",
    "content": `
      <h3>Примеры:</h3>
      <ul>
        <li>Лес — зелёный цвет</li>
        <li>Гора — коричневый треугольник</li>
        <li>Река — синяя линия</li>
      </ul>
    `
  },
  {
    "id": "population",
    "title": "Население мира",
    "subject": "geography",
    "group": "human_geography",
    "content": `
      <h3>Что изучает:</h3>
      <ul>
        <li>Численность</li>
        <li>Плотность</li>
        <li>Миграции</li>
        <li>Город/село</li>
      </ul>
    `
  },
  {
    "id": "natural_resources",
    "title": "Природные ресурсы",
    "subject": "geography",
    "group": "economic",
    "content": `
      <h3>Виды:</h3>
      <ul>
        <li>Возобновляемые</li>
        <li>Невозобновляемые</li>
        <li>Минеральные</li>
        <li>Водные</li>
      </ul>
    `
  },
  {
    "id": "rivers_lakes",
    "title": "Реки и озёра",
    "subject": "geography",
    "group": "hydrosphere",
    "content": `
      <h3>Крупнейшие:</h3>
      <ul>
        <li>Реки: Нил, Амазонка, Волга</li>
        <li>Озёра: Каспийское, Байкал, Виктория</li>
      </ul>
    `
  },
  {
    "id": "atmosphere",
    "title": "Атмосфера",
    "subject": "geography",
    "group": "climate",
    "content": `
      <h3>Слои:</h3>
      <ul>
        <li>Тропосфера</li>
        <li>Стратосфера</li>
        <li>Мезосфера</li>
        <li>Термосфера</li>
      </ul>
    `
  },
  {
    "id": "weather_climate",
    "title": "Погода и климат",
    "subject": "geography",
    "group": "climate",
    "content": `
      <h3>Погода — краткосрочное</h3>
      <h3>Климат — долгосрочное</h3>
    `
  },
  {
    "id": "continents",
    "title": "Материки",
    "subject": "geography",
    "group": "topography",
    "content": `
      <h3>Список:</h3>
      <ul>
        <li>Евразия</li>
        <li>Африка</li>
        <li>Северная Америка</li>
        <li>Южная Америка</li>
        <li>Австралия</li>
        <li>Антарктида</li>
      </ul>
    `
  },
  {
    "id": "time_zones",
    "title": "Часовые пояса",
    "subject": "geography",
    "group": "cartography",
    "content": `
      <h3>Всего:</h3>
      <p>24 пояса</p>
      <h4>Пример:</h4>
      <p>Москва — UTC+3</p>
    `
  },
  {
    "id": "urbanization",
    "title": "Урбанизация",
    "subject": "geography",
    "group": "human_geography",
    "content": `
      <h3>Что такое:</h3>
      <p>Рост числа городов и городского населения.</p>
    `
  },
  {
    "id": "economic_activities",
    "title": "Хозяйственная деятельность",
    "subject": "geography",
    "group": "economic",
    "content": `
      <h3>Сектора:</h3>
      <ul>
        <li>Первичный (добывающий)</li>
        <li>Вторичный (обрабатывающий)</li>
        <li>Третичный (услуги)</li>
      </ul>
    `
  },
  {
    "id": "ecosystems",
    "title": "Природные зоны",
    "subject": "geography",
    "group": "environment",
    "content": `
      <h3>Примеры:</h3>
      <ul>
        <li>Тундра</li>
        <li>Тайга</li>
        <li>Степь</li>
        <li>Пустыня</li>
        <li>Смешанные леса</li>
      </ul>
    `
  },
  {
    "id": "plate_tectonics",
    "title": "Тектоника плит",
    "subject": "geography",
    "group": "topography",
    "content": `
      <h3>Что такое?</h3>
      <p>Движение литосферных плит, вызывающее землетрясения и вулканы.</p>
    `
  },
  {
    "id": "volcanism",
    "title": "Вулканизм",
    "subject": "geography",
    "group": "topography",
    "content": `
      <h3>Виды вулканов:</h3>
      <ul>
        <li>Действующие</li>
        <li>Потухшие</li>
        <li>Спящие</li>
      </ul>
    `
  },
  {
    "id": "glaciers",
    "title": "Ледники",
    "subject": "geography",
    "group": "topography",
    "content": `
      <h3>Где находятся:</h3>
      <p>Антарктида, Гренландия, горы</p>
      <h3>Роль:</h3>
      <p>Хранение пресной воды</p>
    `
  },
  {
    "id": "soil_types",
    "title": "Типы почв",
    "subject": "geography",
    "group": "environment",
    "content": `
      <h3>Примеры:</h3>
      <ul>
        <li>Чернозём</li>
        <li>Подзолистые</li>
        <li>Краснозёмы</li>
      </ul>
    `
  },
  {
    "id": "climate_change",
    "title": "Изменение климата",
    "subject": "geography",
    "group": "environment",
    "content": `
      <h3>Причины:</h3>
      <ul>
        <li>Парниковые газы</li>
        <li>Вырубка лесов</li>
      </ul>
      <h3>Последствия:</h3>
      <p>Повышение температуры, таяние льдов.</p>
    `
  }
];