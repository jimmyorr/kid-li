const boardImages = [
    { src: 'exports/board-front.png', title: 'Game Board - Front' },
    { src: 'exports/board-back.png', title: 'Game Board - Back' }
];

const cardImages = [
    { src: 'exports/cards/bluffs-card.png', title: 'The Bluffs' },
    { src: 'exports/cards/east-end-card.png', title: 'East End' },
    { src: 'exports/cards/gold-coast-card.png', title: 'Gold Coast' },
    { src: 'exports/cards/gravesend-card.png', title: 'Gravesend' },
    { src: 'exports/cards/pine-barrens-card.png', title: 'Pine Barrens' },
    { src: 'exports/cards/rockaway-card.png', title: 'Rockaway' },
    { src: 'exports/cards/south-shore-card.png', title: 'South Shore' },
    { src: 'exports/cards/westhampton-card.png', title: 'Westhampton' }
];

const assetImages = [
    { src: 'exports/logo.jpg', title: 'Project Logo' },
    { src: 'exports/card-back.png', title: 'Region Card Back' }
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
        w: 1200, // Placeholder width, PhotoSwipe will auto-resize
        h: 1600, // Placeholder height
        title: img.title
    }));

    const options = {
        index: allImages.indexOf(clickedImage),
        bgOpacity: 0.9,
        showHideOpacity: true
    };

    const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    
    // Auto-calculate image size after loading
    gallery.listen('gettingData', function(index, item) {
        if (item.w < 1 || item.h < 1) {
            const img = new Image();
            img.onload = function() {
                item.w = this.width;
                item.h = this.height;
                gallery.updateSize(true);
            };
            img.src = item.src;
        }
    });

    gallery.init();
}

document.addEventListener('DOMContentLoaded', () => {
    initGallery(boardImages, 'board-gallery', 'board');
    initGallery(cardImages, 'cards-gallery');
    initGallery(assetImages, 'assets-gallery');
});
