import React, { useEffect, useState } from 'react';

function Profile({ onLogout }) {
  const [profileData, setProfileData] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/check-auth', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Передача токена в заголовке запроса
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Авторизация не пройдена');
      })
      .then(data => {
        setProfileData(data.message);
      })
      .catch(error => {
        console.error('Ошибка авторизации:', error);
        onLogout();
      });
    } else {
      onLogout(); // Перенаправление на страницу входа, если токен отсутствует
    }
  }, [onLogout]);

  return (
    <div>
      <h2>Профиль пользователя</h2>
      <p>{profileData}</p>
      <button onClick={onLogout}>Выйти</button>
    </div>
  );
}

export default Profile;
