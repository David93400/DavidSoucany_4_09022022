function editNav() {
  var x = document.getElementById('myTopnav');
  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}

// DOM Elements

const modalBackground = document.getElementById('modal-bg');
const modalWindow = document.getElementById('modal-window');

const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.modal-btn');
const formRadio = document.querySelector('.formRadio');
const CGUForm = document.getElementById('checkboxCGU');
const modalClose = document.querySelector('.close-modal-btn');
const submit = document.querySelector('.btn-submit');
const spanError = document.querySelectorAll('.error');
const inputField = document.querySelectorAll('input');
const cguLabel = document.querySelector('#checkboxCGU');

const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const email = document.getElementById('email');
const birthday = document.getElementById('birthdate');
const quantityCity = document.getElementById('quantity');
const form = document.getElementById('form');
const validation = document.getElementById('validation');

const firstNameError = document.querySelector('#errorFirst');
const lastNameError = document.querySelector('#errorLast');
const mailError = document.querySelector('#errorMail');
const birthdayError = document.querySelector('#errorBirthday');
const quantityCityError = document.querySelector('#errorQuantityCity');
const locationError = document.querySelector('#errorLocation');
const CGUError = document.querySelector('#errorCGU');

// Regex

const regexName = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
const regexDate = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
const regexNumber = /^([0-9]|[1-9][0-9])$/;

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// launch modal function
function launchModal() {
  modalbg.style.display = 'block';
}

// Close modal event
modalClose.addEventListener('click', closeModal);

// close modal function
function closeModal() {
  inputField.forEach(function (input) {
    input.classList.remove('valid', 'invalid');
  });
  spanError.forEach(function (span) {
    span.classList.add('success');
  });
  CGU = false;
  document.getElementById('form').reset();
  modalbg.style.display = 'none';
  form.classList.remove('success');
  validation.classList.add('success');
}

// Close modal when clicking outside modal window
modalWindow.onclick = (e) => e.stopPropagation();
modalBackground.onclick = closeModal;

const displaySuccess = (field, fieldError) => {
  fieldError.classList.add('success');
  field.classList.add('valid');
  field.classList.remove('invalid');
};

const displayError = (field, fieldError) => {
  fieldError.classList.remove('success');
  field.classList.add('invalid');
  field.classList.remove('valid');
};

const validateField = (regex, field, fieldError, long = 0) => {
  if (regex.test(field.value) && field.value.length >= long) {
    displaySuccess(field, fieldError);
    return true;
  }
  displayError(field, fieldError);
  return false;
};

const validateRadio = (fieldError) => {
  const checkedRadio = document.querySelector("input[name='location']:checked");
  checkedRadio
    ? fieldError.classList.add('success')
    : fieldError.classList.remove('success');
  return checkedRadio;
};

let CGU = false;
cguLabel.addEventListener('click', function () {
  CGU = !CGU;
});

const validateCheckbox = (fieldError) => {
  CGU
    ? fieldError.classList.add('success')
    : fieldError.classList.remove('success');
  return CGU;
};

const getInputs = () => {
  const firstName = document.getElementById('first').value;
  const lastName = document.getElementById('last').value;
  const email = document.getElementById('email').value;
  const birthday = document.getElementById('birthdate').value;
  const quantityCity = document.getElementById('quantity').value;
  const radio = document.querySelector("input[name='location']:checked");
  const cgu = document.querySelector('#checkbox1').checked;
  return { firstName, lastName, email, birthday, quantityCity, radio, cgu };
};

const checkForm = (formInputs) => {
  const isValid = {};
  Object.entries(formInputs).map((input) => {
    const key = input[0];
    if (key === 'firstName')
      isValid[key] = validateField(regexName, firstName, firstNameError, 2);
    if (key === 'lastName')
      isValid[key] = validateField(regexName, lastName, lastNameError, 2);
    if (key === 'email')
      isValid[key] = validateField(regexMail, email, mailError);
    if (key === 'birthday')
      isValid[key] = validateField(regexDate, birthday, birthdayError);
    if (key === 'quantityCity')
      isValid[key] = validateField(
        regexNumber,
        quantityCity,
        quantityCityError
      );
    if (key === 'radio') isValid[key] = validateRadio(locationError);
    if (key === 'cgu') isValid[key] = validateCheckbox(CGUError);
  });
  const wrongInputs = Object.entries(isValid).filter(([key, value]) => !value);
  return !wrongInputs.length;
};

firstName.addEventListener('focusout', () =>
  validateField(regexName, firstName, firstNameError, 2)
);
lastName.addEventListener('focusout', () =>
  validateField(regexName, lastName, lastNameError, 2)
);
email.addEventListener('focusout', () =>
  validateField(regexMail, email, mailError)
);
birthday.addEventListener('focusout', () =>
  validateField(regexDate, birthday, birthdayError)
);
quantityCity.addEventListener('focusout', () =>
  validateField(regexNumber, quantityCity, quantityCityError)
);
formRadio.addEventListener('click', () => validateRadio(locationError));
submit.addEventListener('click', () => validateRadio(locationError));
CGUForm.addEventListener('click', () => validateCheckbox(CGUError));
submit.addEventListener('click', () => validateCheckbox(CGUError));

submit.addEventListener('click', function (e) {
  e.preventDefault();
  const inputs = getInputs();
  const formIsValid = checkForm(inputs);
  if (!formIsValid) {
    return false;
  }
  form.classList.add('success');
  validation.classList.remove('success');
});
