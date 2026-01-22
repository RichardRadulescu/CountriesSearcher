export class PreferedControl {
    constructor(preferedSearchTemplate) {
        this.preferedSearchTemplate = preferedSearchTemplate;
    }
    
    create() {
        const templateEl = document.createElement("template");
        templateEl.innerHTML = this.preferedSearchTemplate.trim();
        const element = templateEl.content.firstElementChild.cloneNode(true);
        return element;
    }

}