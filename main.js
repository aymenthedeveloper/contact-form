const main = document.querySelector('body main')
const firstName = document.querySelector('.form-fields .fname-input input')
const lastName = document.querySelector('.form-fields .lname-input input')
const email = document.querySelector('.form-fields .email-input input')
const message = document.querySelector('.form-fields .message-input textarea')
const queryOptions = document.querySelectorAll('.form-fields .query-input .query-type input')
const errorContainers = document.querySelectorAll('.form-fields .input-group .error')
const queryError = errorContainers[3];
const consent = document.querySelector('.form-fields .consent-input input')
const consentError = errorContainers[5];
const submitBtn = document.querySelector('.form-fields .submit')
const requiredFileds = [firstName, lastName, message];
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const success = `<div class="success-message">
<h3>Message Sent!</h3>
<p>Thanks for completing the form. We'll be in touch soon!</p>
</div>`

const required = "This field is required";
const validEmail = "Please enter a valid email address";
const selectQuery = "Please select a query type";
const pleaseConsent = "To submit this form, please consent to being contacted";


function isEmpty(field){
  if (field.value.length === 0) field.nextElementSibling.textContent = required;
  else field.nextElementSibling.textContent = "";
}
function isValidEmail(){
  const isValid = emailRegex.test(email.value);
  const isEmpty = email.value.length === 0;
  if (!isValid && !isEmpty) email.nextElementSibling.textContent = validEmail;
  else if (isEmpty) email.nextElementSibling.textContent = required;
  else email.nextElementSibling.textContent = '';
}
function checkQuery(){
  for (let i = 0, len = queryOptions.length; i < len; i++) {
    if (queryOptions[i].checked) return queryError.textContent = "";
  }
  queryError.textContent = selectQuery;
}
function checkConsent(){
  if(!consent.checked) consentError.textContent = pleaseConsent;
  else consentError.textContent = '';
}

requiredFileds.forEach((field)=>{
  field.addEventListener('input', ()=>{
    isEmpty(field)
  })
})
email.addEventListener('input', isValidEmail)


submitBtn.addEventListener('click', ()=>{
  requiredFileds.forEach(isEmpty);
  isValidEmail();
  checkQuery();
  checkConsent();
  for (let i = 0, len = errorContainers.length; i < len; i++) {
    if (errorContainers[i].textContent !== '') return;
  }
  main.innerHTML += success
})