const boardImages = [
  {
    src: "exports/board-front.png",
    msrc: "thumbs/board-front.webp",
    title: "Game Board - Front",
    w: 2475,
    h: 4875,
    thumbW: 203,
    thumbH: 400,
    eager: true,
    highPriority: true,
  },
  {
    src: "exports/board-back.png",
    msrc: "thumbs/board-back.webp",
    title: "Game Board - Back",
    w: 2475,
    h: 4875,
    thumbW: 203,
    thumbH: 400,
    eager: true,
  },
];

const cardImages = [
  {
    src: "exports/cards/bluffs-card.png",
    msrc: "thumbs/bluffs-card.webp",
    title: "The Bluffs",
    w: 900,
    h: 1500,
    thumbW: 150,
    thumbH: 250,
  },
  {
    src: "exports/cards/east-end-card.png",
    msrc: "thumbs/east-end-card.webp",
    title: "East End",
    w: 900,
    h: 1500,
    thumbW: 150,
    thumbH: 250,
  },
  {
    src: "exports/cards/gold-coast-card.png",
    msrc: "thumbs/gold-coast-card.webp",
    title: "Gold Coast",
    w: 900,
    h: 1500,
    thumbW: 150,
    thumbH: 250,
  },
  {
    src: "exports/cards/gravesend-card.png",
    msrc: "thumbs/gravesend-card.webp",
    title: "Gravesend",
    w: 900,
    h: 1500,
    thumbW: 150,
    thumbH: 250,
  },
  {
    src: "exports/cards/pine-barrens-card.png",
    msrc: "thumbs/pine-barrens-card.webp",
    title: "Pine Barrens",
    w: 900,
    h: 1500,
    thumbW: 150,
    thumbH: 250,
  },
  {
    src: "exports/cards/rockaway-card.png",
    msrc: "thumbs/rockaway-card.webp",
    title: "Rockaway",
    w: 900,
    h: 1500,
    thumbW: 150,
    thumbH: 250,
  },
  {
    src: "exports/cards/south-shore-card.png",
    msrc: "thumbs/south-shore-card.webp",
    title: "South Shore",
    w: 900,
    h: 1500,
    thumbW: 150,
    thumbH: 250,
  },
  {
    src: "exports/cards/westhampton-card.png",
    msrc: "thumbs/westhampton-card.webp",
    title: "Westhampton",
    w: 900,
    h: 1500,
    thumbW: 150,
    thumbH: 250,
  },
  {
    src: "exports/card-back.png",
    msrc: "thumbs/card-back.webp",
    title: "Region Card Back",
    w: 900,
    h: 1500,
    thumbW: 150,
    thumbH: 250,
  },
];

const assetImages = [
  {
    src: "exports/logo.jpg",
    msrc: "thumbs/logo.webp",
    title: "Logo",
    w: 1024,
    h: 1024,
    thumbW: 150,
    thumbH: 150,
  },
];

const allImages = [...boardImages, ...cardImages, ...assetImages];

function initGallery(images, containerId, extraClass = "") {
  const container = document.getElementById(containerId);
  images.forEach((img) => {
    const imgElement = document.createElement("img");
    imgElement.src = img.msrc;
    imgElement.alt = img.title;
    imgElement.title = img.title;
    imgElement.width = img.thumbW;
    imgElement.height = img.thumbH;
    if (img.highPriority) {
      imgElement.fetchPriority = "high";
    } else if (!img.eager) {
      imgElement.loading = "lazy";
    }
    imgElement.decoding = "async";
    if (extraClass) imgElement.classList.add(extraClass);

    imgElement.onclick = () => openPhotoSwipe(img);
    container.appendChild(imgElement);
  });
}

function openPhotoSwipe(clickedImage) {
  const pswpElement = document.querySelectorAll(".pswp")[0];

  const items = allImages.map((img) => ({
    src: img.src,
    msrc: img.msrc,
    w: img.w,
    h: img.h,
    title: img.title,
  }));

  const options = {
    index: allImages.indexOf(clickedImage),
    bgOpacity: 0.9,
    showHideOpacity: true,
    getThumbBoundsFn: (index) => {
      const thumbnail = document.querySelectorAll(".gallery img")[index];
      const pageYScroll =
        window.pageYOffset || document.documentElement.scrollTop;
      const rect = thumbnail.getBoundingClientRect();
      return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
    },
  };

  const gallery = new PhotoSwipe(
    pswpElement,
    PhotoSwipeUI_Default,
    items,
    options,
  );
  gallery.init();
}

function initAllGalleries() {
  initGallery(boardImages, "board-gallery", "board");
  initGallery(cardImages, "cards-gallery");
  initGallery(assetImages, "assets-gallery");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAllGalleries);
} else {
  initAllGalleries();
}
