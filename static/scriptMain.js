var counter = 1
var element;
var secondElement;
var alertLoginFirst = document.getElementById('alertLoginFirst')
var alertSucc = document.getElementById('alertSucc')
var useNumberPhone = document.getElementById('useNumberPhone')
var helloText = document.getElementById('helloText')
var loginButton = document.getElementById('loginButton')
var currentIndex = 1;
const photo1 = document.getElementById('photo1')
const delay = 5000
var currentIndex = 1

function onLoad() {
    setInterval(function() {
        // alert(currentIndex)
        currentIndex++;
        photo1.src = '/img/helloSection/photoSection' + currentIndex + '.jpg'
        if (currentIndex >= 3) {
            currentIndex = 1;
        }
    }, delay);
    if (window.localStorage.getItem('logined') != null) {
        if (window.localStorage.getItem('name') != null) {
            loginButton.style.display = 'none'
            helloText.style.display = 'block'
            helloText.innerHTML = 'Привет,' + window.localStorage.getItem('name') + '!'
        }

    }
}

function clicked(id) {
    if (id === 'pre') {
        if (counter == 1) {
            secondElement = document.getElementById('c' + counter)
            secondElement.classList.remove('active')
            counter = 6
            element = document.getElementById('c' + counter)
            element.classList.add('active')
        } else {
            secondElement = document.getElementById('c' + counter)
            secondElement.classList.remove('active')
            counter--
            element = document.getElementById('c' + counter)
            element.classList.add('active')
        }
    } else if (id === 'next') {
        if (counter == 6) {
            secondElement = document.getElementById('c' + counter)
            secondElement.classList.remove('active')
            counter = 1
            element = document.getElementById('c' + counter)
            element.classList.add('active')
        } else {
            secondElement = document.getElementById('c' + counter)
            secondElement.classList.remove('active')
            counter++
            element = document.getElementById('c' + counter)
            element.classList.add('active')
        }
    }
}

function checkLogin() {
    if (window.localStorage.getItem('logined') == null) {
        alertLoginFirst.style.display = 'block'
        useNumberPhone.style.display = 'block'
    } else {
        alertLoginFirst.style.display = 'none'
        alertSucc.style.display = 'block'
        useNumberPhone.style.display = 'none'
    }
}

var firstClicked = false
    // тут вместо этой переменной можно использовать return в конце таймера->
    // -> но мне лень (Но этот коммент писать не лень,потому что это весело)->
    // -> я пишу коммент не известно для кого 
var errorWithNumber = false
var symbolsScam = ''

async function sendRequestByPhoneNumber() {
    sendReqRegister = document.getElementById('sendReqRegister')
    sendNumberInput = document.getElementById('sendNumberInput')
    inputNumberPhone = document.getElementById('inputNumberPhone')
    if (!firstClicked) {
        sendReqRegister.style.display = 'none'
        alertLoginFirst.style.display = 'none'
        useNumberPhone.innerHTML = 'Забронировать'
        sendNumberInput.style.display = 'block'
        firstClicked = true
    } else {
        inputNumberVal = inputNumberPhone.value
        if (inputNumberVal === '+374') {
            inputNumberPhone.value = 'Номер телефона не заполенен'
            inputNumberPhone.type = 'text'
            inputNumberPhone.style.border = '1px solid red'
            inputNumberPhone.style.color = 'red'
            errorWithNumber = true;
            setTimeout(() => {
                inputNumberPhone.value = '+374'
                inputNumberPhone.type = 'tel'
                inputNumberPhone.style.border = '1px solid black'
                inputNumberPhone.style.color = 'black'
                errorWithNumber = false;
            }, 2500);
        } else if (inputNumberVal.charAt(0) != '+') {
            inputNumberPhone.value = 'Номер телефона должен начинаться с +'
            inputNumberPhone.type = 'text'
            inputNumberPhone.style.border = '1px solid red'
            inputNumberPhone.style.color = 'red'
            errorWithNumber = true;
            setTimeout(() => {
                inputNumberPhone.value = '+374'
                inputNumberPhone.type = 'tel'
                inputNumberPhone.style.border = '1px solid black'
                inputNumberPhone.style.color = 'black'
                errorWithNumber = false;
            }, 2500);
        } else if (inputNumberVal.length > 12) {
            inputNumberPhone.value = 'Номер телефона слишком длинный'
            inputNumberPhone.type = 'text'
            inputNumberPhone.style.border = '1px solid red'
            inputNumberPhone.style.color = 'red'
            errorWithNumber = true;
            setTimeout(() => {
                inputNumberPhone.value = '+374'
                inputNumberPhone.type = 'tel'
                inputNumberPhone.style.border = '1px solid black'
                inputNumberPhone.style.color = 'black'
                errorWithNumber = false;
            }, 2500);
        } else if (!errorWithNumber) {
            for (i = 1; i < inputNumberVal.length; i++) {
                if (isNaN(parseInt(inputNumberVal.charAt(i)))) {
                    symbolsScam += i + ', '
                }
            }
            if (symbolsScam != '') {
                inputNumberPhone.value = 'номера букв в телефоне - ' + symbolsScam
                inputNumberPhone.type = 'text'
                inputNumberPhone.style.border = '1px solid red'
                inputNumberPhone.style.color = 'red'
                setTimeout(() => {
                    inputNumberPhone.value = '+374'
                    inputNumberPhone.type = 'tel'
                    inputNumberPhone.style.border = '1px solid black'
                    inputNumberPhone.style.color = 'black'
                    symbolsScam = ''
                    return
                }, 2500);
            }
            const result = await fetch('/api/registerByPhone', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    inputNumberVal
                })
            }).then((res) => res.json())
            if (result.status === 'ok') {
                alertSucc.style.display = 'block'
                localStorage.setItem('logined', 'logined')
            }
        }
    }
}