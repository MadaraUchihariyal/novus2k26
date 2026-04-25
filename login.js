const VOLUNTEER_CREDENTIALS = {
    username: 'admin',
    password: 'admin'
};

function showVolunteerLogin() {
    document.querySelector('.role-selection').style.display = 'none';
    document.querySelector('.card-header').style.display = 'none';
    document.getElementById('volunteerLoginForm').style.display = 'block';
    document.getElementById('loginError').style.display = 'none';
}

function showRoleSelection() {
    document.querySelector('.role-selection').style.display = 'flex';
    document.querySelector('.card-header').style.display = 'block';
    document.getElementById('volunteerLoginForm').style.display = 'none';
    document.getElementById('requestHelpInfo').style.display = 'none';
    document.getElementById('emailRequestForm').style.display = 'none';
}

function handleRequestHelp() {
    showRequestLoginOptions();
}

function showRequestLoginOptions() {
    document.querySelector('.role-selection').style.display = 'none';
    document.querySelector('.card-header').style.display = 'none';
    document.getElementById('requestHelpInfo').style.display = 'block';
}

function handleAnonymousLogin() {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', 'Anonymous');
    localStorage.setItem('loginType', 'anonymous');
    window.location.href = 'index.html';
}

function handleGoogleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', user.email);
            localStorage.setItem('userName', user.displayName);
            localStorage.setItem('loginType', 'anonymous');
            localStorage.setItem('userPhoto', user.photoURL);
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error('Google login error:', error);
            alert('Login failed: ' + error.message);
        });
}

function handleEmailLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('emailPassword').value;
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('emailPassword');

    if (!email || !email.includes('@')) {
        emailInput.classList.add('error');
        setTimeout(() => emailInput.classList.remove('error'), 500);
        return;
    }

    if (!password || password.length < 6) {
        passwordInput.classList.add('error');
        setTimeout(() => passwordInput.classList.remove('error'), 500);
        return;
    }

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('loginType', 'anonymous');
    window.location.href = 'index.html';
}

function showEmailRequestForm() {
    document.getElementById('requestHelpInfo').style.display = 'none';
    document.getElementById('emailRequestForm').style.display = 'block';
}

function showRequestHelpInfo() {
    document.getElementById('emailRequestForm').style.display = 'none';
    document.getElementById('requestHelpInfo').style.display = 'block';
}

function handleVolunteerLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMsg = document.getElementById('loginError');

    if (username === VOLUNTEER_CREDENTIALS.username && password === VOLUNTEER_CREDENTIALS.password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', 'Volunteer - ' + username);
        localStorage.setItem('loginType', 'real');
        window.location.href = 'index.html';
    } else {
        usernameInput.classList.add('error');
        passwordInput.classList.add('error');
        errorMsg.style.display = 'block';
        
        setTimeout(() => {
            usernameInput.classList.remove('error');
            passwordInput.classList.remove('error');
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const loginType = localStorage.getItem('loginType');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (isLoggedIn === 'true' && loginType === 'real') {
        window.location.href = 'index.html';
    }
});