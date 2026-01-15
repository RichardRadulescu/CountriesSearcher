export class HistoryElement {
    constructor(country, template) {
        this.country = country;
        this.template = template;
    }

    create() {
        const templateEl = document.createElement("template");
        templateEl.innerHTML = this.template.trim();
        const pill = templateEl.content.firstElementChild.cloneNode(true);

        // Fill fields
        pill.querySelector('[data-field="name"]').textContent = this.country;
        
        // Placeholder flag - you can enhance this with actual country data
        const flagImg = pill.querySelector('[data-field="flag"]');
        if (flagImg) {
            flagImg.alt = this.country;
        }

        // Add click event to trigger search
        pill.addEventListener("click", () => {
            const input = document.getElementById("id-input-search");
            input.value = this.country;
            document.getElementById("suggestions").style.display = "none";
            document.getElementById("id-search-form").requestSubmit();
        });

        return pill;
    }
}
