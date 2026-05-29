// Ждем, пока загрузится весь HTML
document.addEventListener('DOMContentLoaded', () => {

    // Ссылки на элементы DOM
    const loginView = document.getElementById('login-view');
    const regView = document.getElementById('registration-view');
    const loginForm = document.getElementById('login-form');
    const regForm = document.getElementById('reg-form');

    // Функция переключения: на регистрацию
    window.showReg = () => {
        loginView.style.display = 'none';
        regView.style.display = 'block';
    };

    // Функция переключения: назад на логин
    window.showLogin = () => {
        regView.style.display = 'none';
        loginView.style.display = 'block';
    };

    // --- ЛОГИКА РЕГИСТРАЦИИ (Отправка на сервер) ---
    regForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('reg-user').value;
        const password = document.getElementById('reg-pass').value;

        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                alert("Аккаунт создан! Теперь вы можете войти.");
                showLogin(); // Возвращаемся к форме входа
            } else {
                alert("Ошибка при регистрации.");
            }
        } catch (error) {
            console.error("Ошибка сети:", error);
            alert("Не удалось связаться с сервером. Убедитесь, что node server.js запущен.");
        }
    });

    // --- ЛОГИКА ВХОДА (Имитация) ---
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('user').value;
        const btn = document.getElementById('btn-login');
        
        btn.textContent = "Connecting...";
        btn.disabled = true;

        // Имитация задержки подключения к протоколу
        setTimeout(() => {
            loginView.style.display = 'none';
            document.getElementById('dashboard-view').style.display = 'block';
            document.getElementById('welcome-msg').textContent = "Welcome, " + user + "!";
        }, 1500);
    });
});
