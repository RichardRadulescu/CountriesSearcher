import { Controller } from "./Controller.js";

export class SpinnerController extends Controller {
    constructor() {
        super();
        this.spinner = document.getElementById("id-spinner");
    }

    show() {
        this.spinner.style.display = "block";
    }

    hide() {
        this.spinner.style.display = "none";
    }

    init() {
        // Spinner doesn't need initialization
    }

    setupEventListeners() {
        // Spinner doesn't need event listeners
    }
}
