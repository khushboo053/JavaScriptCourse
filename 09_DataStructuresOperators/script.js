'use strict';

/////////////////////////////////////////////////
// DESTRUCTURING ARRAYS


const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours1 = {
  // Compute property names rather than writing it manually
  // thu: {
  //   open: 12,
  //   close: 22,
  // },
  [weekDays[3]]: {
    open: 12,
    close: 22,
  },
  [weekDays[4]]: {
    open: 11,
    close: 23,
  },
  [`day-${2+4}`]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};


// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // ES6 ENHANCED OBJECT LITERALS
  // Now the problem here is and it's not really a problem but it can become annoying is that this property name is exactly the same as the variable name from which we're getting this new object

  // so what this will do now is to take this opening hours object and put it into the restaurant object and create a property name with exactly that variable name.
  openingHours1,

  
  // order: function (starterIndex, mainIndex) {
    //   return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    // },
    
  // second enhancement to object literals is about writing methods. So in ES6 we no longer have to create a property, and then set it to a function expression,

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order Recieved ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}, ${ing2} & ${ing3}`);
  },

  orderPizza(mainIngredient, ...othersIngredients) {
    console.log(mainIngredient);
    console.log(othersIngredients);
  },
};

restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'Via del Sole, 21',
  starterIndex: 1,
});

const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

// Destructuring
const [x, y, z] = arr;
console.log(x, y, z);
console.log(arr);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// We can't directly do main = secondary
// const temp = main;
// main = secondary;
// secondary = temp;

[main, secondary] = [secondary, main];
console.log(main, secondary);

// function written in an array & we can immediately destruct the result into different variables

// Allows us to return multiple values from a function
console.log(restaurant.order(2, 0));

// Recieve 2 return values from a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

const nested = [2, 4, [5, 6]];
// const [i,j] = nested;
// console.log(i, j);

const [i, , [j, k]] = nested;
console.log(i, j, k);

// We can also set the default values for the variables when we are extracting them & this is very useful in the case when we don't know the link of array
// So if we have an array that is shorter than we might think, then we might try to unpack the array in positions that don't even exist.

// Default values

const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);

///////////////////////////////////////////////////////
//  DESTRUCTURING OBJECTS

const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// Default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutating Variables
let value1 = 111;
let value2 = 999;
const obj = { value1: 25, value2: 28 };

// When we start a line with '{}' then javascript expects a code-block
// { value1, value2} = obj; // Unexpected token error
({ value1, value2 } = obj);
console.log(value1, value2);

// Nested Objects
const {
  fri: { open: op, close: cl },
} = openingHours1;
console.log(op, cl);

/////////////////////////////////////////////////////
// SPREAD OPERATOR
// To unpack an array

const arr5 = [1, 2, 3];
const badNewArr = [5, 6, arr[0], arr[1], arr[2]];
console.log(badNewArr);

const newArr = [5, 6, ...arr];
console.log(newArr);

console.log(...newArr);
console.log(1, 2, 7, 8, 9);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// Copy Array
const mainMenuCopy = [...restaurant.mainMenu]; //Shallow Copy

// Join 2 arrays
const menuOne = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menuOne);

// Iterables: arrays,strings,maps,sets . Not objects
// Use of spread operator: Converting string into elements of array
const str = 'Khushboo';
const chars = [...str, 'K', 'M'];
console.log(chars);

// Real world examples
const ingredients = [
  // prompt("Let's make Pasta Ingredient1?"),
  // prompt("Ingredient 2"),
  // prompt("Ingredient 3"),
];

console.log(ingredients);

restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
restaurant.orderPasta(...ingredients);

// Objects
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guisppe' };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant }; //Shallow copy
restaurantCopy.name = 'Eat with Aroma';
console.log(restaurantCopy.name);
console.log(restaurant.name);

///////////////////////////////////////////////////////////////////////////////
// REST PATTERNS & PARAMETERS
//  To pack elements in an array

// 1) Destructuring  - Rest Patterns
// SPREAD, becoz on right side of =
const arrFive = [1, 2, ...[3, 4]];

//
const [u, v, ...others] = [1, 2, 3, 4, 5];
console.log(u, v, others);

const [pizza, , Risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, Risotto, otherFood);

// Objects

// there can only ever be one rest in any destructuring assignment, okay and now let's do the same in objects because it also works indeed in objects. So the difference then of course, is that the remaining elements will be collected into a new object and not into a new array.
// In Array, if we write 'sat' then it will take it as a variable but in object it is taking as a value

const { sat, ...weekdays } = restaurant.openingHours1;
console.log(weekdays);

// 2) Functions - Rest Parameters
const add = function (...numbers) {
  // console.log(numbers);
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
};

add(2, 3);
add(5, 3, 4, 7);
add(1, 2, 3, 4, 5, 6, 7, 8, 9);

const array1 = [25, 5, 7];
add(...array1);

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
restaurant.orderPizza('mushrooms');

//////////////////////////////////////////////
// SHORT CIRCUITING (&& , ||)
// OR Operator
// Use any datatype, return any datatype, short circuiting
// Result of or operator is not always Boolean

// If first operand is true then JS doesn't even look to the other operand
console.log('-------------OR--------------');
console.log(3 || 'Khush'); // 3
console.log('' || 'Khush'); // Khush
console.log(null || 'Khush'); // Khush
console.log(true || 0); // true

// Undefined is falsy value so
console.log(undefined || null); // null

// If either of the value is true it will print that true value only
console.log(undefined || 0 || '' || 'Hey' || 25 || null);

restaurant.numGuests = 25;
const guests = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests);

// restaurant dot number of guests is now 23, which is a truthy value, and therefore the OR operator short circuits and it will become the return value
const guests2 = restaurant.numGuests || 10;
console.log(guests2);

// If value is 0 then it will print another value in condition
restaurant.Guest = 0;
const guests3 = restaurant.Guests || 10;
console.log(guests3);

// AND Operator
console.log('------------------------AND----------------');
console.log(0 && 'Khush'); // 0
console.log(7 && 'Khush'); // Khush

console.log('Hello' && 25 && null && 'Khush'); // null

// Practical Example
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

// OR operator will return the first truthy value of all the operands, or simply the last value if all of them are falsy.

// AND operator will return the first falsy value or the last value if all of them are truthy.

// And as for practical applications, we can use the OR operator to set default values, and we can use the AND operator to execute code in the second operand if the first one is true.

/////////////////////////////////////////////
// THE NULLISH COALESCING OPERATOR (??)

console.log('The Nullish Coalescing Operator');

// Nullish: null and undefined (NOT 0 or '')
// And now if we take it off, only then we get 10, which is the default value that we want. So why does this work?

// Becoz the nullish coalescing operator works with the idea or with the concept of nullish values instead of falsy values. And nullish values are null and undefined. That's it. It does not include a zero or the empty string. So basically, for the nullish coalescing operator, it is as if the zero and the empty string were not falsy values and were instead truthy values as well.

// But again, this operator does work with the principle of nullish values. And so all the nullish values will short circuit the evaluation here. Okay, so only if this was null or undefined, only then the second operand here would be executed and returned. And so right now, that's the case as number of guests does not exist, so we commented it out here. And so now it is undefined, and so only then the evaluation continues. But again, as we put it back, it now is zero, and zero is not a nullish value. And therefore, the evaluation here is short circuited, and immediately, this first non-nullish value is returned. All right, and that's actually all for now about this nullish coalescing operator.

const numGuest = 0;
const guestCorrect = restaurant.numGuest ?? 10;
console.log(guestCorrect);

/////////////////////////////////////////////
// LOGICAL ASSIGNMENT OPERATORS

const rest1 = {
  name: 'Capri',
  numGuests: 0,
};

const rest2 = {
  name: 'Chocalate Room',
  owner: 'Khushboo Makhija',
};

// OR Assignment operator
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;

// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// NULLISH assignment operator ( null or undefined )
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// AND Assignment Operator
// In AND operator if it gets first value a falsy value then it will short circuits it nd return that value only
// rest1.owner = rest1.owner && '<ANONYMOUS>'; // owner: undefined
// rest2.owner = rest2.owner && '<ANONYMOUS>';

rest1.owner &&= '<ANONYMOUS'; // it does not print owner part
rest2.owner &&= '<ANONYMOUS';

console.log(rest1);
console.log(rest2);



////////////////////////////////////////////
// LOOPING ARRAYS: THE FOR-OF LOOP

const menuTwo = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menuTwo) console.log(item);

// for (const item of menuTwo.entries()) {
//   console.log(item);
// }

// console.log([...menuTwo.entries()]);

// Destructuring 
for(const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
}






//////////////////////////////////////////////
// ENHANCED OBJECT LITERALS
// Code changes done in above restaurant object and openingHours 




/////////////////////////////////////////////
// OPTIONAL CHAINING (?.)

// THis givs undefined becoz this 'mon' property does not exist
// console.log(restaurant.openingHours1.mon); // undefined

// And so therefore ES2020 introduced a great solution for this, which is a feature called optional chaining. 

// with optional chaining, if a certain property does not exist, then undefined is returned immediately. And so that will then avoid that kind of error that we saw earlier.


if (restaurant.openingHours1 && restaurant.openingHours1.mon) 
  console.log(restaurant.openingHours1.mon.open);

// With Optonal Chaining
console.log(restaurant.openingHours1.mon?.open);

// now we can do the same for opening hours. And now if restaurant.openingHours does not even exist, well, then the Monday property will not even be read and so therefore we don't get that error.

console.log(restaurant.openingHours1?.mon?.open);


const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  console.log(day);
  // If we have to use variable name as a property name, we have to use bracket notation
  // const open = restaurant.openingHours1[day]?.open || 'closed';

  // So, this is an amazing use case of the optional chaining operator and the nullish coalescing operator working together. And in fact, they were introduced into the language at the same time in ES2020 because they were really designed to work well with each other.

  const open = restaurant.openingHours1[day]?.open ?? 'closed';

  console.log(`On ${day}, we open at ${open}`);
}


// So optional chaining does indeed also work for calling methods. So, essentially we can check if a method actually exists before we call it.
// Methods

console.log(restaurant.order?.(0,1) ?? 'Method does not exist');

// undefined is handled
// will check if orderRisotto actually exists. And if it doesn't, well then it will immediately return undefined. And so all of this then returns undefined. And so here in the nullish coalescing operator, we immediately go to that second operant. So that's this one here. And yeah, then that's the result of this whole operation.

console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

// Arrays
const users = [
  { name: 'Khush', email: 'khush@gmail.com'}
];

// We can write users, element number zero and only if it exists. So, optional chaining only then take its name. Okay? And otherwise we want to log user array empty.
console.log(users[0]?.name ?? 'User array empty');

if(users.length > 0) console.log(users[0].name);
else console.log('Users array empty');






/////////////////////////////////////////////////////////
// LOOPING OBJECTS: OBJECT KEYS, VALUES, ENTRIES
// we want to loop over the objects, property names over the values or both together.

// Looping over property names i.e. keys

const properties = Object.keys(openingHours1);
console.log(properties);

let openStr = `We are open on ${properties.length} days: `

for(const day of Object.keys(openingHours1)) {
  // console.log(day);
  openStr += `${day},`
}
console.log(openStr);

// Property Values
const values = Object.values(openingHours1);
console.log(values);

// So all of these keys, values and entries basically transformed the object into an array. And then here we have first the key and then then value.
const entries = Object.entries(openingHours1);
console.log(entries);

for (const x of entries) {
  console.log(x);
}

// [key, value]
// Value itself is an object {open, close}
for (const [key, {open, close}] of entries) {
  console.log(`On ${key} we open at ${open} and close ${close}`);
}









/////////////////////////////////////////////
// SETS
// A collection of unique values
// in new Set([]) passes an iterable like array
// sets are also iterables
// they r different from arrays becoz: elements are unique & order of elements in the set is irrelevant

const ordersSet = new Set(['pasta', 'pizza', 'cheez', 'pasta', 'pizza', 'pasta']);
console.log(ordersSet);

console.log(new Set('Khush'));

console.log(ordersSet.size);
console.log(ordersSet.has('Pizza'));
console.log(ordersSet.has('Bread'));
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
ordersSet.delete('cheez')
console.log(ordersSet);

// how can we retrieve values from set? 
// And the answer, as we will see is no. So this doesn't work, it gives us undefined, no matter what number we put here. And that is because in sets there are actually no indexes. And in fact, there is no way of getting values out of a set. And if we think about this, then it makes sense. So there's really no need for getting data out of a set. That's because if all values are unique, and if their order does not matter, then there is no point of retrieving values out of a set. All we need to know is whether a certain value is in the set or not. And that's why we have the has method. If your goal is to actually store values in order and then retrieve it, then the best use case, is to just use an array.You wouldn't use a set for that.

// sets are also iterables so we can do loop onj them
// looping is possible just on any iterables

for (const order of ordersSet) console.log(order);

// Exampele

const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
// spread operator works on all iterables
const staffUnique = [...new Set(staff)];

console.log(staffUnique);
console.log(new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'CHef', 'Waiter']).size);

// sets are not intended to replace arrays at all
console.log(new Set('khushboo'));




////////////////////////////////////////////
// MAPS: FUNDAMENTALS
// Map is a Data structure that can use to map values to keys 

const rest = new Map();
rest.set('name', 'Classico italino');
rest.set(1, 'Firenze, italy');
console.log(rest.set(2, 'Lisbon, Portugal'));

rest.set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic']);

rest.set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
.set('open', 5)
.set('close', 20)
.set(true, 'We are open: D')
.set(false, 'We are closed :(')

console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

const time = 20;
rest.get(time > rest.get('open') && time < rest.get('close'));

console.log(rest.has('categories'));
rest.delete(2);
// rest.clear();

const arrSix = [1,2];

// Here arrSix is key and Test is its value
rest.set(arrSix, 'Test');
rest.set(document.querySelector('h1'), 'heading')
console.log(rest);
console.log(rest.size);

console.log(rest.get(arrSix));





/////////////////////////////////////////////
// MAPS: ITERATION

// Arrayu of arrays
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again!'],
]);
console.log(question);


// Convert object to map
console.log(Object.entries(openingHours1));
const openingMap = new Map(Object.entries(openingHours1));
console.log(openingMap);

// Quiz app
console.log(question.get('question'));
for (const [key, value] of question) {
  if(typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}

// const ans = Number(prompt('your Answer'))
const ans = 3;
console.log(ans);

console.log(question.get(question.get('correct') === ans))


// Convert map to array
console.log([...question]);
// console.log(question.entries());
console.log(...question.keys());
console.log(...question.values());





/////////////////////////////////////////////////
// WORKING WITH STRINGS (PART-1)
const airline = 'TAP Air Portugal'
const plane ='A320'

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log('B737'[0]);

console.log(airline.length);
console.log('B737'.length);

console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('a'));
console.log(airline.indexOf('portugal'));
console.log(airline.slice(4));
console.log(airline.slice(4, 7));

console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

console.log(airline.slice(-2));
console.log(airline.slice(1,-1));

const checkMiddleSeat = function(seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  if(s === 'B' || s === 'E')
  console.log('you got the middle seat ');
  else console.log('You got lucky');
}

checkMiddleSeat('11B');
checkMiddleSeat('3E');
checkMiddleSeat('23C');

// Whenever we call a method on a string, JavaScript will automatically behind the scenes convert that string primitive to a string object with the same content. And then it's on that object where the methods are called.

console.log(new String('khush'));
console.log(typeof new String('khush'));
console.log(typeof new String('khush').slice(1));




////////////////////////////////////////////
// WORKING WITH STRINGS (PART-2)

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fix Capitalization in name
const passenger = 'kHuSh'; // Khush
const passengerLower = passenger.toLowerCase();
const passengerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// Comparing emails
const email = 'johnnnnn@hello.io';
const loginEmail = '      Johnnnnn@hello.Io \n';

// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();
// console.log(trimmedEmail);

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);


// replacing
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',','.');
console.log(priceUS);

const announcement = 'All passengers come to barding door 23. Boarding door 23!'

console.log(announcement.replace('door', 'gate'));

// console.log(annoucement.replaceAll('door', 'gate'));

console.log(announcement.replace(/door/g, 'gate'));

// Booleans
const planeOne = 'Airbus A320neo';
console.log(planeOne.includes('A320'));
console.log(planeOne.includes('Boeing'));
console.log(planeOne.startsWith('Airb'));

if (planeOne.startsWith('Airbus') && planeOne.endsWith('neo')) {
  console.log('Part of the New Airbus family');
}

// practice Exercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase()
  if(baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are Not allowed on board');
  }
  else {
    console.log('Welcome aboard!');
  }
};

checkBaggage('I have a laptop, some food & a pocket knife')
checkBaggage('Socks and camera')
checkBaggage('Got some snacks and a gun for protection')





////////////////////////////////////////////
// WORKING WITH STRINGS (PART-3)

// Split & Join
console.log('a+very+nice+string'.split('+'));
console.log('Khushboo Makhija'.split(' '));

const [firstName, lastName] = 'Khushboo Makhija'.split(' ');

const newName = ['Ms.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const capitalizeName = function(name) {
  const names = name.split(' ');

  const namesUpper = [];

  for(const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(' '));
}

capitalizeName('jessica ann smith davis')
capitalizeName('khushboo makhija')


// Padding
const message = 'Go to gate 25'
console.log(message.padStart(25, '+').padEnd(30, '+'));
console.log('Khush'.padStart(22, '+').padEnd(30, '+'));

const maskCreditCard = function(number) {
  const str5 = number + '';
  const last = str5.slice(-4);
  return last.padStart(str5.length, '*')
}

console.log(maskCreditCard(4578546879));
console.log(maskCreditCard(587964));
console.log('568741203659874520364102347952');

// Repeat
const message2 = 'Bad weather... All Departures delayed...'
console.log(message2.repeat(5));

const planesInline = function(n) {
  console.log(`There are ${n} planes in line ${'✈'.replace(n)}`);
}
planesInline(5)
planesInline(3)
planesInline(12)






/////////////////////////////////////////////
// STRING METHOD PRACTICE
// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const getCode = str => str.slice(0,3).toUpperCase();

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  
  const output = `${type.startsWith('_Delayed') ? '🔴' : ''}${type.replaceAll('_', ' ')}  ${getCode(from)} ${getCode(to)} (${time.replace(':', 'h')})`.padStart(36);

  console.log(output);
}
                        