export class HistoryCountry {
    constructor(maxSize = 3) {
        this.maxSize = maxSize;
        // Get countries history from localStorage
        const stored = localStorage.getItem('countriesHistory');
        this.history = stored ? JSON.parse(stored) : [];
    }

    add(countryName) {
        // Remove if already exists (to move to front)
        this.history = this.history.filter(item => item.country !== countryName);
        
        // Add to front
        this.history.unshift({
            country: countryName,
            date: new Date().toISOString()
        });

        // Enforce size limit (remove oldest)
        if (this.history.length > this.maxSize) {
            this.history.pop();
        }

        this.saveToLocalStorage();
    }

    getHistory() {
        return this.history;
    }

    removeFirst() {
        this.history.shift();
        this.saveToLocalStorage();
    }

    clear() {
        this.history = [];
        this.saveToLocalStorage();
    }

    saveToLocalStorage() {
        localStorage.setItem('countriesHistory', JSON.stringify(this.history));
    }
}