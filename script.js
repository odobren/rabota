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
    var endpointUrl;

    // Определяем URL в зависимости от того, какая кнопка была нажата
    if (e.target.id === 'startDayBtn') {
      endpointUrl = 'https://script.google.com/macros/s/AKfycbwqx3CH75w1dG1KWif0b9EnrIwKb8Mwlb_GbVn5rnshofcAF-WqxKVcgBJ9haGgbkOE/exec';
    } else if (e.target.id === 'endDayBtn') {
      endpointUrl = 'https://script.google.com/macros/s/AKfycbxpx5CH76w1dG2KWjf0c9FnsIwKb8Mwlb_HbVn5rnshiicAF-XqxEVcgCJ9haGgbkOE/exec';
    }

    // Сохраняем имя в локальном хранилище
    localStorage.setItem('employeeName', employeeName);

    // Показываем анимацию загрузки
    document.getElementById('startDayBtn').style.display = 'none';
    document.getElementById('endDayBtn').style.display = 'none';
    document.getElementById('loader').style.display = 'block';

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
      // По окончании запроса скрываем анимацию загрузки и показываем кнопку
      document.getElementById('loader').style.display = 'none';
      document.getElementById('startDayBtn').style.display = 'block';
      document.getElementById('endDayBtn').style.display = 'block';
    });
  });
});
