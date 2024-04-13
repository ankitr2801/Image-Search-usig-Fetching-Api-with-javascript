const SearchInput = document.getElementById("SearchInput");
const subBtn = document.getElementById("subBtn");
const imageContainer = document.getElementById("image-container");
const ClearButton = document.getElementById("clearButton");

const accessKey = "wyYWtc-gfOiKD7EipX_9tNkMAT3ntCTF-yBIeuWl5Pc";

let page = 1;

async function searchImage(input, pageNum) {
  const apiUrl = `https://api.unsplash.com/search/photos?query=${input}&per_page=200&page=${pageNum}&client_id=${accessKey}`;
  // console.log(apiUrl);

      const response = await fetch(apiUrl);
      // console.log(response);
      const data = await response.json();
      console.log(data);
  displayResults(data.results);
  console.log(data.results);
}

function displayResults(results) {
  imageContainer.innerHTML = "";
  results.forEach((result) => {
    
    const imageElement = document.createElement("div");
    imageElement.id = "images"; // Use className instead of id
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description; // Use result.alt_description or an empty string
    imageElement.appendChild(image);
    imageContainer.appendChild(imageElement);

    // add click event listner to all image ---
    image.addEventListener("click", function () {
      displayImageDetails(result);
    });
  });

  if (results.length === 12) {
    createShowMoreButton();
  }
}

function createShowMoreButton() {
  const buttonEl = document.createElement("button");
  buttonEl.id = "show-More-button";
  buttonEl.innerText = "Show More";
  imageContainer.appendChild(buttonEl);

  buttonEl.addEventListener("click", function (e) {
    e.preventDefault();
    const inputText = SearchInput.value.trim();
    if (inputText !== "") {
      page++;
      searchImage(inputText, page);
    }
  });
}

function EnterSearch() {
      const inputText = SearchInput.value.trim();
      console.log(inputText);
  if (inputText !== "") {
    page = 1;
    searchImage(inputText, page);
  } else {
    alert("Please Enter a valid Image Name");
  }
}

subBtn.addEventListener("click", EnterSearch);

SearchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    EnterSearch();
    clear();
  }
});

ClearButton.addEventListener("click", function () {
  SearchInput.value = ""; // Clear the input field
});
