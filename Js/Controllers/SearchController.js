import { Controller } from "./Controller.js";
import { debounce } from "../Utils/debounce.js";

export class SearchController extends Controller {
    constructor(searchCountry) {
        super();
        this.searchCountry = searchCountry;
        this.input = document.getElementById("id-input-search");
        this.suggestions = document.getElementById("suggestions");
        this.onSearch = null;
    }

    search(searchTerm) {
        const results = this.searchCountry.search(searchTerm);
        this.searchCountry.displayResults(results);
        return results;
    }

    getTypeAheadMatches(value) {
        const matches = this.searchCountry.getTypeAheadMatches(value);
        if (matches.length > 0) {
            this.searchCountry.showSuggestions(matches);
        }
        return matches;
    }

    hideSuggestions() {
        this.searchCountry.hideSuggestions();
    }

    setInput(value) {
        this.input.value = value;
    }

    getInput() {
        return this.input.value.trim();
    }

    init() {
        // Search doesn't need initialization
    }

    setupEventListeners() {
        // Type-ahead search with debounce
        this.input.addEventListener("input", debounce((event) => {
            const value = event.target.value.trim().toLowerCase();
            this.getTypeAheadMatches(value);
        }, 300));

        // Hide suggestions on focus out
        this.input.addEventListener("focusout", (e) => {
            if (e.relatedTarget && this.suggestions.contains(e.relatedTarget)) return;
            this.hideSuggestions();
        });
        // Form submit
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            const searchTerm = this.getInput();
            if (!searchTerm) return;
            if (this.onSearch) this.onSearch(searchTerm);
        });
    }
}
