'use strict';
console.log(document.querySelector('.message').textContent);

// DOM - Document Object Model
// DOM- Connection between HTML Documents and javaScript code
// Structured Representation of HTML Documents. Allows JS to access HTML elements and styles to manipulate them.

// Tree structure generated by browser on HTML load

// Rule: Whatever is there in HTML document has to be in DOM

// DOM Methods & properties for DOM Manipulation . Eg: document.querySelector()

// JS is just a dialect of EcmaScript & so all DOM related stuff is not part of JS

// Methods are a part of web APIS
// Web APIs are like libraries that browsers implement & that can be access by JS code
// web APIs are, basically, libraries that are also written in JavaScript and that are automatically available for us to use.

// querySelector(): Select the element which we have to manipulate.

/*
document.querySelector('.message').textContent = 'Correct Number!';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 25;
console.log(document.querySelector('.guess').value);
*/

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const displayMessage = function(message) {
    document.querySelector('.message').textContent = message;
}

document.querySelector('.number').textContent = secretNumber;

document.querySelector('.check').addEventListener('click', function () {
  console.log(document.querySelector('.guess').value);

  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  if (!guess) {
    // document.querySelector('.message').textContent = 'No number';
    displayMessage('No number');
  } 
  else if (guess === secretNumber) {
    // document.querySelector('.message').textContent = 'Correct Number!';
    displayMessage('Correct Number');

    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    if(score > highscore) {
        highscore = score;
        document.querySelector('.highscore').textContent = highscore;
    }
  } 
  else if(guess !== secretNumber) {
    if(score > 1) {
        displayMessage(guess > secretNumber ? 'Too high' : 'Too low');
        score--;
        document.querySelector('.score').textContent = score;
    }
    else {
        displayMessage('You lost the game!');
        document.querySelector('.score').textContent = 0;
    }
  }

//   else if (guess > secretNumber) {
//     if (score > 1) {
//     //   document.querySelector('.message').textContent = 'Too High';
//     displayMessage('Too high')
//       score--;
//       document.querySelector('.score').textContent = score;
//     } else {
//     //   document.querySelector('.message').textContent = 'You lost the game';
//     displayMessage('You lost the game');
//       document.querySelector('.score').textContent = 0;
//     }
//   } 
//   else if (guess < secretNumber) {
//     if (score > 1) {
//     //   document.querySelector('.message').textContent = 'Too low';
//     displayMessage('Too low')
//       score--;
//       document.querySelector('.score').textContent = score;
//     } else {
//     //   document.querySelector('.message').textContent = 'You lost the game';
//     displayMessage('You lost the game');
//       document.querySelector('.score').textContent = 0;
//     }
//   }
});





///////////////////////////////////////
// Coding Challenge #1

/* 
Implement a game rest functionality, so that the player can make a new guess! Here is how:

1. Select the element with the 'again' class and attach a click event handler
2. In the handler function, restore initial values of the score and secretNumber variables
3. Restore the initial conditions of the message, number, score and guess input field
4. Also restore the original background color (#222) and number width (15rem)
*/


document.querySelector('.again').addEventListener('click', function(){
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1;

    document.querySelector('.message').textContent = 'Start guessing....';
    document.querySelector('.score').textContent = score;
    document.querySelector('.number').textContent = '?';
    document.querySelector('.guess').value = '';

    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
});
