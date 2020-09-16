const form = document.querySelector('#form');
const password = document.querySelector('#password');
const copybtn = document.querySelector('#copy');
const pLength = document.querySelector('#length');
const pUppercases = document.querySelector('#uppercase');
const pLowercases = document.querySelector('#lowercase');
const pNumbers = document.querySelector('#number');
const pSymbols = document.querySelector('#symbol');

// Generate Password when user submit the form
form.addEventListener('submit', e => {
  e.preventDefault();

  const length = +pLength.value;
  const hasUpper = pUppercases.checked;
  const hasLower = pLowercases.checked;
  const hasNumber = pNumbers.checked;
  const hasSymbol = pSymbols.checked;

  password.textContent = generatePassword(
    hasUpper,
    hasLower,
    hasNumber,
    hasSymbol,
    length
  );
});

// Copy to the Clip-board
copybtn.addEventListener('click', () => {
  // Get password
  const passwordGenerated = password.innerText;
  if (!passwordGenerated) {
    return;
  } // dont do anything if the password dont exists

  // Create a textarea or input to asing the password
  const input = document.createElement('input');

  // Copy password
  input.value = passwordGenerated;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  input.remove();

  // Print alert
  printAlert('Password copied!', '');
});

// Functions
const randomFunc = {
  upper: getRandomUpperCase,
  lower: getRandomLowerCase,
  number: getRandomNumber,
  symbol: getRandomSymbol
};

function generatePassword(upper, lower, number, symbol, length) {
  let generatedPassword = '';

  // Count selected options
  const typesCount = upper + lower + number + symbol;

  // Array with all options selected by user
  const typesArr = [{ upper }, { lower }, { number }, { symbol }].filter(
    item => Object.values(item)[0]
  );

  // Validation
  if (typesCount === 0) {
    printAlert('Select at least one option', 'error');
    return '';
  }

  // generate a password
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];

      // Call the functions selected by user
      generatedPassword += randomFunc[funcName]();
    });
  }

  // Return a password with the length defined by user
  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}

// Generate Random Uppercase
function getRandomUpperCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

// Generate Random Lowercase
function getRandomLowerCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

// Generate Random number
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

// Generate Random symbol
function getRandomSymbol() {
  var symbol = '!@#$%^&*(){}[]=<>/,.|~?';
  return symbol[Math.floor(Math.random() * symbol.length)];
}

// Print Alert
function printAlert(message, category) {
  const alert = document.createElement('div');
  alert.classList.add(
    'absolute',
    'top-0',
    'right-0',
    'mt-10',
    'mr-10',
    'rounded'
  );
  alert.classList.add('text-white', 'font-bold', 'px-4', 'py-3');

  switch (category) {
    case 'error':
      alert.classList.add('bg-red-600');
      break;
    default:
      alert.classList.add('bg-green-600');
      break;
  }

  alert.textContent = message;
  document.querySelector('.min-h-screen').appendChild(alert);

  // Clear alert
  setTimeout(() => {
    alert.remove();
  }, 2000);
}
