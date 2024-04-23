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

    // Показываем анимацию загрузки
    document.getElementById('startDayBtn').style.display = 'none';
    document.getElementById('endDayBtn').style.display = 'none';
    document.getElementById('loader').style.display = 'block';

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
      // Перенаправляем пользователя на указанную страницу в зависимости от нажатой кнопки
      if (document.getElementById('startDayBtn').style.display === 'none') {
        window.location.href = 'https://odobren.github.io/rabota/ura';
      } else {
        window.location.href = 'https://odobren.github.io/rabota/poka';
      }
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

  // Добавляем обработчик для кнопки "Завершить день"
  document.getElementById('endDayBtn').addEventListener('click', function() {
    // При клике на кнопку "Завершить день" происходит отправка формы с пустыми данными
    document.getElementById('employeeForm').submit();
  });
});
