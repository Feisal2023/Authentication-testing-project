// selecting elements from dom
const form = document.getElementById('form');
const imgUrl = document.getElementById('imgUrl');
const title = document.getElementById('title');
const article = document.getElementById('article');
const posts = document.getElementById('posts');
const addPost = document.querySelector('.addPost');


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
  if(input.value.trim() !== '') {
    if(input.value.length < min) {
      showError(input, `${getFieldName(input)} must be atleast ${min} characters`);
    } else if(input.value.length > max) {
  showError(input, `${getFieldName(input)} must be atmost ${max} characters`)
    } else {
      showSuccess(input);
    }
  }
}
// checkimgUrl function
function checkimgUrl(imgUrl) {
  if(imgUrl.value.trim() !=='') {
    if(!imgUrl.value.trim().startsWith('https://')) {
      showError(imgUrl, `${getFieldName(imgUrl)} must starts with 'https://'`);
    } else {
      showSuccess(imgUrl);
    }
  }
}
// getFieldName function
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// create Post function 
function createPost(post) {
// only post can be created if there are no error message displayed
const errorMessages = document.querySelectorAll('.error');
if(errorMessages.length === 0) {
    posts.innerHTML += `
  <div class="post">
  <img src="${post.imgUrl}" alt="">
  <h1>${post.title}</h1>
  <p>${post.article}</p>
  <button class="delete">delete</button>
  </div>
  `
}

}
// clear Inputs function
function clearInputs() {
  // inputs fields can be only cleared when there are no error message displayed
  const errorMessages = document.querySelectorAll('.error');
  if(errorMessages.length === 0) {
    imgUrl.value = '';
    title.value = '';
    article.value = '';
  }
}
// get inputs from storage function
function getInputsFromStorage() {
let inputsData = localStorage.getItem('inputs');
return inputsData ? JSON.parse(inputsData) : [];
}
// add inputs to storage function
function addInputsToStorage() {
  // validates all inputs fields has no error message displayed
  checkRequired([imgUrl, title, article]);
  checkimgUrl(imgUrl);
  checkLength(title, 6, 15);
  checkLength(article, 50, 100); 
  // check if there are error message displayed
  const errorMessages = document.querySelectorAll('.error');
  if(errorMessages.length === 0) {
    const inputs = {
      imgUrl: imgUrl.value.trim(),
      title: title.value.trim(),
      article: article.value.trim(),
    }
    // add inputs object to local storage
    let addtoStorage = getInputsFromStorage();
    addtoStorage.push(inputs);
    localStorage.setItem('inputs', JSON.stringify(addtoStorage));
  }
}
// load Inputs To Display function
function loadPostsToDisplay() {
let displayPosts = getInputsFromStorage();
displayPosts.forEach((post) => {
  createPost(post);
})
}
loadPostsToDisplay();

// Function to remove post from local storage
function removePostFromLocalStorage(postId) {
  let posts = getInputsFromStorage();

  // Find the index of the post with the specified ID
  const index = posts.findIndex(post => post.id === postId);

  // If the post is found, remove it from the array
  if (index !== -1) {
    posts.splice(index, 1);
    // Save the updated posts back to local storage
    localStorage.setItem('inputs', JSON.stringify(posts));
  }
}

// Deleting post
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete')) {
    const postElement = event.target.parentElement;
    const postId = postElement.dataset.id;

    // Remove post from local storage
    removePostFromLocalStorage(postId);

    // Remove post element from the DOM
    postElement.remove();

    alert('Post deleted successfully.');
  }
});



// add event listener to the form
form.addEventListener('submit', (e) => {
e.preventDefault();
checkRequired([imgUrl, title, article]);
checkimgUrl(imgUrl);
checkLength(title, 6, 15);
checkLength(article, 50, 100);
createPost({
  imgUrl: imgUrl.value.trim(),
  title: title.value.trim(),
  article: article.value.trim(),
});
clearInputs();
})
addPost.addEventListener('click', addInputsToStorage);

// Retrieve the email from session storage
const email = sessionStorage.getItem('email');

// Display the modified email if it exists
if (email) {
  const emailWithoutDomain = email.split('@')[0];
  const greetingElement = document.createElement('p');
  greetingElement.className = 'message-text';
  greetingElement.innerText = `${emailWithoutDomain}, you have successfully logged in`;
  document.getElementById('login-message').prepend(greetingElement);

  // Show the logout icon
  const logoutIcon = document.getElementById('logout-icon');
  logoutIcon.style.display = 'block';
}
