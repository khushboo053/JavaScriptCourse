'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// FIRST AJAX CALL
//creating ajax call
/*
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();
  // console.log(request.responseText);

  request.addEventListener('load', function () {
    const data = JSON.parse(this.responseText)[0]; //to convert in object
    console.log(data);

    const html = `
        <article class="country">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 100000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('usa');
getCountryData('portugal');
getCountryData('germany');
getCountryData('India');
*/

//////////////////////////////////////////////////////////////////
// CALLBACK HELL

const renderCountry = function (data, className = '') {
  const html = `
        <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 100000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
/*
const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();
  // console.log(request.responseText);

  request.addEventListener('load', function () {
    const data = JSON.parse(this.responseText)[0]; //to convert in object
    console.log(data);

    // Render Country
    renderCountry(data);

    // Get Neighbour Country (2)
    const neighbour = data.borders?.[0];

    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      // console.log(this.responseText);
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbour('usa');
// getCountryAndNeighbour('portugal');
// getCountryAndNeighbour('germany');
// getCountryAndNeighbour('India');

setTimeout =
  (() => {
    console.log('1 second passed');
    setTimeout =
      (() => {
        console.log('2 second passed');
      },
      1000);
    setTimeout =
      (() => {
        console.log('3 second passed');
      },
      1000);
    setTimeout =
      (() => {
        console.log('4 second passed');
      },
      1000);
  },
  1000);

//   Callback hell makes code harder to maintain, & very difficult to understand & reason about & so will have more bugs & worse code
*/

////////////////////////////////////////////////////////////////////
// PROMISES & FETCH API
// Callback hell issue can be solved by so called Promises
// Replace old XMLHTTPrequest function with The modern way of making AJAX calls. & that is by using the Fetch API
/*
const request = fetch(`https://restcountries.com/v2/name/India`);
console.log(request);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`).then(function (
//     response
//   ) {
//     console.log(response);
//     return response.json();
//   })
//   .then(function(data){
//     console.log(data);
//     renderCountry(data[0]);
//   })
// };


//////////////////////////////////////////////////////////////////
// CHAINING METHOD
// Here, instead of Callback hell, we have flat chain of promises
// Promises r powerful & elegant solution to handle asynchronous code.
const getJSON = function(url, errorMsg = 'Something went wrong') {
    return fetch(url).then( response => {
        if (!response.ok) {
          throw new Error(`${errorMsg} ${response.status}`);
        }
        return response.json();
    }
    )
}


// const getCountryData = function (country) {
//     fetch(`https://restcountries.com/v2/name/${country}`)

//     // Becomes a Rejected Promise
//       .then(response => {
//         console.log(response);
        
//         // Simply creating own error to reject the promise on purpose, so that we can handle the error down in catch method
//         if(!response.ok) {
//             throw new Error(`Country not found ${response.status}`)
//         }
//         return response.json();
// })
//       .then(data => {
//         renderCountry(data[0]);
//         // const neighbour = data[0].borders?.[0];
//         const neighbour = 'kjhgfdsahjj';

//         if (!neighbour) return;

//         // Country 2
//         return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//       })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`Country not found ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => renderCountry(data, 'neighbour'))
//       .catch(err => {
//           console.error(`${err}`);
//           renderError(`Something went wrong ${err.message}. Try again!`)
//       })
//       .finally(() => countriesContainer.style.opacity = 1)
// };


const getCountryData = function (country) {
    // Country 1
    getJSON(
      `https://restcountries.com/v2/name/${country}`,
      'Country not found'
    )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
    //   const neighbour = 'kjhgfdsahjj';
    console.log(neighbour);

      if (!neighbour) throw new Error('No neighbour found!');

      // Country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })
   
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err}`);
      renderError(`Something went wrong ${err.message}. Try again!`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};






// getCountryData('portugal');
// getCountryData('germany');



/////////////////////////////////////////////////////////////
// HANDLING REJECTED PROMISES
// Actually the only way in which the fetch promise rejects is when the user loses his internet connection

// We have now uncaught promise coz we have failed to fetch. The promise that's returned from the fetched function was actually got rejected
btn.addEventListener('click', function(){
    getCountryData('portugal');
})


// Now there are two ways of handling rejections 3:03 and the first one is to pass a second callback function 3:06 into the then method. 3:10 So the first callback function here 3:11 is always gonna be called for the fulfilled promise. 3:15 so for a successful one. 3:17 But we can also pass in a second callback 3:20 which will be called when the promise was rejected.

const renderError = function(msg) {
    countriesContainer.insertAdjacentText('beforeend', msg);
    // countriesContainer.style.opacity = 1;
}
// then method is only called when promise is fulfilled
// catch method - when promise rejected
// finally method - for something that always needs to happen no matter the result of the promise


/////////////////////////////////////////////////////////////////////
// THROWING ERRORS MANUALLY
// getCountryData('kjhgdjhkh');

// country that has no neighbour & have island 
getCountryData('australia'); 


*/

////////////////////////////////////////////////////////////////////////////////
// ASYNCHRONOUS BEHIND THE SCENES

// So, the image started loading asynchronously in the web APIs environment and not in the call stack, right. We then used addEventListener to attach a callback function to the image load event. And this callback is basically or asynchronous code 12:05 it's code that we deferred into the future 12:08 because we only want to execute it once the image 12:11 has loaded. 12:13 And in the meantime, the rest of the code kept running. 12:17 Now addEventListener did not put the callback directly 12:21 in the callback queue. 12:23 It simply registered the callback, which then kept waiting 12:27 in the web APIs environment until the load event 12:30 was fired off. 12:32 Only then the environment put the call back into queue. 12:36 Then while in the queue the callback kept waiting 12:40 for the event loop to pick it up 12:42 and put it on the call stack. 12:44 And this happened as soon as the callback was first in line 12:48 and the call stack was empty. 12:51 And, that's it actually. 12:52 So, all this happened so that the image did not have to load in the call stack, but in the background 13:00 in a non blocking way. o, in a nutshell, the web APIs environment, 13:06 the callback queue 13:07 and the event loop, all together, make it possible 13:11 that asynchronous code can be executed in a non blocking way 13:15 even with only one thread of execution in the engine.

// Code outside of any callback will run first
// Well, the timer appears first in the coat 3:35 and so it kind of finished first. 3:37 And so it's callback, 3:39 will be put on the callback queue first, but does that mean 3:42 that this call back here will be executed first? 3:46 Well, actually, no, it doesn't. 3:49 And that's because of the micro-tasks queue, remember? 3:54 So the callback of the resolved promise here, 3:57 so this one will be put on the micro-tasks queue and this 4:02 micro-tasks queue, as you learned in the last video 4:05 has priority over the callback queue. 4:08 And so after this whole code runs, 4:11 we will have one callback in a callback queue 4:13 and one in a micro-tasks queue. 4:16 And therefore the one from the micro tests queue 4:19 should be executed first. 4:21 And so therefore the callback from the micro-tasks queue 4:25 should be executed first. And so that's this one here and there for the first message 4:31 to appear of these two, should be resolved Promise one.

/*
console.log('Test start');
setTimeout(() => console.log('0 sec timer'),0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));

Promise.resolve('Resolved promise 2').then(res => {
  for(let i=0; i<5; i++){
    console.log(res)
  }
})

console.log('Test end');
*/

//////////////////////////////////////////////////////////////
// PROMISES
/*
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening');
  setTimeout(function() {
    if(Math.random() >= 0.5) {
      resolve('You WIN 💲');
    }
    else {
      reject(new Error('You lost the money 💩'));
    }
  }, 2000);
});

// e have to do 10:43 is to consume that promise like this. 10:46 And so this is a really nice and helpful pattern. 10:49 Now, in practice, most of the time all we actually do 10:53 is to consume promises. 10:55 And we usually only built promises 10:58 to basically wrap old 11:00 callback based functions into promises. 11:03 And this is a process that we call promisifying. 11:06 So basically promisifying 11:08 means to convert callback based asynchronous behavior 11:12 to promise based.
lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout
// Promisify the set timeout function & create a wait function
// Here, we do no need reject parameter coz its impossible for timer to fail
const wait = function(seconds) {
  return new Promise(function(resolve){
    setTimeout(resolve, seconds * 1000)
  })
}

// Consume promises
// Here, is exactly like when we wanted to chain 2 sequential Ajax calls using the fetch functions.
// No callback hell issue structure

wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 second passed');
    return wait(1);
  })
  .then(() => console.log('4 second passed'));


Promise.resolve('km').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));
*/

////////////////////////////////////////////////////////////
// PROMISIFYING THE GEOLOCATION API
/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
// getPosition().then(pos => console.log(pos));

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} 💥`));
};

btn.addEventListener('click', whereAmI);

console.log('Getting Position');
getPosition().then(pos => console.log(pos));
*/

///////////////////////////////////////////////////////
// CONSUMING PROMISES WITH ASYNC_AWAIT, TRY...CATCH
// Async Function- A function that will keep running in the background while performing the code that inside of it, then this function is done it automatically returns a promise
// Async Await is all abt consuming promises

/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

// fetch(`https://restcountries.com/v2/name/${country}`).then(res => console.log(res));

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();
    console.log(dataGeo);

    // Country data
    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.country}`
    );

    // FIX:
    if (!res.ok) throw new Error('Problem getting country');

    const data = await res.json();
    console.log(data);
    renderCountry(data[0]);

    return `You r in ${dataGeo.city}, ${dataGeo.country}`

  } catch (err) {
    console.error(`${err} 💥`);
    renderError(`💥 ${err.message}`);

    // Reject promise returned from async function
    throw err;
  }
};

console.log('1: Will get location');
// const city = whereAmI();
// console.log(city); // async function alwways return a promise

whereAmI()
  .then(city => console.log(`2: ${city}`))
  .catch(err => console.error(`2: ${err.message}`))
  .finally(() => console.log('3: Finished getting location'));


// IIFE Function 
// IIFE (Immediately Invoked Function Expression) is a JavaScript function that runs as soon as it is defined 1. It is a design pattern that is used to create a new scope for variables and functions, which helps to avoid naming conflicts and polluting the global namespace 2.

(async function() {
  try {
    const city = await whereAmI()
    console.log(`2: ${city}`);

  } catch (error) {
    console.error(`2: ${err.message} 🧨`);
  }
  console.log('3: Finished getting location');
})();
*/

//////////////////////////////////////////////////////////////////////////////
// RUNNING PROMISES IN PARALLEL
// Instead of runing these in sequence we can run it in parallel so all at the same time coz no all 3's r dependent on each other & also we r calling them 3 'data1, data2, data3' as AJAX calls
/*
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMsg} ${response.status}`);
    }
    return response.json();
  });
};

const get3Countries = async function(c1, c2, c3) {
  try {
    // Running in Sequence
    // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);
    // console.log([data1.capital, data2.capital, data3.capital]);

    // Running in Parallel
    // If 1 of the promise gets rejects then the whole promise.all rejects as well. So promise.all short circuits when 1 promise rejects
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`)
    ])
    console.log(data.map(d => d[0].capital));

  } catch (error) {
    console.error(error);
  }
};
get3Countries('portugal', 'canada', 'tanzania');
*/

// so whenever you have a situation in which you need to do multiple asynchronous operations 10:02 at the same time, 10:03 and operations that don't depend on one another, 10:07 then you should always, always run them in parallel, 10:10 just like we did here using promise.all.

// that's called the promise.all combinator. 10:41 So it's called a combinator function 10:44 because it allows us to combine multiple promises. 10:48 And there are actually other combinator functions,

/////////////////////////////////////////////////////////////////////////////////
// PROMISE COMBINATORS
// Promise.race - receives an array of promises and it also returns a promise.

// now these three promises will basically 1:54 race against each other, like in a real race. 1:57 Now, if the winning promise is then a fulfilled promise, 2:01 then the fulfillment value of this whole race promise 2:06 is gonna be the fulfillment value of the winning promise.

// In Promised.race, 3:05 we only get one result 3:07 and not an array of the results of all the three.

// Now a promise that gets rejected 3:14 can actually also win the race. 3:16 And so we say that Promise.race short circuits 3:19 whenever one of the promises gets settled. 3:22 And so again, that means no matter if fulfilled or rejected.

// Promise.race is actually very useful 3:48 to prevent against never ending promises 3:51 or also very long running promises.
/*
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMsg} ${response.status}`);
    }
    return response.json();
  });
};

(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/italy`),
    getJSON(`https://restcountries.com/v2/name/egypt`),
    getJSON(`https://restcountries.com/v2/name/mexico`),
  ]);
  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v2/name/tanzania`),
  // timeout(0.001),
  timeout(5),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// Promise.allSettled
// Promise.all 9:17 will short circuit as soon as one promise rejects, 9:21 but Promise.allSettled, simply never short circuits. 9:26 So it will simply return 9:27 all the results of all the promises. 9:31 So Promise.allSettled.

Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Success'),
]).then(res => console.log(res));

Promise.all([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Promise.any [ES2021]
// Promise.any takes in an array 12:28 of multiple promises and this one will then return 12:31 the first fulfilled promise 12:34 and it will simply ignore rejected promises. 12:37 So basically Promise.any is very similar 12:40 to Promise.race with the difference 12:43 that rejected promises are ignored. 12:46 And so therefore the results of Promise.any 12:50 is always gonna be a fulfilled promise, 12:52 unless of course all of them reject, okay.

Promise.any([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
*/
