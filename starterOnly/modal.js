function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements

const modalBackground = document.getElementById('modal-bg');
const modalWindow = document.getElementById('modal-window');

const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formRadio = document.querySelector(".formRadio");
const CGUForm = document.getElementById('checkboxCGU');
const modalClose = document.querySelector(".close-modal-btn");
const submit = document.querySelector(".btn-submit");
const spanError = document.querySelectorAll('.error');
const inputField = document.querySelectorAll('input')
const cguLabel = document.querySelector('#checkboxCGU');

const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const email = document.getElementById('email');
const birthday = document.getElementById('birthdate');
const quantityCity = document.getElementById('quantity');
const form = document.getElementById('form');
const validation = document.getElementById('validation');

const prenomError = document.querySelector('#errorFirst');
const nomError = document.querySelector('#errorLast');
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
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Close modal event
modalClose.addEventListener("click", closeModal);


// launch modal function
function launchModal() {
  modalbg.style.display = "block";
  // setTimeout(resetValidation(spanError, 500))
}
// close modal function
function closeModal() {
  inputField.forEach(function (input) {
    input.classList.remove('valid','invalid');
  });
  spanError.forEach(function(span) {
    span.classList.add('success')
  })
  CGU = false
  document.getElementById('form').reset()
  modalbg.style.display = "none";
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
}

const displayError = (field, fieldError) => {
  fieldError.classList.remove('success');
  field.classList.add('invalid');
  field.classList.remove('valid');
};

const validateField = (regex, field, fieldError, long=0) => {
  
  if (regex.test(field.value) && field.value.length >= long) {
    displaySuccess(field, fieldError)
    return true
  } 
  displayError(field, fieldError)
  return false
}

const validateRadio = (fieldError) => {
  const checkedRadio = document.querySelector("input[name='location']:checked");
  if (checkedRadio) {
    fieldError.classList.add('success');
    return true
  } 
  fieldError.classList.remove('success');
  return false
};


let CGU = false;
cguLabel.addEventListener('click', function () {
  CGU = !CGU;
});

const validateCheckbox = (fieldError) => {
  if (CGU === true) {
    fieldError.classList.add('success');
    return true
  } 
  fieldError.classList.remove('success');
  return false
};

const getInput = () => {
  const firstName = document.getElementById('first').value;
  const lastName = document.getElementById('last').value;
  const email = document.getElementById('email').value;
  const birthday = document.getElementById('birthdate').value;
  const quantityCity = document.getElementById('quantity').value;
  const radio = document.querySelector("input[name='location']:checked");
  const cgu = document.querySelector('#checkbox1').checked;
  return { firstName, lastName, email, birthday, quantityCity, radio, cgu };
};

const checkForm = (formInput) => {
  const isValid = {};
  Object.entries(formInput).map((input) => {
    const key = input[0]
    if (key === 'firstName')
      isValid[key] = validateField(regexName, firstName, prenomError, 2);
    if (key === 'lastName')
      isValid[key] = validateField(regexName, lastName, nomError, 2);
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
  const wrongInput = Object.entries(isValid).filter(([key, value]) => !value);
  return !wrongInput.length;
};

firstName.addEventListener("focusout", function(){validateField(regexName, firstName, prenomError, 2)})
lastName.addEventListener("focusout", function(){validateField(regexName, lastName, nomError, 2)})
email.addEventListener("focusout", function(){validateField(regexMail, email, mailError)})
birthday.addEventListener("focusout", function(){validateField(regexDate, birthday, birthdayError)})
quantityCity.addEventListener("focusout", function(){validateField(regexNumber, quantityCity, quantityCityError)})
formRadio.addEventListener("click", function(){validateRadio(locationError)})
submit.addEventListener("click", function(){validateRadio(locationError)})
CGUForm.addEventListener('click', function(){validateCheckbox(CGUError);});
submit.addEventListener("click", function(){validateCheckbox(CGUError)})


submit.addEventListener("click", function(e) {
  e.preventDefault();
  const input = getInput();
  const formIsValid = checkForm(input);
  if (!formIsValid) {
    return false
  }
  form.classList.add('success');
  validation.classList.remove('success');
})

