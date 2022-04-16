const weatherForm = document.querySelector("form");
const address = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = address.value;
  messageOne.textContent = "Loading..";
  messageTwo.textContent = "";
  fetch(`/weather?address=${location}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.innerHTML = `Location: ${data.location}`;
        messageTwo.innerHTML += ` Forecast: ${data.forecast}`;
      }
    })
    .catch((error) => (messageOne.textContent = error.message));
  address.value = "";
  address.blur();
});
