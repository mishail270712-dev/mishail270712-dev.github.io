var physicsRules = [
  {
    "id": "newton_laws",
    "title": "Законы Ньютона",
    "subject": "physics",
    "group": "mechanics",
    "content": `
      <h3>1-й закон (инерции):</h3>
      <p>Тело остается в покое или движется равномерно, если сумма сил = 0.</p>
      <h3>2-й закон:</h3>
      <p>F = ma</p>
      <h3>3-й закон:</h3>
      <p>Сила действия равна силе противодействия.</p>
    `
  },
  {
    "id": "ohms_law",
    "title": "Закон Ома",
    "subject": "physics",
    "group": "electricity",
    "content": `
      <h3>Формула:</h3>
      <p>I = U / R</p>
      <p>Сила тока = Напряжение / Сопротивление</p>
    `
  },
  {
    "id": "energy_forms",
    "title": "Виды энергии",
    "subject": "physics",
    "group": "thermodynamics",
    "content": `
      <h3>Кинетическая:</h3>
      <p>Энергия движения</p>
      <h3>Потенциальная:</h3>
      <p>Энергия положения</p>
      <h3>Внутренняя:</h3>
      <p>Тепловая энергия</p>
    `
  },
  {
    "id": "waves_sound_light",
    "title": "Волны: звук и свет",
    "subject": "physics",
    "group": "waves",
    "content": `
      <h3>Звук:</h3>
      <p>Механические волны, распространяются в среде.</p>
      <h3>Свет:</h3>
      <p>Электромагнитные волны, могут распространяться в вакууме.</p>
    `
  },
  {
    "id": "motion_graphs",
    "title": "Графики движения",
    "subject": "physics",
    "group": "kinematics",
    "content": `
      <h3>График скорости vs. времени:</h3>
      <p>Наклон = ускорению</p>
      <h3>Площадь под графиком = пройденному пути</p>
    `
  },
  {
    "id": "gravity",
    "title": "Закон всемирного тяготения",
    "subject": "physics",
    "group": "mechanics",
    "content": `
      <h3>Формула:</h3>
      <p>F = G * (m₁ * m₂) / r²</p>
      <p>Сила притяжения между двумя телами.</p>
    `
  },
  {
    "id": "momentum",
    "title": "Импульс тела",
    "subject": "physics",
    "group": "mechanics",
    "content": `
      <h3>Формула:</h3>
      <p>p = m * v</p>
      <h3>Закон сохранения импульса:</h3>
      <p>Суммарный импульс системы не изменяется.</p>
    `
  },
  {
    "id": "work_energy",
    "title": "Работа и энергия",
    "subject": "physics",
    "group": "mechanics",
    "content": `
      <h3>Работа:</h3>
      <p>W = F * s * cos(α)</p>
      <h3>Энергия:</h3>
      <p>W = ΔE</p>
    `
  },
  {
    "id": "pressure",
    "title": "Давление",
    "subject": "physics",
    "group": "mechanics",
    "content": `
      <h3>Формула:</h3>
      <p>P = F / S</p>
      <h3>Единица:</h3>
      <p>Паскаль (Па)</p>
    `
  },
  {
    "id": "light_refraction",
    "title": "Преломление света",
    "subject": "physics",
    "group": "optics",
    "content": `
      <h3>Закон Снеллиуса:</h3>
      <p>n₁ * sin(α₁) = n₂ * sin(α₂)</p>
    `
  },
  {
    "id": "lenses",
    "title": "Линзы",
    "subject": "physics",
    "group": "optics",
    "content": `
      <h3>Собирающие и рассеивающие</h3>
      <p>Фокусное расстояние, увеличение.</p>
    `
  },
  {
    "id": "magnetism",
    "title": "Магнетизм",
    "subject": "physics",
    "group": "electricity",
    "content": `
      <h3>Магнитное поле создаётся током</h3>
      <p>Правило буравчика, сила Ампера.</p>
    `
  },
  {
    "id": "atomic_physics",
    "title": "Атомная физика",
    "subject": "physics",
    "group": "quantum",
    "content": `
      <h3>Строение атома</h3>
      <p>Энергетические уровни, фотоны.</p>
    `
  },
  {
    "id": "nuclear_physics",
    "title": "Ядерная физика",
    "subject": "physics",
    "group": "quantum",
    "content": `
      <h3>Деление и синтез ядер</h3>
      <p>Выделение энергии.</p>
    `
  },
  {
    "id": "heat_transfer",
    "title": "Теплопередача",
    "subject": "physics",
    "group": "thermodynamics",
    "content": `
      <h3>Виды:</h3>
      <ul>
        <li>Теплопроводность</li>
        <li>Конвекция</li>
        <li>Излучение</li>
      </ul>
    `
  },
  {
    "id": "kinetic_theory",
    "title": "Молекулярно-кинетическая теория",
    "subject": "physics",
    "group": "thermodynamics",
    "content": `
      <h3>Все вещества состоят из молекул</h3>
      <p>Движение молекул объясняет давление, температуру.</p>
    `
  },
  {
    "id": "conservation_energy",
    "title": "Закон сохранения энергии",
    "subject": "physics",
    "group": "thermodynamics",
    "content": `
      <h3>Энергия не исчезает и не создаётся</h3>
      <p>Только переходит из одной формы в другую.</p>
    `
  },
  {
    "id": "electromagnetic_spectrum",
    "title": "Электромагнитный спектр",
    "subject": "physics",
    "group": "waves",
    "content": `
      <h3>Радиоволны, инфракрасное, видимое, УФ, рентген, гамма</h3>
      <p>Все это — электромагнитные волны.</p>
    `
  },
  {
    "id": "quantum_mechanics",
    "title": "Квантовая механика",
    "subject": "physics",
    "group": "quantum",
    "content": `
      <h3>Описывает поведение частиц на микроуровне</h3>
      <p>Вероятности, неопределенность, двойственность.</p>
    `
  },
  {
    "id": "relativity",
    "title": "Теория относительности",
    "subject": "physics",
    "group": "quantum",
    "content": `
      <h3>Специальная и общая</h3>
      <p>Скорость света — предел, искривление пространства-времени.</p>
    `
  }
];