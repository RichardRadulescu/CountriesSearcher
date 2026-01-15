import { loadCountries } from "./Fetch/loadCountries.js";
import { loadTemplate } from "./Utils/loadTemplate.js";
import { SearchCountry } from "./Features/seachCountry.js";

let searchCountryInstance = null;

// Utility function for debouncing
function debounce(fn, delay = 300) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
}

// Initialize app
async function init() {
    try {
        const countriesData = await loadCountries();
        const countryTemplate = await loadTemplate("../Html/country-list-element.html");

        if (!countriesData || !countryTemplate) {
            console.error("Failed to load required data");
            return;
        }

        // Initialize search instance
        searchCountryInstance = new SearchCountry(countriesData, countryTemplate);

        // Attach event listeners
        attachEventListeners();
    } catch (err) {
        console.error("Initialization error:", err);
    }
}

// Attach all event listeners
function attachEventListeners() {
    const input = document.getElementById("id-input-search");
    const form = document.getElementById("id-search-form");
    const suggestions = document.getElementById("suggestions");

    // Type-ahead search
    input.addEventListener("input", debounce((event) => {
        const value = event.target.value.trim().toLowerCase();
        const matches = searchCountryInstance.getTypeAheadMatches(value);
        if (matches.length > 0) {
            searchCountryInstance.showSuggestions(matches);
        }
    }, 300));

    // Hide suggestions on focus out
    input.addEventListener("focusout", (e) => {
        if (e.relatedTarget && suggestions.contains(e.relatedTarget)) return;
        searchCountryInstance.hideSuggestions();
    });

    // Form submit
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const searchTerm = input.value.trim();
        if (!searchTerm) return;

        const results = searchCountryInstance.search(searchTerm);
        searchCountryInstance.displayResults(results);
    });
}

// Start the app
init();
