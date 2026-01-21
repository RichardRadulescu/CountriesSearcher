export class PreferedElement {
    constructor(country, preferedCountry, template) {
        this.country = country;
        this.preferedCountry = preferedCountry;
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
            e.stopPropagation();
            this.preferedCountry.remove(this.country);
        });

        return element;
    }
}
