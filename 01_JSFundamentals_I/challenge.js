// CHALLENGE-1
// BMI = mass / (height * height)
let massMark = 1.50;
let heightMark = 80;
let massJohn = 1.60;
let heightJohn = 90;

let BMIJohn = massJohn / (heightJohn * heightJohn);
let BMIMark = massMark / (heightMark * heightMark);

console.log(BMIJohn);
console.log(BMIMark);

let markHigherBMI = BMIMark > BMIJohn;
console.log(markHigherBMI);



// CHALLENGE-2
if(BMIJohn > BMIMark) {
    console.log(`Mark's BMI ${BMIMark} is higher than John's ${BMIJohn}!`);
}
else {
    console.log(`John's BMI ${BMIJohn} is higher than Mark's ${BMIMark}!`);
}


// CHALLENGE-3
let dolphinsScored = (96+108+89)/3;
let koalasScored = (88+91+110)/3;

if (dolphinsScored > koalasScored) {
    console.log('Dolphins win the trophy');
}
else if (koalasScored > dolphinsScored) {
    console.log('Koalas win the trophy');
}
else {
    console.log('Both win the trophy');
}



// CHALLENGE-4
const bill = 40;

let tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.20;

console.log(`The bill was ${bill}, the tip was ${tip} and the total value ${bill+tip}`);
