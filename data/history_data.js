var historyRules = [
  {
    "id": "ancient_rome",
    "title": "Древний Рим",
    "subject": "history",
    "group": "ancient_world",
    "content": `
      <h3>Основные периоды:</h3>
      <ul>
        <li>Царский период (753–509 до н.э.)</li>
        <li>Республика (509–27 до н.э.)</li>
        <li>Империя (27 до н.э.–476 н.э.)</li>
      </ul>
      <h4>Известные личности:</h4>
      <p>Юлий Цезарь, Август, Нерон, Константин.</p>
    `
  },
  {
    "id": "world_war_1",
    "title": "Первая мировая война",
    "subject": "history",
    "group": "modern_history",
    "content": `
      <h3>Дата:</h3>
      <p>1914–1918</p>
      <h3>Основные причины:</h3>
      <ul>
        <li>Борьба за колонии</li>
        <li>Национальные конфликты</li>
        <li>Убийство эрцгерцога Франца Фердинанда</li>
      </ul>
    `
  },
  {
    "id": "soviet_union",
    "title": "Советский Союз",
    "subject": "history",
    "group": "history_of_russia",
    "content": `
      <h3>Основан:</h3>
      <p>30 декабря 1922 года</p>
      <h3>Распался:</h3>
      <p>26 декабря 1991 года</p>
      <h4>Лидеры:</h4>
      <p>Ленин, Сталин, Хрущёв, Брежнев, Горбачёв</p>
    `
  },
  {
    "id": "middle_ages",
    "title": "Средневековье",
    "subject": "history",
    "group": "medieval_history",
    "content": `
      <h3>Период:</h3>
      <p>V–XV века</p>
      <h4>Характерные черты:</h4>
      <ul>
        <li>Феодализм</li>
        <li>Церковь как сила</li>
        <li>Крестовые походы</li>
      </ul>
    `
  },
  {
    "id": "enlightenment",
    "title": "Просвещение",
    "subject": "history",
    "group": "modern_history",
    "content": `
      <h3>Период:</h3>
      <p>XVII–XVIII века</p>
      <h4>Идеи:</h4>
      <ul>
        <li>Разум выше авторитета</li>
        <li>Свобода, равенство, братство</li>
        <li>Разделение властей</li>
      </ul>
      <h4>Представители:</h4>
      <p>Вольтер, Руссо, Монтескье</p>
    `
  },
  {
    "id": "french_revolution",
    "title": "Французская революция",
    "subject": "history",
    "group": "modern_history",
    "content": `
      <h3>Год:</h3>
      <p>1789</p>
      <h3>Основные этапы:</h3>
      <ul>
        <li>Взятие Бастилии</li>
        <li>Правление якобинцев</li>
        <li>Террор</li>
        <li>Восхождение Наполеона</li>
      </ul>
    `
  },
  {
    "id": "industrial_revolution",
    "title": "Промышленная революция",
    "subject": "history",
    "group": "modern_history",
    "content": `
      <h3>Когда:</h3>
      <p>XVIII–XIX века</p>
      <h3>Изменения:</h3>
      <ul>
        <li>Механизация производства</li>
        <li>Рост городов</li>
        <li>Появление рабочего класса</li>
      </ul>
    `
  },
  {
    "id": "world_war_2",
    "title": "Вторая мировая война",
    "subject": "history",
    "group": "modern_history",
    "content": `
      <h3>Годы:</h3>
      <p>1939–1945</p>
      <h3>Участники:</h3>
      <ul>
        <li>Советский Союз, США, Великобритания (Антигитлеровская коалиция)</li>
        <li>Германия, Италия, Япония (Третий рейх)</li>
      </ul>
    `
  },
  {
    "id": "cold_war",
    "title": "Холодная война",
    "subject": "history",
    "group": "modern_history",
    "content": `
      <h3>Когда:</h3>
      <p>1947–1991</p>
      <h3>Конфликт:</h3>
      <p>США vs СССР</p>
      <h4>События:</h4>
      <ul>
        <li>Кубинский ракетный кризис</li>
        <li>Берлинская стена</li>
        <li>Конкуренция в космосе</li>
      </ul>
    `
  },
  {
    "id": "ancient_egypt",
    "title": "Древний Египет",
    "subject": "history",
    "group": "ancient_world",
    "content": `
      <h3>Характерно:</h3>
      <ul>
        <li>Пирамиды</li>
        <li>Фараоны</li>
        <li>Иероглифы</li>
        <li>Нил</li>
      </ul>
    `
  },
  {
    "id": "ancient_greece",
    "title": "Древняя Греция",
    "subject": "history",
    "group": "ancient_world",
    "content": `
      <h3>Период:</h3>
      <p>8-5 века до н.э.</p>
      <h4>Города-государства:</h4>
      <p>Афины, Спарта</p>
      <h4>Философы:</h4>
      <p>Сократ, Платон, Аристотель</p>
    `
  },
  {
    "id": "byzantine_empire",
    "title": "Византийская империя",
    "subject": "history",
    "group": "medieval_history",
    "content": `
      <h3>Столица:</h3>
      <p>Константинополь</p>
      <h3>Характерно:</h3>
      <ul>
        <li>Византийская культура</li>
        <li>Православие</li>
        <li>Кодекс Юстиниана</li>
      </ul>
    `
  },
  {
    "id": "american_independence",
    "title": "Американская революция",
    "subject": "history",
    "group": "modern_history",
    "content": `
      <h3>Когда:</h3>
      <p>1775–1783</p>
      <h3>Результат:</h3>
      <p>Объявление независимости США от Великобритании</p>
    `
  },
  {
    "id": "reformation",
    "title": "Реформация",
    "subject": "history",
    "group": "medieval_history",
    "content": `
      <h3>Когда:</h3>
      <p>16 век</p>
      <h3>Лидеры:</h3>
      <p>Мартин Лютер, Жан Кальвин</p>
      <h3>Цель:</h3>
      <p>Реформа католической церкви</p>
    `
  },
  {
    "id": "colonialism",
    "title": "Колониализм",
    "subject": "history",
    "group": "modern_history",
    "content": `
      <h3>Что такое:</h3>
      <p>Политика завоевания и контроля над другими территориями.</p>
      <h3>Примеры:</h3>
      <p>Британия в Индии, Франция в Африке.</p>
    `
  },
  {
    "id": "russian_revolution_1917",
    "title": "Русская революция 1917",
    "subject": "history",
    "group": "history_of_russia",
    "content": `
      <h3>Два этапа:</h3>
      <ul>
        <li>Февральская революция (свержение монархии)</li>
        <li>Октябрьская революция (приход к власти большевиков)</li>
      </ul>
      <h4>Лидеры:</h4>
      <p>Ленин, Керенский</p>
    `
  },
  {
    "id": "napoleonic_wars",
    "title": "Наполеоновские войны",
    "subject": "history",
    "group": "modern_history",
    "content": `
      <h3>Когда:</h3>
      <p>1803–1815</p>
      <h3>Цель:</h3>
      <p>Завоевание Европы Наполеоном</p>
      <h3>Окончание:</h3>
      <p>Поражение при Ватерлоо</p>
    `
  },
  {
    "id": "ottoman_empire",
    "title": "Османская империя",
    "subject": "history",
    "group": "medieval_history",
    "content": `
      <h3>Период:</h3>
      <p>1299–1922</p>
      <h3>Столица:</h3>
      <p>Стамбул</p>
      <h3>Завершение:</h3>
      <p>После Первой мировой войны</p>
    `
  },
  {
    "id": "mongol_invasion",
    "title": "Монгольское нашествие на Русь",
    "subject": "history",
    "group": "medieval_history",
    "content": `
      <h3>Когда:</h3>
      <p>1237–1240</p>
      <h3>Результат:</h3>
      <p>Завоевание русских земель, установление ига</p>
    `
  },
  {
    "id": "crusades",
    "title": "Крестовые походы",
    "subject": "history",
    "group": "medieval_history",
    "content": `
      <h3>Цель:</h3>
      <p>Вернуть Святую землю у мусульман</p>
      <h3>Участники:</h3>
      <p>Европейские рыцари</p>
    `
  }
];