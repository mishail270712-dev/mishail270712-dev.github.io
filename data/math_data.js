var mathRules = [
  {
    "id": "pythagorean_theorem",
    "title": "Теорема Пифагора",
    "subject": "math",
    "group": "geometry",
    "content": `
      <h3>Формула:</h3>
      <p>c² = a² + b²</p>
      <p>Где c — гипотенуза, a и b — катеты.</p>
      <h4>Пример:</h4>
      <p>Если a = 3, b = 4, то c = √(3² + 4²) = √(9 + 16) = √25 = 5.</p>
    `
  },
  {
    "id": "quadratic_equation",
    "title": "Квадратное уравнение",
    "subject": "math",
    "group": "algebra",
    "content": `
      <h3>Формула:</h3>
      <p>ax² + bx + c = 0</p>
      <p>D = b² - 4ac</p>
      <p>x = (-b ± √D) / 2a</p>
      <h4>Пример:</h4>
      <p>2x² + 5x + 3 = 0 → D = 25 - 24 = 1 → x₁ = -1, x₂ = -1.5</p>
    `
  },
  {
    "id": "derivative",
    "title": "Производная функции",
    "subject": "math",
    "group": "calculus",
    "content": `
      <h3>Что такое производная?</h3>
      <p>Производная функции показывает скорость изменения функции в данной точке.</p>
      <h4>Пример:</h4>
      <p>f(x) = x² → f'(x) = 2x</p>
    `
  },
  {
    "id": "trigonometry_basics",
    "title": "Основы тригонометрии",
    "subject": "math",
    "group": "trigonometry",
    "content": `
      <h3>Синус, косинус, тангенс</h3>
      <p>sin α = противолежащий катет / гипотенуза</p>
      <p>cos α = прилежащий катет / гипотенуза</p>
      <p>tan α = sin α / cos α</p>
    `
  },
  {
    "id": "probability",
    "title": "Теория вероятностей",
    "subject": "math",
    "group": "statistics",
    "content": `
      <h3>Формула вероятности</h3>
      <p>P(A) = количество благоприятных исходов / общее количество исходов</p>
      <h4>Пример:</h4>
      <p>Вероятность выпадения 3 на кубике: 1/6</p>
    `
  },
  {
    "id": "linear_equations",
    "title": "Линейные уравнения",
    "subject": "math",
    "group": "algebra",
    "content": `
      <h3>Форма:</h3>
      <p>ax + b = 0</p>
      <h4>Решение:</h4>
      <p>x = -b / a</p>
    `
  },
  {
    "id": "functions",
    "title": "Функции и их свойства",
    "subject": "math",
    "group": "algebra",
    "content": `
      <h3>Что такое функция?</h3>
      <p>Правило, по которому каждому значению x ставится в соответствие y.</p>
      <h4>Пример:</h4>
      <p>y = 2x + 3</p>
    `
  },
  {
    "id": "inequalities",
    "title": "Неравенства",
    "subject": "math",
    "group": "algebra",
    "content": `
      <h3>Виды:</h3>
      <ul>
        <li>Линейные: ax + b > 0</li>
        <li>Квадратные: ax² + bx + c < 0</li>
      </ul>
    `
  },
  {
    "id": "logarithms",
    "title": "Логарифмы",
    "subject": "math",
    "group": "algebra",
    "content": `
      <h3>Определение:</h3>
      <p>log_a(b) = c → a^c = b</p>
      <h4>Пример:</h4>
      <p>log₂(8) = 3</p>
    `
  },
  {
    "id": "vectors",
    "title": "Векторы",
    "subject": "math",
    "group": "geometry",
    "content": `
      <h3>Что такое вектор?</h3>
      <p>Направленный отрезок, обозначается AB или a⃗.</p>
      <h4>Операции:</h4>
      <ul>
        <li>Сложение</li>
        <li>Умножение на число</li>
        <li>Скалярное произведение</li>
      </ul>
    `
  },
  {
    "id": "area_formulas",
    "title": "Формулы площадей фигур",
    "subject": "math",
    "group": "geometry",
    "content": `
      <h3>Прямоугольник:</h3>
      <p>S = a * b</p>
      <h3>Треугольник:</h3>
      <p>S = 1/2 * основание * высота</p>
      <h3>Круг:</h3>
      <p>S = π * r²</p>
    `
  },
  {
    "id": "volume_formulas",
    "title": "Формулы объёмов тел",
    "subject": "math",
    "group": "geometry",
    "content": `
      <h3>Параллелепипед:</h3>
      <p>V = a * b * c</p>
      <h3>Шар:</h3>
      <p>V = 4/3 * π * r³</p>
      <h3>Цилиндр:</h3>
      <p>V = π * r² * h</p>
    `
  },
  {
    "id": "progressions",
    "title": "Прогрессии",
    "subject": "math",
    "group": "sequences",
    "content": `
      <h3>Арифметическая:</h3>
      <p>aₙ = a₁ + d(n-1)</p>
      <h3>Геометрическая:</h3>
      <p>bₙ = b₁ * q^(n-1)</p>
    `
  },
  {
    "id": "sets",
    "title": "Множества",
    "subject": "math",
    "group": "logic",
    "content": `
      <h3>Обозначения:</h3>
      <ul>
        <li>∈ — принадлежит</li>
        <li>∪ — объединение</li>
        <li>∩ — пересечение</li>
        <li>∅ — пустое множество</li>
      </ul>
    `
  },
  {
    "id": "coordinates",
    "title": "Метод координат",
    "subject": "math",
    "group": "geometry",
    "content": `
      <h3>Точка на плоскости:</h3>
      <p>(x, y)</p>
      <h3>Расстояние между точками:</h3>
      <p>d = √[(x₂ - x₁)² + (y₂ - y₁)²]</p>
    `
  },
  {
    "id": "limits",
    "title": "Пределы",
    "subject": "math",
    "group": "calculus",
    "content": `
      <h3>Что такое предел?</h3>
      <p>Значение, к которому стремится функция при приближении аргумента.</p>
      <h4>Пример:</h4>
      <p>lim(x→2) (x² - 4)/(x - 2) = 4</p>
    `
  },
  {
    "id": "integrals",
    "title": "Интегралы",
    "subject": "math",
    "group": "calculus",
    "content": `
      <h3>Что такое интеграл?</h3>
      <p>Обратная операция к производной. Площадь под графиком.</p>
      <h4>Пример:</h4>
      <p>∫x dx = x²/2 + C</p>
    `
  },
  {
    "id": "complex_numbers",
    "title": "Комплексные числа",
    "subject": "math",
    "group": "algebra",
    "content": `
      <h3>Что такое?</h3>
      <p>Числа вида a + bi, где i² = -1.</p>
      <h4>Пример:</h4>
      <p>z = 3 + 4i</p>
    `
  },
  {
    "id": "matrices",
    "title": "Матрицы",
    "subject": "math",
    "group": "algebra",
    "content": `
      <h3>Что такое матрица?</h3>
      <p>Таблица чисел, над которой можно выполнять операции.</p>
      <h4>Пример:</h4>
      <p>A = [[1, 2], [3, 4]]</p>
    `
  },
  {
    "id": "binomial_theorem",
    "title": "Бином Ньютона",
    "subject": "math",
    "group": "algebra",
    "content": `
      <h3>Формула:</h3>
      <p>(a + b)ⁿ = Σ(k=0 to n) C(n,k) * aⁿ⁻ᵏ * bᵏ</p>
      <h4>Пример:</h4>
      <p>(a + b)² = a² + 2ab + b²</p>
    `
  }
];