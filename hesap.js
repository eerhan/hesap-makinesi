const display = document.querySelector(`.calculator-input`);
const keys = document.querySelector(`.calculator-keys`)

let displayValue =`0`;
let firstValue = null
let operator = null
let waitingForSecondValue = false

updateDisplay();

function updateDisplay() {
    display.value = displayValue
}

keys.addEventListener(`click`, function(e) {
    const element = e.target;

     if(!element.matches(`button`)) return;   //ulasilan elementin buton olup olmadigini kontrol eder degilse tepki vermez

     if(element.classList.contains(`operator`)){ //ulasilan elementin operator mu degilmi bakmasi
        //console.log(`operator`, element.value);
        handleOperator(element.value) // gelen operatorun hangi bilgi oldugu
        updateDisplay();
        return;
    }

    if(element.classList.contains(`decimal`)){ //ulasilan elementin operator mu degilmi bakmasi
       // console.log(`decimal`, element.value);
       inputDecimal();
       updateDisplay();
        return;
    }

    if(element.classList.contains(`clear`)){ //ulasilan elementin operator mu degilmi bakmasi
        // console.log(`clear`, element.value);
        clear();
        updateDisplay();
        return;
    }

    // console.log(`number`,element.value);
    inputnumber(element.value);
    updateDisplay();

});

function handleOperator(nextOperator) {
    const value = parseFloat(displayValue) //hesap makinesine girilen deger 

    if(operator && waitingForSecondValue) { // islem yailinca olan operatoru gunceller
        operator = nextOperator
        return;
    }


    if (firstValue === null) {
        firstValue = value;
    } else if (operator) {
        const result = calculate(firstValue, value, operator)

        displayValue = `${parseFloat(result.toFixed(7))}`; //maks yazi sayisini 7 ile sinirlandinirlandi
        firstValue = result
    }

    waitingForSecondValue = true //ikinci degeri bekliyoruz
    operator = nextOperator

    console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

function calculate(first, second, operator) {
    if (operator === `+`) {
        return first + second
    } else if(operator === `-` ) {
        return first - second
    }else if(operator === `*` ) {
        return first * second
    }else if(operator === `/` ) {
        return first / second;
    }

    return second;
    

}

function inputnumber(num) {

    if(waitingForSecondValue){
        displayValue = num
        waitingForSecondValue = false
    } else {
        displayValue = displayValue === `0`? num: displayValue + num;
    }
    console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

function inputDecimal() {
    if(!displayValue.includes(`.`)) {
    displayValue += `.`;
    }
}

function clear () {
    displayValue = `0`
}

