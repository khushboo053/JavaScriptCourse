// EXECUTION cONTEXT ALWAYS CONTAIN 3 PARTS: Variable Environment, Scope Chain, this keyword

// SCOPING
"use strict";

function calcAge(birthYear) {
  const age = 2024 - birthYear;
  // console.log(firstName);

  function printAge() {
    let output = `${firstName}, You are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;

      // CREATING NEW VARIABLE WITH SAME NAME AS OUTER SCOPE'S VARIABLE
      const firstName = "Steven";

      // NOT CREATING A NEW VARIABLE BUT RE-ASSIGNING A VALUE TO THAT VARIABLE
      // REASSIGNING OUTER SCOPE'S VARIABLE
      output = "NEW OUTPUT"; // PRINT 'NEW OUTPUT'

      const str = `Oh, and You're a millenial, ${firstName}`; // print steven coz block scoped
      console.log(str);

      function add(a, b) {
        return a + b;
      }

      // const output = 'NEW OUTPUT'; // PRINT ABOVE DECLARED OUTPUT
    }
    // console.log(str);
    console.log(millenial);
    // console.log(add(5,5));
    console.log(output);
  }
  printAge();

  return age;
}

const firstName = "Jonas";
calcAge(1987);

// console.log(age);  // We do not have access of this age variable outside the scope
// printAge(); Function scope so we do not have access of this function





////////////////////////////////////////////////////
// HOISTING

// Hoisting with variables
console.log(me); // undefined
// console.log(job); // error
// console.log(year); // error

var me = "Khush";
let job = "coder";
const year = 2003;

// Hoisting with functions

console.log(addDecl(5, 5));
// console.log(addExp(5,5)); // It is in Temporal dead zone (TDZ)
// console.log(addArrow(5,5));
// console.log(addArrow1);
// console.log(addExp1);

function addDecl(a, b) {
  return a + b;
}

const addExp = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b;

var addExp1 = function (a, b) {
  return a + b;
};

var addArrow1 = (a, b) => a + b;

// Example
// console.log(undefined);
// It will take this value of numProducts as 'undefined' so will call the function as it is
if (!numProducts) deleteShoppingCart();
console.log(numProducts);
var numProducts = 10;

function deleteShoppingCart() {
  console.log("All products deleted!");
}

var x = 1;
let y = 2;
const z = 3;

// 'window' is the global scope in browser. We can accesss it by typing it in inspect in console

console.log(x === window.x);
console.log(y === window.y);
console.log(z === window.z);








////////////////////////////////////////////////////
// THIS KEYWORD
console.log("This keyword-------------------");
console.log(this); // window

const calcAgeAgain = function(birthYear) {
    console.log(2024 - birthYear);
    console.log(this); // undefined
}

calcAgeAgain(2003);


// Why is the this keyword undefined in this function, but window in this function? Well, it is because the arrow function does not get its own this keyword. So instead the arrow function simply uses the lexical this keyword, which means that it uses the this keyword of its parent function or of its parents scope which is used globally.


const calcAgeArrow = birthYear => {
    console.log(2024 - birthYear);
    console.log(this); // window
}

calcAgeArrow(2003);

// So when we have a method call, the this keyword inside of the method will be the object that is calling the method. And in this case, that's the obj object.

const obj = {
    year: 2003,
    calcAge: function() {
        console.log(this);
        // Instead of passing argument in function we can use this keyword and reference that object 'year'
        console.log(2024 - this.year);
    }
}

obj.calcAge();

// this keyword will point to the object that is calling the method.

const obj2 = {
    year: 2002,
};

// We simply copy the calcAge() method from obj to obj2
obj2.calcAge = obj.calcAge;

// Now if we see then calcAge() method is also in obj2 and also in obj. But we copied it from 1 object to another and this is called method borrowing.
// Borrowed a method from 1 object to another.

obj2.calcAge(); // It will still show age of person who has been born in 2002 not in 200

// Copying function into a new variable
const f = obj.calcAge;
// check it by write f in console
// f(); // undefined & error


const obj3 = {
  firstName: "Khush",
  year: 2003,
  calcAge: function () {
    // console.log(this);
    console.log(2024 - this.year);

    // Solution-1
    // const self = this; // self or that
    // const isMillenial = function() {
    //     console.log(self);
    //     console.log(self.year >= 1981 && self.year <= 1996);
    // };
    // isMillenial();


    // Solution 2
    const isMillenial = () => {
        console.log(this);
        console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial();
  },

//   greet: () => {
//     console.log(this);
//     console.log(`Hey ${this.firstName}`);
//   },

  greet: function() {
    console.log(this);
    console.log(`Hey ${this.firstName}`);
  },
};

// Arrow function does not get its own this keyword. It simply use this keyword from its surroundings. 
// So in other words, its parents this keyword, and the parent scope of this greet method is the global scope.

// this is actually not a code block. So you might think that, like this kind of block here, ought to create its own scope, but it doesn't. So this is not a code block. It is an object literal.

// Arrow function inherit this keyword from parent scope

obj3.greet(); 
obj3.calcAge();


// Arguments Keyword
const addExpr = function(a,b) {
    console.log(arguments);
    return a+b;
}
addExpr(5,2);

// exactly the two parameters that we passed in. And this can be useful when we need a function to accept more parameters than we actually specified. So this is something that we never did before. So up until this point, we have only ever specified exactly the arguments that we have here in the list of parameters. So we have two parameters, and so two arguments. But it is completely legal to add more arguments. They will not have a name, so we didn't name them, but they exist.
addExpr(2,1,5,4);

// Argument keyword exists but it only exists in regular functions
var addArow1 = (a,b) => {
    console.log(arguments);
    return a+b
};
// addArow1(2,5,8); error














//////////////////////////////////////////////////////
// PRIMITIVES VS OBJECTS
// Primitives are like number, strings, boolean, etc

let age = 20;
let oldAge = age;
age = 21;
console.log(age);
console.log(oldAge);

const me1 = {
    name: 'khushboo',
    age: 20
};

const friend = me1;
friend.age = 22;

// Both giving same output why its so?
console.log('Friend: ', friend);
console.log('Me: ', me1);


// Primitives - 
// Call Stack - where functions are executed, that's where execution contexts run
// Heap- where objects are stored in memory
// its only true for primitive values and not for reference values - All variables declared with const are immutable


// Mutating a primitive value

// primitive Types
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName);

// Reference Types
const jessica = {
    firstName: 'Jessica',
    lastName: 'Williams',
    age: 27
};

// We are copying entire object here
// But behind the scenes, we are just copying reference which will then point to the same object
const marriedJessica =  jessica;
marriedJessica.lastName = 'Davis';
console.log('Before Marriage: ', jessica);
console.log('After marriage: ', marriedJessica);

// Completing changing object, assigning new object to it is completely different then simply changing property of object 
// marriedJessica = {}; // since it is const we can't do so

// Copying Objects
const jessica2 = {
  firstName: "Jessica",
  lastName: "Williams",
  age: 27,
  family: ['Alice', 'Bob'],
};

// Simply copying all properties from 1 object to another
// Behind the scenes : A new object is created beside the heap & jessicaCopy is now pointing to that object, so it has a reference to that object. 
// However, there is still a prblm coz Object.assign property is only working on a first level , means if we have an object inside another object then its value will be same so it will point to the same place in the memory.
// That's why we say that object.assign only creates a shallow copy and not a deep clone which is what we like to have.

// Shallow copy will only copy properties on a first level while a deep clone would copy everything.
const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Davis';
console.log('Before Marriage: ', jessica2);
console.log('After Marriage: ', jessicaCopy);

// Family object is deeply a nested object and therefore Object.assign did not really behind the scenes copy it to new object  

// So in essence, both the objects, Jessica2 and JessicaCopy have a property called family, which points at the same object in the memory heap, and that object is, of course, this array.

// And so, when we change the array in one of them, it's also gonna be changed in the other one. Now, a deep clone is what we would need here, but it is not easy to achieve,

// Usually, we do something like this which is like really complex using an external library, for example, like Lo-Dash, and this library has a ton of helpful tools and one of them is for deep cloning.
jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');
console.log("Before Marriage: ", jessica2);
console.log("After Marriage: ", jessicaCopy);