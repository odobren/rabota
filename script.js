document.addEventListener('DOMContentLoaded', function() {
  var employeeForm = document.getElementById('employeeForm');
  var loader = document.getElementById('loader');

  employeeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var employeeName = formData.get('name');
    var action = e.target.querySelector('.action-btn:focus').getAttribute('data-action');

    localStorage.setItem('employeeName', employeeName);

    var url = '';
    if (action === 'start') {
      url = 'https://odobren.github.io/rabota/ura';
    } else if (action === 'end') {
      url = 'https://odobren.github.io/rabota/poka';
    }

    showLoader();
    sendDataToGoogleSheets(formData)
      .then(() => {
        redirectUser(url);
      })
      .catch(error => {
        console.error('Произошла ошибка:', error);
      })
      .finally(() => {
        hideLoader();
      });
  });

  function sendDataToGoogleSheets(formData) {
    return fetch('https://script.google.com/macros/s/AKfycbwqx3CH75w1dG1KWif0b9EnrIwKb8Mwlb_GbVn5rnshofcAF-WqxKVcgBJ9haGgbkOE/exec', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    });
  }

  function redirectUser(url) {
    window.location.href = url;
  }

  function showLoader() {
    loader.style.display = 'block';
  }

  function hideLoader() {
    loader.style.display = 'none';
  }
});
