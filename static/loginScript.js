buttonLogin = document.getElementById('buttonLogin')
buttonRegister = document.getElementById('buttonRegister')
nameRegister = document.getElementById('nameRegister')
surNameRegister = document.getElementById('surNameRegister')
phoneRegister = document.getElementById('phoneRegister')
emailRegister = document.getElementById('emailRegister')
passwordRegister = document.getElementById('passwordRegister')
var errorPhoneRegister = false
var errorPasswordRegister = false;
var ButtonLogin = document.getElementById('buttonLogin')
var form = document.getElementById('form')
var loaderAnim = document.getElementById('loaderAnim')
var labelReg = document.getElementById('labelReg')
var labelLogin = document.getElementById('labelLogin')
var login = document.getElementById('login')
var formRegister = document.getElementById('formRegister')
var logo = document.getElementById('logo')
labelLogin.onclick = () => {
    login.style.display = 'block'
}
labelReg.onclick = () => {
    formRegister.style.display = 'block'
}
logo.onclick = () => {
    loaderAnim.classList.add('loader--active')
    setTimeout(() => {
        window.location.href = 'index.html'
    }, 3000);

}

function onLoad() {
    if (sessionStorage.getItem('Location') === 'mainToRegister') {
        loaderAnim.classList.remove('loader--active')
        labelReg.classList.add('active')
        labelLogin.classList.remove('active')
        login.style.display = 'none'
        formRegister.style.display = 'block'
    } else if (sessionStorage.getItem('Location') === 'mainToLogin') {
        loaderAnim.classList.remove('loader--active')
        labelLogin.classList.add('active')
        labelReg.classList.remove('active')
        login.style.display = 'block'
        formRegister.style.display = 'none'
    }
    sessionStorage.setItem("Location", 'login/reg');
}


$('.form').find('input, textarea').on('keyup blur focus', function(e) {

    var $this = $(this),
        label = $this.prev('label');

    if (e.type === 'keyup') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.removeClass('highlight');
        }
    } else if (e.type === 'focus') {

        if ($this.val() === '') {
            label.removeClass('highlight');
        } else if ($this.val() !== '') {
            label.addClass('highlight');
        }
    }

});

$('.tab a').on('click', function(e) {

    e.preventDefault();

    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');

    target = $(this).attr('href');

    $('.tab-content > div').not(target).hide();

    $(target).fadeIn(600);

});
buttonLogin.onclick = function() {
    alert('Вход')
}
buttonRegister.onclick = async function() {
    let nameValue = nameRegister.value;
    let surNameValue = surNameRegister.value
    let phoneValue = phoneRegister.value
    let emailValue = emailRegister.value
    let passwordValue = passwordRegister.value
    if (passwordValue.length < 6) {
        errorPasswordRegister = true
        passwordRegister.value = 'Пароль меньше 6 символов!'
        passwordRegister.type = 'text'
        passwordRegister.style.border = '1px solid red'
        passwordRegister.style.color = 'red'
        setTimeout(() => {
            passwordRegister.value = ''
            passwordRegister.type = 'password'
            passwordRegister.style.border = '1px solid #a0b3b0'
            passwordRegister.style.color = 'white'
        }, 2500);
    } else {
        errorPasswordRegister = false
    }
    if (phoneValue == '+374') {
        errorPhoneRegister = true
        phoneRegister.value = 'Номер телефона не заполенен'
        phoneRegister.type = 'text'
        phoneRegister.style.border = '1px solid red'
        phoneRegister.style.color = 'red'
        setTimeout(() => {
            phoneRegister.value = '+374'
            phoneRegister.type = 'tel'
            phoneRegister.style.border = '1px solid #a0b3b0'
            phoneRegister.style.color = 'white'
        }, 2500);

    } else {
        errorPhoneRegister = false
    }
    if (!errorPasswordRegister && !errorPhoneRegister) {
        const result = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nameValue,
                surNameValue,
                phoneValue,
                emailValue,
                passwordValue
            })
        }).then((res) => res.json())
        if (result.status === 'ok') {
            localStorage.setItem('logined', 'logined')
            localStorage.setItem('name', result.data)
            window.location.href = 'index.html'
        }
    }
}
var loginEmail = document.getElementById('loginEmail')
var loginPassword = document.getElementById('loginPassword')
var errorLogin = false
buttonLogin.onclick = async function() {
    var loginEmailValue = loginEmail.value
    var loginPasswordValue = loginPassword.value
    if (loginEmail.value = '' || loginPassword.value == '') {
        errorLogin = true
        loginEmail.value = 'одно/несколько полей не заполенены'
        loginEmail.style.border = '1px solid red'
        loginEmail.style.color = 'red'
        loginPassword.type = 'text'
        loginPassword.value = 'одно/несколько полей не заполенены'
        loginPassword.style.border = '1px solid red'
        loginPassword.style.color = 'red'
        setTimeout(() => {
            loginEmail.value = ' '
            loginEmail.style.border = '1px solid #a0b3b0'
            loginEmail.style.color = 'white'
            loginPassword.value = ''
            loginPassword.type = 'password'
            loginPassword.style.border = '1px solid #a0b3b0'
            loginPassword.style.color = 'white'
            errorLogin = false
        }, 2500)
    }

    if (!errorLogin) {
        try {
            const result = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    loginEmailValue,
                    loginPasswordValue
                })
            }).then((res) => res.json())
            loginEmail.value = ''
            loginPassword.value = ''
            if (result.status == 'error' && result.error == 'errorUserName') {
                errorLogin = true
                loginEmail.value = 'Пользователя с таким email не существует'
                loginEmail.style.border = '1px solid red'
                loginEmail.style.color = 'red'
                setTimeout(() => {
                    loginEmail.value = ''
                    loginEmail.style.border = '1px solid #a0b3b0'
                    loginEmail.style.color = 'white'
                    errorLogin = false
                }, 2500)
            } else if (result.status == 'error' && result.error == 'logOrPasInc') {
                errorLogin = true
                loginEmail.value = 'логин/пароль не правельные'
                loginEmail.style.border = '1px solid red'
                loginEmail.style.color = 'red'
                loginPassword.type = 'text'
                loginPassword.value = 'логин/пароль не правельные'
                loginPassword.style.border = '1px solid red'
                loginPassword.style.color = 'red'
                setTimeout(() => {
                    loginEmail.value = ' '
                    loginEmail.style.border = '1px solid #a0b3b0'
                    loginEmail.style.color = 'white'
                    loginPassword.value = ''
                    loginPassword.type = 'password'
                    loginPassword.style.border = '1px solid #a0b3b0'
                    loginPassword.style.color = 'white'
                    errorLogin = false
                }, 2500)
            } else if (result.status == 'ok') {
                localStorage.setItem('logined', 'logined')
                localStorage.setItem('name', result.data)
                if (localStorage.getItem('phone') == null) {
                    localStorage.setItem('phone', result.phone)
                } else {
                    localStorage.removeItem('phone')
                    localStorage.setItem('phone', result.phone)
                }

                window.location.href = 'index.html'
            }

        } catch (exceprion) {
            console.log(exceprion)
        }
    }


}