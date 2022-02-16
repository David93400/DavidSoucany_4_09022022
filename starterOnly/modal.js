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
const modalClose = document.querySelector(".close-modal-btn");
const submit = document.querySelector(".btn-submit");

const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const email = document.getElementById('email');
const birthday = document.getElementById('birthdate');
const quantityCity = document.getElementById('quantity');


const prenomError = document.querySelector('#errorFirst');
const nomError = document.querySelector('#errorLast');
const mailError = document.querySelector('#errorMail');
const birthdayError = document.querySelector('#errorBirthday');
const quantityCityError = document.querySelector('#errorQuantityCity');
const locationError = document.querySelector('#errorLocation');

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
}
// close modal function
function closeModal() {
  modalbg.style.display = "none";
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
    return true;
  } displayError(field, fieldError)
    return false;
}

const validateRadio = (fieldError) => {
  const checkedRadio = document.querySelector("input[name='location']:checked");
  if (checkedRadio !== null) {
    fieldError.classList.add('success');
    return true
  } fieldError.classList.remove('success');
    return false
};


firstName.addEventListener("focusout", function(){validateField(regexName, firstName, prenomError, 2)})
lastName.addEventListener("focusout", function(){validateField(regexName, lastName, nomError, 2)})
email.addEventListener("focusout", function(){validateField(regexMail, email, mailError)})
birthday.addEventListener("focusout", function(){validateField(regexDate, birthday, birthdayError)})
quantityCity.addEventListener("focusout", function(){validateField(regexNumber, quantityCity, quantityCityError)})
formRadio.addEventListener("click", function(){validateRadio(locationError)})
submit.addEventListener("click", function(){validateRadio(locationError)})


submit.addEventListener("click", function(e) {
  
  if (
    validateField(regexName, firstName, prenomError, 2) &&
    validateField(regexName, lastName, nomError, 2) &&
    validateField(regexMail, email, mailError) &&
    validateField(regexDate, birthday, birthdayError) &&
    validateField(regexNumber, quantityCity, quantityCityError) &&
    validateRadio(locationError)
  ) {
    alert('success');
    e.preventDefault();
  } 
    e.preventDefault();
   
  
})
