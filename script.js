'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.loginForm');
    const email = document.querySelector('#usrEmail');
    const password = document.querySelector('#password');
    const submit = document.querySelector('.btn');
    const userList = document.querySelector('.userList ol');
    const allUsers = [];

    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    //password must contain minimum 8 chars, at least one letter & one number
    const passPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    
    //Form validation on input
    loginForm.addEventListener('keyup', e => {
        let target = e.target;
        if (target.id === 'usrEmail') {
            if (emailPattern.test(target.value)) {
                target.classList.remove('is-invalid');
                target.classList.add('is-valid');
            } else if (!target.value) {
                target.classList.remove('is-valid', 'is-invalid');
            }
            else {
                target.classList.remove('is-valid');
                target.classList.add('is-invalid');
            }
            // validate password
        } else if (target.id === 'password') {
            if (passPattern.test(target.value)) {
                target.classList.remove('is-invalid');
                target.classList.add('is-valid');
            } else if (!target.value) {
                target.classList.remove('is-valid', 'is-invalid');
            }
            else {
                target.classList.remove('is-valid');
                target.classList.add('is-invalid');
            }
        }
    });

    //Injecting user e-mail to DOM
    const injectHTML = string => {
        const html = `<li class="list-group-item">${string}</li>`;
        userList.innerHTML += html;
    };

    submit.addEventListener('click', e => {
        e.preventDefault();
        let emailValid = email.classList.value;
        let passwordValid = password.classList.value;
        // let usrExists = allUsers.forEach(item => {
        //     return item.email === email.value
        // });
        if (emailValid.includes('is-valid') && email.value.length < 40 && passwordValid.includes('is-valid')) {
            let obj = {
                'email': email.value,
                'password': password.value
            };
            allUsers.push(obj);
            console.log(allUsers);
            injectHTML(email.value);
            loginForm.reset();
            email.classList.remove('is-valid');
            password.classList.remove('is-valid');
        } else return false;
    });






    
    


})