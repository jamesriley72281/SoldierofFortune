const inputField = document.querySelector("#textInput");
const submitBtn = document.querySelector("#submitButton");
const imagePlaceholder = document.querySelector("#imagePlaceholder");
const errorMessage = document.getElementById("errorMessage");
const loadingIndicator = document.getElementById("loadingIndicator");

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

const fetchScryfall = function (card) {
  // Hide input and button
  hideInputAndButton();

  // Show loading indicator
  loadingIndicator.style.display = "block";
  imagePlaceholder.style.display = "none"; // Hide the image placeholder while loading

  fetch(`https://api.scryfall.com/cards/named?fuzzy=${card}`)
    .then(async (response) => {
      if (!response.ok) {
        const data = await response.json();
        throw new Error(`${data.details} please do better`);
      }
      return response.json();
    })
    .then((data) => {
      // Hide loading indicator and show the image placeholder
      loadingIndicator.style.display = "none";
      imagePlaceholder.style.display = "block"; // Show the image placeholder

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
      img.style.opacity = "0"; // Set initial opacity to 0 for fade-in effect
      img.style.transition = "opacity 1s ease-in-out"; // Apply transition for fade-in

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
      img.onload = function () {
        img.style.opacity = "1"; // Apply fade-in

        // Display the message only after the image has fully loaded
        if (data.oracle_id === "a46d96d9-8e59-4777-8208-7730b9e33240") {
          message.textContent =
            "This card is good, but still NOT better than Soldier of Fortune";
        } else if (data.oracle_id === "8b2367b3-3a8d-442f-8d58-6e4c03fa5a46") {
          message.textContent = "This is Soldier of Fortune";
        } else {
          message.textContent =
            "This card is NOT better than Soldier of Fortune";
        }

        // Append the message after the image is fully loaded
        imagePlaceholder.insertBefore(message, img);

        // Show input and button after a delay
        showInputAndButton();

        // Smooth scrolling
        const offset =
          inputField.offsetTop +
          inputField.offsetHeight +
          submitBtn.offsetHeight +
          20; // Add some space

        window.scrollTo({
          top: offset,
          behavior: "smooth",
        });
      };
    })
    .catch((err) => {
      errorMessage.textContent = `Error: ${err.message}`;
      loadingIndicator.style.display = "none"; // Hide loading indicator if there's an error
      showInputAndButton(); // Make sure input/button reappear even if there's an error
    });
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
