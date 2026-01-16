import { debounce } from "../Utils/debounce.js";

export class SearchManager {
    constructor(searchCountry) {
        this.searchCountry = searchCountry;
        this.input = document.getElementById("id-input-search");
        this.suggestions = document.getElementById("suggestions");
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

    setupTypeAheadListener(callback) {
        this.input.addEventListener("input", debounce((event) => {
            const value = event.target.value.trim().toLowerCase();
            callback(value);
        }, 300));
    }

    setupFocusOutListener(callback) {
        this.input.addEventListener("focusout", (e) => {
            if (e.relatedTarget && this.suggestions.contains(e.relatedTarget)) return;
            callback();
        });
    }
}
