document.addEventListener('DOMContentLoaded', () => {
    const regForm = document.getElementById('registration-form');

    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = e.target.username.value;
            
            // Имитация "создания аккаунта"
            alert(`Поздравляем, ${username}! Ваша учетная запись создана. Теперь вы можете войти в систему через Loaf Agent или любой OSCAR клиент.`);
            
            // В реальности здесь был бы запрос на сервер
            window.location.href = "index.html"; 
        });
    }
});
