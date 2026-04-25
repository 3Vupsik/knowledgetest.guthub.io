window.UI = {
    init() {
        this.generateButtons();
        this.bindEvents();
    },

    generateButtons() {
        const grid = document.getElementById('buttonsGrid');
        const buttons = [
            '7', '8', '9', '/',
            '4', '5', '6', '*',
            '1', '2', '3', '-',
            '0', '.', '00', '+'
        ];
        
        grid.innerHTML = buttons.map(btn => {
            const type = ['/', '*', '-', '+'].includes(btn) ? 'operator' : 'number';
            return `<button class="btn btn-${type}" data-value="${btn}">${btn}</button>`;
        }).join('');
        
        // Добавляем обработчики на сгенерированные кнопки
        document.querySelectorAll('.btn-number, .btn-operator').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const val = btn.dataset.value;
                if (['/', '*', '-', '+'].includes(val)) {
                    Calculator.setOperation(val);
                } else if (val === '.') {
                    Calculator.addDecimal();
                } else {
                    Calculator.addDigit(val);
                }
            });
        });
    },

    bindEvents() {
        // Переключение режимов
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mode = btn.dataset.mode;
                document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                Calculator.setMode(mode);
                
                // Показываем/скрываем гибридную панель
                const hybridPanel = document.getElementById('hybridPanel');
                if (mode === 'hybrid') {
                    hybridPanel.style.display = 'block';
                } else {
                    hybridPanel.style.display = 'none';
                }
            });
        });
        
        // Кнопка очистки
        document.getElementById('clearBtn').addEventListener('click', () => Calculator.clear());
        
        // Кнопка равно
        document.getElementById('equalsBtn').addEventListener('click', () => Calculator.calculate());
        
        // Конвертация (демо)
        document.getElementById('convertBtn').addEventListener('click', () => {
            alert('🔄 Конвертация: 1 м = 10 дм = 100 см\n1 ч = 60 мин = 3600 сек');
        });
        
        // Связать режим
        document.getElementById('speedLinkBtn').addEventListener('click', () => {
            if (Calculator.currentMode === 'hybrid') {
                // Демо-данные для гибридного режима
                Hybrid.updateHybridDisplay(100, 'м', 10, 'сек');
            } else {
                alert('🔗 Переключитесь в ⚡ гибридный режим');
            }
        });
    },

    updateDisplay(value) {
        const mainDisplay = document.getElementById('mainDisplay');
        mainDisplay.textContent = value;
        
        // Обновляем индикатор режима
        const modes = { normal: '🔢 Обычный', distance: '📏 Расстояние (м, см, дм, км)', time: '⏱ Время (ч, мин, сек)', hybrid: '⚡ Гибрид (скорость)' };
        const badge = document.querySelector('.mode-badge');
        if (badge) badge.textContent = modes[Calculator.currentMode];
    },

    updateModeUI(mode) {
        const unitDisplay = document.getElementById('unitDisplay');
        if (mode === 'distance') unitDisplay.textContent = 'Единицы: м | см | дм | км';
        else if (mode === 'time') unitDisplay.textContent = 'Единицы: ч | мин | сек';
        else if (mode === 'hybrid') unitDisplay.textContent = '⏱ + 📏 = ⚡ скорость';
        else unitDisplay.textContent = '';
    }
};