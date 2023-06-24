// selecting elements from dom
const  form = document.getElementById('signinForm');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordSignInToggle= document.getElementById('passwordSignIn-Toggle');
// passwordSigninToggle
passwordSignInToggle.onclick = function () {
  if(password.type == "password") {
    password.type = 'text';
   passwordSignInToggle.src = 'img/eye-open.png'
  } else {
    password.type = 'password';
    passwordSignInToggle.src = 'img/eye-close.png'
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

// showSuccess function
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'control-form success';
  const small = formControl.querySelector('small');
  small.style.visibility = 'hidden';
}

// checkRequired
function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if(input.value.trim() ==='') {
    showError(input, `${getFieldName(input)} is required`)
    } else {
      showSuccess(input);
    }
  })
}

// getFieldName function
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1); 
}
// get accounts from local storage 
function getAcountsFromLocalStorage() {
  const accountData = localStorage.getItem('inputs');
  return accountData ? JSON.parse(accountData) : [];

}
// Retrive the account details from local storage
const accounts = getAcountsFromLocalStorage();
// add event listener 
form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkRequired([email, password]);
// get enteredEmail and enteredPassword
const enteredEmail = email.value.trim();
const enteredPassword = password.value.trim();

// find the account with entered email
const matchedAccount = accounts.find(account => account.email === enteredEmail);
// find account exist and entered password matches
if(matchedAccount && matchedAccount.password === enteredPassword) {
  // authentication successfully
//  you can store the user session / token in local storage or redirect to the authenticated area of your website
sessionStorage.setItem('email', enteredEmail);
// Redirect to authenticated area
  window.location.href = "posts.html";

  
} else {
  // authentication failed
  // display an error message
  showError(email, 'invalid email or password');
}

})