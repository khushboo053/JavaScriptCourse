'use strict';
////////////////////////////////////////////////////////////
// DEFAULT PARAMETERS
const bookings = [];
// ES6
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // ES5
  // numPassengers = numPassengers || 1;
  // price = price || 199;
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('KM123');
createBooking('KM123', 2, 800);
createBooking('KM123', 2);
createBooking('KM123', 5);

// To skip the default parameters
// not passing the arguments while calling the function is similar to undefined
createBooking('KM123', undefined, 1000);

// ///////////////////////////////////////////
// HOW PASSING ARGUMENTS WORKS: VALUE VS REFERENCE

const flight = 'LH234';
const obj = {
  name: 'Khushboo Makhija',
  passport: 245698741230,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Ms.' + passenger.name;

  if (passenger.passport === 245698741230) {
    alert('Checked In');
  } else {
    alert('Wrong Passport');
  }
};
// checkIn(flight, obj)
// console.log(flight); // LH234
// console.log(obj);

// flightNum here is a completely different variable. And therefore, as we changed it here, it did not get reflected in the outside flight variable. Okay, and so it's still LH234

// Is the same as doing...
// When we r copying an object like this, we r only copying a reference to that object in memory heap
// const flightNum = flight;
// const passenger = obj;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000000);
};

newPassport(obj);
// 2 functions manipulating the same object
// Interaction of different functions with same objects can create issues here , as its giving passport above checkedin and here wrong passport becoz of chaning person.passport value in newpassport function
checkIn(flight, obj);

// NOTE: there are two terms that are used all the time when dealing with functions, which is passing by value, and passing by reference,

// So JavaScript does not have passing by reference, only passing by value, even though it looks like it's passing by reference.

// So there are languages like C++, where you can pass a reference to any value, instead of the value itself. This works even with primitives, so you could pass a reference to the value of five, and then the original value, outside of the function, would be changed. And this is called pass by reference.

/////////////////////////////////////////////////////////////////////////////
// FUNCTIONS ACCEPTING CALLBACK FUNCTIONS - called Higher order functions

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const firstUpperWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

//  Functions inside have methods, methods inside have properties
const transformer = function (str, fn) {
  console.log(`Original String: ${str}`);
  console.log(`Transformed String: ${fn(str)}`);
  // name property is in-nbuilt property
  console.log(`Transformed by: ${fn.name}`);
};
transformer('JavaScript is the Best!', firstUpperWord);
transformer('JavaScript is the best!', oneWord);

// JS uses callbacks all the time
// Advantages of callbacks: t makes it easy to split up or code into more reusable and interconnected parts.
// Second, callback functions allow us to create abstraction.
// So basically what abstract and means, is that we hide the detail of some code implementation because we don't really care about all that detail.
const high5 = function () {
  console.log('✋');
};
// addEventListener is a Higher order functon and high5 is a callback function
document.body.addEventListener('click', high5);
['sam', 'khush', 'tish'].forEach(high5);

//////////////////////////////////////////////
// FUNCTIONS RETURNING FUNCTIONS

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

// greetHey is a function in which another function is called 'greet'
const greetHey = greet('Hey');
greetHey('Khush');
greetHey('Jonas');

greet('Hello')('Jonas');

// Rewrite the greet function using arrow function

const greetOne = greeting => name => console.log(`${greeting} ${name}`);
greetOne('Hii')('Jonas');

/////////////////////////////////////////////////////
// THE CALL & APPLY METHODS
const lufthansa = {
  airline: 'lufthansa',
  iataCode: 'LH',
  bookings: [],
  //   book: function() {}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode} ${flightNum}`
    );
    this.bookings.push({flight: `${this.iataCode}${flightNum}`, name})
  },
};
lufthansa.book(236, 'Khushboo Makhija')
console.log(lufthansa);

const eurowings = {
    name: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
}

// 'book' is now a function as below declared it is not a method as above declared 
const book = lufthansa.book;
// book(273, 'Khush') // error coz this keyword is undefined

// How do we tell JavaScript explicitly or manually what this this keyword should look like? Well, there are three function methods to do that and they are call, apply and bind.


// Call Method
book.call(eurowings, 25, 'Emily Cooper');
console.log(eurowings);

book.call(eurowings, 27, 'Gabriel Cooper');
console.log(eurowings);


// Now, of course, these property names, they all need to have the exact same format as this original object here because this method is trying to read just these properties. So it's always iataCode and bookings, as you see here, and airline.

const swiss = {
    name: 'Swiss Air Lines',
    iataCode: 'LX',
    bookings: []
}
book.call(swiss, 528, 'Emily Cooper')
console.log(swiss);


// Apply Method
const flightData = [583, 'Geaorge Cooper'];
book.apply(swiss, flightData)
console.log(swiss);

book.call(swiss, ...flightData);



//////////////////////////////////////////////
// BIND METHOD
// Same as call and apply methos, bind also allows us to manually set this keywords

// the difference is that bind does not immediately call the function. Instead it returns a new function where this keyword is bound.So it's set to whatever value we pass into bind.

const bookEW = book.bind(eurowings)
const bookLH = book.bind(lufthansa)
const bookLX = book.bind(swiss);
bookEW(416, 'John Doe')

const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jonas')
bookEW23('Martha Cooper')

// With Event Listeners
lufthansa.planes = 500;
lufthansa.buyPlane = function() {
    console.log(this);

    this.planes++;
    console.log(this.planes);
}
// lufthansa.buyPlane();

document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa))



// Partial Application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// we bind the above functon & preset the value of rate
// In bind method, first argument is of this keyword but here we dont care abt this keyword so we wrote null
const addVAT = addTax.bind(null, 0.25);
// Above looks like:  
// addVAT = value => value * 0.25;

console.log(addVAT(100));

const addTaxRate = function(rate) {
    return function(value) {
        return value + value * rate;
    }
}
const addVAT2 = addTaxRate(0.25);
console.log(addVAT2(100));







//////////////////////////////////////////////
// IMMEDIATELY INVOKED FUNCTION EXPRESSIONS (IIFE)
// Sometimes in a JS we neesd a function that is only executed once & then never again

const runOnce = function() {
    console.log('This will never run again');
}
runOnce();


// Its just the function value. So it's just a function expression. And then immediately, we call it here. And so this is why this pattern here, is called the Immediately Invoked Function Expression. Or IIFE for short. So Immediately Invoked Function Expression.
// 2 ways of IIFE
(function () {
  console.log('This will never run again');
  const isPrivate = 25;
})();
// console.log(isPrivate); // cannot access isPrivate variable becoz its scope is in function

// Why this ways implemented? we already know that functions create scopes . One scope do not have access to inner scopes
(() => console.log('This will ALSO never run again'))();

// Just create a block, there's no need to creating a function to create a new scope
{
    const isPrivate = 25;
    var notPrivate = 54;
}
// console.log(isPrivate); // not accessible
console.log(notPrivate);







/////////////////////////////////////////////////////////////
// CLOSURES
// Closure is not a feature that we explicitly use
// We dont use closures manually, in some situations which we have to recogize in that we use closures.
// Its not like as we create anytime an array , object. We can't create closures as usuals 
// Closure is a magical it automatically gets created
// closure makes a function remember all the variables that existed at the function's birthplace essentially, So we can imagine the secure booking as being the birthplace of this function.
const secureBooking = function() {
    let passengersCount = 0;

    return function() {
        passengersCount++;
        console.log(`${passengersCount} passengers`);
    }
}

const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker); // in inspect in console, see in scopes , closure is seen




//////////////////////////////////////////////////////////////
// MORE CLOSURE EXAMPLES
// Example 1
let f;
const g = function() {
    const a = 25;
    f = () => console.log(a*2);
};

const h = function() {
    const b = 777;
    f = function() {
        console.log(b*2);
    };
}

g();
f();
console.dir(f);

// Re-assigning f function 
// Reassigning function also createsa closure without returning a function
h();
f();
console.dir(f);

// Example 2
// A timer is another example that we don't need to return a function to see closure in action.
// Boarding usually happens in groups & so here we r having 3 groups
//  closure even have priority & scope chain
const boardPassengers = function (n, wait) {
    const perGroup = n/3;

    setTimeout(function() {
        console.log(`We are now boarding all ${n} passengers`);
        console.log(`There are 3 groups, each with ${perGroup} passengers`);
    }, wait * 1000);

    console.log(`Will start boarding in ${wait} seconds`);
}

const perGroup = 1000;
boardPassengers(600, 3);