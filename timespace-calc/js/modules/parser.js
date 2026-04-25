window.Parser = {
    parseDistance(input) {
        const match = input.match(/^(\d+(?:\.\d+)?)\s*(км|м|дм|см)$/i);
        if (match) {
            return { value: parseFloat(match[1]), unit: match[2], type: 'distance' };
        }
        return null;
    },

    parseTime(input) {
        const match = input.match(/^(\d+(?:\.\d+)?)\s*(ч|час|мин|сек)$/i);
        if (match) {
            let unit = match[2];
            if (unit === 'час') unit = 'ч';
            return { value: parseFloat(match[1]), unit: unit, type: 'time' };
        }
        return null;
    },

    parseNumber(input) {
        const num = parseFloat(input);
        if (!isNaN(num)) {
            return { value: num, type: 'number' };
        }
        return null;
    }
};