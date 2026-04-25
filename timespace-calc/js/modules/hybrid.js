window.Hybrid = {
    calculateSpeed(distanceCM, timeSec) {
        if (timeSec === 0) return '∞';
        const ms = distanceCM / 100 / timeSec; // м/с
        const kmh = ms * 3.6; // км/ч
        return `${helpers.formatNumber(kmh, 2)} км/ч (${helpers.formatNumber(ms, 2)} м/с)`;
    },

    calculatePace(distanceKM, timeSec) {
        if (distanceKM === 0) return '∞';
        const minutesPerKM = (timeSec / 60) / distanceKM;
        const mins = Math.floor(minutesPerKM);
        const secs = Math.floor((minutesPerKM - mins) * 60);
        return `${mins} мин ${secs} сек/км`;
    },

    updateHybridDisplay(distance, distanceUnit, time, timeUnit) {
        const distCM = Converter.toCM(distance, distanceUnit);
        const timeSec = Converter.toSeconds(time, timeUnit);
        
        const speed = this.calculateSpeed(distCM, timeSec);
        const distKM = Converter.fromCM(distCM, 'км');
        const pace = this.calculatePace(distKM, timeSec);
        
        document.getElementById('hybridDistance').innerHTML = `${distance} ${distanceUnit}`;
        document.getElementById('hybridTime').innerHTML = `${time} ${timeUnit}`;
        document.getElementById('hybridResult').innerHTML = `${speed}<br><small>${pace}</small>`;
        
        return { speed, pace };
    }
};