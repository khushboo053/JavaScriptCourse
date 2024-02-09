// Exporting Module
console.log('Exporting Module');

// Blocking code
// console.log('Start fetching users');
// await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('Finish fetching');

// have scope to the current module only
const shippingCost = 10;
export const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to the cart. `);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalQuantity as tq, totalPrice };

export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to the cart. `);
}
