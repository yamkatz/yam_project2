const isFormValid = () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const msg = document.getElementById("msg").value;

  const isValid = name !== "" && email !== "" && phone !== "" && msg !== "";

  if (!isValid) {
    alert("שים לב, אחד מהפרטים לא מלא או תקין");
  }

  return isValid;
};

const toggleButtonState = () => {
  const button = document.getElementById("submitButton");
  button.disabled = !isFormValid();
};

const handleClick = () => {
  if (isFormValid()) {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const msg = document.getElementById("msg").value;

    const formData = { name, email, phone, msg };
    let formDataArray = JSON.parse(localStorage.getItem("formDataArray")) || [];
    formDataArray.push(formData);
    localStorage.setItem("formDataArray", JSON.stringify(formDataArray));

    alert("נשלח");
  }
};

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const msgInput = document.getElementById("msg");
const button = document.getElementById("submitButton");

nameInput.addEventListener("input", toggleButtonState);
emailInput.addEventListener("input", toggleButtonState);
phoneInput.addEventListener("input", toggleButtonState);
msgInput.addEventListener("input", toggleButtonState);

button.addEventListener("click", handleClick);
