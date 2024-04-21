const originalTabIndexes = [];

function disableFocusOnElementsOutsideModal() {
  const focusableElements = document.querySelectorAll('body *:not(.modal *)');
  focusableElements.forEach((element) => {
    const tabIndex = element.getAttribute('tabindex');
    originalTabIndexes.push({ element, tabIndex });
    element.setAttribute('tabindex', '-1');
  });
}

function restoreFocusOnElements() {
  originalTabIndexes.forEach(({ element, tabIndex }) => {
    if (tabIndex !== null) {
      element.setAttribute('tabindex', tabIndex);
    } else {
      element.removeAttribute('tabindex');
    }
  });
  originalTabIndexes.length = 0;
}

function displayModal() {
  const modal = document.getElementById('contact_modal');
  const form = modal.querySelector('form');

  disableFocusOnElementsOutsideModal();

  modal.style.display = 'flex';

  form.getElementsByTagName('input')[0].focus();
}

function closeModal(event) {
  if (event.keyCode === 13 || event.type === 'click') {
    const modal = document.getElementById('contact_modal');

    restoreFocusOnElements();

    modal.style.display = 'none';
  }
}

const closeBTN = document.querySelector('#closeModal');
const form = document.querySelector('form');

closeBTN.addEventListener('keydown', closeModal);
closeBTN.addEventListener('click', closeModal);

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

  closeBTN.click();
});
