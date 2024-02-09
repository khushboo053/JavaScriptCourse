'use strict';
// So you saw that we can not add new elements to this object now, right? So that was the reason for the error that we just saw here. However, object dot freeze here basically only freezes the first level of the object. So it's not a so-called deep freeze because we can still change objects inside of the object. So for example, I can do budget

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

// budget[0].value = 10000; // it works coz it does not do deep freeze
// budget[9] = 'Jonas'; // not works

// freeze= object that we want to make immutable means we can no longer put any new properties into it.
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});
// spendingLimits.jay = 200;
console.log(spendingLimits);

// const getLimit = user => spendingLimits?.[user] ?? 0;

const getLimit = (limits, user) => limits?.[user] ?? 0;

// Pure function: D
const addExpense = function (state, limits, value, description, user = 'jonas') {
  const cleanUser = user.toLowerCase();

  // let lim;
  // if (spendingLimits[user]) {
  //   lim = spendingLimits[user];
  // } else {
  //   lim = 0;
  // }

  // const limit = spendingLimits[user] ? spendingLimits[user] : 0

  // const limit = spendingLimits?.[user] ?? 0;
  // const limit = getLimit(user);

  // if (value <= getLimit(cleanUser)) {
  // budget.push({ value: -value, description: description, user: user });

  // budget.push({ value: -value, description, user: cleanUser });

  // Replace this above maipulating of the obejct by creating a new object based on the state that we recieve.
  // return [...state, { value: -value, description, user: cleanUser }];

  // }

  // Declarative Way 
  return value <= getLimit(cleanUser) ? [...state, { value: -value, description, user: cleanUser }] : state;
};
// Assigning variabels coz original budget do not gets mutated
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');

const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
  );
  const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');
  
  // const checkExpenses2 = function (state, limits) {
    // Not mutating the state instead creating a new one using map method
    // We do not maipulate any object, we create a copy & then add the property onto that copy
    // return state.map(entry => {
    //   return entry.value < -getLimit(limits, entry.user) ? {...entry, flag: 'limit'} : entry;
    // });

    // for (const entry of newBudget3) {
      // let lim;
      // if (spendingLimits[entry.user]) {
        //   lim = spendingLimits[entry.user];
        // } else {
          //   lim = 0;
          // }
          
          // const limit = spendingLimits?.[entry.user] ?? 0;
          
      //     if (entry.value < -getLimit(entry.user)) 
      //     entry.flag = 'limit';
      // }
    // };

    // we transformed this function here into a pure function, which does not mutate anything because the map method here returns a brand new array. So we give this function an array and it will then create a new one simply by mapping over the original one, which again, creates then a brand new one. And in each position of the array, we then either return a copy of the original entry plus the flag property, or simply we return the original entry as it was. And so with this, again, our function is nice and pure and does not create any side effect and does not manipulate anything.

    const checkExpenses = (state, limits) =>
      state.map(entry => 
        entry.value < -getLimit(limits, entry.user) ? {...entry, flag: 'limit'} : entry
      );
  
    const finalBudget = checkExpenses(newBudget3, spendingLimits);
    // console.log(newBudget3);
    console.log(finalBudget);


    // Impure  function coz it creates a side effect by doing console.log in this function
const logBigExpenses = function (state, bigLimit) {
  // let output = '';
  // for (const entry of budget) 
    // if (entry.value <= -bigLimit) {
    // output += entry.description.slice(-2) + ' / '; // Emojis are 2 chars
    // }

    // output += entry.value <= -bigLimit ? `${entry.description.slice(-2)} / `: '';  // Emojis are 2 chars
  
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);


  const bigExpenses = state.filter(entry => entry.value <= -bigLimit )
  .map(entry => entry.description.slice(-2)).join('/');
  // .reduce((str, cur) => `${str} / ${cur.description.slice(-2)}`, '');

  console.log(bigExpenses); // side effect
};
logBigExpenses(finalBudget, 500);

// In functional way , we push consoles out of the edge but sometimes we want consoles in between or we can say we want side effects 


