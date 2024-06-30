// Created by - Aye Chan Aung Thwin
let isNotCalculateDecHr = true;

const rotation = (className, varRotation, toDegree, CW, rotationSpeed) => {
    let intervalID;
    let angleOfRotation = 0;
    if (isNotCalculateDecHr) angleOfRotation = 180;

    const rotate = (className, varRotation, toDegree, CW, rotationSpeed) => {
        let html = getHtmlTagByClassName(className);
        html.style.setProperty(varRotation, angleOfRotation);

        angleOfRotation=CW?angleOfRotation+rotationSpeed:angleOfRotation-rotationSpeed;
        
        let isIntervalClear = false;
        if (!isNotCalculateDecHr && angleOfRotation>=toDegree+rotationSpeed) {
            clearInterval(intervalID);
            isIntervalClear = true;
        }
        if (isNotCalculateDecHr && angleOfRotation<0) {
            clearInterval(intervalID);
            isIntervalClear = true;
        }

        if (isIntervalClear) {
            getHtmlTagByClassName('.swap-btn').disabled = false;
        }
    }

    intervalID = setInterval(function() {
        rotate(className, varRotation, toDegree, CW, rotationSpeed);
    }, 10);

    return false;
}

const swapBtnClicked = () => {
    getHtmlTagByClassName('.swap-btn').disabled = true;
    //UI
    let speed = 5;
    isNotCalculateDecHr = !isNotCalculateDecHr;
    if (isNotCalculateDecHr) {
        getHtmlTagById('title').innerHTML = 'Decimal Hour ➡ HH:MM:SS Converter';
        rotation('.input-container', '--swap-rotation', 0, !isNotCalculateDecHr, speed);
        //Reset Hours
        setValueById('hr', '00');
        setValueById('min', '00');
        setValueById('sec', '00');
    }
    else {
        getHtmlTagById('title').innerHTML = 'HH:MM:SS ➡ Decimal Hour Converter';
        rotation('.input-container', '--swap-rotation', 180, !isNotCalculateDecHr, speed);
        //Reset Hours
        setValueById('dec-hr', '0.0');
    }
}

let prevData = '00';

const arrangeNumber = (val) => {
    let inputToString = (''+(+val));
    let inputToNum = +inputToString;
    if (isNaN(inputToNum)) return prevData;

    switch(inputToString.length) {
        case 1:
            prevData = ''+('0'+inputToNum);
        break;
        case 2:
            prevData = inputToString;
        break;
        case 3:
            prevData = ('0'+inputToString.substring(2));
        break;
        default:
            return prevData;
    } 
    return prevData;
}