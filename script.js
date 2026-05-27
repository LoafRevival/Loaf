document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = document.getElementById('btn-login');
        const user = document.getElementById('user').value;
        
        btn.textContent = "Connecting...";
        btn.disabled = true;

        setTimeout(() => {
            document.getElementById('login-view').style.display = 'none';
            document.getElementById('dashboard-view').style.display = 'block';
            document.getElementById('welcome-msg').textContent = "Welcome, " + user + "! You are now connected.";
        }, 1500);
    });
});
