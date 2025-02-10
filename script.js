const inputField = document.querySelector("#textInput");
const submitBtn = document.querySelector("#submitButton");
const imagePlaceholder = document.querySelector("#imagePlaceholder");

// Fetch search from Scryfall
// Fetch search from Scryfall
const fetchScryfall = function (card) {
  console.log(`${card}`);
  fetch(`https://api.scryfall.com/cards/named?fuzzy=${card}`)
    .then((response) => {
      if (!response.ok)
        throw new Error(`Something Went Wrong ${response.status}`);
      return response.json();
    })
    .then((data) => {
      console.log(data);

      // Clear previous content
      imagePlaceholder.innerHTML = "";

      // Create a text element for the conditional message
      const message = document.createElement("div");
      message.style.fontSize = "20px";
      message.style.fontWeight = "bold";
      message.style.textAlign = "center"; // Centers text
      message.style.marginBottom = "15px"; // Space between text & image

      if (data.oracle_id !== "8b2367b3-3a8d-442f-8d58-6e4c03fa5a46") {
        message.textContent = "This card is NOT better than Soldier of Fortune";
      } else {
        message.textContent = "This is Soldier of Fortune";
      }

      // Create an image element
      const img = document.createElement("img");
      img.src = data.image_uris.normal;
      img.alt = "Loaded Image";
      img.style.maxWidth = "100%";
      img.style.display = "block";
      img.style.margin = "0 auto"; // Ensures image is centered

      // Ensure imagePlaceholder is a flex column to stack elements properly
      imagePlaceholder.style.display = "flex";
      imagePlaceholder.style.flexDirection = "column";
      imagePlaceholder.style.alignItems = "center"; // Centers everything

      // Apply background and padding adjustments
      imagePlaceholder.style.backgroundColor = "transparent";
      imagePlaceholder.style.paddingTop = "20px";

      // Append text first, then image
      imagePlaceholder.appendChild(message);
      imagePlaceholder.appendChild(img);
    })
    .catch((err) => console.log(err));
};

// Click button to submit query from input Field
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  fetchScryfall(inputField.value);
});
