'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.loginForm');
    const email = document.querySelector('#usrEmail');
    const password = document.querySelector('#password');
    const submit = document.querySelector('.btn');
    const userList = document.querySelector('.userList ol');
    const allUsers = [];
    
    //Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyDYcP91akP7ognhjGLNKYsbbFWZ9S4etmM",
        authDomain: "test-task-geeksolutions.firebaseapp.com",
        databaseURL: "https://test-task-geeksolutions.firebaseio.com",
        projectId: "test-task-geeksolutions",
        storageBucket: "",
        messagingSenderId: "1059729712279",
        appId: "1:1059729712279:web:f87f35a7f092b008"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
    //firebase database reference
    const db = firebase.database().ref();
    
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
        if (emailValid.includes('is-valid') && email.value.length < 40 && passwordValid.includes('is-valid')) {
            db.push().set({
                'E-mail': email.value,
                'Password': password.value
            });

            injectHTML(email.value);
            loginForm.reset();
            email.classList.remove('is-valid');
            password.classList.remove('is-valid');
        } else return false;
    });

    const refer = firebase.database().ref();
    refer.once('value', getData);

    function getData(data) {
        let val = data.val();
        let keys = Object.keys(val);
        for (let i = 0; i < keys.length; i++) {
            let k = keys[i];
            let emailValue = val[k]['E-mail'];
            console.log(emailValue);
            injectHTML(emailValue);
        }
    };
});
