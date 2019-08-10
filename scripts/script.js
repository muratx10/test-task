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

    //user id in database
    let id = 1;

    submit.addEventListener('click', e => {
        e.preventDefault();
        let emailValid = email.classList.value;
        let passwordValid = password.classList.value;
        // let usrExists = allUsers.forEach(item => {
        //     return item.email === email.value
        // });
        if (emailValid.includes('is-valid') && email.value.length < 40 && passwordValid.includes('is-valid')) {
            // let obj = {
            //     'email': email.value,
            //     'password': password.value
            // };
            // allUsers.push(obj);
            
            // db.child(`User ${id}`).child('e-mail').set(email.value);
            // db.child(`User ${id}`).child('passkey').set(password.value);
            // id++;
            db.child(`User ${id}`).set({
                'E-mail': email.value,
                'Password': password.value
            });
            id++;

            injectHTML(email.value);
            loginForm.reset();
            email.classList.remove('is-valid');
            password.classList.remove('is-valid');
        } else return false;


    });






    
    


})