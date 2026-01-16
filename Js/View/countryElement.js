export class CountryElement {
    constructor(country, template) {
        this.country = country;
        this.template = template;
    }

    create() {
        const templateEl = document.createElement("template");
        templateEl.innerHTML = this.template.trim();
        const li = templateEl.content.firstElementChild.cloneNode(true);

        // Fill fields
        li.querySelector('[data-field="name"]').textContent = this.country.name.common;
        li.querySelector('[data-field="flag"]').src = this.country.flags.png;
        li.querySelector('[data-field="region"]').textContent = this.country.region;
        li.querySelector('[data-field="capital"]').textContent = this.country.capital?.[0] || "N/A";
        li.querySelector('[data-field="population"]').textContent = this.country.population.toLocaleString();
        li.querySelector('[data-field="languages"]').textContent = Object.values(this.country.languages || {}).join(", ");
        li.querySelector('[data-field="timezones"]').textContent = this.country.timezones.join(", ");

        return li;
    }
}
