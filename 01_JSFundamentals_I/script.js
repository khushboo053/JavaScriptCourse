/*
////////////////////////////////////////////
// VALUES & VARIABLES

let js = "amazing";
if (js === 'amazing') alert ("JS is FUN!");
console.log(50+5+30);

console.log("Khushboo");
console.log(55);

let firstName = "Khushboo"
console.log(firstName);
console.log(firstName);
console.log(firstName);

let job1 = "coder"; // not clear code
let jobOne = "coder"; // clear code

let khushboomakhija = "km";
let $function = 30;

// No variable can start with Capital letter
let Person = "john";

// As "PI" keyword is stored in JS so it can be start with capital letter and so not give an error
let PI = 3.14;

// Correct way of naming variables is in Camelcase format
let myCurrentJob = "Programmer";
console.log(myCurrentJob);



//////////////////////////////////////////////////
// DATATYPES

let jsFun = true;
console.log(typeof jsFun);
// console.log(typeof true);
// console.log(typeof 50);
// console.log(typeof khushboomakhija);
// console.log(typeof "Khushboo");

// Dynamic Typing
jsFun = "YES!";
console.log(typeof jsFun);

let year;
console.log(year);
console.log(typeof year);

year = 2023;
console.log(typeof year);

// This gives output = "object" which is a bug in JS
console.log(typeof null); // object
console.log(typeof NaN); // number



////////////////////////////////////////////////////////
// LET, CONST , VAR

// Here, we muted the variable age or reassigning the value to age variable
let age = 20; 
age = 21;

// It creates a variable that we can't reassign
// It is a Immutable variable
// A variable which cannot be muted 
// We can't declare empty const variables
const birthYear = 2003;
// birthYear = 2002;

// const job; // Not Legal

var job = 'programmer';
job = 'coder';


// let is block scoped
// var is function scoped
// We should never use var keyword 


// This is not a correct way of assigning a value to a variable, we should must use the keyword (let, var or const) as without declaring it declares variable globally but we want to declare it locally.
lastName = "Makhija";
console.log(lastName);






////////////////////////////////////////////////////////////
// BASIC OPERATORS
// 1. Arithmetic Operators
const now = 2023;
const ageJonas = now - 1990;
const ageSarah = now - 1999;
console.log(ageJonas);
console.log(ageSarah);

console.log(ageJonas * 2, ageJonas / 10, 2 ** 3);
// 2 ** 3 means 2 to the power of 3 = 2 * 2 * 2

// Addition operator is used for addition and also to concatenate the strings
const firstName = "Khushboo";
const lastName = "Makhija";
console.log(firstName + ' ' + lastName);
// Better way of concatenating strings is template strings

// 2.Assignment Operators 
let x = 10 + 5;  // 15
x += 10;  // 25
x *= 4; // 100
x++;
x--;
x--;
console.log(x);


// 3. Comparison Operators
console.log(ageJonas > ageSarah); // >, <, >=, <=
console.log(ageSarah <= 18);

const isFullAge = ageSarah >= 18;

console.log(now - 1);

console.log(now - 1991 > now - 2020);


/////////////////////////////////////////////////
// OPERATOR PRECEDENCE
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence

let a,b;
a = b = 25-10-5; // a = b = 10, a=10
// In assignment operator precedence is right to left becoz when it goes from left to right, the value is assigned as a=b but here b do not have any value, b will get value by moving further.

// That's why its right to left precedence becoz its value will be like b=10 and then a=b and now here b has got the value before so its good.

console.log(a,b);

// In this, Divsion has higher precedence than addition so it will divide first then do addition
const averageAge = ageJonas + ageSarah / 2;

const avgAge = (ageJonas + ageSarah) / 2;
console.log(ageJonas, ageSarah, avgAge, averageAge);


///////////////////////////////////////////////////////////////////
// STRINGS & TEMPLATE LITERALS
let country = "India";
let continent = "Asia";
let population = 7;
let language = 'Hindi';
const description = country + " is in " + continent + ", and its " + population + " million people speak " + language + ".";
console.log(description);

const descriptionOne = `${country} is in ${continent}, and its ${population} million people speak ${language}.`
console.log(descriptionOne);

console.log("String with \n\
multiple \n\
lines");


/////////////////////////////////////////////
// TAKING DECISIONS: IF ELSE STATEMENT
const age = 14;
const isOldEnough = age >= 18;

if(isOldEnough) {
    console.log('Sarah can start driving license 🚘');
}
else {
    const yearsLeft = 18 - age;
    console.log(`Sarah is too young. Wait another ${yearsLeft} years :) `);
}


const birthYear = 2003;
let century;
if ( birthYear <= 2000) {
    century = 20;
}
else {
    century = 21;
}
console.log(century);





//////////////////////////////////////////////////////
// TYPE CONVERSION & COERCION
// There are two types of type conversion in JavaScript.

// Implicit Conversion - automatic type conversion
// Explicit Conversion - manual type conversion

// https://www.programiz.com/javascript/type-conversion


// Type Conversion
const inputYear = '2023';
console.log(inputYear + 10);
console.log(Number(inputYear) + 10);
console.log(Number(inputYear), inputYear);

console.log(Number('Khushboo')); // NaN, means it is an invalid number
console.log(typeof NaN);

console.log(String(25), 25);

// Type Coercion
// It deals when 2 values have different types
// In JS, + operator triggers a coercion to string
// When there is operation between number and string, number is converted to string
console.log('I am ' + 20 + 'years old.');

// If JS do not have type coercion
console.log('I am ' + String(20) + 'years old.');

// Here JS converts string to a number
console.log('23' - '10' - 3);
console.log( '23' * '2');
console.log('23' / '2');

let n = '1' + 1;
console.log(n); // 11
n = n-1; 
console.log(n); // 10

// In inspect, in console directly we if do so, it not uses type coercion and so it will not convert string to number.



///////////////////////////////////////////////////
// TRUTHY & FALSY VALUES 
// Falsy values are not exactly false, they become false when we convert them into Boolean. 

// In JS, there are 5 Falsy values: 0, '', undefined, null, NaN
// these are not false values but they become false when we convert them into boolean.
// Everything else are truthy values.
// Conversion to Boolean is always implicit, not explicit
console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean('Jonas'));
console.log(Boolean({}));
console.log(Boolean(''));

// Here, value of money is 0 i.e falsy value so it moves & displays the else part
const money = 0;
if (money) {
    console.log("Don't spend it all");
}
else {
    console.log("You should get a job!");
}


// Here, since height is undefined, it automatically converts it to boolean value and so is falsy value and moves to the else part
// If height is 0,  then it is a number so it should print if part but as we know 0 is falssy value so it prints else part
let height=0;
// let height;
if(height) {
    console.log('YAY! Height is defined ');
}
else {
    console.log('Height is UNDEFINED!');
}



//////////////////////////////////////////////////////////
// EQUALITY OPERATORS: == VS ===
const ageOne = 18;
// This compares value and datatype both
if (ageOne === 18) console.log('You just became an adult: D(strict)');

// This compares onl;y value
if (ageOne == 18) console.log('you just became an adult: D(loose)');

const fav = Number(prompt("What's your favourite number?"))
console.log(fav);
console.log(typeof fav); // string

if (fav === 5) {
    console.log("Cool! 5 is an amazing number.");
}
else if(fav === 7) {
    console.log("7 is also a cool number!");
}
else {
    console.log("Number is neither 5 nor 7");
}



if(fav !== 7) console.log('Why not 5?');




//////////////////////////////////////////////
// LOGICAL OPERATORS
const hasDriversLicencse = true;
const hasGoodVision = true;

console.log(hasDriversLicencse && hasGoodVision);
console.log(!hasGoodVision);
console.log(hasDriversLicencse || hasGoodVision);

const shouldDrive = hasDriversLicencse && hasGoodVision;

if (hasDriversLicencse && hasGoodVision) {
    console.log('Sarah is able to drive');
}
else {
    console.log('Sarah is not able to drive');
}

const isTired = true;
console.log(hasDriversLicencse || hasGoodVision);
console.log(hasDriversLicencse && hasGoodVision && isTired);

// true && true && false
if (hasDriversLicencse && hasGoodVision && !isTired) {
    console.log('Sarah is able to drive');
}
else {
    console.log('Sarah is not able to drive');
}




///////////////////////////////////////////////////////
// SWITCH STATEMENT

const day = 'saturday';
switch(day) {
    case 'monday':
        console.log('Plan course structure');
        console.log('Go to coding meetup');
        break;
    case 'tuesday':
        console.log('Prepare theory');
        break;
    case 'wednesday':
    case 'thursday':
        console.log('Write code examples');
        break;
    case 'friday':
        console.log('record videos');
        break;
    case 'saturday':
    case 'sunday':
        console.log('enjoy');
        break;
    default:
        console.log('Not a valid day');
}



if(day === 'monday') {
    console.log('Plan course structure');
    console.log('Go to coding meetup');
}
else if (day === 'tuesday') {

}
else if (day === 'wednesday' || day === 'thursday') {

}
else if (day === 'friday') {

}
else if (day === 'saturday' || day === 'sunday') {

}
else {
    console.log("Invalid Day");
}





////////////////////////////////////////////////////
// STATEMENTS & EXPRESSIONS
// Expressions produce values
// Statements are like full sentences that translate or action.

if (23 > 10) {
    // here this str itself is an expression  
    // nd below whole line of code is a statement
    const str = '23 is bigger';
}

// In template literals, we only add expressions & not not statements.
const me = 'Khushboo'
const state = 'Gujarat'
// We can't write statements in template literals
// console.log(`I Live in ${state} and ${if (state=='Gujarat')}`);





//////////////////////////////////////////////
// TERNARY OPERATOR
const age = 20;
age >= 18 ? console.log('I like to drink wine') : console.log('I like to drink water');

const drink = age >= 18 ? 'wine' : 'water';
console.log(drink);

let drink2;
if(age >= 18) {
    drink2 = 'wine';
}
else {
    drink2 = 'water';
}
console.log(drink2);

console.log(`I like to drink ${age>=18 ? 'wine' : 'water'}`);

// It is not replacement of if else statement
// when we have bigger blocks of code, we uses if else statement, at that time we can't use ternary operators
// Ternary operator used where we have to take quick decisions

*/




////////////////////////////////////////////////////
// JS Releases :ES5, ES6+, ESNEXT
// - Backward & Forward compatible 