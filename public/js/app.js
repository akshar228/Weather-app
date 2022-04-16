const weatherForm = document.querySelector('form');
const address = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', e => {
  e.preventDefault();
  const location = address.value;
  messageOne.textContent = 'Loading..';
  fetch(`/weather?address=${location}`)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = `Location: ${data.location}`;
        messageTwo.textContent = `${data.forecast}`;
      }
    })
    .catch(error => (messageOne.textContent = error.message));
  address.value = '';
  address.blur();
});
