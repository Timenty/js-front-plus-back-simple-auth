const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Статические файлы
app.use(express.static(path.join(__dirname, 'public')));

// Парсинг тела запроса и cookie
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Маршрут для аутентификации
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Пример проверки имени пользователя и пароля
    if (username === "user" && password === "password") {
        res.cookie('loggedIn', true, { maxAge: 900000, httpOnly: true }); // Установка cookie на 15 минут
        res.json({ loggedIn: true });
    } else {
        res.status(401).json({ error: 'Неправильное имя пользователя или пароль' });
    }
});

// Маршрут для выхода из системы
app.get('/logout', (req, res) => {
    res.clearCookie('loggedIn');
    res.json({ loggedIn: false });
});

// Маршрут для проверки аутентификации
app.get('/check-auth', (req, res) => {
    res.json({ loggedIn: req.cookies.loggedIn });
});

// Запуск сервера и прослушивание порта
app.listen(PORT, () => {
    console.log(`server start on http://127.0.0.1:${PORT}`);
});
