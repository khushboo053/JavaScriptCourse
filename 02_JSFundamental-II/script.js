/*
////////////////////////////////////////////////////
// ACTIVATING STRICT MODE

// Any code before this strict is not activated
// It avoids bugs & accidental codes
// First, Strict mode forbids us to do certain things
// Second, it creates visible errors

'use strict';
let hasDriversLicense = false;
const passTest = false;

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log('I can drive: D');

// unexpected strict mode reserved keyword error
// It does not allow us to use those keywords which will be used in future like reserved keywords
// const interface = 'Audio'; 
// const private = 555;




//////////////////////////////////////////////////////
// FUNCTIONS
// Functions are actually just values.
// So just a number or a string or a boolean value.
// Its not a type, i.e not a string type or number type.

// We should keep our code dry, means don't repeat code again & again , nd so what does functions do this.
// Parameters are passed while declaring functions
// Arguments are values which are passed while calling functions

function logger() {
    console.log('My name is Khushboo');
}

// calling / running / invoking function
logger();
logger();
logger();

// Taking input data using parameters which is passed in function
function fruitProcessor(apples, oranges) {
    // console.log(apples, oranges);
    const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
    return juice;
}
const appleJuice = fruitProcessor(10,5);
console.log(appleJuice);
// console.log(fruitProcessor(10,5));

const appleOrangeJuice = fruitProcessor(5,2);
console.log(appleOrangeJuice);

// The same is true for this function, that takes string as a parameter and pass this argument into function. this function executed & returned string as a number.
const num = Number('25');
console.log(num);



//////////////////////////////////////////////////////
// FUNCTION DECLARATIONS VS EXPRESSIONS
// Both works same
// Function Declaration
function calcAge1(birthYear) {
    return 2037 - birthYear;
}

const age1 = calcAge1(2003);


// Function Expression
// Anonyms Function: a function without name
const calcAge2 = function (birthYear) {
    return 2037 - birthYear;
}

const age2 = calcAge2(2003); 
console.log(age1, age2);


// We can call function declaration before they are defined in the code.



/////////////////////////////////////////////////////
// ARROW FUNCTIONS
const calcAge3 = birthYear => 2037 - birthYear;
const age3 = calcAge3(2003);
console.log(age3);

const yearsUntilRetirement = (birthYear, firstName) => {
    const age = 2023 - birthYear;
    const retirement = 65 - age;
    // return retirement;
    return `${firstName} retires in ${retirement} years`;
}
console.log(yearsUntilRetirement(2003, 'Khushboo'));



///////////////////////////////////////////////////
// FUNCTIONS CALLING OTHER FUNCTIONS
function cutFruitPieces(fruit) {
    return fruit * 4;
}

function fruitProcessor(apples, oranges) {
    const applePieces = cutFruitPieces(apples);
    const orangePieces = cutFruitPieces(oranges);

    const juice = `Juice with ${applePieces} apple pieces and ${orangePieces} orange pieces`;
    return juice;
}
console.log(fruitProcessor(5, 3));



/////////////////////////////////////////////////////
// REVIEWING FUNCTIONS
const calcAge = function (birthYear) {
    return 2023 - birthYear;
}

const yearsUntilRetirement = function (birthYear, firstName) {
    const age = calcAge(birthYear);
    const retirement = 65 - age;
    // return retirement;
    // return `${firstName} retires in ${retirement} years`;

    if (retirement > 0){
        console.log(`${firstName} retires in ${retirement} years`);
        return retirement;
    }
    else {
        console.log(`${firstName} has already retired`);
        return -1;
    }
}

console.log(yearsUntilRetirement(2003, 'Khushboo'));




////////////////////////////////////////////////////
// INTRODUCTION TO ARRAYS
const friend1 = 'Michael';
const friend2 = 'Steven';
const friend3 = 'Peter';

const friends = ['Michael', 'Steven', 'Peter'];
console.log(friends);

const years = new Array(2002, 2003, 2018, 2023);
console.log(friends[0]);
console.log(friends[1]);
console.log(friends[friends.length - 1]);

friends[2] = 'Jay';
console.log(friends);

// Only primitive values are immutable & array is not a primitive value, and we can always changes it or muted it 

const khushboo = ['Jonas', 'Peter', 2023 - 2003, 'coder', friends];
console.log(khushboo);
console.log(khushboo.length);

// Execise
const calcAgeFor = function (birthYear) {
    return 2023 - birthYear;
}

const year = [2020, 2018, 2019, 2023];
const age1 = calcAgeFor(year[0]);
const age2 = calcAgeFor(year[1]);
const age3 = calcAgeFor(year[2]);
console.log(age1, age2, age3);

const ages = [calcAgeFor(year[0]), calcAgeFor(year[1]), calcAgeFor(year[2])];
console.log(ages);



/////////////////////////////////////////////////////
// BASIC ARRAY OPERATIONS
// Add elements
const newLength = friends.push('Khushboo');
console.log(friends);
console.log("length:",newLength);

friends.unshift('John');
console.log(friends);

// Remove elements
friends.pop(); //last
const popped = friends.pop();
console.log(popped);
console.log(friends);

friends.shift(); //first
console.log(friends);

// To get index of element
console.log(friends.indexOf('Steven'));
console.log(friends.indexOf('Bob'));

console.log(friends.includes('Steven'));
console.log(friends.includes('Bob'));
console.log(friends.includes('25'));

if (friends.includes('Steven')) {
    console.log('You have a friend called Steven');
}


/////////////////////////////////////////////////////
// INTRODUCTION TO OBJECTS

const obj = {
    firstName: 'Khushboo',
    lastName: 'makhija',
    age: 2023-2003,
    job: 'coder',
    friends: ['Tisha', 'Sam', 'Khush'],
};

/////////////////////////////////////////////////////
// DOT NOTATION & BRACKET NOTATION
// In Dot, Dot is an operator which will go to this object & retrieve to property with the name specified here.

// In Bracket, we can put any expression that we'd like so we don't have to explicitly write the string here,but instead we can compute it from some operation because remember that an operation is basically an expression. So something that produces a value and so we can put that here, inside the brackets.

console.log(obj.lastName);
console.log(obj['lastName']);

const nameKey = 'Name';
console.log(obj['first' + nameKey]);
console.log(obj['last' + nameKey]);

const interestedIn = prompt('What do you want to know about khushboo? Choose between firstName, lastName, age, job, and friends');

console.log(interestedIn);
console.log(obj.interestedIn);

console.log(obj[interestedIn]);

if(obj[interestedIn]) {
    console.log(obj[interestedIn]);
}
else {
    console.log('Wrong Request! Choose between firstName, lastName, age, job, and friends');
}

obj.location = 'Surat';
obj['skype'] = 'Khushboo Makhija';
console.log(obj);

// Challenge 
// Jonas has 3 friends & his best friend is michael.

console.log(`${obj.firstName} has ${obj.friends.length} friends, and her best friend is called ${obj.friends[2]}`);

console.log(`${obj['firstName']} has ${obj['friends'].length} friends & her best friend is ${obj['friends'][2]}`);


////////////////////////////////////////////////////
// OBJECT METHODS
// Any function attached to an object is known as method.
// Arrow functions cannot be used to write object methods

const obj1 = {
    firstName: 'Khushboo',
    lastName: 'makhija',
    birthYear: 2003,
    job: 'coder',
    friends: ['Tisha', 'Sam', 'Khush'],
    hasDriversLicense: true,

    calcAge: function() {
        // console.log(this);
        this.age = 2023 - this.birthYear;
        return this.age;
    },

    getSummary: function() {
        return `${this.firstName} is a ${this.calcAge()} -year old ${obj1.job}, and he has ${this.hasDriversLicense ? 'a' : 'no'} driver's license.`
    }
};

console.log(obj1.calcAge(2003));
console.log(obj1['calcAge'](2003));

console.log(obj1.calcAge());
console.log(obj1.age);
console.log(obj1.age);
console.log(obj1.age);

// challenge
// "Jonas is a 46 year old teacher,and she has a drivers license"
console.log(obj1.getSummary());


/////////////////////////////////////////////////////
// FOR LOOP
// For loop keeps running while condtn is true

for(let i=1; i<=10; i++){
    console.log(`Lifting weights repetition ${i} `);
}



/////////////////////////////////////////////////////
// LOOPING ARRAYS, BREAKING & CONTINUING

const obj2 = [
    'Khushboo',
    'makhija',
    55,
    'coder',
    ['Tisha', 'Sam', 'Khush']
];

const types = [];
for(let i=0; i<obj2.length; i++){
    console.log(obj2[i], typeof obj2[i]);

    types[i] = typeof obj2[i];
    types.push(typeof obj2[i]);
}
console.log(types);

const years = [2019, 2020, 2021, 2023];
const ages=[];

for(let i=0; i<years.length; i++) {
    ages.push(2023- years[i]);
} 

console.log(ages);

// continue & break
console.log('-----------ONLY STRINGS------------');
for(let i=0; i<obj2.length; i++){
    if(typeof obj2[i] !== 'string') continue;
    console.log(obj2[i], typeof obj2[i]);
}


console.log('-----------BREAK WITH A NUMBER------------');
for(let i=0; i<obj2.length; i++){
    // It will not print a number when condtn of getting a number satisfies it loop gets break at that point
    if (typeof obj2[i] === 'number') break;

    console.log(obj2[i], typeof obj2[i]);
}




/////////////////////////////////////////////////////
// LOOPING BACKWARDS & LOPPS IN LOOPS

// 0,1, ... 4
// 4,3,... 0
console.log('-------------------LOOPING Backwards---------------');
for(let i=obj2.length-1; i>=0; i--) {
    console.log(obj2[i]);
}


console.log('--------------LOOPS IN LOOPS--------------');
for(let exercise=1; exercise<4; exercise++) {
    console.log(`Starting exercise ${exercise}`);
    for(let rep=1; rep<6; rep++) {
        console.log(`Exercise ${exercise}: Lifting weights repetition ${rep}`);
    }
}

*/

//////////////////////////////////////////////////////
// WHILE LOOP
// this loop is more versatile than for loop 
let rep=1;
while(rep <= 10){
    console.log(`Repetition: ${rep}`);
    rep++;
}

while(rep<=10) {
    console.log('WHILE: lifting weights repetition ${rep');
    rep++
}

let dice = Math.trunc(Math.random() * 6) + 1;

while(dice !== 6) {
    console.log(`U rolled a ${dice}`);
    dice = Math.trunc(Math.random() * 6) + 1;
    if(dice === 6) console.log('Loop is about to end....');
}