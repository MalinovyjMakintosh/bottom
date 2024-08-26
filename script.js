document.addEventListener('DOMContentLoaded', () => {
    let counter = parseInt(localStorage.getItem('appleCount')) || 0;
    const counterValue = document.getElementById('counter-value');
    const incrementBtn = document.getElementById('increment-btn');

    // Обновляем отображение счетчика
    counterValue.innerHTML = `Apples: ${counter}`;

    // При нажатии на кнопку увеличиваем счетчик
    incrementBtn.addEventListener('click', () => {
        counter++;
        localStorage.setItem('appleCount', counter); // Сохраняем количество в localStorage
        counterValue.innerHTML = `Apples: ${counter}`;
    });
});
