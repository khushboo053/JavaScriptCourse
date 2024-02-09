'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2024-01-05T18:49:59.371Z',
    '2024-01-07T12:01:20.894Z',
  ],
  currency: 'INR', // USD
  locale: 'hi-IN', // en-US
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions
// This is how we localize dates in JS using the new internationalization API
const formatMovementDate = function(date, locale) {
  const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), date); 
  console.log(daysPassed);

  if(daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7 ) return `${daysPassed} days ago`;
    
  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
 
  return new Intl.DateTimeFormat(locale).format(date);
}

const formatCur = function(value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
}

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    // So here, we have a European country with an American currency
    // const formattedMov = new Intl.NumberFormat(acc.locale, { style: 'currency', currency: 'USD' }).format(mov);
    const formattedMov = formatCur(Math.abs(mov), acc.locale, acc.currency);
    


    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  // labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  // labelSumIn.textContent = `${incomes.toFixed(2)}€`;
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  // labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  // labelSumInterest.textContent = `${interest.toFixed(2)}€`;
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    //In each call,print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    //When 0 seconds , stop  timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }
    //decrese 1s
    time--;
  };
  //Set time to 5 minutes
  let time = 10;

  //Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};


const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// Fake Always Logged In
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

// Experementing API



btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date and time
    // const now1 = new Date();
    // const day1 = `${now1.getDate()}`.padStart(2, 0);
    // const month1 = `${now1.getMonth() + 1}`.padStart(2, 0);
    // const year1 = now1.getFullYear();
    // const hour1 = now1.getHours();
    // const min1 = `${now1.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day1}/${month1}/${year1},${hour1}:${min1}`;

    const now3 = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric', // numeric, long, 2-digit
      year: 'numeric',
      // weekday: 'long', // long, short, narrow
    };

    // To not define locale manually but instead to simply get it from the user's browser. & that's preety easy to do as well , locale means like "en-UK", "en-US" or any other languages
    // const locale = navigator.language;
    // console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(
      now3
    );
    // labelDate.textContent = new Intl.DateTimeFormat('en-US').format(now3);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date());
    receiverAcc.movementsDates.push(new Date());

    // reset timer
    clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function() {
      // Add movement
      currentAccount.movements.push(amount);
  
      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());
  
      // Update UI
      updateUI(currentAccount);
  
      // reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500)
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin // replaced 'Number' with '+'
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////
// CONVERTING & CHECKING NUMBERS
// All numbers have 1 datatype
// Numbers are internally represented as 64 base 2 format
// Numbers r always stored in a binary format
console.log(23 === 23.0);

// Base 10 - 0-9. 1/10 = 0.1, 3/10 = 3.333
// Binary - 0,1
console.log(0.1 + 0.2); // which gives us not precise answer
console.log(0.1 + 0.2 === 0.3);

// COnvert strings to numbers
console.log(Number('23'));
console.log(+'23'); // '+' operator works same as 'Number'

// Parsing - parse a number from a string, string must starts with a number
// Second argument of parsing is called Regex
// Regex is base of the numeral system, here we are simply using base 10
// NOTE- Every function is also an object

console.log(Number.parseInt('30px', 10));
console.log(Number.parseInt('e23', 10)); // NaN coz its string is not start from number

console.log(Number.parseInt('    2.5rem    '));
console.log(Number.parseFloat('    2.5rem    '));

// Check if value is NaN
// Number.isNaN() doesn't forcefully convert the parameter to a number. Only values of the type number, that are also NaN, result in true.

console.log('isNAN');
console.log(Number.isNaN(20)); // false
console.log(Number.isNaN('20')); // false
console.log(Number.isNaN(+'20X')); // true
console.log(Number.isNaN(20 / 0)); // false

// checking if value is number
// Returns true if passed value is finite. Unlike the global isFinite, Number.isFinite doesn't forcibly convert the parameter to a number. Only finite values of the type number, result in true.

console.log('ISFINITE');
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite('20')); // false
console.log(Number.isFinite(+'20X')); // false
console.log(Number.isFinite(20 / 0)); // false

console.log('isINTEGER');
console.log(Number.isInteger(20)); // true
console.log(Number.isInteger(20.0)); // true
console.log(Number.isInteger(20 / 0)); // false

////////////////////////////////////////////////////
// MATH & ROUNDING
console.log('MATH & ROUNDING');

console.log(Math.sqrt(64)); // 8
console.log(64 ** (1 / 2)); // 8
console.log(8 ** (1 / 3)); // 2

console.log(Math.max(5, 18, 23, 11, 2)); // 23
console.log(Math.max(5, 18, '23', 11, 2)); // 23
console.log(Math.max(5, 18, '23px', 11, 2)); // NaN

console.log(Math.min(5, 18, 23, 11, 2)); // 2

console.log(Math.PI * Number.parseFloat('10px') ** 2);

console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max - min) + 1) + min;
// 0...1 -> 0...(max-min) -> min... (max-min+min)
console.log(randomInt(10, 20));

// ROUNDING
console.log('ROUNDING--------------');
console.log(Math.round(23.3));
console.log(Math.round(23.9));

console.log(Math.ceil(23.3));
console.log(Math.ceil(23.9));

console.log(Math.floor(23.3));
console.log(Math.floor('23.9'));

console.log(Math.trunc(23.3));

// floor is much good than truncate
console.log(Math.trunc(-23.3));
console.log(Math.floor(-23.3));

// ROUNDING DECIMALS
// toFixed always returns a string which is white in color in console
// In JS, work with decimals and numbers is different
console.log((2.7).toFixed(0));
console.log((2.7).toFixed(3));
console.log((2.345).toFixed(2));
console.log(+(2.345).toFixed(0));

///////////////////////////////////////////////
// THE REMAINDER OPERATOR -returns a remainder

console.log('THE REMAINDER OPERATOR');
console.log(5 % 2);
console.log(5 / 2); // 5 = 2 * 2 + 1

console.log(8 % 3);
console.log(8 / 3); // 8 = 2 * 3 + 2

console.log(6 % 2);
console.log(6 / 2);

console.log(7 % 2);
console.log(7 / 2);

const isEven = n => n % 2 === 0;
console.log(isEven(8));
console.log(isEven(6));
console.log(isEven(23));

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'lightgreen'; // 0 2 4 6
    if (i % 3 === 0) row.style.backgroundColor = 'blue'; // 0 3 6 9
  });
});

////////////////////////////////////////////
// NUMERIC SEPARATORS
// We can use underscores to give meanings to certain parts of our numbers
// 287,460,000,000
const diameter = 287_460_000_000;
console.log(diameter);

const price = 345_99;
console.log(price);

const transferFee = 15_00; // 15 dollars & 0 cents
const transferFee2 = 1_500; // 1 dollars 500 cents

// const PI = 3_.14_15; // not allowed, also when '_' is placed begining & end of the number

const PI = 3.1415;
console.log(PI);

// U should only used underscore i.e. numeric separators only with numbers & not with strings
console.log(Number('230000'));
console.log(Number('230_000')); // NaN
console.log(parseInt('230_000')); // 230

////////////////////////////////////////////
// WORKING WITH BIGINT
// Numbers are represented internally as 64 bits
// Only 53 bits are used to actually store the digits themselves out of 64 bits. The rest are for storing the position of the decimal point & the sign

// If we do calculations with numbers that r bigger than this, then we might lose precision
// -1 coz it includes zero
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);

// this 'n' transforms a regular number into a bigInt number
console.log(457896321024567896141334521235789641233);
console.log(457896321024567896141334521235789641233n);
console.log(BigInt(457896321024567896141334521235789641233));

// Operations
console.log(1000n + 5000n);
console.log(457896321024567896141334521235789641233n * 1000000n);

// Not possible to mix BigInt with regular numbers
const huge = 457896321024567896141334521235789641233n;
const num = 25;
console.log(huge * BigInt(num));

// Exceptions
console.log(20n > 15); // true
console.log(20n === 20); // false
console.log(typeof 20n); // bigint
// JS does the type coercion & so then it will coerce this one to a regular number
console.log(20n == 20); // 20
console.log(20n == '20'); // 20

console.log(huge + ' is Really big!!!');
// console.log(Math.sqrt(16n)); // Error- cannot convert bigint value to a number

// Divisions
console.log(10n / 3n); // returns closest bigint '3n' , cut offs the decimal part
console.log(10 / 3); // 3.3333

//////////////////////////////////////////////
// CREATING DATES
console.log('CREATING DATES------------------');
const now = new Date();
console.log(now);

console.log(new Date('Jan 08 2024 18:05:37'));
console.log('January 08, 2024');

// Coordinated Universal Time (UTC) or Z
console.log(account1.movementsDates);
console.log(account1.movementsDates[0]);

// Month is zero based
console.log(new Date(2024, 0, 8, 11, 56, 5));

// JS autocorrects the day
// 33 rd is not day in month so it autocorrects to Feb 02
console.log(new Date(2024, 0, 33));

// We can also pass the amount of milliseconds passed since the beginning of the Unix Time i.e January 1, 1970. So zero milliseconds after the initial Unix time then indeed we get january 01, 1970
console.log(new Date(0));

// convert days to milliseconds
console.log(new Date(3 * 24 * 60 * 60 * 1000));

// Working with dates
const future = new Date(2024, 0, 1, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime());

console.log(new Date(2142256980000));

console.log(Date.now());

future.setFullYear(2040);
console.log(future);

//////////////////////////////////////////////////////
// OPERATIONS WITH DATES
console.log('OPERATIONS WITH DATES---------------------');
console.log(+future);

const calcDaysPassed = (date1, date2) => Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDaysPassed(new Date(2024, 0, 8), new Date(2024, 5, 5, 10, 8));
console.log(days1);

///////////////////////////////////////////////////////////
// INTERNATIONALIZING DATES
// JS has a new Internationalization API - To easily format numbers & strings according to different languages
// So with this new api, we can make our apps support different languages for users around the world
// Eg: Currencies or dates are represented in a completely different way in europe or in US or in Asia
// There is a lot language specific things that we can with the internationalization API


//////////////////////////////////////////////////////////
// INTERNATIONALIZING NUMBERS
// Number is now formatted using these dividers or separators (commas) here
const n = 38854621.035;
const options = {
  // style: 'unit',
  // unit: 'mile-per-hour',
  // unit: 'celsius'
  // style: 'percent'
  style: 'currency',
  currency: 'INR', // currency is defined manually it can't be defined from locale
  // useGrouping: false, // number is printed without the separators as it is.
}

console.log('US: ', new Intl.NumberFormat('en-US', options).format(n));
console.log('Germany: ', new Intl.NumberFormat('de-DE', options).format(n));
console.log('Bharat: ', new Intl.NumberFormat('hi-IN', options).format(n));
console.log('Syria: ', new Intl.NumberFormat('ar-SY', options).format(n));
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, options).format(n)
);


///////////////////////////////////////////////////////////
// TIMERS_SETTIMEOUT & SETINTERVAL
// setTimeout- this timer runs just once after a defiend time
// setInterval- this timer keeps running forever, until we stop it
// We use settimeout to execute some code at some point in the future

// When execution of our code reaches this point, it will simply call out the setTimeout function, it will then essentially register this callback function here to be called later. and then the code execution simply continues.

// So again, as soon as JavaScript hits this line of code here, it will simply basically keep counting the time in the background, and register this callback function to be called after that time has elapsed, and then immediately, JavaScript will move on to the next line, which is this one, all right. And this mechanism is called Asynchronous JavaScript.
const ingredients = ['cheese', 'olives'];

const pizzaTimer = setTimeout((ing1, ing2) => console.log(`here is your pizza with ${ing1} & ${ing2}🍕`), 3000, ...ingredients);
console.log('Waiting....'); // first it will execute

// Cancel the timeout
if (ingredients.includes('olives')) clearTimeout(pizzaTimer);

setInterval(function() {
  const now5 = new Date()
  // console.log(now5);
}, 2000);
