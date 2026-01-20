export class PreferedElement {
    constructor(country, template) {
        this.country = country;
        this.template = template;
    }

    create() {
        const templateEl = document.createElement("template");
        templateEl.innerHTML = this.template.trim();
        const element = templateEl.content.firstElementChild.cloneNode(true);

        // Fill fields
        element.querySelector('[data-field="name"]').textContent = this.country.name.common;
        element.querySelector('[data-field="flag"]').src = this.country.flags.png;

        const unpreferedBtn = element.querySelector('[data-action="unpreferred"]');
        unpreferedBtn.addEventListener("click", () => {
            preferedCountry.remove(this.country);
        });

        return element;
    }
}
