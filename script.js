const button = document.getElementById("getPlant");
const display = document.getElementById("plantDisplay");

// Replace with your actual Perenual API key
const API_KEY = "sk-MuGt694c7db80ed7114089";

button.addEventListener("click", fetchRandomPlant);

async function fetchRandomPlant() {
  display.innerHTML = "<p>Loading plant 🌱...</p>";

  try {
    // Pick a random page (assuming 50 pages of plants)
    const randomPage = Math.floor(Math.random() * 50) + 1;

    const response = await fetch(
      `https://perenual.com/api/species-list?key=${API_KEY}&page=${randomPage}`
    );

    if (!response.ok) throw new Error("API request failed");

    const data = await response.json();

    if (!data.data || data.data.length === 0)
      throw new Error("No plants returned");

    // Pick a random plant from the page
    const plant = data.data[Math.floor(Math.random() * data.data.length)];

    display.innerHTML = `
      <h2>${plant.common_name || "Unknown Plant"}</h2>

      ${
        plant.default_image?.medium_url
          ? `<img src="${plant.default_image.medium_url}" alt="${plant.common_name || "Plant"}" style="max-width:100%; border-radius:8px;">`
          : "<p>No image available</p>"
      }

      <p><strong>Scientific Name:</strong> ${plant.scientific_name || "Unknown"}</p>
    `;
  } catch (error) {
    console.error("ERROR:", error);
    display.innerHTML = "<p>Error loading plant 😢</p>";
  }
}
