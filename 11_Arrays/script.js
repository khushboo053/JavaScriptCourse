'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////
// SIMPLE ARRAY METHODS

let arr = ['a', 'b', 'c', 'd', 'e'];

// The splice() method adds and/or removes array elements.

// The splice() method overwrites the original array.

// SLICE- does not mutates the original array
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
// it returns the last 2 elements
console.log(arr.slice(-2));
console.log(arr.slice(-1));
// It extracts the elements from position 1 except the last 2 elements
console.log(arr.slice(1, -2));
console.log(arr.slice());
// creating new array & expanding original array to it
console.log([...arr]);

// Should we use a spread operator or a slice to create a shallow copy?
// slice can be use when we need to change multiple methods together calling 1 after the other

// SPLICE - mutates the original array
// changes the original array, so it mutates the original array
console.log('Splice-----------------------');
// console.log(arr.splice(2));
arr.splice(-1);
console.log(arr);

// splice(startposition, no. of elements want to delete from that position)
arr.splice(1, 2);
console.log(arr);

// REVERSE - mutates the original array
const arr2 = ['k', 'h', 'u', 's', 'h'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// JOIN
console.log(letters.join(' - '));

//////////////////////////////////////////////
// THE NEW AT METHOD

const arr3 = [23, 11, 64];
console.log(arr3[0]);
console.log(arr3.at(0));

// suppose u have to get last element of arr & u do not know length of the array
console.log(arr3[arr3.length - 1]);
console.log(arr3.slice(-1));
console.log(arr3.slice(-1)[0]);
console.log(arr3.at(-1));

console.log('khush'.at(0));

/////////////////////////////////////////////
// LOOPING ARRAYS: FOR EACH
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [i, movt] of movements.entries()) {
  if (movt > 0) {
    console.log(`Movement: ${i + 1}:  you deposited ${movt}`);
  } else {
    console.log(`Movement: ${i + 1}: You withdrew ${Math.abs(movt)}`);
  }
}
console.log('------FOR EACH-------');

// in this callback function is used
// contniue & break statements do not work with foreach loop
movements.forEach(function (movt, i, arr) {
  if (movt > 0) {
    console.log(`Movement: ${i + 1}:  you deposited ${movt}`);
  } else {
    console.log(`Movement: ${i + 1}: You withdrew ${Math.abs(movt)}`);
  }
});

////////////////////////////////////////////
// FOREACH WITH MAPS & SETS
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique); // USD, GBP, USD, EUR

// _ in JS means completely unneccessary variable
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});

/////////////////////////////////////////////////////////////////////
// BANKIST APP - CREATING THE DOM
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements; // here as it mutates the original array thats why will take the copy of an array by using slice method

  movs.forEach(function (movt, i) {
    const type = movt > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${movt}</div>
        </div>
    `;
    // console.log(html);
    containerMovements.insertAdjacentHTML('afterbegin', html);
    // Every new element is inserted after the previous one, order gets change from afterbegin
    // containerMovements.insertAdjacentHTML('beforeend', html);
  });
};
// displayMovements(account1.movements);

//////////////////////////////////////////////////////////////
// DATA TRANSFORMATIONS: MAP, FILTER, REDUCE
// Map - To loop over arrays
// Map creates a brand new array based on the original array
// the map method takes an array, loops over that array and in each alteration, it applies a covic function that we specify on our code to the current array element.
// It maps the values of original array to a new array & that's why this method is called map.
// Does not mutates the original array, it creates a new array

// Filter - is used to filter for elements in the original array which satisfy a certain condition.

// Reduce - Which we use to boil down all the elements of the original array into 1 single value.

//////////////////////////////////////////////////////////////////
// MAP METHOD
// Lets convert euros to USD & suppose 1 euro = $1.1
const eurToUsd = 1.1;

// const movementsUSD = movements.map(function(mov) {
//   return mov * eurToUsd;
// })

const movementsUSD = movements.map(mov => mov * eurToUsd);

console.log(movements);
console.log(movementsUSD);

const movementsUSDFor = [];
for (const mov of movements) movementsUSDFor.push(mov * eurToUsd);

console.log(movementsUSDFor);

/*
const movementsDescriptions = movements.map((mov, i, arr) => {
  if (mov > 0) {
    return `Movement ${i + 1}: U deposited ${mov}`;
  } else {
    return `Movement ${i + 1}: U withdrew ${Math.abs(mov)}`;
  }
});
*/

const movementsDescriptions = movements.map(
  (mov, i, arr) =>
    `Movement ${i + 1}: U ${mov > 0 ? 'Deposited' : 'Withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescriptions);

////////////////////////////////////////////
// COMPUTING USERNAMES
const user = 'Steven Thomas Williams';
// const username = user.toLowerCase().split(' ').map(name => name[0]).join('');

// console.log(username);

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
// console.log(createUsernames('Steven Thomas Williams'));
createUsernames(accounts);
console.log(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display Summary
  calcDisplaySummary(acc);
};

////////////////////////////////////////////
// FILTER METHOD
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

////////////////////////////////////////////////////
// REDUCE METHOD

// accumulator = snowball
const balance = movements.reduce(function (acc, cur, i, arr) {
  console.log(`Iteration ${i}: ${acc}`);
  return acc + cur;
}, 0);
console.log(balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

const balance3 = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance3);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
};
// calcDisplayBalance(account1.movements);

// Max Value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);

//////////////////////////////////////////////////////
// THE MAGIC OF CHAINING METHODS
// Pipeline
const eurToUsd1 = 1.1;
const totalDepositsUSD = movements
  .filter(mov => mov < 0)
  .map(mov => mov * eurToUsd1)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);

const totalDepositsUSD1 = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    console.log(arr);
    return mov * eurToUsd1;
  })
  .reduce((acc, mov) => acc + mov, 0);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};
// calcDisplaySummary(account1.movements);

// NOTE: - WE SHOULD NOT OVERUSE CHAINING
// - We should try to optimize
// we should try to optimize it 18:16 because chaining tons of methods one after the other can cause a real performance issues if we have really huge arrays. So if we have a huge chain of methods, chained one after the other, we should try to compress all the functionality that they do into as little methods as possible.

// sometimes we create way more map methods then we actually need, where we could just do it all in just one map call. So when you chain methods like this, keep looking for opportunities of keeping up your codes performance.  And second, it is a bad practice in JavaScript  to chain methods that mutate the underlying original array.  And an example of that is the splice or reverse method.

//////////////////////////////////////////////////////////////////
// THE FIND METHOD
// Find method is used to retrieve 1 element of an array based on a condition
// Find method also accepts a callback function which will then be called as method loops over an array

// Filter method returns all the elements which match the condition & find method only returns the first element
// Filter method returns a new array while find method returns element itself.
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

// GOal: to find exactly 1 element & so we use to setup a condtn that satisfies only 1 elemnet
// Array of objects
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

///////////////////////////////////////////////////////////////////////
// IMPLEMENTATION LOGIN
// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // console.log('LOGIN');
    // Display UI & Message
    labelWelcome.textContent = `Welcome ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // update the UI
    updateUI(currentAccount);
  }
});

//////////////////////////////////////////////////////
// IMPLEMENTINGB TRANSFERS
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  // console.log(amount, recieverAcc);

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    recieverAcc?.username !== currentAccount.username
  ) {
    // console.log('Transfer valid');
    // Doing the transfer
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

/////////////////////////////////////////////////////
// THE FIND INDEX METHOD
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  inputCloseUsername.value = inputClosePin.value = '';

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);

    // Delete Account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
});

/////////////////////////////////////////////////////////
// SOME & EVERY METHOD
console.log(movements);

// Some & includes are similar
// includes - Checks Equality
console.log(movements.includes(-130));

// some - Checks Condition
console.log(movements.some(mov => mov === -130));

const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

// Every - Only returns true, If all of the  elements in the array satisfy the condition that we pass in.
// If every element passes the test in our callback function, only then the every method returns true

console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Separate Callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

////////////////////////////////////////////////////////
// FLAT & FLAT MAP METHODS
const arr1 = [[1, 2, 3], 4, [5, 6, 7], 8];
console.log(arr1.flat());

const arr7 = [[[1, 2], 3], 4, [5, [6, 7]], 8];
console.log(arr7.flat());
console.log(arr7.flat(1));
console.log(arr7.flat(2));

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);

// const allMovements =accountMovements.flat()
// console.log(allMovements);

// const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);

// chaining
const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

// flat - deeper
// flatMap- only goes 1 level deeper
const overallBalance1 = accounts
  .map(acc => acc.movements)
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance1);

/////////////////////////////////////////////
// SORTING THE ARRAYS
// Strings
const owners = ['sam', 'khush', 'tish', 'bansi'];
console.log(owners.sort());
console.log(owners); // mutates the original array

// Numbers
// console.log(movements);
// console.log(movements.sort()); // not working on numbers

// return < 0, A, B (keep order)
// return > 0, B, A
// By callback function

// Ascending
movements.sort((a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
});

console.log(movements.sort((a, b) => a - b));

// Descending
movements.sort((a, b) => {
  if (a > b) return -1;
  if (a < b) return 1;
});

console.log(movements.sort((a, b) => b - a));

// sort method do not work with arrays having both strings and numbers

// Sort Movements
// Strings
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted; // To again click sort button it again gets back to its original avatar
});

///////////////////////////////////////////////////////////////////
// MORE WAYS OF CREATING & FILLINGT ARRAYS
const arr8 = [1, 2, 3, 4, 5, 6, 7];
console.log([1, 2, 3, 4, 5, 6, 7]);
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Empty arrays + fill method
// Weird behavior of 'Array': When we only pass in 1 argument, then it creates a new emptyargument with that length
// It creates a new array with 7 empty elements in there & it simply contains nothing
const x = new Array(7);
console.log(x);

// console.log(x.map(() => 5)); // it outputs nothing.
x.fill(1);
x.fill(1, 3, 5); // fill 1 , starting from index 3 till index 5

arr8.fill(55, 2, 6);

// Array.from- we are using this on array constructor
// Array.from(length, mapping function )
// So it is exactly like the callback function that we pass into the map() method.
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

// To denote that we are not using the first parameter so we have to put underscore
const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

// Generate an array with 100 random dice rolls
const dice = Array.from({ length: 100 }, (_, i) => {
  return Math.trunc(Math.random() * 6) + 1;
});
console.log(dice);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
});

////////////////////////////////////////////////
// ARRAY METHODS PRACTICE
// 1.
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);
console.log(bankDepositSum);

// 2.
// const numDeposits1000 = accounts.flatMap(acc => acc.movements).filter(mov => mov >= 1000).length;
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  // .reduce((count, cur) => cur >= 1000 ? count+1 : count, 0); // 6
  // .reduce((count, cur) => cur >= 1000 ? count++ : count, 0); // returns 0 it returns the value then increment it
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0); // 6

console.log(numDeposits1000);

// Prefix & Postfix
let a = 10;
console.log(a++);
console.log(a);

let b = 12;
console.log(++b);
console.log(b);

// 3.
const { deposits1, withdrawals1 } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits1 += cur) : (sums.withdrawals1 += cur);
      sums[cur > 0 ? 'deposits1' : 'withdrawals1'] += cur;
      return sums;
    },
    { deposits1: 0, withdrawals1: 0 }
  );
console.log(deposits1, withdrawals1);

// 4. Convert any string to titlecase with some exceptions
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitzalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitzalize(word)))
    .join(' ');

  return capitzalize(titleCase);
};
console.log(convertTitleCase('this is a nice title '));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));

