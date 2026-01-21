import { Controller } from "./Controller.js";
import { PreferedElement } from "../View/preferedElement.js";

export class PreferenceController extends Controller {
    constructor(preferedCountry, preferedTemplate) {
        super();
        this.preferedCountry = preferedCountry;
        this.preferedTemplate = preferedTemplate;
        
    }

    refresh() {
        if (!this.container) return;

        this.container.innerHTML = "";
        const prefered = this.preferedCountry.getPreferedCountries();

        prefered.forEach(country => {
            const preferedEl = new PreferedElement(country, this.preferedCountry, this.preferedTemplate);
            const element = preferedEl.create();
            element.addEventListener("click", () => this.remove(country.name.common));
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

    remove(countryName) {
        this.preferedCountry.remove(countryName);
        this.refresh();
    }

    isPreferred(countryName) {
        return this.preferedCountry.isPreferred(countryName);
    }

    init() {
        this.container = document.getElementById("id-prefered-countries");
        this.refresh();
    }

    setupEventListeners() {
        
        // Preference events for search results
        document.addEventListener("preferToggle", (event) => {
                this.refresh();
        });
    }
}
