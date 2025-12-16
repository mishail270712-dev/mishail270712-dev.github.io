var englishRules = [
  {
    "id": "verb_tenses",
    "title": "Времена глагола в английском",
    "subject": "english",
    "group": "grammar",
    "content": `
      <h3>Present Simple:</h3>
      <p>I play, he plays.</p>
      <h3>Past Simple:</h3>
      <p>I played, he played.</p>
      <h3>Future Simple:</h3>
      <p>I will play.</p>
    `
  },
  {
    "id": "conditionals",
    "title": "Условные предложения",
    "subject": "english",
    "group": "grammar",
    "content": `
      <h3>Type 1 (Real Conditional):</h3>
      <p>If I study, I will pass the exam.</p>
      <h3>Type 2 (Unreal Conditional):</h3>
      <p>If I studied, I would pass the exam.</p>
      <h3>Type 3 (Past Unreal):</h3>
      <p>If I had studied, I would have passed the exam.</p>
    `
  },
  {
    "id": "phrasal_verbs",
    "title": "Фразовые глаголы",
    "subject": "english",
    "group": "vocabulary",
    "content": `
      <h3>Что это?</h3>
      <p>Фразовый глагол — это глагол + предлог/частица, значение которых отличается от значения глагола.</p>
      <h4>Пример:</h4>
      <p>give up (бросить), look after (ухаживать), break down (сломаться).</p>
    `
  },
  {
    "id": "reported_speech",
    "title": "Косвенная речь",
    "subject": "english",
    "group": "grammar",
    "content": `
      <h3>Прямая речь:</h3>
      <p>He said: "I am tired."</p>
      <h3>Косвенная речь:</h3>
      <p>He said that he was tired.</p>
    `
  },
  {
    "id": "modal_verbs",
    "title": "Модальные глаголы",
    "subject": "english",
    "group": "grammar",
    "content": `
      <h3>can, could, may, might, must, should</h3>
      <p>can — уметь, иметь возможность</p>
      <p>must — должен</p>
      <p>should — следует</p>
    `
  },
  {
    "id": "articles",
    "title": "Артикли a/an/the",
    "subject": "english",
    "group": "grammar",
    "content": `
      <h3>a/an — неопределённый артикль</h3>
      <p>Используется с исчисляемыми существительными в единственном числе.</p>
      <h3>the — определённый артикль</h3>
      <p>Используется, когда речь идёт о конкретном объекте.</p>
    `
  },
  {
    "id": "passive_voice",
    "title": "Страдательный залог",
    "subject": "english",
    "group": "grammar",
    "content": `
      <h3>Форма:</h3>
      <p>be + V3 (participle II)</p>
      <h4>Пример:</h4>
      <p>Active: I write a letter. → Passive: A letter is written by me.</p>
    `
  },
  {
    "id": "relative_clauses",
    "title": "Придаточные определительные",
    "subject": "english",
    "group": "grammar",
    "content": `
      <h3>Относятся к существительным</h3>
      <h4>Слова:</h4>
      <p>who, which, that, whose, where, when</p>
      <h4>Пример:</h4>
      <p>The book <strong>that</strong> I read was interesting.</p>
    `
  },
  {
    "id": "gerunds_vs_infinitives",
    "title": "Герундий и инфинитив",
    "subject": "english",
    "group": "grammar",
    "content": `
      <h3>Герундий (V-ing):</h3>
      <p>I enjoy <strong>reading</strong>.</p>
      <h3>Инфинитив (to V):</h3>
      <p>I want <strong>to read</strong>.</p>
    `
  },
  {
    "id": "adjectives_vs_adverbs",
    "title": "Прилагательные и наречия",
    "subject": "english",
    "group": "grammar",
    "content": `
      <h3>Прилагательное описывает существительное:</h3>
      <p>She is <strong>beautiful</strong>.</p>
      <h3>Наречие описывает глагол:</h3>
      <p>She sings <strong>beautifully</strong>.</p>
    `
  },
  {
    "id": "prepositions",
    "title": "Предлоги",
    "subject": "english",
    "group": "grammar",
    "content": `
      <h3>Чаще всего:</h3>
      <ul>
        <li>in, on, at (время/место)</li>
        <li>by, with, for (причина/инструмент)</li>
      </ul>
      <h4>Пример:</h4>
      <p>I live <strong>in</strong> Moscow.</p>
    `
  },
  {
    "id": "word_order",
    "title": "Порядок слов в предложении",
    "subject": "english",
    "group": "grammar",
    "content": `
      <h3>Обычный порядок:</h3>
      <p>Subject + Verb + Object</p>
      <h4>Пример:</h4>
      <p>I (S) eat (V) an apple (O).</p>
    `
  },
  {
    "id": "countable_uncountable",
    "title": "Исчисляемые и неисчисляемые существительные",
    "subject": "english",
    "group": "grammar",
    "content": `
      <h3>Исчисляемые:</h3>
      <p>books, cats → a book, two cats</p>
      <h3>Неисчисляемые:</h3>
      <p>water, advice → some water, advice</p>
    `
  },
  {
    "id": "pronouns",
    "title": "Местоимения",
    "subject": "english",
    "group": "grammar",
    "content": `
      <h3>Личные:</h3>
      <p>I, you, he, she, it, we, they</p>
      <h3>Притяжательные:</h3>
      <p>my, your, his, her, its, our, their</p>
      <h3>Указательные:</h3>
      <p>this, that, these, those</p>
    `
  },
  {
    "id": "comparatives_superlatives",
    "title": "Сравнительные и превосходные степени",
    "subject": "english",
    "group": "grammar",
    "content": `
      <h3>Сравнительная:</h3>
      <p>taller, more interesting</p>
      <h3>Превосходная:</h3>
      <p>the tallest, the most interesting</p>
    `
  }
];