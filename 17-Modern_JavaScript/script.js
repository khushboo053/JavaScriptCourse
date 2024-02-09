// OVERVIEW OF MODULES, EXPORTING & IMPORTING

// In ES6, all modules r executed in strict mode defualt
// Importing Module

// import { addToCart, totalPrice as price, tq } from "./shoppingCart.js";
// addToCart('Cheez cubes', 5);
// console.log(price, tq);

console.log('Importing Module');

// console.log(shippingCost); // scope inside the shoppingCart module only

// import * as ShoppingCart from './shoppingCart.js';
// Exporting a Public API just like as a class
// ShoppingCart.addToCart('bread', 10);
// console.log(ShoppingCart.totalPrice);

// Importing a default function
// import add, { addToCart, totalPrice as price, tq } from "./shoppingCart.js";
// console.log(price);

import add, { cart } from './shoppingCart.js';
add('Icecream', 2);
add('bread', 2);
add('Milk', 3);

console.log(cart);

// Imports are not copies of exports Instead Imports are like a live connection to exports, it means that it point to the same place in memory. If it was a copy , then here we would not get anything in the array

///////////////////////////////////////////////////////////////
// TOP-LEVEL AWAIT (ES2022)
// Use of await keyword outside of async functions
// This only works in modules & in scripts it will not work

// console.log('Start Fetching');
// This await keyword outside the async function is blocking the entire execution of this module
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('Something');

// const getLastPost = async function(){
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await res.json();
//   console.log(data);

//   return {title: data.at(-1).title, text: data.at(-1).body}
// }
// const lastPost = getLastPost();
// console.log(lastPost);

// Not very clean
// lastPost.then(last => console.log(last));

// Using top-level await
// const lastPost2 = await getLastPost();
// console.log(lastPost2);

// in Top-level await: if one module imports a module which has a top-level await, then the importing module will wait for the imported module to finish the blocking code.

////////////////////////////////////////////////////////////////////////////////////
// MODULE PATTERN
// Main goal is to encapsulate functionality, to have private data, & to expose a public API
/*
const ShoopingCart2 = (function() {
    const cart = [];
    const shippingCost = 20;
    const totalPrice = 237;
    const totalQuantity = 23;

    const addToCart = function (product, quantity) {
      cart.push({ product, quantity });
      console.log(`${quantity} ${product} added to the cart, shipping cost is ${shippingCost} `);
    };

    const orderStock = function (product, quantity) {
      cart.push({ product, quantity });
      console.log(`${quantity} ${product} ordered from supplier. `);
    };

    return {
      addToCart,
      cart,
      totalPrice,
      totalQuantity,
    };
})();

ShoopingCart2.addToCart('apple', 5);
ShoopingCart2.addToCart('Mango', 3);
console.log(ShoopingCart2);
console.log(ShoopingCart2.shippingCost);

// CLosures allow a function to have access to all the variables that were present at its birthplace
*/

///////////////////////////////////////////////
// COMMON JS MODULES
// Export
// It works in browser in node.js
/*/
export.addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(
    `${quantity} ${product} added to the cart, shipping cost is ${shippingCost} `
  );
};

// Import
const { addToCart } = require('./shoppingCart.js');
*/

///////////////////////////////////////////////////////////////
// INTRODUCTION TO NPM
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from './node_modules/lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};
const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;
console.log(stateClone);
console.log(stateDeepClone);

///////////////////////////////////////////////////////////////////
// BUNDLING WITH PARCEL & NPM SCRIPTS

// This will not reload the page just as it does at login time of bankist app, when user automatically gets logout after page reload or refresh
if (module.hot) {
  module.hot.accept();
}

///////////////////////////////////////////////////////////////////
// CONFIGURING BABEL & POLYFILLING

class Person {
  greeting = 'Hey';
  constructor (name) {
    this.name = name;
    console.log(`${this.greeting} ${this.name}`);
  }
}
const jonas = new Person('Jonas');

console.log('Jonas' ?? null);

console.log(cart.find(el => el.quantity >= 2));

// promise is an ES6 feature 9:18 but again, it was not converted back to ES5 9:22 and the reason for that is that 9:24 Babel can actually only transpile ES6 Syntax. 9:29 So data things like arrow functions, 9:31 classes, const, or the spread operator. 9:36 So these are basically things 9:38 that have an equivalent way of writing them in ES5.

Promise.resolve('TEST').then(function(x){
  return console.log(x);
})

// Some of the features like find & promise can not be transpiled but it can be polyfilled.
import 'core-js/stable';
// import 'core-js/stable/array/find';
// import 'core-js/stable/promise';

// A polyfill or polyfiller is a code segment that is supposed to behave identically to a newer feature of JavaScript and still being able to run on older versions.

//  For example, ES2015 provides a new utility Number.isNaN(…) to provide a secure and accurate method to check for NaN or Not a Number values. We can use polyfilling to replicate this behavior and use it on those pre-ES2015 browsers. The following snippet will be helpful in our case.

// Check if Number.isNaN already exists. 
// If False then proceed. 
/*
if (!Number.isNaN) { 
  
    // Define explicitly for older browsers. 
    Number.isNaN = function isNaN(x) { 
  
        // This is a property of NaN. 
        // No two NaN can be equal to the other. 
        // Because NaN is a concept not a comparable value. 
        return x !== x; 
    }; 
} 
*/

//  a “Transpiler” to be a tool that transforms code with newer syntax into older code equivalents and this process is called “Transpiling”.

// Polifilling async function
import 'regenerator-runtime/runtime.js';