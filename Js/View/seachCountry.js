import { CountryElement } from "./countryElement.js";

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
        countriesList.classList.add("p-0","justify-content-center");
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
                const event = new CustomEvent("preferToggle", {
                     detail: { country: c }
                })
                

                if(this.preferedCountry.isPreferred(c)) {
                    this.preferedCountry.remove(c);
                    preferBtn.classList.remove("active");
                } else {
                    this.preferedCountry.add(c);
                    preferBtn.classList.add("active");
                }

                document.dispatchEvent(event);
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
        box.style.display = "block";
        if (list.length === 0)
            { box.classList.remove("show"); return; } 
        Array.from(list).forEach(country => { 
            const item = document.createElement("button"); 
            item.type = "button"; 
            item.className = "list-group-item list-group-item-action";
            item.textContent = country.name.common; 
            item.addEventListener("click", () => { 
                const input = document.getElementById("id-input-search"); 
                input.value = country.name.common; 
                this.hideSuggestions(); 
                document.getElementById("id-search-form").requestSubmit(); 
            }); 
        box.appendChild(item); 
    }); 
    box.classList.add("show");
    }

    hideSuggestions() {
        document.getElementById("suggestions").style.display = "none";
    }
}
