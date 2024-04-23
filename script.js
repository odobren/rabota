document.addEventListener('DOMContentLoaded', function() {
  // Загружаем данные из локального хранилища, если они есть
  var savedName = localStorage.getItem('employeeName');
  if (savedName) {
    document.getElementById('name').value = savedName;
  }

  document.getElementById('employeeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var employeeName = formData.get('name');

    // Сохраняем имя в локальном хранилище
    localStorage.setItem('employeeName', employeeName);

    // Определяем, какая кнопка была нажата
    var buttonId = e.submitter.id;

    // Показываем анимацию загрузки
    document.getElementById(buttonId).style.display = 'none';
    document.getElementById('loader').style.display = 'block';

    // Определяем URL в зависимости от того, какая кнопка была нажата
    var url = '';
    if (buttonId === 'startDayBtn') {
      url = 'https://odobren.github.io/rabota/ura';
    } else if (buttonId === 'endDayBtn') {
      url = 'https://odobren.github.io/rabota/poka';
    }

    formData.append(buttonId, 'true'); // Добавляем параметр для определения нажатой кнопки

    fetch('https://script.google.com/macros/s/AKfycbwqx3CH75w1dG1KWif0b9EnrIwKb8Mwlb_GbVn5rnshofcAF-WqxKVcgBJ9haGgbkOE/exec', {
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
      window.location.href = url;
    })
    .catch(error => {
      console.error('Произошла ошибка:', error);
    })
    .finally(() => {
      // По окончании запроса скрываем анимацию загрузки и показываем кнопку
      document.getElementById('loader').style.display = 'none';
      document.getElementById(buttonId).style.display = 'block';
    });
  });
});
