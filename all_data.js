// all_data.js
let rulesData = [];

// Импорты (в реальных условиях это могут быть ES6 модули, но в браузере используем <script>)
// Эти переменные объявлены в соответствующих data/*.js файлах

// Заглушка для работы в браузере: объявляем пустые массивы
if (typeof russianRules === 'undefined') var russianRules = [];
if (typeof mathRules === 'undefined') var mathRules = [];
if (typeof englishRules === 'undefined') var englishRules = [];
if (typeof historyRules === 'undefined') var historyRules = [];
if (typeof biologyRules === 'undefined') var biologyRules = [];
if (typeof chemistryRules === 'undefined') var chemistryRules = [];
if (typeof physicsRules === 'undefined') var physicsRules = [];
if (typeof literatureRules === 'undefined') var literatureRules = [];
if (typeof geographyRules === 'undefined') var geographyRules = [];
if (typeof informaticsRules === 'undefined') var informaticsRules = [];


rulesData = [
  ...russianRules,
  ...mathRules,
  ...englishRules,
  ...historyRules,
  ...biologyRules,
  ...chemistryRules,
  ...physicsRules,
  ...literatureRules,
  ...geographyRules,
  ...informaticsRules
];