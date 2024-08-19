const form = document.getElementById("form");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const general = document.getElementById("general-enquiry");
const support = document.getElementById("support-request");
const message = document.getElementById("message");
const consent = document.getElementById("checkbox");
const button = document.getElementById("button");
const messageSuccess = document.querySelector(".success-message");

let validation = false;

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error-box");

  validation = false;
  errorDisplay.innerText = message;
  inputControl.children[1].classList.add("error");
  inputControl.children[1].classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error-box");

  validation = true;
  errorDisplay.innerText = "";
  inputControl.children[1].classList.remove("error");
  inputControl.children[1].classList.add("success");
};

const validateInputs = () => {
  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const emailValue = email.value.trim();

  if (!firstNameValue) {
    setError(firstName, "First name is required");
  } else {
    setSuccess(firstName);
  }

  if (!lastNameValue) {
    setError(lastName, "Last name is required");
  } else {
    setSuccess(lastName);
  }

  if (!emailValue) {
    setError(email, "Email is required");
  } else if (!validateEmail(emailValue)) {
    setError(email, "Provide a valid email address");
  } else {
    setSuccess(email);
  }

  if (!consent.checked) {
    setError(consent.parentElement, "For continuo our journey, Please consent");
  } else {
    setSuccess(consent.parentElement);
  }

  if (!general.checked & !support.checked) {
    setError(general.parentElement.parentElement, "Please select a query type");
    general.parentElement.style.borderColor = "#d73c3c";
    support.parentElement.style.borderColor = "#d73c3c";
  } else {
    setSuccess(general.parentElement.parentElement);
    if (general.checked) {
      general.parentElement.style.borderColor = "#0c7d69";
      general.parentElement.style.background = "#dff1e7";
      support.parentElement.style.background = "none";
      support.parentElement.style.borderColor = "#707070";
    } else {
      support.parentElement.style.borderColor = "#0c7d69";
      support.parentElement.style.background = "#dff1e7";
      general.parentElement.style.background = "none";
      general.parentElement.style.borderColor = "#707070";
    }
  }

  if (validation) {
    messageSuccess.style.display = "block";
    setTimeout(() => {
      messageSuccess.style.display = "none";
    }, 2000);
  }
};

const formHandler = (e) => {
  e.preventDefault();

  validateInputs();
};

form.addEventListener("submit", formHandler);
