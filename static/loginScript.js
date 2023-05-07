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
var loginEmail = document.getElementById('loginEmail')
var loginPassword = document.getElementById('loginPassword')
var form = document.getElementById('form')

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
            window.location.href = 'index.html'
        }
    }
}
buttonLogin.onclick = function() {
    if (loginEmail.value == 'admin@sss' && loginPassword.value == 'admin') {
        localStorage.setItem('logined', 'logined')
        window.location.href = 'index.html'
    }
}