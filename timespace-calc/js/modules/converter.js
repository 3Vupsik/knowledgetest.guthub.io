window.Converter = {
    // Расстояние → см
    toCM(value, unit) {
        const multipliers = { км: 100000, м: 100, дм: 10, см: 1 };
        return value * (multipliers[unit] || 1);
    },

    // см → расстояние
    fromCM(cm, targetUnit) {
        const multipliers = { км: 100000, м: 100, дм: 10, см: 1 };
        return cm / (multipliers[targetUnit] || 1);
    },

    // Время → секунды
    toSeconds(value, unit) {
        const multipliers = { ч: 3600, час: 3600, мин: 60, сек: 1 };
        return value * (multipliers[unit] || 1);
    },

    // секунды → время
    fromSeconds(sec) {
        const hours = Math.floor(sec / 3600);
        const minutes = Math.floor((sec % 3600) / 60);
        const seconds = Math.floor(sec % 60);
        
        if (hours > 0) return `${hours}ч ${minutes}мин ${seconds}сек`;
        if (minutes > 0) return `${minutes}мин ${seconds}сек`;
        return `${seconds}сек`;
    },

    // Перевод в разные единицы расстояния
    convertDistance(value, fromUnit, toUnit) {
        const inCM = this.toCM(value, fromUnit);
        return this.fromCM(inCM, toUnit);
    }
};