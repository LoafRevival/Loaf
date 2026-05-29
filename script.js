const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./oscar.sqlite');

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    
    // Вставка в базу OpenOSCAR
    db.run("INSERT INTO accounts (screenname, password) VALUES (?, ?)", 
        [username, password], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Ошибка: возможно, логин занят" });
        }
        res.json({ message: "Успешно! Теперь войдите в ICQ." });
    });
});

app.listen(3000, () => console.log('Loaf Server запущен на порту 3000'));
