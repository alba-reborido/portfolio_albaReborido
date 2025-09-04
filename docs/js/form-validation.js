function initFormValidation() {
  markTouched();
  const form = document.querySelector('.contact-form');

  form.addEventListener('submit', function (e) {
    clearErrors();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    let valid = true;

    if (name.value.trim() === '') {
      showError('name', i18n.contactNameError);
      valid = false;
    }

    if (email.value.trim() === '') {
      showError('email', i18n.contactEmailErrorEmpty);
      valid = false;
    } else if (!validateEmail(email.value)) {
      showError('email', i18n.contactEmailErrorInvalid);
      valid = false;
    }

    if (message.value.trim() === '') {
      showError('message', i18n.contactMessageError);
      valid = false;
    }

    if (!valid) {
      e.preventDefault();
    }
  });

  function showError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const errorDiv = document.getElementById(`${fieldId}-error`);

    // Solo mostrar si el campo se ha tocado o el formulario se está enviando
    if (input.classList.contains('touched')) {
      errorDiv.textContent = message;
      errorDiv.classList.add('show');
    }
  }

  function markTouched() {
    ['name', 'email', 'message'].forEach(id => {
      const input = document.getElementById(id);
      input.addEventListener('blur', () => {
        input.classList.add('touched');
      });
    });
  }

  function clearErrors() {
    document.querySelectorAll('.error-message').forEach(div => {
      div.textContent = '';
      div.classList.remove('show');
    });
  }

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}
