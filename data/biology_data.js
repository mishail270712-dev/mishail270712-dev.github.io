var biologyRules = [
  {
    "id": "cell_structure",
    "title": "Строение клетки",
    "subject": "biology",
    "group": "cell_biology",
    "content": `
      <h3>Основные компоненты:</h3>
      <ul>
        <li>Ядро — содержит ДНК</li>
        <li>Цитоплазма — внутренняя среда</li>
        <li>Мембрана — оболочка клетки</li>
        <li>Митохондрии — энергия (АТФ)</li>
      </ul>
    `
  },
  {
    "id": "photosynthesis",
    "title": "Фотосинтез",
    "subject": "biology",
    "group": "botany",
    "content": `
      <h3>Формула:</h3>
      <p>6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂</p>
      <p>Процесс, в результате которого растения производят органические вещества из углекислого газа и воды, используя свет.</p>
    `
  },
  {
    "id": "evolution",
    "title": "Эволюция по Дарвину",
    "subject": "biology",
    "group": "evolution",
    "content": `
      <h3>Основные идеи:</h3>
      <ul>
        <li>Естественный отбор</li>
        <li>Борьба за существование</li>
        <li>Наследственная изменчивость</li>
      </ul>
      <p>Виды изменяются со временем, приспосабливаясь к среде.</p>
    `
  },
  {
    "id": "dna_structure",
    "title": "Строение ДНК",
    "subject": "biology",
    "group": "molecular_biology",
    "content": `
      <h3>Двойная спираль</h3>
      <p>ДНК состоит из двух цепей, соединённых водородными связями между комплементарными основаниями: А-Т, Г-Ц.</p>
    `
  },
  {
    "id": "ecosystem",
    "title": "Экосистема",
    "subject": "biology",
    "group": "ecology",
    "content": `
      <h3>Что такое?</h3>
      <p>Экосистема — это сообщество живых организмов и окружающей их среды.</p>
      <h4>Пример:</h4>
      <p>Лес, озеро, болото.</p>
    `
  },
  {
    "id": "classification",
    "title": "Классификация живых организмов",
    "subject": "biology",
    "group": "taxonomy",
    "content": `
      <h3>Царства:</h3>
      <ul>
        <li>Бактерии</li>
        <li>Грибы</li>
        <li>Растения</li>
        <li>Животные</li>
        <li>Вирусы (спорно)</li>
      </ul>
    `
  },
  {
    "id": "respiration",
    "title": "Дыхание у организмов",
    "subject": "biology",
    "group": "physiology",
    "content": `
      <h3>Формула:</h3>
      <p>C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP</p>
      <p>Процесс получения энергии.</p>
    `
  },
  {
    "id": "genetics",
    "title": "Основы генетики",
    "subject": "biology",
    "group": "genetics",
    "content": `
      <h3>Ген — участок ДНК</h3>
      <p>Кодирует белок или РНК.</p>
      <h4>Наследование:</h4>
      <p>Мендель: доминантные и рецессивные гены.</p>
    `
  },
  {
    "id": "mitosis",
    "title": "Митоз",
    "subject": "biology",
    "group": "cell_biology",
    "content": `
      <h3>Деление клетки</h3>
      <p>Одна клетка делится на две идентичные.</p>
      <h4>Фазы:</h4>
      <ul>
        <li>Профаза</li>
        <li>Метафаза</li>
        <li>Анафаза</li>
        <li>Телофаза</li>
      </ul>
    `
  },
  {
    "id": "meiosis",
    "title": "Мейоз",
    "subject": "biology",
    "group": "cell_biology",
    "content": `
      <h3>Образование половых клеток</h3>
      <p>Из одной клетки образуются 4 с разным набором хромосом.</p>
    `
  },
  {
    "id": "plant_anatomy",
    "title": "Анатомия растений",
    "subject": "biology",
    "group": "botany",
    "content": `
      <h3>Части растения:</h3>
      <ul>
        <li>Корень — закрепление, всасывание</li>
        <li>Стебель — транспорт веществ</li>
        <li>Лист — фотосинтез</li>
        <li>Цветок — размножение</li>
      </ul>
    `
  },
  {
    "id": "animal_physiology",
    "title": "Физиология животных",
    "subject": "biology",
    "group": "zoology",
    "content": `
      <h3>Системы организма:</h3>
      <ul>
        <li>Пищеварительная</li>
        <li>Кровеносная</li>
        <li>Нервная</li>
        <li>Дыхательная</li>
        <li>Выделительная</li>
      </ul>
    `
  },
  {
    "id": "viruses",
    "title": "Вирусы",
    "subject": "biology",
    "group": "microbiology",
    "content": `
      <h3>Не являются живыми</h3>
      <p>Состоят из ДНК/РНК и белковой оболочки.</p>
      <p>Размножаются только внутри клетки.</p>
    `
  },
  {
    "id": "biotechnology",
    "title": "Биотехнологии",
    "subject": "biology",
    "group": "biotechnology",
    "content": `
      <h3>Что включает:</h3>
      <ul>
        <li>Генная инженерия</li>
        <li>Клонирование</li>
        <li>Создание лекарств</li>
        <li>ГМО</li>
      </ul>
    `
  },
  {
    "id": "human_body",
    "title": "Организм человека",
    "subject": "biology",
    "group": "human_anatomy",
    "content": `
      <h3>Системы:</h3>
      <ul>
        <li>Опорно-двигательная</li>
        <li>Нервная</li>
        <li>Эндокринная</li>
        <li>Иммунная</li>
      </ul>
    `
  }
];