/*
// ASSIGNMENT-FUNCTIONS
function describeCountry (country, population, capitalCity) {
  return `${country} has ${population} million people and its capital city is ${capitalCity}`
}
const ans1 = describeCountry('India', 7, 'Delhi');
const ans2 = describeCountry("India", 7, "Delhi");
const ans3 = describeCountry("India", 7, "Delhi");

console.log(ans1, ans2, ans3);


// ASSIGNMENT-FUNCTION DECLARATION VS EXPRESSIONS

function percentageOfWorld1(populationOne) {
    return (populationOne/7900)*100;
}

const percentageOfWorld2 = function(populationOne) {
    return (populationOne / 7900) * 100;
}
const an1 = percentageOfWorld1(3000);
const an2 = percentageOfWorld1(2000);
const an3 = percentageOfWorld1(1000);
console.log(an1, an2, an3);


// ASSIGNMENT - ARROW FUNCTIONS

const percentageOfWorld3 = populationTwo => (populationTwo/7900)*100;

const a1 = percentageOfWorld3(3000);
const a2 = percentageOfWorld3(2000);
const a3 = percentageOfWorld3(1000);
console.log(a1, a2, a3);

// ASSIGNMENT - FUNCTIONS CALLING OTHER FUNCTIONS
console.log("-------------Functions calling other functions-----------");
const describePopulation = (countryThree, populationThree) => {
    const percentage = percentageOfWorld3(populationThree);
    const description = `${countryThree} has ${populationThree} million people which is about ${percentage}%`;
    return description;
}
console.log(describePopulation("China", 1439323776));
console.log(describePopulation("India",7));
console.log(describePopulation("New York", 10));


// ASSIGNMENT- INTRO TO ARRAYS

const populations = [10, 11, 12, 15];
console.log(populations.length === 4);

const percentages = [
    percentageOfWorld1(populations[0]),
    percentageOfWorld1(populations[1]),
    percentageOfWorld1(populations[2]),
    percentageOfWorld1(populations[3]),
]

console.log(percentages);

// ASSIGNMENT-BASIC ARRAY OPERATIONS(METHODS)

const neighbours = ['Norway', 'Sweden', 'Russia'];

neighbours.push('Utopia');
console.log(neighbours);

neighbours.pop();
console.log(neighbours);

if(!neighbours.includes('Germany')) {
    console.log('Probably not a central European country :D');
}

neighbours[neighbours.indexOf('Sweden')] = 'Republic of Sweden';
console.log(neighbours);

// ASSIGNMENT- INTRO TO OBJECTS

const myCountry = {
    country: 'India',
    capital: 'Delhi',
    population: 1380000000,
    language: 'hindi',
    neighbours: 3
}
console.log(myCountry);


// ASSIGNMENT- DOT VS BRACKET NOTATION

console.log(`${myCountry.country} has ${myCountry.population} million ${myCountry.language}-speaking people, ${myCountry.neighbours} neighbouring countries and a capital called ${myCountry.capital}`);

console.log(
  `${myCountry.country} has ${myCountry.population+2} million ${myCountry.language}-speaking people, ${myCountry.neighbours} neighbouring countries and a capital called ${myCountry.capital}`
);

console.log(
  `${myCountry['country']} has ${myCountry['population']-2} million ${myCountry.language}-speaking people, ${myCountry.neighbours} neighbouring countries and a capital called ${myCountry.capital}`
);

// ASSIGNMENT - OBJECT METHODS

const myCountry1 = {
  country: "India",
  capital: "Delhi",
  population: 1380000000,
  language: "hindi",
  neighbours: ["Pakistan", "China", "Nepal"],

  describe: function () {
    return `${this.country} has ${this.population} million ${this.language}-speaking people, ${this.neighbours.length} neighbouring countries and a capital called ${this.capital}`;
  },

  checkIsIsland: function () {
    this.isIsland = this.neighbours === 0 ? true : false;
  },
};
console.log("Describe--------------------");
console.log(myCountry1.describe());
myCountry1.checkIsIsland();
console.log(myCountry1);
console.log(myCountry1.isIsland);

// ASSIGNMENT- FOR LOOP

for (let i=1; i<=50; i++) {
    console.log(`Voter number ${i} is currently voting`);
}

// ASSIGNMENT - LOOPING ARRAYS, BREAKING & CONTINUING

const percentages2 = [];
for(let i=0; i<populations.length; i++){
    percentages2.push(percentageOfWorld1(populations[i]));
}
console.log(percentages2);

// ASSIGNMENT - LOOPING BACKWARDS & LOOPS IN LOOPS

const listOfNeighbours = [
  ["Canada", "Mexico"],
  ["Spain"],
  ["Norway", "Sweden", "Russia"],
]; 

for(let i=0; i<listOfNeighbours.length; i++){
    for(let j=0; j<listOfNeighbours[i].length; j++){
        console.log(`Neighbour: ${listOfNeighbours[i][j]}`);
    }
}

*/
// ASSIGNMENT- WHILE LOOP
const populations = [10,11,132,12,15];
function percentageOfWorld1(populationOne) {
  return (populationOne / 7900) * 100;
}
const percentages3 = [];
let perc;
let i=0;
while(i<populations.length){
        perc = (percentageOfWorld1(populations[i]));
        console.log(perc);
        percentages3.push(perc);
        i++;
}
console.log(percentages3);