import { loadCountries } from "./Fetch/loadCountries.js";
import { loadTemplate } from "./Utils/loadTemplate.js";
import { SearchCountry } from "./Features/seachCountry.js";
import { HistoryCountry } from "./Features/historyCountry.js";
import { HistoryElement } from "./Components/historyElement.js";

let searchCountryInstance = null;
let historyCountry = null;
let pillTemplate = null;

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
        pillTemplate = await loadTemplate("../Html/country-pill-element.html");

        if (!countriesData || !countryTemplate) {
            console.error("Failed to load required data");
            return;
        }

        // Initialize instances
        historyCountry = new HistoryCountry();
        searchCountryInstance = new SearchCountry(countriesData, countryTemplate);

        // Display initial history
        displayHistory();

        // Attach event listeners
        attachEventListeners();
    } catch (err) {
        console.error("Initialization error:", err);
    }
}

// Show spinner
function showSpinner() {
    document.getElementById("id-spinner").style.display = "block";
}

// Hide spinner
function hideSpinner() {
    document.getElementById("id-spinner").style.display = "none";
}

// Display history pills
function displayHistory() {
    const historyContainer = document.getElementById("id-history");
    if (!historyContainer) return;

    historyContainer.innerHTML = "";
    const history = historyCountry.getHistory();

    history.forEach(item => {
        const historyEl = new HistoryElement(item.country, pillTemplate);
        historyContainer.appendChild(historyEl.create());
    });
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

        showSpinner();
        const results = searchCountryInstance.search(searchTerm);
        if (results.length > 0) {
            // Add to history on successful search
            historyCountry.add(results[0].name.common);
            displayHistory();
        }
        searchCountryInstance.displayResults(results);
        hideSpinner();
    });
}

// Start the app
init();
