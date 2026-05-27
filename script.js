const authToggle = document.getElementById('auth-toggle');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const errorMsg = document.getElementById('error-msg');
const successMsg = document.getElementById('success-msg');
const authContainer = document.getElementById('auth-container');
const dashboardContainer = document.getElementById('dashboard-container');
const displayUsername = document.getElementById('display-username');
const btnLogout = document.getElementById('btn-logout');
const countElement = document.getElementById('total-users');
const saveProfileBtn = document.getElementById('save-profile');
const profileBadge = document.getElementById('user-badge');
const customStatusInput = document.getElementById('custom-status');

if (!localStorage.getItem('retro_accounts')) {
    localStorage.setItem('retro_accounts', JSON.stringify({}));
}

function updateNetworkStats() {
    const accounts = JSON.parse(localStorage.getItem('retro_accounts')) || {};
    if (countElement) {
        const totalCount = Object.keys(accounts).length;
        countElement.textContent = `${totalCount} Accounts Configured`;
    }
}

function loadUserProfile(username) {
    const savedBadge = localStorage.getItem(`${username}_badge`) || "Classic User 💾";
    const savedStatus = localStorage.getItem(`${username}_status`) || "Away from keyboard";
    if (profileBadge) profileBadge.value = savedBadge;
    if (customStatusInput) customStatusInput.value = savedStatus;
}

authToggle.addEventListener('click', (e) => {
    e.preventDefault();
    errorMsg.classList.add('d-none');
    successMsg.classList.add('d-none');
    registerForm.classList.toggle('d-none');
    loginForm.classList.toggle('d-none');
    authToggle.textContent = loginForm.classList.contains('d-none') ? "Back to Sign On" : "Create an Account ✨";
});

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

    const accounts = JSON.parse(localStorage.getItem('retro_accounts')) || {};
    if (accounts[username]) {
        errorMsg.textContent = "Error: Screen name is already taken!";
        errorMsg.classList.remove('d-none');
    } else {
        accounts[username] = password;
        localStorage.setItem('retro_accounts', JSON.stringify(accounts));
        successMsg.textContent = "Account baked successfully!";
        successMsg.classList.remove('d-none');
        registerForm.reset();
        updateNetworkStats();
    }
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('login-user').value.trim().toLowerCase();
    const password = document.getElementById('login-pass').value;
    const accounts = JSON.parse(localStorage.getItem('retro_accounts')) || {};

    if (accounts[username] && accounts[username] === password) {
        displayUsername.textContent = username;
        authContainer.classList.add('d-none');
        dashboardContainer.classList.remove('d-none');
        loadUserProfile(username);
    } else {
        errorMsg.textContent = "Access Denied.";
        errorMsg.classList.remove('d-none');
    }
});

saveProfileBtn.addEventListener('click', () => {
    const currentUser = displayUsername.textContent;
    localStorage.setItem(`${currentUser}_badge`, profileBadge.value);
    localStorage.setItem(`${currentUser}_status`, customStatusInput.value);
    alert("Profile metadata updated!");
});

btnLogout.addEventListener('click', () => {
    authContainer.classList.remove('d-none');
    dashboardContainer.classList.add('d-none');
    loginForm.reset();
});

updateNetworkStats();
