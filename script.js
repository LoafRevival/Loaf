document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    
    // Check if the form exists before adding listener
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            // This prevents the page from appending # or ? to your URL
            e.preventDefault(); 
            e.stopPropagation(); 
            
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
    }
});
