export class Controller {
    constructor() {
        this.form = document.getElementById("id-search-form");
    }

    init() {
        throw new Error("init() must be implemented");
    }

    setupEventListeners() {
        throw new Error("setupEventListeners() must be implemented");
    }
}
