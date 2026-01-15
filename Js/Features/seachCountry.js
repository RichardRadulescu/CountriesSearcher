import { CountryElement } from "../Components/countryElement.js";

export class SearchCountry {
    constructor(countriesData, countryTemplate) {
        this.countriesData = countriesData;
        this.countryTemplate = countryTemplate;
    }

    search(searchTerm) {
        if (!this.countriesData) {
            console.warn("Countries not loaded yet");
            return [];
        }

        return this.countriesData.filter(c =>
            c.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    displayResults(results) {
        this.hideSuggestions();

        const countriesContainer = document.getElementById('id-countries');
        countriesContainer.innerHTML = "";
        const countriesList = document.createElement("ul");

        results.forEach(c => {
            const countryEl = new CountryElement(c, this.countryTemplate);
            countriesList.appendChild(countryEl.create());
        });

        countriesContainer.appendChild(countriesList);
    }

    getTypeAheadMatches(value) {
        if (!value) {
            this.hideSuggestions();
            return [];
        }

        return this.countriesData
            .filter(c => c.name.common.toLowerCase().startsWith(value))
            .slice(0, 10);
    }

    showSuggestions(list) {
        const box = document.getElementById("suggestions");
        box.innerHTML = "";

        list.forEach(country => {
            const div = document.createElement("div");
            div.className = "suggestion-item";
            div.textContent = country.name.common;
            div.tabIndex = 0;

            div.addEventListener("click", () => {
                const input = document.getElementById("id-input-search");
                input.value = country.name.common;
                this.hideSuggestions();
                document.getElementById("id-search-form").requestSubmit();
            });

            box.appendChild(div);
        });

        box.style.display = "block";
    }

    hideSuggestions() {
        document.getElementById("suggestions").style.display = "none";
    }
}
