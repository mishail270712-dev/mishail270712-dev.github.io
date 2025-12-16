// script.js

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

  // --- Имитация ответа нейросети ---
  function generateReply(question) {
    question = question.toLowerCase();

    // Простой анализ вопроса и генерация ответа
    if (question.includes("привет") || question.includes("здравствуй")) {
      return "Привет! Чем могу помочь?";
    }
    if (question.includes("как дела")) {
      return "У меня всё отлично! А у тебя?";
    }
    if (question.includes("русский") || question.includes("язык")) {
      return "Русский язык — это богатый и сложный язык. Могу рассказать о правилах, морфемах, пунктуации и многом другом!";
    }
    if (question.includes("математик")) {
      return "Математика — царица наук! Готов помочь с алгеброй, геометрией, тригонометрией и другими разделами.";
    }
    if (question.includes("английский")) {
      return "Английский язык важен для международного общения. Готов помочь с временами, грамматикой и лексикой.";
    }
    if (question.includes("физик")) {
      return "Физика изучает законы природы. Ньютон, электричество, термодинамика — всё это здесь!";
    }
    if (question.includes("биолог")) {
      return "Биология — наука о жизни. Расскажу о клетках, организмах, экосистемах и эволюции.";
    }
    if (question.includes("истори")) {
      return "История учит нас прошлому. От древних цивилизаций до Второй мировой войны — задай любой вопрос!";
    }
    if (question.includes("географи")) {
      return "География помогает понять мир. Страны, климат, рельеф — всё под контролем!";
    }
    if (question.includes("хими")) {
      return "Химия — это наука о веществах. Готов помочь с реакциями, таблицей Менделеева и формулами.";
    }
    if (question.includes("информатик")) {
      return "Информатика — основа современного мира. Алгоритмы, системы счисления, сети — всё здесь!";
    }
    if (question.includes("литератур")) {
      return "Литература — это мир чувств и идей. Готов обсудить классику и современность.";
    }
    if (question.includes("помощь") || question.includes("помоги")) {
      return "Я могу ответить на вопросы по школьным предметам. Задай любой вопрос, и я постараюсь помочь!";
    }
    if (question.includes("спасибо")) {
      return "Пожалуйста! Рад был помочь. Можешь задать ещё вопрос!";
    }

    return "Я пока не знаю точного ответа на этот вопрос, но ты можешь воспользоваться поиском по справочнику выше.";
  }
});