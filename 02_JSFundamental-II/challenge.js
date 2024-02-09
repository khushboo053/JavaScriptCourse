// CHALLENGE-1
const calcAverage = (x,y,z) => (x + y + z)/3;

const scoreDolphin = calcAverage(44, 23, 71);
const scoreKoalas = calcAverage(65, 54, 49);

const checkWinner = function (avgDolphins, avgKoalas) {
    if (avgDolphins >= avgKoalas * 2) {
        console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas}) !`);
    }
    else if(avgKoalas >= avgDolphins * 2) {
        console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})!`);
    }
    else {
        console.log('No team wins');
    }
}

checkWinner(scoreDolphin, scoreKoalas);



// CHALLENGE-2
const calcTip = (bill) => {
    let tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.20;
    return tip;
}

const firstTip = calcTip(100);
console.log("The tip is: " + firstTip);

const bills = new Array(125, 555, 44);
const tips = new Array(calcTip(125), calcTip(555), calcTip(44));
console.log(tips);

const totals = new Array(bills[0]+tips[0], bills[1]+tips[1], bills[2]+tips[2]);
console.log(totals);


// CHALLENGE-3
// BMI = mass / (height * height)
const mark = {
    fullName: 'Mark Miller',
    mass: 78,
    height: 1.69,
    calcBMI: function() {
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
}

const john = {
    fullName: 'John Smith',
    mass: 92,
    height: 1.95,
    calcBMI: function() {
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
}

john.calcBMI();
mark.calcBMI();

if(mark.bmi > john.bmi) {
    console.log(`${mark.fullName}'s BMI (${mark.bmi}) is higher than ${john.fullName}'s (${john.bmi})!`)
} else {
    console.log(`${john.fullName}'s BMI (${john.bmi}) is higher than ${mark.fullName}'s (${mark.bmi})!`)
}


// CHALLENGE-4

const billsOne = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tipsOne = [];
const totalsOne = [];

const calcTipone = function (bill) {
    return bill >= 50 && bill <= 300 ? 0.15 * bill : 0.20 * bill;
};

for (let x=0; x<billsOne.length; x++){
    tipsOne.push(calcTipone(billsOne[x]));
    totalsOne.push(billsOne[x] + tipsOne[x]);
}
console.log(tipsOne);
console.log(totalsOne);