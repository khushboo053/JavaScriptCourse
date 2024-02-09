// ASSIGNMENT -VALUES & VARIABLES

let country = "India";
let continent = "Asia";
let population = 7;

console.log(country);
console.log(continent);
console.log(population);

// ASSIGNMENT - DATATYPES
let isIsland = true;
let language;
console.log(isIsland);
console.log(language);
console.log(typeof country);
console.log(typeof continent);
console.log(typeof isIsland);
console.log(typeof population);
console.log(typeof language);


// ASSIGNMENT - LET, VAR, CONST
language = "Hindi";
const languageOne = "Gujarati";
console.log(languageOne);

// It gives SyntaxError, this variable is already declared
// const languageOne = "Hindi";
// console.log(languageOne);


// ASSIGNMENT-BASIC OPERATORS
console.log(population/2);

population++;
console.log(population);

const finlandPopulation = 6;
console.log(finlandPopulation > population);

console.log(population < 33);

// const description = "Portugal is in Europe, and its 11 million people speak portuguese";
const description = country + " is in " + continent + ", and its " + population + " million people speak " + language + ".";
console.log(description);


// ASSIGNMENT - STRINGS & TEMPLATE LITERALS
const descriptionOne = `${country} is in ${continent}, and its ${population} million people speak ${language}.`
console.log(descriptionOne);



// ASSIGNMENT- TAKING DECISIONS
const populationOne = 13;
if (populationOne > 33) {
    console.log(`${country}'s population is above average.`);
}
else {
    console.log(`${country}'s population is ${33 - populationOne} below average.`);
}



// ASSIGNMENT - TYPE CONVERSION & COERCION

console.log('9' - '5'); // 4
console.log('19' - '13' + '17'); // 6 + '17' it concatenates so 617 
console.log('19' - '13' + 17); // 6 + 17 
console.log('123' < 57); // as it copnverts '123' string to number so its False 
console.log(5 + 6 + '4' + 9 - 4 - 2); //11 + '4' + 9 - 4 -2 => '114' + 9 - 4 - 2 => '1149' - 4 - 2 => now in minus it converts to number so answer is 1145 - 2 => 1143 


// ASSIGNMENT - EQUALITY OPERATORS

// const numNeighbours = Number(prompt('How many neighbour countries does your country have?')); 

// Before using Number in above prompt : Here, its considering input as string and so not displaying log of first block becoz === has been used.
/*
if (numNeighbours === 1) {
    console.log('Only 1 border!');
}
else if (numNeighbours > 1){
    console.log('More than 1 border');
}
else {
    console.log('No borders' );
}
*/

// We should use === coz it compares both datatype and value



// ASSIGNMENT- LOGICAL OPERATORS

if (language==="English" && population < 50 && !isIsland) {
    console.log(`Sarah can live in ${country}` );
}
else {
    console.log(`${country} doesn't meet the criteria.` );
}


// ASSIGNMENT - SWITCH STATEMENT 

let languages='spanish';
switch(languages) {
    case 'chinese':
    case 'mandarin': 
        console.log('MOST number of native speakers!' );
        break;
    case 'spanish': 
        console.log('2nd place in number of native speakers');
        break; 
    case 'english': 
        console.log('3rd place');
        break; 
    case 'hindi': 
        console.log('Number 4');
        break; 
    case 'arabic': 
        console.log('5th most spoken language');
        break; 
    default:
        console.log('Great language too');
}


// ASSIGNMENT- THE CONDITIONAL OPERATOR
const populations = 130;
const checkPopulation = populations > 33 ?  console.log(`${country}'s population is above average'`) : console.log(`${country}'s population is below average`);

