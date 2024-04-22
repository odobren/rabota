

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
