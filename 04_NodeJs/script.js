console.log("hey");

const measureKelvin = function() {
    const measurement = {
        type: 'temp',
        unit: 'K',
        // C) FIX
        value: Number(prompt('Degress celsius: ')),
    };

    console.log(measurement.value);

    // B) FIND
    console.table(measurement);

    // console.log(measurement.value);
    // console.log(measurement.value);
    const kelvin = measurement.value + 273;
    return kelvin;
}

// A) IDENTIFY
console.log(measureKelvin());


const calctempAmplitudeBug = function (t1, t2) {
    const temps = t1.concat(t2);
    console.log(temps);

    let max = 0;
    let min = 0;

    for(let i=0; i<temps.length; i++){
        const curtemp = temps[i];
        if(typeof curtemp !== 'number') continue;
        debugger;

        if(curtemp > max) max = curtemp;
        if(curtemp < min) min = curtemp;
    }

    console.log(max, min);
    return max-min;
};

const amplitudeBug = calctempAmplitudeBug([3,5,1], [9,0,5]);
console.log(amplitudeBug);