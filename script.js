function toggleView() {
    document.getElementById('login-view').classList.toggle('hidden');
    document.getElementById('reg-view').classList.toggle('hidden');
}

document.getElementById('reg-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('reg-user').value;
    const password = document.getElementById('reg-pass').value;

    const res = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    alert(data.message || data.error);
});
