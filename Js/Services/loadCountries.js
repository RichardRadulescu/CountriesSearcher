export async function loadCountries() {
    try {
        const res = await fetch('https://restcountries.com/v3.1/independent');
        if (!res.ok) throw new Error("Network response was not ok");
        return await res.json();
    } catch (err) {
        console.error("Fetch error:", err);
        return null;
    }
}
