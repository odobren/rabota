// suggestions.js

// Функция для управления подсказками
function manageSuggestions() {
  var inputField = document.getElementById('name');

  // Слушаем ввод пользователя
  inputField.addEventListener('input', function() {
    var inputText = this.value.toLowerCase();
    var suggestionsContainer = document.getElementById('suggestions');
    suggestionsContainer.innerHTML = ''; // Очищаем контейнер подсказок

    // Подсказки
    var suggestions = ['Гульмира', 'Куаныш', 'Максим'];

    // Фильтруем подсказки на основе введенного текста
    var filteredSuggestions = suggestions.filter(function(suggestion) {
      return suggestion.toLowerCase().startsWith(inputText);
    });

    // Создаем кнопки для каждой подходящей подсказки
    filteredSuggestions.forEach(function(suggestion) {
      var button = document.createElement('button');
      button.textContent = suggestion;
      button.addEventListener('click', function() {
        inputField.value = suggestion; // Заполняем поле ввода выбранной подсказкой
        suggestionsContainer.innerHTML = ''; // Очищаем контейнер подсказок после выбора
      });
      suggestionsContainer.appendChild(button);
    });
  });
}

// Экспортируем функцию для использования в других файлах
export { manageSuggestions };
