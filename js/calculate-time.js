// Created by - Aye Chan Aung Thwin

let hr = 0;
let min = 0;
let sec = 0;

const containsDecmial = (num) => {
    return ((''+num).includes('.'));
}

const splitAndGetString = (num, index) => {
    return ((''+num).split('.')[index]);
}

const splitAndGetNum = (num, index) => {
    return +splitAndGetString(num, index);
}

const subWithPrecision = (a, b, what) => {
    return (a-b).toFixed(splitAndGetString(what, 1).length);
}

const toFixedDecimalPoint = (val, num) => {
    return val.toFixed(splitAndGetString(num, 1).length);
}

const decimalPrecision = (num) => {
    let first = splitAndGetString(num, 0);
    let second = splitAndGetString(num, 1);

    let stopAt = 0;
    let front = second.charAt(0);

    for (let i=1; i<second.length; i++) {
        if (front==second.charAt(i)) {
            stopAt = i;
            break;
        }
        else {
            front = second.charAt(i);
        }
    }

    let temp = [''];
    for (let i=0; i<stopAt; i++) {
        temp.push(second.charAt(i));
    }
    temp = temp.join('');
    let size = temp.length-1;

    temp = `${first}.${temp}`;
    temp = +temp;
    return temp.toFixed(size);
}

const convertToHrMinSec = (num) => {
    if (containsDecmial(num)) {
        hr = splitAndGetNum(num, 0);
        min = subWithPrecision(num, hr, num);
        min *= 60;
    }
    else {
        hr = num;
    }

    if (containsDecmial(min)) {
        let minute = min;
        min = splitAndGetNum(min, 0);

        sec = minute-min;
        sec = decimalPrecision(sec);
        sec *= 60;
    }

    if (containsDecmial(sec)) {
        sec = sec.toFixed(0);
    }

    if (sec>=60) {
        sec-=60;
        min++;
    }
    if (min>=60) {
        min-=60;
        hr++;
    }

    let result = [''];
    result.push(hr);
    result.push(min);
    result.push(sec);
    return result;
}

const decHrPrecision = (decHr) => {
    decHr = decHr.toFixed(5);
    let first = splitAndGetString(decHr, 0);
    let second = splitAndGetString(decHr, 1);

    let stopAt = 0;
    let prev = second.charAt(second.length-1);
    for (let i=second.length-2; i>=0; i--) {
        if (prev!=second.charAt(i)) {
            stopAt = i+2;
            break;
        }
    }

    let result = [''];
    for (let i=0; i<=stopAt; i++) {
        result.push(second.charAt(i));
    }
    result = result.join('');

    return +(`${first}.${result}`);
}

const hrMinSec2DecHr = (hr, min, sec) => {
    let decHr = hr+min/60+sec/3600;
    decHr = decHrPrecision(decHr);
    return decHr;
}

//Button Click Events
let isConvertToDecHr = false;
const swapDetector = () => {
    isConvertToDecHr = !isConvertToDecHr;
    if (!isConvertToDecHr) {
        //reset values
        hr=0;
        min=0;
        sec=0;
    }
    return false;
}

const digitNumber = (val) => {
    let inputToString = (''+(+val));
    let inputToNum = +inputToString;

    let result = '';
    switch (inputToString.length) {
        case 1:
            result = '0'+inputToNum;    
        break;
        default:
            result = inputToNum;
    } 
    return result;
}

const onCalculateBtnClicked = () => {
    if (isConvertToDecHr) {
        hr = +getValueById('hr');
        min = +getValueById('min');
        sec = +getValueById('sec');

        if (hr==0 && min ==0 && sec==0) {
            alert("Please enter HH:MIN:SS to calculate!");
        }

        if (min>=60 || sec>=60) {
            alert("MIN or SEC should be between 0 to 59!");
        }
        
        let decHr = hrMinSec2DecHr(hr, min ,sec);
        setValueById('dec-hr', decHr);
    }
    else {
        let decHr = +getValueById('dec-hr');

        if (decHr==0) {
            alert("Please enter decimal hour to calculate!")
        }

        convertToHrMinSec(decHr);
        setValueById('hr', digitNumber(hr));
        setValueById('min', digitNumber(min));
        setValueById('sec', digitNumber(sec));
    }
    return false;
}