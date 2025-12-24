const button = document.getElementById("getPlant");
const display = document.getElementById("plantDisplay");

const API_KEY = "sk-RqXE694c79384ea6e14089";

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
        plant.default_image
          ? `<img src="${plant.default_image.medium_url}" alt="${plant.common_name}">`
          : ""
      }

      <p><strong>Scientific Name:</strong> ${plant.scientific_name.join(", ")}</p>
      <p><strong>Watering:</strong> ${plant.watering}</p>
      <p><strong>Sunlight:</strong> ${plant.sunlight.join(", ")}</p>
      <p><strong>Cycle:</strong> ${plant.cycle}</p>
    `;
  } catch (error) {
    console.error(error);
    display.innerHTML = "<p>Error loading plant 😢</p>";
  }
}
