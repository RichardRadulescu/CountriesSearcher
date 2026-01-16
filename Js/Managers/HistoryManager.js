import { HistoryElement } from "../View/historyElement.js";

export class HistoryManager {
    constructor(historyCountry, pillTemplate) {
        this.historyCountry = historyCountry;
        this.pillTemplate = pillTemplate;
        this.container = document.getElementById("id-history");
    }

    refresh(onItemClick) {
        if (!this.container) return;

        this.container.innerHTML = "";
        const history = this.historyCountry.getHistory();

        history.forEach(item => {
            const historyEl = new HistoryElement(item.country, this.pillTemplate);
            const element = historyEl.create();
            element.addEventListener("click", () => onItemClick(item.country));
            this.container.appendChild(element);
        });
    }

    add(countryName) {
        this.historyCountry.add(countryName);
    }
}
