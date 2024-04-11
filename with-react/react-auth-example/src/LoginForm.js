import React, { useState } from 'react';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      localStorage.setItem('token', data.token); // Сохранение токена в локальном хранилище
      onLogin();
    } catch (error) {
      setError('Неправильное имя пользователя или пароль');
      console.error('Ошибка входа:', error);
    }
  };

  return (
    <div>
      <h2>Форма входа</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Имя пользователя:</label><br />
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
        <label htmlFor="password">Пароль:</label><br />
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        <button type="submit">Войти</button>
        <br />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default LoginForm;
