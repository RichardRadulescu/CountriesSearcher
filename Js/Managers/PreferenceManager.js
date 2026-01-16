import { PreferedElement } from "../View/preferedElement.js";

export class PreferenceManager {
    constructor(preferedCountry, pillTemplate) {
        this.preferedCountry = preferedCountry;
        this.pillTemplate = pillTemplate;
        this.container = document.getElementById("id-prefered");
    }

    refresh() {
        if (!this.container) return;

        this.container.innerHTML = "";
        const prefered = this.preferedCountry.getPreferedCountries();

        prefered.forEach(country => {
            const preferedEl = new PreferedElement(country, this.pillTemplate);
            const element = preferedEl.create();
            element.addEventListener("click", () => this.removePreference(country.name.common));
            this.container.appendChild(element);
        });
    }

    toggle(countryName) {
        if (this.preferedCountry.isPreferred(countryName)) {
            this.preferedCountry.remove(countryName);
        } else {
            this.preferedCountry.add(countryName);
        }
    }

    removePreference(countryName) {
        this.preferedCountry.remove(countryName);
        this.refresh();
    }

    isPreferred(countryName) {
        return this.preferedCountry.isPreferred(countryName);
    }
}
