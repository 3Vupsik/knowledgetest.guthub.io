// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 TimeSpace Calc запущен');
    
    // Инициализируем модули
    if (window.UI) {
        UI.init();
    }
    
    // Доп. глобальные настройки
    Calculator.updateUI();
});