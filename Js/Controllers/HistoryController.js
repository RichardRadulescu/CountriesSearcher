import { Controller } from "./Controller.js";
import { HistoryElement } from "../View/historyElement.js";

export class HistoryController extends Controller {
    constructor(historyCountry, pillTemplate) {
        super();
        this.historyCountry = historyCountry;
        this.pillTemplate = pillTemplate;
        this.container = document.getElementById("id-history");
        this.onItemClick = null;
    }

    refresh() {
        if (!this.container) return;

        this.container.innerHTML = "";
        const history = this.historyCountry.getHistory();

        history.forEach(item => {
            const historyEl = new HistoryElement(item.country, this.pillTemplate);
            const element = historyEl.create();
            element.addEventListener("click", () => {
                if (this.onItemClick) this.onItemClick(item.country);
            });
            this.container.appendChild(element);
        });
    }

    add(countryName) {
        this.historyCountry.add(countryName);
    }

    init() {
        this.refresh();
    }

    setupEventListeners() {
        // History events are delegated through refresh()
    }
}
