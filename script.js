$(document).ready(function() {
  // Разрешенный IP-адрес
  var allowedIP = '178.129.244.145';

  // Функция для получения IP-адреса пользователя
  function getUserIP(callback) {
    $.getJSON('https://api.ipify.org?format=json', function(data) {
      callback(data.ip);
    });
  }

  // Проверяем IP-адрес пользователя и перенаправляем, если не разрешен
  getUserIP(function(userIP) {
    if (userIP !== allowedIP) {
      window.location.href = 'https://test13423424.glitch.me/zapret.html'; // Замените на вашу страницу отказа в доступе
    }
  });

  $('#employeeForm').submit(function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    
    // Показываем анимацию загрузки
    $('#startDayBtn').hide();
    $('#loader').show();

    $.ajax({
      url: 'https://script.google.com/macros/s/AKfycbwwcrSFowRKfBVfw4gFi-dW_yQILxJgh97nq0wQLE257CJ4hUS2d9J_1MwEEy1IDp1dtg/exec',
      type: 'POST',
      data: formData,
      success: function(response) {
        // Перенаправляем пользователя на указанную страницу
        window.location.href = 'https://test13423424.glitch.me/ura.html';
      },
      error: function(xhr, status, error) {
        console.error('Произошла ошибка:', error);
      },
      complete: function() {
        // По окончании запроса скрываем анимацию загрузки и показываем кнопку
        $('#loader').hide();
        $('#startDayBtn').show();
      }
    });
  });
});
