const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = 3000;
/**
 * Секретный ключ для подписи токена
 * это значение в реальном проекте не должно храниться в коде
 * его нужно хранить в переменной окружения
 * или в специальном файле конфигурации
 * по типу .env
 */
const secretKey = 'mysecretkey';

// Статические файлы
app.use(express.static(path.join(__dirname, 'public')));

// Парсинг тела запроса
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Простая база данных пользователей
 * В реальном проекте пользователи должны храниться в базе данных
 * и пароли должны храниться в зашифрованном виде
 * например, с использованием bcrypt
 * или других методов хеширования
 */
const users = [
    { id: 1, username: 'user', password: 'password' },
    { id: 2, username: 'admin', password: 'admin' }
];

// Маршрут для создания токена при аутентификации
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Поиск пользователя в базе данных
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Создание токена с идентификатором пользователя можно так же добавить другие данные в токен
        // например, роль пользователя или другие данные { userId: user.id, role: user.role }
        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Неправильное имя пользователя или пароль' });
    }
});

app.get('/check-auth', authenticateToken, (req, res) => {
    res.json({ message: 'Аутентификация прошла успешно' });
});

/** 
 * Промежуточное ПО для проверки токена
 * На жаргоне Express.js промежуточное ПО (middleware) — это функция,
 * которая имеет доступ к объекту запроса (req), объекту ответа (res) и следующей функции в цепочке промежуточного ПО (next).
*/
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

app.listen(PORT, () => {
    console.log(`server start on http://127.0.0.1:${PORT}`);
});
