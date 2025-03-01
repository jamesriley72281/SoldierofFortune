const inputField = document.querySelector("#textInput");
const submitBtn = document.querySelector("#submitButton");
const imagePlaceholder = document.querySelector("#imagePlaceholder");
const errorMessage = document.getElementById("errorMessage");

const hideInputAndButton = () => {
  inputField.style.opacity = "0";
  submitBtn.style.opacity = "0";
};

const showInputAndButton = () => {
  setTimeout(() => {
    inputField.style.opacity = "1"; //
    submitBtn.style.opacity = "1";
  }, 500);
};

const fetchScryfall = async (card) => {
  try {
    hideInputAndButton();

    // Hide image placeholder
    imagePlaceholder.style.display = "none";

    const response = await fetch(
      `https://api.scryfall.com/cards/named?fuzzy=${card}`
    );
    if (!response.ok) {
      const data = await response.json();
      throw new Error(`${data.details} Please do better next time!`);
    }

    const data = await response.json();

    // Show the image placeholder
    imagePlaceholder.style.display = "block";

    // Clear previous content
    imagePlaceholder.innerHTML = "";

    // Create a text element for the conditional message
    const message = document.createElement("div");
    message.style.fontSize = "20px";
    message.style.fontWeight = "bold";
    message.style.textAlign = "center";
    message.style.marginBottom = "15px";

    // Create an image element
    const img = document.createElement("img");
    img.src = data.image_uris.normal;
    img.alt = "Loaded Image";
    img.style.maxWidth = "90%";
    img.style.display = "block";
    img.style.margin = "0 auto";
    img.style.opacity = "0";
    img.style.transition = "opacity 1s ease-in-out";

    // Ensure imagePlaceholder is a flex column to stack elements properly
    imagePlaceholder.style.display = "flex";
    imagePlaceholder.style.flexDirection = "column";
    imagePlaceholder.style.alignItems = "center";

    // Apply background and padding adjustments
    imagePlaceholder.style.backgroundColor = "transparent";
    imagePlaceholder.style.paddingTop = "20px";

    // Append image first
    imagePlaceholder.appendChild(img);

    // Wait for the image to load before applying the fade-in effect
    img.onload = () => {
      img.style.opacity = "1";

      // Display the message only after the image has fully loaded
      if (data.oracle_id === "a46d96d9-8e59-4777-8208-7730b9e33240") {
        message.textContent =
          "This card is good, but still NOT better than Soldier of Fortune";
      } else if (data.oracle_id === "8b2367b3-3a8d-442f-8d58-6e4c03fa5a46") {
        message.textContent = "This is Soldier of Fortune";
      } else {
        message.textContent = "This card is NOT better than Soldier of Fortune";
      }

      // Append the message after the image is fully loaded
      imagePlaceholder.insertBefore(message, img);

      showInputAndButton();

      const offset =
        inputField.offsetTop +
        inputField.offsetHeight +
        submitBtn.offsetHeight +
        20;

      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    };
  } catch (err) {
    errorMessage.textContent = `Error: ${err.message}`;
    showInputAndButton();
  }
};

// Added debounce to save Scryfall from having to deal with someone smashing Submit over and over
const debouncedFetchScryfall = _.debounce((card) => {
  errorMessage.textContent = "";
  fetchScryfall(card);
}, 800);

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  debouncedFetchScryfall(inputField.value);
});
