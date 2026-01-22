import { PreferedControl } from "../View/preferedControl.js";
import { Controller } from "./Controller.js";


export class SearchPreferedController extends Controller {
    constructor(preferedCountry, preferedCountrySelected, preferedSearchTemplate) {
        super();
        this.preferedCountry = preferedCountry;
        this.preferedCountrySelected = preferedCountrySelected;
        this.preferedSearchTemplate = preferedSearchTemplate;
        
    }

    init() {
        this.container = document.getElementById("id-prefered");
        this.refresh();
    }
    refresh() {
        if (!this.container) return;
        this.container.innerHTML = "";
        const preferedS = new PreferedControl(this.preferedSearchTemplate)
        this.container.append(preferedS.create());

    }
    setupEventListeners() {
        //select/deselect items
        this.container.querySelector(".card").addEventListener("click", (e) => {

            const item = e.target.closest(".preferred-item");
            if (!item) return;

            const isSelected = item.dataset.selected === "true";
            item.dataset.selected = isSelected ? "false" : "true";
            item.classList.toggle("selected");
          e.stopPropagation();
        });
        //select all button
        const selectAllBtn = this.container.querySelector('.btn.btn-outline-primary'); 
        selectAllBtn.addEventListener('click', () => {
             const items = this.container.querySelectorAll('.preferred-item');
              items.forEach(item => {
                item.dataset.selected = "true"; 
                item.classList.add("selected");
                const checkbox = item.querySelector('input[type="checkbox"]');
                if (checkbox) checkbox.checked = true;
            });
        });
        //delete selected button
        const deleteBtn = this.container.querySelector('.btn.btn-outline-danger');

        deleteBtn.addEventListener('click', () => {
            const items = this.container.querySelectorAll('.preferred-item[data-selected="true"]');

            items.forEach(item => {
                const name = item.querySelector('[data-field="name"]').textContent;
                
                // Remove from your data model
                this.preferedCountry.remove(name);
                // Remove from DOM
                item.remove();
            });
        });

        const searchInput = this.container.querySelector('input[name="search-prefered"]');

        searchInput.addEventListener("input", () => {
            const term = searchInput.value.toLowerCase();

            const items = this.container.querySelectorAll('.preferred-item');

            items.forEach(item => {
                const name = item.querySelector('[data-field="name"]').textContent.toLowerCase();
                //item.style.display = name.includes(term) ? "" : "none";
                if (name.includes(term))
                    item.classList.remove("d-none");
                else
                    item.classList.add("d-none");
            });
        });


    }

}