document.addEventListener('DOMContentLoaded', function() {
  // Разрешенный IP-адрес
  var allowedIP = '178.129.244.145';

  // Функция для получения IP-адреса пользователя
  function getUserIP(callback) {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        callback(data.ip);
      });
  }

  // Проверяем IP-адрес пользователя и перенаправляем, если не разрешен
  getUserIP(function(userIP) {
    if (userIP !== allowedIP) {
      window.location.href = 'https://test13423424.glitch.me/zapret.html'; // Замените на вашу страницу отказа в доступе
    }
  });

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
    document.getElementById('loader').style.display = 'block';

    fetch('https://script.google.com/macros/s/AKfycbwwcrSFowRKfBVfw4gFi-dW_yQILxJgh97nq0wQLE257CJ4hUS2d9J_1MwEEy1IDp1dtg/exec', {
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
    });
  });
});
