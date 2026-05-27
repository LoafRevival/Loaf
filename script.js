const BACKEND_URL = "http://127.0.0.1:8080";
const authToggle = document.getElementById('auth-toggle');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const errorMsg = document.getElementById('error-msg');
const successMsg = document.getElementById('success-msg');
const authContainer = document.getElementById('auth-container');
const dashboardContainer = document.getElementById('dashboard-container');
const displayUsername = document.getElementById('display-username');
const btnLogout = document.getElementById('btn-logout');

authToggle.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.classList.toggle('d-none');
    loginForm.classList.toggle('d-none');
    authToggle.textContent = loginForm.classList.contains('d-none') ? "Back to Sign On" : "Create an Account";
});

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        await fetch(`${BACKEND_URL}/api/register`, {
            method: 'POST', mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: document.getElementById('reg-user').value, password: document.getElementById('reg-pass').value })
        });
        successMsg.textContent = "Request sent! Try signing on.";
        successMsg.classList.remove('d-none'); registerForm.reset();
    } catch {
        errorMsg.textContent = "Server connection refused."; errorMsg.classList.remove('d-none');
    }
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    displayUsername.textContent = document.getElementById('login-user').value;
    authContainer.classList.add('d-none'); dashboardContainer.classList.remove('d-none');
    fetch(`${BACKEND_URL}/api/register`, { method: 'GET', mode: 'no-cors' }).catch(() => null);
});

btnLogout.addEventListener('click', () => {
    authContainer.classList.remove('d-none'); dashboardContainer.classList.add('d-none');
});
