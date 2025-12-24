const button = document.getElementById("getPlant");
const display = document.getElementById("plantDisplay");

const API_KEY = "YOUR_API_KEY_HERE";

button.addEventListener("click", fetchRandomPlant);

async function fetchRandomPlant() {
  display.innerHTML = "<p>Loading plant 🌱...</p>";

  try {
    // Pick a random page (Perenual has many pages)
    const randomPage = Math.floor(Math.random() * 50) + 1;

    const response = await fetch(
      `https://perenual.com/api/species-list?key=${API_KEY}&page=${randomPage}`
    );

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      throw new Error("No plants returned");
    }

    const plant =
      data.data[Math.floor(Math.random() * data.data.length)];

    display.innerHTML = `
      <h2>${plant.common_name || "Unknown Plant"}</h2>

      ${
        plant.default_image?.medium_url
          ? `<img src="${plant.default_image.medium_url}" alt="${plant.common_name || "Plant"}">`
          : ""
      }

      <p><strong>Scientific Name:</strong> ${
        Array.isArray(plant.scientific_name)
          ? plant.scientific_name.join(", ")
          : "Unknown"
      }</p>

      <p><strong>Watering:</strong> ${plant.watering || "Unknown"}</p>

      <p><strong>Sunlight:</strong> ${
        Array.isArray(plant.sunlight)
          ? plant.sunlight.join(", ")
          : "Unknown"
      }</p>

      <p><strong>Cycle:</strong> ${plant.cycle || "Unknown"}</p>
    `;
  } catch (error) {
    console.error("ERROR:", error);
    display.innerHTML = "<p>Error loading plant 😢</p>";
  }
}
