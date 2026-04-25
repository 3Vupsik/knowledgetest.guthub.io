window.Calculator = {
    currentInput: '0',
    previousInput: '',
    operation: null,
    currentMode: 'normal', // normal, distance, time, hybrid
    distanceUnit: 'м',
    timeUnit: 'сек',
    distanceValue: 0,
    timeValue: 0,

    addDigit(digit) {
        if (this.currentInput === '0' && digit !== '.') {
            this.currentInput = digit;
        } else {
            this.currentInput += digit;
        }
        this.updateUI();
    },

    addDecimal() {
        if (!this.currentInput.includes('.')) {
            this.currentInput += '.';
        }
        this.updateUI();
    },

    setOperation(op) {
        if (this.previousInput !== '') {
            this.calculate();
        }
        this.operation = op;
        this.previousInput = this.currentInput;
        this.currentInput = '0';
        this.updateUI();
    },

    calculate() {
        if (this.operation === null || this.previousInput === '') return;
        
        const prev = parseFloat(this.previousInput);
        const curr = parseFloat(this.currentInput);
        let result = 0;

        switch (this.operation) {
            case '+': result = prev + curr; break;
            case '-': result = prev - curr; break;
            case '*': result = prev * curr; break;
            case '/': result = curr !== 0 ? prev / curr : 'Error'; break;
        }

        if (result === 'Error') {
            this.currentInput = 'Ошибка';
        } else {
            this.currentInput = helpers.formatNumber(result).toString();
        }
        
        this.operation = null;
        this.previousInput = '';
        this.updateUI();
    },

    clear() {
        this.currentInput = '0';
        this.previousInput = '';
        this.operation = null;
        this.updateUI();
    },

    setMode(mode) {
        this.currentMode = mode;
        this.clear();
        this.updateUIMode();
    },

    updateUI() {
        if (window.UI) UI.updateDisplay(this.currentInput);
    },

    updateUIMode() {
        if (window.UI) UI.updateModeUI(this.currentMode);
    }
};