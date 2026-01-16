export class PreferedCountry {
    constructor(){
        // Get preferred countries from localStorage
        const stored = localStorage.getItem('preferedCountries');
        this.preferedCountries = stored ? JSON.parse(stored) : [];
    }
    add(country) {
        const countryName = typeof country === 'string' ? country : country.name.common;
        // Check if already exists
        if(!this.preferedCountries.find(c => c.name.common === countryName)){
            this.preferedCountries.push(country);
            this.saveToLocalStorage();
        }
    }

    remove(country) {
        const countryName = typeof country === 'string' ? country : country.name.common;
        this.preferedCountries = this.preferedCountries.filter(item => item.name.common !== countryName);
        this.saveToLocalStorage();
    }
    isPreferred(country) {
        const countryName = typeof country === 'string' ? country : country.name.common;
        return this.preferedCountries.some(c => c.name.common === countryName);
    }
    
    getPreferedCountries() {
        return this.preferedCountries;
    }

    saveToLocalStorage() {
        localStorage.setItem('preferedCountries', JSON.stringify(this.preferedCountries));
    }
}