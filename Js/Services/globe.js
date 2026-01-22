const myGlobe = Globe()
  (document.getElementById('id-globe-visualize'))
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg') // Night texture
  .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png') // Stars
  .showAtmosphere(true)
  .atmosphereColor('#3a228a')
  .atmosphereAltitude(0.15)
  .polygonCapColor(() => 'rgba(0, 150, 255, 0.7)')
  .polygonStrokeColor(() => '#111')
  .onPolygonClick((country) => {
    const countryName = country.properties.ADMIN;

    const input = document.getElementById("id-input-search");
    input.value = countryName;
    document.getElementById("suggestions").style.display = "none";
    document.getElementById("id-search-form").requestSubmit();
  });

export async function loadCountriesBorders() {
  try {
    const res = await fetch('https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson');
    if (!res.ok) throw new Error("Network response was not ok");
    return await res.json();
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
}
export function initializeGlobeWithBorders(countries) {
  myGlobe.polygonsData(countries.features)
    .polygonCapColor(() => 'rgba(200, 200, 200, 0.1)') // Transparent fill
    .polygonSideColor(() => 'rgba(0, 100, 0, 0.05)')   // Thickness color
    .polygonStrokeColor(() => '#00ff00')               // Green borders (Radio Garden style)
    .polygonLabel(({ properties: d }) => `<b>${d.ADMIN}</b>`);
}

// 3. CLK FROM LIST -> FOCUS GLOBE
// Add this logic to your existing search list click-handler
export function onSearchItemClick(lat, lng) {
  myGlobe.pointOfView({
    lat: lat,
    lng: lng,
    altitude: 2 // Zoom level (2 is a good middle ground)
  }, 1000); // Animation duration in milliseconds
}

export function flyToCountryByName(countryName) {
  const countriesData = myGlobe.polygonsData();
  const target = countriesData.find(obj =>
    obj.properties.ADMIN.toLowerCase() === countryName.toLowerCase() ||
    obj.properties.NAME.toLowerCase() === countryName.toLowerCase()
  );

  if (target) {
    // 3. Ensure globe is visible before flying
    const globeContainer = document.getElementById('id-globe-visualize');
    if (globeContainer.style.display === 'none') {
      window.toggleGlobe(); // Use your exported toggle function
    }

    // 4. Calculate coordinates (using label point or bounding box)
    const lat = target.properties.LABEL_Y || target.bbox[1];
    const lng = target.properties.LABEL_X || target.bbox[0];

    // 5. Trigger the flight
    window.onSearchItemClick(lat, lng);

    // Optional: Visually highlight the country on the globe
    myGlobe.polygonCapColor(d => d === target ? 'rgba(0, 255, 255, 0.6)' : 'rgba(200, 200, 200, 0.1)');
  } else {
    console.error("Could not find coordinates for:", countryName);
  }
}

const resizeGlobe = () => {
  const globeContainer = document.getElementById('id-globe-visualize');
  const width = globeContainer.offsetWidth;
  const height = globeContainer.offsetHeight;
  myGlobe.width(width);
  myGlobe.height(height);
};
const observer = new ResizeObserver(() => {
  resizeGlobe();
});
observer.observe(document.getElementById('id-globe-visualize'));
// 4. Toggle Logic
export function toggleGlobe() {
  const container = document.getElementById('id-globe-visualize');
  container.style.display = (container.style.display === 'none') ? 'block' : 'none';
}
window.toggleGlobe = toggleGlobe;
window.flyToCountryByName = flyToCountryByName;
window.onSearchItemClick = onSearchItemClick;