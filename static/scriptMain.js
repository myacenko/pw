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
var flatContainer = document.getElementById('flatContainer')
var counterOfImgSocials = 1
var valueOfTraslate = -5
var imgSocialsMap = new Map()
var flatIconClicked = false
var loaderAnim = document.getElementById('loaderAnim')
var dropDownClicked = false
var loginLink = document.getElementById('loginLink')
var registrationLink = document.getElementById('registrationLink')
loginLink.onclick = () => {
    loaderAnim.classList.add('loader--active')
    sessionStorage.setItem("Location", 'mainToLogin');
    window.setTimeout(function() {
        window.location.href = 'loginOrRegister.html'
    }, 2800)
}
registrationLink.onclick = () => {
    loaderAnim.classList.add('loader--active')
    sessionStorage.setItem("Location", 'mainToRegister');
    window.setTimeout(function() {
        window.location.href = 'loginOrRegister.html'
    }, 2800)
}

var showInfo1 = document.getElementById('showInfo1')
var clickShowInfo1 = false
showInfo1.onclick = () => {
    var specialContainer1 = document.getElementById('specialContainer1')
    if (!clickShowInfo1) {
        specialContainer1.style.display = 'flex'
        window.setTimeout(function() {
            specialContainer1.style.opacity = '1'
        }, 50)
        showInfo1.innerText = 'Скрыть информацию'
        clickShowInfo1 = true
    } else {
        specialContainer1.style.opacity = '0'
        window.setTimeout(function() {
            specialContainer1.style.display = 'none'
        }, 2500)
        showInfo1.innerText = 'Скрыть информацию'
        clickShowInfo1 = false
    }

}

var showInfo2 = document.getElementById('showInfo2')
var clickShowInfo2 = false
showInfo2.onclick = () => {
    var specialContainer2 = document.getElementById('specialContainer2')
    if (!clickShowInfo2) {
        specialContainer2.style.display = 'flex'
        window.setTimeout(function() {
            specialContainer2.style.opacity = '1'
        }, 50)
        showInfo2.innerText = 'Скрыть информацию'
        clickShowInfo2 = true
    } else {
        specialContainer2.style.opacity = '0'
        window.setTimeout(function() {
            specialContainer2.style.display = 'none'
        }, 2500)
        showInfo2.innerText = 'Скрыть информацию'
        clickShowInfo2 = false
    }

}
var showInfo3 = document.getElementById('showInfo3')
var clickShowInfo3 = false
showInfo3.onclick = () => {
    var specialContainer3 = document.getElementById('specialContainer3')
    if (!clickShowInfo3) {
        specialContainer3.style.display = 'flex'
        window.setTimeout(function() {
            specialContainer3.style.opacity = '1'
        }, 50)
        showInfo3.innerText = 'Скрыть информацию'
        clickShowInfo3 = true
    } else {
        specialContainer3.style.opacity = '0'
        window.setTimeout(function() {
            specialContainer3.style.display = 'none'
        }, 2500)
        showInfo3.innerText = 'Скрыть информацию'
        clickShowInfo3 = false
    }

}




function onMouseEnterDrop() {
    if (!dropDownClicked) {
        openDropDownNav()
    }
}
var goTopActionButonId = document.getElementById('goTopActionButonId')
window.onscroll = function(e) {
    if (window.scrollY > 1000)
        goTopActionButonId.style.opacity = '1'
    else
        goTopActionButonId.style.opacity = '0'
};

function onMouseLeaveMenu() {
    if (dropDownClicked) {
        closeDropDownNav()
    }
}

function flatClicked() {
    if (!flatIconClicked) {
        openFlat()
    } else {
        closeFlat()
    }

}

function openDropDownNav() {
    document.getElementById("myDropdown").classList.add("show");
    dropDownClicked = true
}

function closeDropDownNav() {
    document.getElementById("myDropdown").classList.remove("show");
    dropDownClicked = false
}

function openFlat() {

    if (flatIconClicked === false) {
        counterOfImgSocials = 1
        flatContainer.style.transform = 'rotate(360deg)'
        while (counterOfImgSocials <= 4) {
            imgSocialsMap.get('imgSocials' + counterOfImgSocials).style.opacity = '1'
            imgSocialsMap.get('imgSocials' + counterOfImgSocials).style.transform = 'translateY(' + valueOfTraslate * 1 + 'rem)'
            counterOfImgSocials++
        }
    }
}

function closeFlat() {
    if (flatIconClicked === false) {
        counterOfImgSocials = 1
        flatContainer.style.transform = 'rotate(-360deg)'
        while (counterOfImgSocials <= 4) {
            imgSocialsMap.get('imgSocials' + counterOfImgSocials).style.opacity = '0'
            counterOfImgSocials++
        }
    }
}


var loaderAnim1 = document.getElementById('loaderAnim1')

function onLoad() {
    while (true) {
        element = document.getElementById('imgSocials' + counterOfImgSocials)
        if (element !== null)
            imgSocialsMap.set('imgSocials' + counterOfImgSocials, element)
        else
            break
        counterOfImgSocials++
    }
    if (sessionStorage.getItem('Location') == 'login/reg') {
        loaderAnim1.style.display = 'block'
        window.setTimeout(function() {
            loaderAnim1.classList.remove('loader--active')
        }, 100)
    }
    sessionStorage.setItem('Location', 'main')
    setInterval(function() {
        // alert(currentIndex)
        currentIndex++;
        photo1.src = './img/helloSection/photoSection' + currentIndex + '.jpg'
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
var caruselPhoto = document.getElementById('caruselPhoto')
var counterOfPhotos = 1;
var divCaruselCont = document.getElementById('divCaruselCont')
var coruselAllButtonContainerAllId = document.getElementById('coruselAllButtonContainerAllId')

var userPhone;
var getCall = false
async function checkLogin() {
    if (window.localStorage.getItem('logined') == null) {
        alertLoginFirst.style.display = 'block'
        useNumberPhone.style.display = 'block'
    } else {
        getCall = true
        alertLoginFirst.style.display = 'none'
        userPhone = localStorage.getItem('phone')
        if (userPhone != null) {
            const result = await fetch('/api/getByToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userPhone,
                    getCall
                })
            }).then((res) => res.json())
            if (result.status === 'ok') {

            }
        }
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
                localStorage.setItem('phone', result.phone)
                checkLogin();
            }
        }
    }
}