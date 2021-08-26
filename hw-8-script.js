import { galleryItems } from "./app.js";

const refs = {
    galleryList: document.querySelector(".js-gallery"),
    imgGallery: document.querySelector(".lightbox__image"),
    modalWindow: document.querySelector(".js-lightbox"),
    btnCls: document.querySelector(".lightbox__button"),
    overlay: document.querySelector(".lightbox__overlay"),
};

// creating and rendering gallery markup
const createGalleryMarkup = (galleryItems) => {
    return galleryItems.map((item) => {
        return `
            <li class="gallery__item">
                <a
                    class="gallery__link"
                    href="${item.original}"
                >
                    <img
                        class="gallery__image"
                        src="${item.preview}"
                        data-source="${item.original}"
                        alt="${item.description}"
                    />
                </a>
            </li>
        `;
    })
    .join('');
};
refs.galleryList.insertAdjacentHTML('beforeend', createGalleryMarkup(galleryItems));

// opening modal window on item gallery click with originl sized image
refs.galleryList.addEventListener('click', onGallaryItemClick);

function onGallaryItemClick(evt) {
    evt.preventDefault();
    const galleryItem = evt.target;
    if (!galleryItem.classList.contains('gallery__image')) {
        return
    };
    refs.modalWindow.classList.add('is-open');
    refs.imgGallery.src = galleryItem.dataset.source;
    refs.imgGallery.alt = galleryItem.alt;
};

// closing modal window on close btn click / clearing image src atribute
refs.btnCls.addEventListener('click', btnModalClose);
function btnModalClose(evt) {
    evt.preventDefault();
    refs.modalWindow.classList.remove('is-open');
    refs.imgGallery.src = '';
};

// closing modal window on overlay click
refs.overlay.addEventListener('click', onOverlayClickClose);
function onOverlayClickClose(evt) {
    if (evt.currentTarget === evt.target) {
        refs.modalWindow.classList.remove('is-open');
        refs.imgGallery.src = '';
    };
    return;
}

// closing modal window on ESC press
document.addEventListener('keyup', onEscModalClose);
function onEscModalClose(evt) {
    if (refs.modalWindow.classList.contains('is-open') && evt.keyCode === 27) {
        refs.modalWindow.classList.remove('is-open');
        refs.imgGallery.src = '';
    };
    return;
};

// image scrolling by key arrows in opened modal window