document.addEventListener("DOMContentLoaded", () => {
  const characters = [
    {
      name: "Blaze Stormrider",
      heroPath: "./img/third.png",
      backgroundImage: "./img/thirdbg.webp",
    },
    {
      name: "Sable Nightshade",
      heroPath: "./img/second.png",
      backgroundImage: "./img/secondbg.webp",
    },
    {
      name: "Titan Steelclaw",
      heroPath: "./img/first.png",
      backgroundImage: "./img/firstbg.webp",
    },
  ];

  const cardsContainer = document.querySelector(".cards-container");

  characters.forEach(character => {
    const card = document.createElement("div");
    card.className = "card";

    const backLayer = createLayer("back", character.backgroundImage);
    const midLayer = createMidLayer(character.name);
    const frontLayer = createLayer("front", character.heroPath);

    card.append(backLayer, midLayer, frontLayer);
    cardsContainer.appendChild(card);
  });

  const layers = document.querySelectorAll(".parallax-layer");


  window.addEventListener("mousemove", (event) => {
    const xOffset = (event.clientX / window.innerWidth) * 2 - 1;
    const yOffset = (event.clientY / window.innerHeight) * 2 - 1;
    updateLayers(layers, xOffset, yOffset);
  });
});

function createLayer(className, backgroundImage) {
  const layer = document.createElement("div");
  layer.className = `parallax-layer ${className}`;
  layer.style.backgroundImage = `url(${backgroundImage})`;
  layer.dataset.depth = "0.5";
  return layer;
}

function createMidLayer(textContent) {
  const midLayer = document.createElement("div");
  midLayer.className = "mid";
  midLayer.dataset.depth = "0.5";

  const text = document.createElement("div");
  text.className = "mid-text";
  text.textContent = textContent;

  midLayer.appendChild(text);
  return midLayer;
}

function updateLayers(layers, xOffset, yOffset) {
  layers.forEach((layer) => {
    const depth = parseFloat(layer.dataset.depth);
    const xTransform = -xOffset * depth * 75;
    const yTransform = -yOffset * depth * 75;
    layer.style.transform = `translate(-50%, -50%) translate(${xTransform}px, ${yTransform}px)`;
  });
}
