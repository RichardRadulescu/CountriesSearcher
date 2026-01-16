export class BaseController {
    constructor(managers) {
        this.spinnerManager = managers.spinnerManager;
        this.historyManager = managers.historyManager;
        this.preferenceManager = managers.preferenceManager;
        this.searchManager = managers.searchManager;

        this.form = document.getElementById("id-search-form");
    }

    handleSearch(searchTerm) {
        throw new Error("handleSearch() must be implemented");
    }

    handleHistoryClick(countryName) {
        throw new Error("handleHistoryClick() must be implemented");
    }

    setupEventListeners() {
        throw new Error("setupEventListeners() must be implemented");
    }

    init() {
        this.historyManager.refresh((countryName) => this.handleHistoryClick(countryName));
        this.preferenceManager.refresh();
        this.setupEventListeners();
    }
}
