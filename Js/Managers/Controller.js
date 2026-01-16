import { BaseController } from "./BaseController.js";

export class Controller extends BaseController {
    constructor(managers) {
        super(managers);
    }

    handleSearch(searchTerm) {
        this.spinnerManager.show();
        const results = this.searchManager.search(searchTerm);
        if (results.length > 0) {
            this.historyManager.add(results[0].name.common);
            this.historyManager.refresh((countryName) => this.handleHistoryClick(countryName));
        }
        this.spinnerManager.hide();
    }

    handleHistoryClick(countryName) {
        this.searchManager.setInput(countryName);
        this.form.dispatchEvent(new Event("submit"));
    }

    setupEventListeners() {
        // Type-ahead search
        this.searchManager.setupTypeAheadListener((value) => {
            this.searchManager.getTypeAheadMatches(value);
        });

        // Hide suggestions on focus out
        this.searchManager.setupFocusOutListener(() => {
            this.searchManager.hideSuggestions();
        });

        // Form submit
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            const searchTerm = this.searchManager.getInput();
            if (!searchTerm) return;
            this.handleSearch(searchTerm);
        });

        // Preference toggle in search results
        document.addEventListener("click", (event) => {
            if (event.target.classList.contains("prefer-btn")) {
                event.preventDefault();
                const countryName = event.target.closest("li")?.dataset.countryName;
                if (countryName) {
                    this.preferenceManager.toggle(countryName);
                    this.preferenceManager.refresh();
                    event.target.classList.toggle("active");
                }
            }
        });
    }
}
