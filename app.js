const searchInput = document.getElementById("searchText");
const submitButton = document.getElementById("submit");
const removeButton = document.getElementById("remove");

submitButton.addEventListener("click", showGif);

removeButton.addEventListener("click", removeGifs);

async function getGif(q) {
  try {
    const res = await axios.get("https://api.giphy.com/v1/channels/search", {
      params: {
        q,
        api_key: "Gc7131jiJuvI7IdN0HZ1D7nh0ow5BU6g",
      },
    });
    return res.data.data[0].featured_gif.images.downsized_medium.url;
  } catch (error) {
    console.error("Error fetching GIF:", error);
    throw error;
  }
}
async function showGif() {
  const gifUrl = await getGif(searchInput.value);
  createGif(gifUrl);
  searchInput.value = "";
}

function createGif(url) {
  const img = document.createElement("img");
  img.className = "object-fit-contain p-2";
  img.src = url;
  document.getElementById("containerGif").append(img);
}

function removeGifs() {
  const imgs = document.querySelectorAll("#containerGif>img");
  for (const gif of imgs) {
    gif.remove();
  }
}
