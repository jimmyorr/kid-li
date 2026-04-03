const boardImages = [
    { src: 'exports/board-front.png', title: 'Game Board - Front', w: 2475, h: 4875 },
    { src: 'exports/board-back.png', title: 'Game Board - Back', w: 2475, h: 4875 }
];

const cardImages = [
    { src: 'exports/cards/bluffs-card.png', title: 'The Bluffs', w: 900, h: 1500 },
    { src: 'exports/cards/east-end-card.png', title: 'East End', w: 900, h: 1500 },
    { src: 'exports/cards/gold-coast-card.png', title: 'Gold Coast', w: 900, h: 1500 },
    { src: 'exports/cards/gravesend-card.png', title: 'Gravesend', w: 900, h: 1500 },
    { src: 'exports/cards/pine-barrens-card.png', title: 'Pine Barrens', w: 900, h: 1500 },
    { src: 'exports/cards/rockaway-card.png', title: 'Rockaway', w: 900, h: 1500 },
    { src: 'exports/cards/south-shore-card.png', title: 'South Shore', w: 900, h: 1500 },
    { src: 'exports/cards/westhampton-card.png', title: 'Westhampton', w: 900, h: 1500 },
    { src: 'exports/card-back.png', title: 'Region Card Back', w: 900, h: 1500 }
];

const assetImages = [
    { src: 'exports/logo.jpg', title: 'Logo', w: 1024, h: 1024 }
];

const allImages = [...boardImages, ...cardImages, ...assetImages];

function initGallery(images, containerId, extraClass = '') {
    const container = document.getElementById(containerId);
    images.forEach((img, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = img.src;
        imgElement.alt = img.title;
        imgElement.title = img.title;
        if (extraClass) imgElement.classList.add(extraClass);
        
        imgElement.onclick = () => openPhotoSwipe(img);
        container.appendChild(imgElement);
    });
}

function openPhotoSwipe(clickedImage) {
    const pswpElement = document.querySelectorAll('.pswp')[0];
    
    const items = allImages.map(img => ({
        src: img.src,
        w: img.w,
        h: img.h,
        title: img.title
    }));

    const options = {
        index: allImages.indexOf(clickedImage),
        bgOpacity: 0.9,
        showHideOpacity: true,
        getThumbBoundsFn: (index) => {
            const thumbnail = document.querySelectorAll('img')[index];
            const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
            const rect = thumbnail.getBoundingClientRect();
            return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
        }
    };

    const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
}

document.addEventListener('DOMContentLoaded', () => {
    initGallery(boardImages, 'board-gallery', 'board');
    initGallery(cardImages, 'cards-gallery');
    initGallery(assetImages, 'assets-gallery');
});
