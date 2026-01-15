let countriesData = null
let countryTemplate=""

async function loadCountries() {
    try {
        const res = await fetch('https://restcountries.com/v3.1/independent');
        if (!res.ok) throw new Error("Network response was not ok");
        countriesData = await res.json();
    } catch (err) { console.error("Fetch error:", err); }
}
async function loadTemplate() {
    const res = await fetch("./country-list-element.html"); 
    countryTemplate = await res.text();
}

async function init() {
    await loadCountries();
    await loadTemplate();
}
init();


const input = document.getElementById("id-input-search");
input.addEventListener("input", debounce(handleTypeAhead, 300));
input.addEventListener("focusout", (e) => { 
    if (e.relatedTarget && suggestions.contains(e.relatedTarget)) return;
    hideSuggestions();
});


function searchCountry(event) {
    event.preventDefault()
    if (!countriesData) { console.warn("Countries not loaded yet"); return; }

    const searchCountry = event.target.elements['id-input-search'].value;
    if (!searchCountry)
        return;
    
    hideSuggestions()

    const result = countriesData
        .filter(c => c.name.common.toLowerCase().includes(searchCountry.toLowerCase()));

    countriesContainer = document.getElementById('id-countries')
    countriesContainer.innerHTML=""
    countriesList = document.createElement("ul")

    result.forEach(c => {
        countriesList.appendChild(createCountryElement(c))
    });

    countriesContainer.appendChild(countriesList)
}

function createCountryElement(country) {
    const template = document.createElement("template");
    template.innerHTML = countryTemplate.trim();
    const li = template.content.firstElementChild.cloneNode(true);

    // Fill fields 
    li.querySelector('[data-field="name"]').textContent = country.name.common; 
    li.querySelector('[data-field="flag"]').src = country.flags.png; 
    li.querySelector('[data-field="region"]').textContent = country.region; 
    li.querySelector('[data-field="capital"]').textContent = country.capital?.[0] || "N/A"; 
    li.querySelector('[data-field="population"]').textContent = country.population.toLocaleString(); 
    li.querySelector('[data-field="languages"]').textContent = Object.values(country.languages || {}).join(", "); 
    li.querySelector('[data-field="timezones"]').textContent = country.timezones.join(", "); 
    return li;
} 

function debounce(fn, delay = 300) {
     let timeout; return (...args) => {
         clearTimeout(timeout); timeout = setTimeout(() => fn(...args), delay); 
        }; 
}

function handleTypeAhead(event) {
    const value = event.target.value.trim().toLowerCase();
    if (!value) {
        hideSuggestions();
        return;
    }

    const matches = countriesData
        .filter(c => c.name.common.toLowerCase().startsWith(value))
        .slice(0, 10);

    showSuggestions(matches);
}

function showSuggestions(list) {
    const box = document.getElementById("suggestions");
    box.innerHTML = "";

    list.forEach(country => {
    const div = document.createElement("div");
    div.className = "suggestion-item";
    div.textContent = country.name.common;
    div.tabIndex = 0; // <-- important

    div.addEventListener("click", () => {
        const input = document.getElementById("id-input-search");
        input.value = country.name.common;

        hideSuggestions();

        document.getElementById("id-search-form").requestSubmit();
    });


    box.appendChild(div);
});

    

    box.style.display = "block";
}

function hideSuggestions() {
    document.getElementById("suggestions").style.display = "none";
}
