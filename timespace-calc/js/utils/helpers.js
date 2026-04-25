// Вспомогательные утилиты
window.helpers = {
    formatNumber(num, decimals = 4) {
        if (isNaN(num)) return '0';
        return parseFloat(num).toFixed(decimals).replace(/\.?0+$/, '');
    },

    isNumeric(str) {
        return !isNaN(str) && !isNaN(parseFloat(str));
    },

    lastChar(str) {
        return str.slice(-1);
    },

    removeLast(str) {
        return str.slice(0, -1);
    }
};