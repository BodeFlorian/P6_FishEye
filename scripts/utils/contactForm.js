function displayModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'flex';
}

function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
}

const form = document.querySelector('form');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const firstname = document.getElementById('firstname').value;
  const lastname = document.getElementById('lastname').value;
  const email = document.getElementById('mail').value;
  const message = document.getElementById('message').value;

  console.log('Prénom:', firstname);
  console.log('Nom:', lastname);
  console.log('Email:', email);
  console.log('Message:', message);
});
