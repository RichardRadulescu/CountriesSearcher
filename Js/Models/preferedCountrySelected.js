export class PreferedCountrySelected {
    constructor(){
        this.preferedCountries = new Array();
    }

    add(country) {
        const countryName = typeof country === 'string' ? country : country.name.common;
        // Check if already exists
        if(!this.preferedCountries.find(c => c.name.common === countryName)){
            this.preferedCountries.push(country);
        }
    }

    remove(country) {
        const countryName = typeof country === 'string' ? country : country.name.common;
        this.preferedCountries = this.preferedCountries.filter(item => item.name.common !== countryName);
    }
    isPreferred(country) {
        const countryName = typeof country === 'string' ? country : country.name.common;
        return this.preferedCountries.some(c => c.name.common === countryName);
    }

    getPreferedSelectedCountries() {
        return this.preferedCountries;
    }
}