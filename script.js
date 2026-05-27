const authToggle = document.getElementById('auth-toggle');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const errorMsg = document.getElementById('error-msg');
const successMsg = document.getElementById('success-msg');
const authContainer = document.getElementById('auth-container');
const dashboardContainer = document.getElementById('dashboard-container');
const displayUsername = document.getElementById('display-username');
const btnLogout = document.getElementById('btn-logout');

// Initialize local database vault in browser memory
if (!localStorage.getItem('retro_accounts')) {
    localStorage.setItem('retro_accounts', JSON.stringify({}));
}

authToggle.addEventListener('click', (e) => {
    e.preventDefault();
    errorMsg.classList.add('d-none');
    successMsg.classList.add('d-none');
    registerForm.classList.toggle('d-none');
    loginForm.classList.toggle('d-none');
    authToggle.textContent = loginForm.classList.contains('d-none') ? "Back to Sign On" : "Create an Account ✨";
});

// SECURE USER REGISTRATION
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    errorMsg.classList.add('d-none');
    successMsg.classList.add('d-none');

    const username = document.getElementById('reg-user').value.trim().toLowerCase();
    const password = document.getElementById('reg-pass').value;

    if (!username || !password) {
        errorMsg.textContent = "Fields cannot be blank!";
        errorMsg.classList.remove('d-none');
        return;
    }

    const accounts = JSON.parse(localStorage.getItem('retro_accounts'));

    if (accounts[username]) {
        errorMsg.textContent = "Error: Screen name is already taken!";
        errorMsg.classList.remove('d-none');
    } else {
        // Save account securely
        accounts[username] = password;
        localStorage.setItem('retro_accounts', JSON.stringify(accounts));
        
        successMsg.textContent = "Account baked successfully! You can now Sign On.";
        successMsg.classList.remove('d-none');
        registerForm.reset();
    }
});

// STRICT PASSWORD VALIDATION SIGN-ON
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    errorMsg.classList.add('d-none');
    successMsg.classList.add('d-none');

    const username = document.getElementById('login-user').value.trim().toLowerCase();
    const password = document.getElementById('login-pass').value;

    const accounts = JSON.parse(localStorage.getItem('retro_accounts'));

    // STRICT CHECK: Username must exist AND password must match exactly
    if (accounts[username] && accounts[username] === password) {
        // Access Granted!
        displayUsername.textContent = username;
        authContainer.classList.add('d-none');
        dashboardContainer.classList.remove('d-none');
    } else {
        // Access Denied!
        errorMsg.textContent = "Access Denied: Invalid Screen Name or Password.";
        errorMsg.classList.remove('d-none');
    }
});

btnLogout.addEventListener('click', () => {
    authContainer.classList.remove('d-none');
    dashboardContainer.classList.add('d-none');
    loginForm.reset();
});
