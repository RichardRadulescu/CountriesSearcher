import { loadCountries } from "./Services/loadCountries.js";
import { loadTemplate } from "./Utils/loadTemplate.js";
import { SearchCountry } from "./Models/seachCountry.js";
import { HistoryCountry } from "./Models/historyCountry.js";
import { PreferedCountry } from "./Models/preferedCountry.js";
import { SearchController } from "./Controllers/SearchController.js";
import { SpinnerController } from "./Controllers/SpinnerController.js";
import { HistoryController } from "./Controllers/HistoryController.js";
import { PreferenceController } from "./Controllers/PreferenceController.js";

async function init() {
    try {
        const countriesData = await loadCountries();
        const countryTemplate = await loadTemplate("../Html/country-list-element.html");
        const pillTemplate = await loadTemplate("../Html/country-pill-element.html");

        if (!countriesData || !countryTemplate) {
            console.error("Failed to load required data");
            return;
        }

        // Initialize Models
        const historyCountry = new HistoryCountry();
        const preferedCountry = new PreferedCountry();
        const searchCountry = new SearchCountry(countriesData, preferedCountry, countryTemplate);

        // Initialize Controllers
        const controllers = {
            spinner: new SpinnerController(),
            search: new SearchController(searchCountry),
            history: new HistoryController(historyCountry, pillTemplate),
            preference: new PreferenceController(preferedCountry, pillTemplate),
        };

        // Wire controllers together
        controllers.search.onSearch = (searchTerm) => {
            controllers.spinner.show();
            const results = controllers.search.search(searchTerm);
            if (results.length > 0) {
                controllers.history.add(results[0].name.common);
                controllers.history.refresh();
            }
            controllers.spinner.hide();
        };

        controllers.history.onItemClick = (countryName) => {
            controllers.search.setInput(countryName);
            document.getElementById("id-search-form").dispatchEvent(new Event("submit"));
        };

        // Initialize and setup all controllers
        Object.values(controllers).forEach(controller => controller.init());
        Object.values(controllers).forEach(controller => controller.setupEventListeners());
    } catch (err) {
        console.error("Initialization error:", err);
    }
}

init();
