document.addEventListener('DOMContentLoaded', function() {

  var employeeForm = document.getElementById('employeeForm');
  var startDayBtn = document.getElementById('startDayBtn');
  var endDayBtn = document.getElementById('endDayBtn');
  var loader = document.getElementById('loader');

  // Загружаем данные из локального хранилища, если они есть
  var savedName = localStorage.getItem('employeeName');
  if (savedName) {
    document.getElementById('name').value = savedName;
  }

  function submitForm(endpointUrl) {
    var formData = new FormData(employeeForm);
    var employeeName = formData.get('name');

    // Сохраняем имя в локальном хранилище
    localStorage.setItem('employeeName', employeeName);

    // Показываем анимацию загрузки
    startDayBtn.disabled = true;
    endDayBtn.disabled = true;
    loader.style.display = 'block';

    fetch(endpointUrl, {
        method: 'POST',
        body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      // Перенаправляем пользователя на указанную страницу
      window.location.href = 'https://odobren.github.io/rabota/ura';
    })
    .catch(error => {
      console.error('Произошла ошибка:', error);
    })
    .finally(() => {
      // По окончании запроса скрываем анимацию загрузки и включаем кнопки
      loader.style.display = 'none';
      startDayBtn.disabled = false;
      endDayBtn.disabled = false;
    });
  }

  // Обработчик события для кнопки "Начать день"
  startDayBtn.addEventListener('click', function() {
    submitForm('https://script.google.com/macros/s/AKfycbwqx3CH75w1dG1KWif0b9EnrIwKb8Mwlb_GbVn5rnshofcAF-WqxKVcgBJ9haGgbkOE/exec');
  });

  // Обработчик события для кнопки "Завершить день"
  endDayBtn.addEventListener('click', function() {
    submitForm('https://script.google.com/macros/s/AKfycbwqx3CH75w1dG1KWif0b9EnrIwKb8Mwlb_GbVn5rnshofcAF-WqxKVcgBJ9haGgbkOE/exec');
  });

});
