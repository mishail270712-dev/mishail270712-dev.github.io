// script.js

// --- Переключение темы ---

function toggleTheme() {
  const body = document.body;
  const isDark = body.getAttribute('data-theme') === 'dark';
  const toggleBtn = document.getElementById('themeToggle');

  if (isDark) {
    body.removeAttribute('data-theme');
    toggleBtn.textContent = '🌙 Ночная тема';
    localStorage.setItem('theme', 'light');
  } else {
    body.setAttribute('data-theme', 'dark');
    toggleBtn.textContent = '☀️ Дневная тема';
    localStorage.setItem('theme', 'dark');
  }
}

// Загрузка темы из localStorage при открытии страницы
document.addEventListener("DOMContentLoaded", function () {
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    document.getElementById('themeToggle').textContent = '☀️ Дневная тема';
  }

  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
});

// --- Определение устройства и добавление класса к body ---

function detectDevice() {
  const width = window.innerWidth;

  if (width <= 480) {
    document.body.classList.add('device-mobile');
    document.body.classList.remove('device-tablet', 'device-desktop');
  } else if (width <= 768) {
    document.body.classList.add('device-tablet');
    document.body.classList.remove('device-mobile', 'device-desktop');
  } else {
    document.body.classList.add('device-desktop');
    document.body.classList.remove('device-mobile', 'device-tablet');
  }
}

// Вызываем при загрузке страницы и при изменении размера окна
window.addEventListener('load', detectDevice);
window.addEventListener('resize', detectDevice);

function goToSubject(subjectId) {
  window.location.href = `subject.html?subj=${subjectId}`;
}

function getGroupName(groupId) {
  const names = {
    "linguistics": "Лингвистика",
    "punctuation": "Пунктуация",
    "geometry": "Геометрия",
    "grammar": "Грамматика",
    "structure": "Строение вещества",
    "spelling": "Орфография",
    "phonetics": "Фонетика",
    "algebra": "Алгебра",
    "calculus": "Мат. анализ",
    "trigonometry": "Тригонометрия",
    "statistics": "Статистика",
    "vocabulary": "Лексика",
    "ancient_world": "Древний мир",
    "medieval_history": "Средневековье",
    "modern_history": "Новое время",
    "history_of_russia": "История России",
    "cell_biology": "Клеточная биология",
    "botany": "Ботаника",
    "evolution": "Эволюция",
    "molecular_biology": "Молекулярная биология",
    "ecology": "Экология",
    "organic": "Органическая химия",
    "reactions": "Типы реакций",
    "mechanics": "Механика",
    "electricity": "Электричество",
    "thermodynamics": "Термодинамика",
    "waves": "Колебания и волны",
    "kinematics": "Кинематика",
    "theory": "Теория литературы",
    "analysis": "Анализ произведений",
    "movements": "Литературные направления",
    "climate": "Климат",
    "topography": "Рельеф",
    "political": "Политическая география",
    "hydrosphere": "Гидросфера",
    "cartography": "Картография",
    "number_systems": "Системы счисления",
    "algorithms": "Алгоритмы",
    "programming": "Программирование",
    "networks": "Сети"
  };
  return names[groupId] || groupId;
}

function loadSubject(subjectId) {
  const title = document.getElementById("subjectTitle");
  const container = document.getElementById("groupsContainer");

  const subjectNames = {
    "russian": "Русский язык",
    "math": "Математика",
    "english": "Английский язык",
    "history": "История",
    "biology": "Биология",
    "chemistry": "Химия",
    "physics": "Физика",
    "literature": "Литература",
    "geography": "География",
    "informatics": "Информатика"
  };

  title.textContent = subjectNames[subjectId] || "Неизвестный предмет";

  const groups = [...new Set(rulesData.filter(r => r.subject === subjectId).map(r => r.group))];

  container.innerHTML = '';
  groups.forEach(group => {
    const btn = document.createElement("button");
    btn.textContent = getGroupName(group);
    btn.onclick = () => window.location.href = `group.html?subj=${subjectId}&group=${group}`;
    container.appendChild(btn);
  });
}

function loadGroup(subjectId, groupId) {
  const title = document.getElementById("groupTitle");
  const container = document.getElementById("rulesContainer");

  title.textContent = getGroupName(groupId);

  if (!rulesData || !Array.isArray(rulesData)) {
    console.error("rulesData не загружен!");
    return;
  }

  const rules = rulesData.filter(r => r.subject === subjectId && r.group === groupId);

  container.innerHTML = '';
  if (rules.length === 0) {
    container.innerHTML = '<p>Правила не найдены.</p>';
    return;
  }

  rules.forEach(rule => {
    const btn = document.createElement("button");
    btn.textContent = rule.title;
    btn.onclick = () => window.location.href = `rule.html?id=${rule.id}`;
    container.appendChild(btn);
  });
}

function loadRule(ruleId) {
  const rule = rulesData.find(r => r.id === ruleId);
  if (!rule) {
    document.getElementById("ruleTitle").textContent = "Правило не найдено";
    document.getElementById("ruleContent").innerHTML = "<p>Ошибка: правило не существует.</p>";
    return;
  }

  document.getElementById("ruleTitle").textContent = rule.title;
  document.getElementById("ruleContent").innerHTML = rule.content;
}

function getSubjectByRuleId(ruleId) {
  const rule = rulesData.find(r => r.id === ruleId);
  return rule ? rule.subject : null;
}

function getGroupByRuleId(ruleId) {
  const rule = rulesData.find(r => r.id === ruleId);
  return rule ? rule.group : null;
}

function getSubjectName(subjectId) {
  const names = {
    "russian": "Русский",
    "math": "Математика",
    "english": "Английский",
    "history": "История",
    "biology": "Биология",
    "chemistry": "Химия",
    "physics": "Физика",
    "literature": "Литература",
    "geography": "География",
    "informatics": "Информатика"
  };
  return names[subjectId] || subjectId;
}

// --- Поиск ---

document.addEventListener("DOMContentLoaded", function () {
  const searchBox = document.getElementById("searchBox");
  const searchResults = document.getElementById("searchResults");

  if (!searchBox || !searchResults) {
    console.warn("Элементы поиска не найдены.");
    return;
  }

  searchBox.oninput = function() {
    const query = searchBox.value.trim().toLowerCase();
    searchResults.style.display = query ? "block" : "none";
    searchResults.innerHTML = "";

    if (!query) return;

    const matches = rulesData.filter(rule =>
      rule.title.toLowerCase().includes(query)
    );

    matches.forEach(rule => {
      const link = document.createElement("a");
      link.href = `rule.html?id=${rule.id}`;
      link.textContent = `${rule.title} (${getSubjectName(rule.subject)})`;
      searchResults.appendChild(link);
    });
  };
});

// --- Логика чата с нейросетью ---

document.addEventListener("DOMContentLoaded", function () {
  const chatModal = document.getElementById("chatModal");
  const openChatBtn = document.getElementById("openChatBtn");
  const closeChatBtn = document.getElementById("closeChatBtn");
  const userInput = document.getElementById("userInput");
  const sendMsgBtn = document.getElementById("sendMsgBtn");
  const chatMessages = document.getElementById("chatMessages");

  // Открытие чата
  openChatBtn.onclick = () => {
    chatModal.style.display = "flex";
  };

  // Закрытие чата
  closeChatBtn.onclick = () => {
    chatModal.style.display = "none";
  };

  // Отправка сообщения по Enter
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  // Отправка сообщения по кнопке
  sendMsgBtn.onclick = sendMessage;

  function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Добавляем сообщение пользователя
    addMessage(message, "user");

    // Очищаем поле ввода
    userInput.value = "";

    // "Думаем" и отвечаем
    setTimeout(() => {
      const reply = generateReply(message);
      addMessage(reply, "bot");
    }, 500);
  }

  function addMessage(text, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message");
    msgDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // --- Улучшенная нейросеть ---

// Для хранения истории разговора
let conversationHistory = [];

function generateReply(question) {
  // Сохраняем вопрос в историю
  conversationHistory.push({ sender: "user", text: question });

  // Приводим вопрос к нижнему регистру для анализа
  const lowerQuestion = question.toLowerCase();

  // --- Ответы на общие фразы ---
  if (lowerQuestion.includes("привет") || lowerQuestion.includes("здравствуй")) {
    return "Привет! Я — PompuwkaAI. Могу ответить на любой школьный вопрос. Спрашивай!";
  }
  if (lowerQuestion.includes("как дела")) {
    return "У меня всё отлично! А у тебя? Чем могу помочь?";
  }
  if (lowerQuestion.includes("спасибо") || lowerQuestion.includes("благодарю")) {
    return "Пожалуйста! Можешь задать ещё вопрос, если что-то непонятно.";
  }
  if (lowerQuestion.includes("пока") || lowerQuestion.includes("до свидания")) {
    return "Пока! Приходи, когда понадобится помощь.";
  }

  // --- Проверяем, связан ли вопрос с каким-либо школьным предметом ---
  const subjectKeywords = {
    "русский": ["русский", "язык", "морфем", "пунктуац", "орфограф", "фонетик", "литератур", "правописан", "слово", "предлож"],
    "математика": ["математик", "алгебр", "геометр", "уравнени", "теорем", "функци", "производн", "интеграл", "тригонометр", "вероятност", "логарифм", "вектор", "площад", "объём"],
    "английский": ["английск", "язык", "время", "глагол", "артикль", "предлог", "местоимен", "фразовый", "условный", "косвенная", "модальный"],
    "история": ["истор", "война", "революци", "импери", "царь", "средневеков", "древн", "советск", "наци", "фашизм", "просвещен"],
    "биология": ["биолог", "клетк", "генетик", "эволюци", "фотосинтез", "экосистем", "организм", "вирус", "растени", "животное"],
    "химия": ["хим", "атом", "реакци", "кислот", "основани", "раствор", "периодич", "органич", "неорганич", "валентност", "связ"],
    "физика": ["физик", "сила", "энерги", "движени", "закон", "тяготени", "свет", "звук", "электрич", "магнетизм", "оптик", "термодинамик"],
    "литература": ["литератур", "поэт", "роман", "стихотворен", "жанр", "стиль", "анализ", "персонаж", "сравнен", "эпитет", "метафор"],
    "география": ["географ", "стран", "столиц", "рельеф", "климат", "океан", "материк", "рек", "озер", "пояс", "погод", "населен"],
    "информатика": ["информатик", "алгоритм", "программ", "систем", "двоичн", "сеть", "база", "безопасност", "искусствен", "интеллект", "язык", "данных"]
  };

  let matchedSubject = null;
  for (const [subj, keywords] of Object.entries(subjectKeywords)) {
    if (keywords.some(k => lowerQuestion.includes(k))) {
      matchedSubject = subj;
      break;
    }
  }

  if (matchedSubject) {
    // Если нашли тему — ищем похожие правила в справочнике
    const relevantRules = rulesData.filter(r => r.subject === subjToId[matchedSubject]);
    if (relevantRules.length > 0) {
      // Выбираем случайное правило из подходящих
      const randomRule = relevantRules[Math.floor(Math.random() * relevantRules.length)];
      return `Я нашёл подходящее правило в справочнике: "${randomRule.title}". Перейди на главную страницу и посмотри раздел "${matchedSubject}" → "${getGroupName(randomRule.group)}" → "${randomRule.title}".`;
    } else {
      return `Интересный вопрос по ${matchedSubject}! В справочнике пока нет подходящих правил, но ты можешь воспользоваться поиском выше.`;
    }
  }

  // --- Ответы на часто задаваемые вопросы ---
  if (lowerQuestion.includes("кто ты") || lowerQuestion.includes("что ты")) {
    return "Я — PompuwkaAI, встроенный в школьный справочник Pompushkashcool. Я помогаю отвечать на вопросы по школьным предметам и могу подсказать, где найти нужное правило.";
  }
  if (lowerQuestion.includes("помощь") || lowerQuestion.includes("помоги")) {
    return "Я могу ответить на вопросы по школьным предметам. Задай любой вопрос, и я постараюсь помочь! Также ты можешь воспользоваться поиском или навигацией по сайту.";
  }
  if (lowerQuestion.includes("делать") || lowerQuestion.includes("что")) {
    return "Ты можешь задавать мне любые вопросы, искать правила по школьным предметам, использовать навигацию по разделам. Главное — учиться!";
  }

  // --- Ответы на несвязанные с учебой вопросы ---
  if (lowerQuestion.includes("погода") || lowerQuestion.includes("время")) {
    return "Я не могу узнать погоду или время. Но могу помочь с правилами по физике, например, о теплопередаче или движении!";
  }
  if (lowerQuestion.includes("фильм") || lowerQuestion.includes("кино")) {
    return "Фильмы — это здорово! Но я лучше могу помочь с литературой. Например, могу рассказать о сюжете «Войны и мира» или «Преступлении и наказании».";
  }
  if (lowerQuestion.includes("спорт") || lowerQuestion.includes("футбол")) {
    return "Спорт — полезно! Но я могу рассказать, как устроено тело человека в биологии или как работает энергия в физике.";
  }

  // --- Если ничего не подошло ---
  return "Интересный вопрос! Пока я не знаю точного ответа, но ты можешь воспользоваться поиском по справочнику выше или уточнить вопрос.";
}

// Маппинг названий предметов на ID
const subjToId = {
  "русский": "russian",
  "математика": "math",
  "английский": "english",
  "история": "history",
  "биология": "biology",
  "химия": "chemistry",
  "физика": "physics",
  "литература": "literature",
  "география": "geography",
  "информатика": "informatics"
};
});