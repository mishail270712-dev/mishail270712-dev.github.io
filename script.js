// --- Переключение темы ---

function toggleTheme() {
  const body = document.body;
  const isDark = body.getAttribute('data-theme') === 'dark';
  const toggleBtn = document.getElementById('themeToggle');
  const toggleBtnModal = document.getElementById('themeToggleInModal'); // может не быть

  if (isDark) {
    body.removeAttribute('data-theme');
    if (toggleBtn) toggleBtn.textContent = '🌙 Ночная тема';
    if (toggleBtnModal) toggleBtnModal.textContent = '🌙 Ночная тема';
    localStorage.setItem('theme', 'light');
  } else {
    body.setAttribute('data-theme', 'dark');
    if (toggleBtn) toggleBtn.textContent = '☀️ Дневная тема';
    if (toggleBtnModal) toggleBtnModal.textContent = '☀️ Дневная тема';
    localStorage.setItem('theme', 'dark');
  }
  // После смены темы — обновим цвета
  applySavedColors();
}

// --- Управление цветами ---

let headerColorOverride = false;
let buttonColorOverride = false;

function setHeaderColor(color) {
  document.querySelector('header').style.background = color;
  localStorage.setItem('headerColor', color);
  headerColorOverride = true;
  // Если пользователь поменял цвет шапки — обновим кнопки автоматически
  if (!buttonColorOverride) {
    const buttonColor = adjustBrightness(color, 0.75); // 75% яркости
    setButtonColorNoSave(buttonColor);
  }
}

function setButtonColor(color) {
  document.documentElement.style.setProperty('--button-bg-start', color);
  document.documentElement.style.setProperty('--button-bg-end', color);
  document.documentElement.style.setProperty('--button-hover-bg-start', adjustBrightness(color, 0.8));
  document.documentElement.style.setProperty('--button-hover-bg-end', adjustBrightness(color, 0.8));
  localStorage.setItem('buttonColor', color);
  buttonColorOverride = true;
}

// Внутренние функции без сохранения
function setButtonColorNoSave(color) {
  document.documentElement.style.setProperty('--button-bg-start', color);
  document.documentElement.style.setProperty('--button-bg-end', color);
  document.documentElement.style.setProperty('--button-hover-bg-start', adjustBrightness(color, 0.8));
  document.documentElement.style.setProperty('--button-hover-bg-end', adjustBrightness(color, 0.8));
}

// --- Функция для изменения яркости цвета ---
function adjustBrightness(color, factor) {
  let r, g, b;

  // Преобразуем цвет в формат RGB
  if (color.startsWith('#')) {
    color = color.slice(1);
    r = parseInt(color.substring(0, 2), 16);
    g = parseInt(color.substring(2, 4), 16);
    b = parseInt(color.substring(4, 6), 16);
  } else if (color.startsWith('rgb')) {
    const match = color.match(/\d+/g);
    r = parseInt(match[0]);
    g = parseInt(match[1]);
    b = parseInt(match[2]);
  } else {
    console.warn("Не удалось распознать цвет:", color);
    return color; // Если не распознали, возвращаем как есть
  }

  // Изменяем яркость
  r = Math.min(255, Math.floor(r * factor));
  g = Math.min(255, Math.floor(g * factor));
  b = Math.min(255, Math.floor(b * factor));

  return `rgb(${r}, ${g}, ${b})`;
}

// --- Загрузка цветов из localStorage ---
function applySavedColors() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  const savedHeaderColor = localStorage.getItem('headerColor');
  const savedButtonColor = localStorage.getItem('buttonColor');

  // Цвет текста зависит только от темы
  if (savedTheme === 'dark') {
    document.documentElement.style.setProperty('--text-color', '#e0e0e0');
  } else {
    document.documentElement.style.setProperty('--text-color', '#333');
  }

  if (savedHeaderColor) {
    document.querySelector('header').style.background = savedHeaderColor;
    headerColorOverride = true;
  }

  if (savedButtonColor) {
    document.documentElement.style.setProperty('--button-bg-start', savedButtonColor);
    document.documentElement.style.setProperty('--button-bg-end', savedButtonColor);
    document.documentElement.style.setProperty('--button-hover-bg-start', adjustBrightness(savedButtonColor, 0.8));
    document.documentElement.style.setProperty('--button-hover-bg-end', adjustBrightness(savedButtonColor, 0.8));
    buttonColorOverride = true;
  }

  // Если цвета не установлены пользователем, применяем автоматически
  if (!buttonColorOverride && savedHeaderColor) {
    const buttonColor = adjustBrightness(savedHeaderColor, 0.75);
    setButtonColorNoSave(buttonColor);
  }
}

// --- Основная логика при загрузке ---
document.addEventListener("DOMContentLoaded", function () {
  const savedTheme = localStorage.getItem('theme') || 'light';
  const savedHeaderColor = localStorage.getItem('headerColor');
  const savedButtonColor = localStorage.getItem('buttonColor');
  const savedAccent = localStorage.getItem('accent') || 'green';

  if (savedTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    const toggleBtn = document.getElementById('themeToggle');
    if (toggleBtn) {
      toggleBtn.textContent = '☀️ Дневная тема';
    }
    const toggleBtnModal = document.getElementById('themeToggleInModal');
    if (toggleBtnModal) {
      toggleBtnModal.textContent = '☀️ Дневная тема';
    }
  }

  // Применяем акцент
  document.body.setAttribute('data-accent', savedAccent);

  applySavedColors();

  const toggleBtn = document.getElementById('themeToggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleTheme);
  }

  const toggleBtnModal = document.getElementById('themeToggleInModal');
  if (toggleBtnModal) {
    toggleBtnModal.addEventListener('click', toggleTheme);
  }

  // --- Логика для меню акцента ---
  const accentToggle = document.getElementById('accentToggle');
  const accentMenu = document.getElementById('accentMenu');

  if (accentToggle) {
    accentToggle.addEventListener('click', () => {
      accentMenu.style.display = accentMenu.style.display === 'flex' ? 'none' : 'flex';
    });
  }

  document.querySelectorAll('#accentMenu button').forEach(btn => {
    btn.addEventListener('click', () => {
      const accent = btn.getAttribute('data-accent');
      document.body.setAttribute('data-accent', accent);
      localStorage.setItem('accent', accent);
      accentMenu.style.display = 'none';
    });
  });

  // --- Логика для меню цвета шапки ---
  const headerColorBtn = document.getElementById('headerColorBtn');
  const headerColorMenu = document.getElementById('headerColorMenu');

  if (headerColorBtn) {
    headerColorBtn.addEventListener('click', () => {
      headerColorMenu.style.display = headerColorMenu.style.display === 'flex' ? 'none' : 'flex';
    });
  }

  document.querySelectorAll('#headerColorMenu button').forEach(btn => {
    btn.addEventListener('click', () => {
      const color = btn.getAttribute('data-color');
      setHeaderColor(color);
      headerColorMenu.style.display = 'none';
    });
  });

  // --- Логика для меню цвета текста ---
  const textColorBtn = document.getElementById('textColorBtn');
  const textColorMenu = document.getElementById('textColorMenu');

  if (textColorBtn) {
    textColorBtn.addEventListener('click', () => {
      textColorMenu.style.display = textColorMenu.style.display === 'flex' ? 'none' : 'flex';
    });
  }

  document.querySelectorAll('#textColorMenu button').forEach(btn => {
    btn.addEventListener('click', () => {
      const color = btn.getAttribute('data-color');
      document.documentElement.style.setProperty('--text-color', color);
      localStorage.setItem('textColor', color);
      textColorMenu.style.display = 'none';
    });
  });

  // --- Логика для меню цвета кнопок ---
  const buttonColorBtn = document.getElementById('buttonColorBtn');
  const buttonColorMenu = document.getElementById('buttonColorMenu');

  if (buttonColorBtn) {
    buttonColorBtn.addEventListener('click', () => {
      buttonColorMenu.style.display = buttonColorMenu.style.display === 'flex' ? 'none' : 'flex';
    });
  }

  document.querySelectorAll('#buttonColorMenu button').forEach(btn => {
    btn.addEventListener('click', () => {
      const color = btn.getAttribute('data-color');
      setButtonColor(color);
      buttonColorMenu.style.display = 'none';
    });
  });

  // --- Логика для окна настроек ---
  const settingsBtn = document.getElementById('settingsBtn');
  const settingsModal = document.getElementById('settingsModal');
  const closeSettingsBtn = document.getElementById('closeSettingsBtn');

  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
      settingsModal.style.display = 'flex';
    });
  }

  if (closeSettingsBtn) {
    closeSettingsBtn.addEventListener('click', () => {
      settingsModal.style.display = 'none';
    });
  }

  // Закрытие окна при клике вне его
  window.addEventListener('click', (e) => {
    if (e.target === settingsModal) {
      settingsModal.style.display = 'none';
    }
  });

  // Обработчики для кнопок в окне настроек
  document.querySelectorAll('.settings-color-grid button[data-accent]').forEach(btn => {
    btn.addEventListener('click', () => {
      const accent = btn.getAttribute('data-accent');
      document.body.setAttribute('data-accent', accent);
      localStorage.setItem('accent', accent);
    });
  });

  document.querySelectorAll('.settings-color-grid button[data-color-header]').forEach(btn => {
    btn.addEventListener('click', () => {
      const color = btn.getAttribute('data-color-header');
      setHeaderColor(color);
    });
  });

  document.querySelectorAll('.settings-color-grid button[data-color-button]').forEach(btn => {
    btn.addEventListener('click', () => {
      const color = btn.getAttribute('data-color-button');
      setButtonColor(color);
    });
  });

  document.querySelectorAll('.settings-color-grid button[data-color-text]').forEach(btn => {
    btn.addEventListener('click', () => {
      const color = btn.getAttribute('data-color-text');
      document.documentElement.style.setProperty('--text-color', color);
      localStorage.setItem('textColor', color);
    });
  });

  // Кнопка сброса настроек
  const resetBtn = document.getElementById('resetSettingsBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      localStorage.clear();
      location.reload();
    });
  }

  // --- Логика для окна помощи ---
  const helpBtn = document.getElementById('helpBtn');
  const helpModal = document.getElementById('helpModal');
  const closeHelpBtn = document.getElementById('closeHelpBtn');

  if (helpBtn) {
    helpBtn.addEventListener('click', () => {
      helpModal.style.display = 'flex';
    });
  }

  if (closeHelpBtn) {
    closeHelpBtn.addEventListener('click', () => {
      helpModal.style.display = 'none';
    });
  }

  // Закрытие окна при клике вне его
  window.addEventListener('click', (e) => {
    if (e.target === helpModal) {
      helpModal.style.display = 'none';
    }
  });

  // --- Закрытие меню при клике вне его (для старых кнопок) ---
  document.addEventListener('click', (e) => {
    if (headerColorBtn && !headerColorBtn.contains(e.target) && !headerColorMenu.contains(e.target)) {
      headerColorMenu.style.display = 'none';
    }
    if (textColorBtn && !textColorBtn.contains(e.target) && !textColorMenu.contains(e.target)) {
      textColorMenu.style.display = 'none';
    }
    if (buttonColorBtn && !buttonColorBtn.contains(e.target) && !buttonColorMenu.contains(e.target)) {
      buttonColorMenu.style.display = 'none';
    }
    if (accentToggle && !accentToggle.contains(e.target) && !accentMenu.contains(e.target)) {
      accentMenu.style.display = 'none';
    }
  });
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



// --- Логика для окна помощи ---
const helpBtn = document.getElementById('helpBtn');
const helpModal = document.getElementById('helpModal');
const closeHelpBtn = document.getElementById('closeHelpBtn');

if (helpBtn) {
  helpBtn.addEventListener('click', () => {
    helpModal.style.display = 'flex';
  });
}

if (closeHelpBtn) {
  closeHelpBtn.addEventListener('click', () => {
    helpModal.style.display = 'none';
  });
}

// Закрытие окна при клике вне его
window.addEventListener('click', (e) => {
  if (e.target === helpModal) {
    helpModal.style.display = 'none';
  }
});

// --- Логика чата с нейросетью ---

document.addEventListener("DOMContentLoaded", function () {
  const chatModal = document.getElementById("chatModal");
  const openChatBtn = document.getElementById("openChatBtn");
  const closeChatBtn = document.getElementById("closeChatBtn");
  const clearChatBtn = document.getElementById("clearChatBtn"); // Новая кнопка
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

  // Очистка чата
  clearChatBtn.onclick = () => {
    chatMessages.innerHTML = '<div class="message bot-message">Чат очищен. Задай мне новый вопрос!</div>';
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

  // --- Проверка на контекст ---
  const lastQuestion = conversationHistory.length > 1 ? conversationHistory[conversationHistory.length - 2].text.toLowerCase() : "";

  // --- Ответы на общие фразы ---
  if (lowerQuestion.includes("привет") || lowerQuestion.includes("здравствуй")) {
    return "Привет! Я — PompuwkaAI, твой школьный помощник. Могу ответить на любой вопрос по предметам, подсказать правило, дать совет или просто поболтать. Спрашивай!";
  }
  if (lowerQuestion.includes("как дела")) {
    return "У меня всё отлично! А у тебя? Чем могу помочь?";
  }
  if (lowerQuestion.includes("спасибо") || lowerQuestion.includes("благодарю")) {
    return "Пожалуйста! Рад был помочь. Можешь задать ещё вопрос, если что-то непонятно.";
  }
  if (lowerQuestion.includes("пока") || lowerQuestion.includes("до свидания")) {
    return "Пока! Приходи, когда понадобится помощь. Удачи в учёбе!";
  }
  if (lowerQuestion.includes("кто ты") || lowerQuestion.includes("что ты")) {
    return "Я — PompuwkaAI, встроенный в школьный справочник Pompushkashcool. Я помогаю отвечать на вопросы по школьным предметам, могу подсказать, где найти нужное правило, и даже немного поболтать. Главное — учиться!";
  }
  if (lowerQuestion.includes("помощь") || lowerQuestion.includes("помоги")) {
    return "Я могу ответить на вопросы по школьным предметам, подсказать правило, дать совет по учёбе, мотивировать или просто поболтать. Спрашивай всё, что хочешь!";
  }
  if (lowerQuestion.includes("делать") || lowerQuestion.includes("что")) {
    return "Ты можешь задавать мне любые вопросы, искать правила по школьным предметам, использовать навигацию по разделам. Главное — учиться!";
  }

  // --- Проверяем, связан ли вопрос с каким-либо школьным предметом ---
  const subjectKeywords = {
    "русский": ["русский", "язык", "морфем", "пунктуац", "орфограф", "фонетик", "литератур", "правописан", "слово", "предлож", "сочинен", "стиль", "эпитет", "метафор", "фразеологизм"],
    "математика": ["математик", "алгебр", "геометр", "уравнени", "теорем", "функци", "производн", "интеграл", "тригонометр", "вероятност", "логарифм", "вектор", "площад", "объём", "предел", "производная", "интеграл", "бином"],
    "английский": ["английск", "язык", "время", "глагол", "артикль", "предлог", "местоимен", "фразовый", "условный", "косвенная", "модальный", "герундий", "инфинитив", "артикл", "пассив", "относительн"],
    "история": ["истор", "война", "революци", "импери", "царь", "средневеков", "древн", "советск", "наци", "фашизм", "просвещен", "наполеон", "феодализм", "монарх", "республик", "империя", "колони", "континент"],
    "биология": ["биолог", "клетк", "генетик", "эволюци", "фотосинтез", "экосистем", "организм", "вирус", "растени", "животное", "система", "гомеостаз", "наследственность", "митоз", "мейоз", "экология", "биоценоз"],
    "химия": ["хим", "атом", "реакци", "кислот", "основани", "раствор", "периодич", "органич", "неорганич", "валентност", "связ", "окисл", "восстановлен", "равновес", "электролиз", "алкан", "алкен", "изомер"],
    "физика": ["физик", "сила", "энерги", "движени", "закон", "тяготени", "свет", "звук", "электрич", "магнетизм", "оптик", "термодинамик", "квантов", "относительн", "импульс", "давление", "волны", "тепло"],
    "литература": ["литератур", "поэт", "роман", "стихотворен", "жанр", "стиль", "анализ", "персонаж", "сравнен", "эпитет", "метафор", "символизм", "реализм", "романтизм", "фольклор", "лирика", "эпос", "драма"],
    "география": ["географ", "стран", "столиц", "рельеф", "климат", "океан", "материк", "рек", "озер", "пояс", "погод", "населен", "урбанизац", "ресурс", "почв", "природн", "зона", "платформ", "складчатость"],
    "информатика": ["информатик", "алгоритм", "программ", "систем", "двоичн", "сеть", "база", "безопасност", "искусствен", "интеллект", "язык", "данных", "логик", "цифров", "архитектур", "код", "шифрован", "облак", "объект", "перемен"]
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

  // --- Ответы на вопросы по учёбе ---
  if (lowerQuestion.includes("учиться") || lowerQuestion.includes("школа") || lowerQuestion.includes("уроки")) {
    return "Учиться — это как собирать пазл: каждый день ты складываешь по кусочку. Главное — не сдаваться! Попробуй разбить большие темы на маленькие, чередуй учёбу с отдыхом и не забывай про правильное питание и сон. Я могу помочь с правилами — просто спроси!";
  }
  if (lowerQuestion.includes("мотивация") || lowerQuestion.includes("хочу бросить")) {
    return "Иногда хочется всё бросить — это нормально. Но знай: даже самые великие учёные и писатели проходили через трудности. Попробуй вспомнить, зачем ты начал(а) учиться. А я всегда рядом, чтобы поддержать или подсказать!";
  }
  if (lowerQuestion.includes("как сдать") || lowerQuestion.includes("экзамен") || lowerQuestion.includes("олимпиада")) {
    return "Для подготовки к экзамену: повторяй каждый день, решай задачи, читай правила и не бойся задавать вопросы. Я могу подсказать, где найти нужную тему. Удачи — ты справишься!";
  }

  // --- Ответы на несвязанные с учебой вопросы ---
  if (lowerQuestion.includes("погода") || lowerQuestion.includes("время")) {
    return "Я не могу узнать погоду или время. Но могу рассказать, как устроено атмосферное давление в физике или климат в географии!";
  }
  if (lowerQuestion.includes("фильм") || lowerQuestion.includes("кино")) {
    return "Фильмы — это здорово! Но я лучше могу помочь с литературой. Например, могу рассказать о сюжете «Войны и мира» или «Преступлении и наказании». Или даже про аллюзии в «Ночь живых мертвецов»!";
  }
  if (lowerQuestion.includes("спорт") || lowerQuestion.includes("футбол")) {
    return "Спорт — полезно! В биологии есть темы про опорно-двигательную систему, сердечно-сосудистую и дыхательную. Движение — это жизнь!";
  }
  if (lowerQuestion.includes("наука") || lowerQuestion.includes("учёный")) {
    return "Наука — это путь к пониманию мира. Я могу рассказать про законы физики, строение клетки, химические реакции или историю открытий. Интересно? Спрашивай!";
  }
  if (lowerQuestion.includes("юмор") || lowerQuestion.includes("шутка") || lowerQuestion.includes("смешно")) {
    return "Почему программисты путают Хэллоуин и Рождество? Потому что Oct 31 = Dec 25! (в восьмеричной системе)";
  }

  // --- Если ничего не подошло ---
  return "Интересный вопрос! Пока я не знаю точного ответа, но ты можешь воспользоваться поиском по справочнику выше или уточнить вопрос. Я всегда стараюсь учиться и становиться умнее!";
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
}});