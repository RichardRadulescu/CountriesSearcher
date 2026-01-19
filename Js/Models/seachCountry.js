import { CountryElement } from "../View/countryElement.js";

export class SearchCountry {
    constructor(countriesData, preferedCountry, countryTemplate) {
        this.countriesData = countriesData;
        this.countryTemplate = countryTemplate;
        this.preferedCountry = preferedCountry;
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
        
        //countriesList.classList.add("list-group", "w-100")

        results.forEach(c => {
            const countryEl = new CountryElement(c, this.countryTemplate);
            const listItem = countryEl.create();
            
            const preferBtn = listItem.querySelector('[data-action="prefer"]');
            
            
            
            if (this.preferedCountry.isPreferred(c.name.common)) {
                preferBtn.classList.add("active");
            } else {
             preferBtn.classList.remove("active");
            }
            
            preferBtn.addEventListener("click", () => {
                
                if(this.preferedCountry.isPreferred(c)) {
                    this.preferedCountry.remove(c);
                    preferBtn.classList.remove("active");
                } else {
                    this.preferedCountry.add(c);
                    preferBtn.classList.add("active");
                }
            });

            
            countriesList.appendChild(listItem);
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
