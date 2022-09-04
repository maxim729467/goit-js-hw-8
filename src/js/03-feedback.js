import throttle from 'lodash.throttle';

const formStateKey = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const emailField = document.querySelector('.feedback-form input');
const messageField = document.querySelector('.feedback-form textarea');
const formState = JSON.parse(localStorage.getItem(formStateKey));

if (formState) {
  emailField.value = formState.email;
  messageField.value = formState.message;
}

emailField.addEventListener('input', throttle(onInputChange, 500));
messageField.addEventListener('input', throttle(onInputChange, 500));
form.addEventListener('submit', onSubmit);

function onInputChange() {
  const formData = { email: emailField.value, message: messageField.value };
  localStorage.setItem(formStateKey, JSON.stringify(formData));
}

function onSubmit(e) {
  e.preventDefault();
  const formData = { email: emailField.value, message: messageField.value };
  localStorage.removeItem(formStateKey);
  console.log(formData);
  e.target.reset();
}
