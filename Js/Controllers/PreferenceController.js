import { Controller } from "./Controller.js";
import { PreferedElement } from "../View/preferedElement.js";

export class PreferenceController extends Controller {
    constructor(preferedCountry, pillTemplate) {
        super();
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
        this.refresh();
    }

    setupEventListeners() {
        // Preference events for search results
        document.addEventListener("click", (event) => {
            if (event.target.classList.contains("prefer-btn")) {
                event.preventDefault();
                const countryName = event.target.closest("li")?.dataset.countryName;
                if (countryName) {
                    this.toggle(countryName);
                    this.refresh();
                    event.target.classList.toggle("active");
                }
            }
        });
    }
}
