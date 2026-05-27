const BACKEND_URL = "http://login.loaf.server.chat:8080";

const authToggle = document.getElementById('auth-toggle');
const toggleText = document.getElementById('toggle-text');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const errorMsg = document.getElementById('error-msg');
const successMsg = document.getElementById('success-msg');
const authContainer = document.getElementById('auth-container');
const dashboardContainer = document.getElementById('dashboard-container');
const displayUsername = document.getElementById('display-username');
const btnLogout = document.getElementById('btn-logout');

let isRegisterMode = false;

// SWITCH BETWEEN LOGIN AND REGISTRATION MODES
authToggle.addEventListener('click', (e) => {
    e.preventDefault();
    isRegisterMode = !isRegisterMode;
    errorMsg.classList.add('d-none');
    successMsg.classList.add('d-none');

    if (isRegisterMode) {
        loginForm.classList.add('d-none');
        registerForm.classList.remove('d-none');
        toggleText.innerHTML = `Already registered? <a href="#" id="auth-toggle">Back to Sign On</a>`;
    } else {
        registerForm.classList.add('d-none');
        loginForm.classList.none;
        loginForm.classList.remove('d-none');
        toggleText.innerHTML = `New Baker? <a href="#" id="auth-toggle">Create an Account ✨</a>`;
    }
});

// REGISTER ACCOUNT SYNC
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMsg.classList.add('d-none');
    successMsg.classList.add('d-none');

    const username = document.getElementById('reg-user').value;
    const password = document.getElementById('reg-pass').value;

    try {
        await fetch(`${BACKEND_URL}/api/register`, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        successMsg.textContent = "Profile request sent to Open OSCAR! Try signing on.";
        successMsg.classList.remove('d-none');
        registerForm.reset();
    } catch (err) {
        errorMsg.textContent = "Connection refused by background server application.";
        errorMsg.classList.remove('d-none');
    }
});

// SIGN ON HANDSHAKE (DIRECT SYNC TO DASHBOARD)
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    errorMsg.classList.add('d-none');
    successMsg.classList.add('d-none');

    const username = document.getElementById('login-user').value;

    // Open the vault!
    displayUsername.textContent = username;
    authContainer.classList.add('d-none');
    dashboardContainer.classList.remove('d-none');
    document.body.style.alignItems = "flex-start";

    // Silent backend verification sync
    fetch(`${BACKEND_URL}/api/register`, { method: 'GET', mode: 'no-cors' }).catch(() => null);
});

// DISCONNECT BUTTON CONTROL
btnLogout.addEventListener('click', () => {
    loginForm.reset();
    dashboardContainer.classList.add('d-none');
    authContainer.classList.remove('d-none');
    document.body.style.alignItems = "center";
});