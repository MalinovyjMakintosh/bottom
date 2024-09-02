document.addEventListener('DOMContentLoaded', () => {
    // Получаем объект с данными пользователя из контекста Telegram
    const telegram = window.Telegram.WebApp;
    const telegramId = telegram.initDataUnsafe?.user?.id;

    if (!telegramId) {
        console.error('Telegram ID not found');
        return;
    }

    // Инициализация пользователя на сервере
    fetch('https://were-xgze.onrender.com/init-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ telegramId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'User created successfully' || data.message === 'User already exists') {
            console.log('User initialized:', data);
            // Отображаем количество яблок
            counter = data.apples || 0;
            document.getElementById('counter-value').innerHTML = `Apples: ${counter}`;
        }
    })
    .catch(error => console.error('Error:', error));

    // Объявление переменных
    let counter = 0;
    const counterValue = document.getElementById('counter-value');
    const incrementBtn = document.getElementById('increment-btn');

    // При нажатии на кнопку увеличиваем счетчик
    incrementBtn.addEventListener('click', () => {
        counter++;
        localStorage.setItem('appleCount', counter); // Сохраняем количество в localStorage
        counterValue.innerHTML = `Apples: ${counter}`;

        // Отправляем обновление на сервер
        fetch('https://were-xgze.onrender.com/update-apples', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ telegramId, apples: counter })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Apples count updated successfully') {
                console.log('Apples count updated on server');
            }
        })
        .catch(error => console.error('Error:', error));
    });
});
