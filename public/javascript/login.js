function joinFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#username-join').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password-join').value.trim();

  if (username && email && password) {
    fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        username,
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => console.log(response))
  }
}

document.querySelector('.join').addEventListener('submit', joinFormHandler);