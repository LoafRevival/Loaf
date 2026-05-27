const loginForm = document.getElementById('login-form');
const authContainer = document.getElementById('auth-container');
const dashboardContainer = document.getElementById('dashboard-container');
const displayUsername = document.getElementById('display-username');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('login-user').value;
    if(user) {
        displayUsername.textContent = user;
        authContainer.classList.add('d-none');
        dashboardContainer.classList.remove('d-none');
        document.getElementById('view-title').textContent = "Manage your account";
    }
});

document.getElementById('btn-logout').addEventListener('click', () => {
    location.reload();
});
