// selecting elements from dom
const form = document.getElementById('form');
const myName = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const passwordToggle = document.getElementById('password-toggle');
const confirmPasswordToggle = document.getElementById('confirmPassword-toggle');
const createBtn = document.getElementById('createBtn');

// password toggle event
passwordToggle.onclick = function() {
  if(password.type == "password") {
    password.type = 'text';
    passwordToggle.src = 'img/eye-open.png'
  }  else {
    password.type = 'password';
    passwordToggle.src = 'img/eye-close.png';
  }
}
// confirm password toggle event
confirmPasswordToggle.onclick = function() {
  if(confirmPassword.type == "password") {
    confirmPassword.type = 'text';
    confirmPasswordToggle.src = 'img/eye-open.png';
  } else {
    confirmPassword.type = 'password';
    confirmPasswordToggle.src = 'img/eye-close.png';
  }
}

// showError function
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'control-form error';
  const small = formControl.querySelector('small');
  small.style.visibility = 'visible';
  small.innerText = message;
}

// showSuccess
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'control-form success';
  const small = formControl.querySelector('small');
  small.style.visibility = 'hidden';
}


// checkRequired function
function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if(input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  })
}

// checkLength function
function checkLength(input, min, max) {
  if(input.value.trim() !=='') {
    if(input.value.length < min) {
      showError(input, `${getFieldName(input)} must be atleast ${min} characters`)
    } else if(input.value.length > max) {
      if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be atmost ${max} characters`)
    } else {
      showSuccess(input);
    }

  } 
}
}
// checkEmail function
function checkEmail(input) {
  if(input.value.trim() !== '') {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(emailRegex.test(input.value.trim())) {
      showSuccess(input)
    } else {
      showError(input, 'Invalid Email')
    }
  }

}
// function confirmPasswordMatching
function confirmPasswordMatching(p1, p2) {
  if(p2.value.trim() !== '') {
    if(p1.value === p2.value) {
      showSuccess(p2);
    } else {
      showError(p2, `Password do not Matching`);
   }
  }
}
// getFieldName funtion
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// getInputFromStorage function
function getInputsFromStorage() {
  let inputsData = localStorage.getItem('inputs');
  return inputsData ? JSON.parse(inputsData) : [];
}
// add Account To Storage function
function addAccountToStorage() {
  // validate all field inputs
  checkRequired([myName, email, password, confirmPassword]);
  checkLength(myName, 3, 15);
  checkLength(password, 8, 20);
  checkEmail(email);
  confirmPasswordMatching(password, confirmPassword);

  // check if their is error message displayed
  const errorMessages = document.querySelectorAll('.error');
  if(errorMessages.length === 0) {
    const inputs = {
      myName: myName.value.trim(),
      email: email.value.trim(),
      password: password.value.trim(),
      confirmPassword: confirmPassword.value.trim(),
    }
    // add the inputs object to local storage
    let inputsFromStorage = getInputsFromStorage();
    inputsFromStorage.push(inputs);
    localStorage.setItem('inputs', JSON.stringify(inputsFromStorage));
    // after account successfully added to local storage navigate to signin page automatically
    window.location.href = "signin.html";
  }
}
// clearInput when thier are no error messages
function clearInputs() {
  const errorMessages = document.querySelectorAll('.error');
  if(errorMessages.length === 0) {
    myName.value = '';
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
  }
}
// add event listener to the form
form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkRequired([myName, email, password, confirmPassword]);
  checkLength(myName, 3, 15);
  checkLength(password, 8, 20);
  checkEmail(email);
  confirmPasswordMatching(password, confirmPassword);
  clearInputs();
});

createBtn.addEventListener('click', addAccountToStorage);