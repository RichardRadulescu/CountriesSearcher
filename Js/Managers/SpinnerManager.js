export class SpinnerManager {
    constructor() {
        this.spinner = document.getElementById("id-spinner");
    }

    show() {
        this.spinner.style.display = "block";
    }

    hide() {
        this.spinner.style.display = "none";
    }
}
