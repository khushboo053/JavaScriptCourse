'use strict';
// Selecting elements
// Both querySelector() & getElementById() workd same but getElementById() works fast
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


// Starting conditions
let scores, currentScore, activePlayer, playing;

const init = function() {  
    // This is not working coz this variables are declared inside a function & has a blocked scope so we have to declare outside and put values inside the function.  
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}
init();

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// Rolling dice functionality
btnRoll.addEventListener('click', function(){
    if(playing) {
        // 1. Generating a random dice number
        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log(dice);
    
        // 2. Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        
        // 3. Check for rolled 1: if true, switch to next player
        if(dice !== 1) {
            // Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            // current0El.textContent = currentScore; // Change Later
        }
        else {
            // switch to next player          
            switchPlayer();
        }
    }
})

btnHold.addEventListener('click', function(){
    if(playing) {
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore
        // console.log(scores[activePlayer]);
        // scores[1] = scores[1] + currentScore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    
        // 2. Check is Player's score is >= 100
        if(scores[activePlayer] >= 100) {
            // Finish the game
            playing = false;
            document
              .querySelector(`.player--${activePlayer}`)
              .classList.add('player--winner');
            document
              .querySelector(`.player--${active - player}`)
              .classList.remove('player--active');
        }
        else{
            // Switch to the next player 
            switchPlayer();
        }
    }    

})


btnNew.addEventListener('click', init
    // Reset all values and classes
)