document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('header nav ul li a[href^="#"], footer .footer-nav ul li a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = document.querySelector('header').offsetHeight || 80;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const sections = document.querySelectorAll('section[id]');
    function navHighlighter() {
        let scrollY = window.pageYOffset;
        const headerHeight = document.querySelector('header').offsetHeight || 80;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - headerHeight - 50; 
            let sectionId = current.getAttribute('id');
            
            let navLink = document.querySelector('header nav ul li a[href="#' + sectionId + '"]');
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }
    window.addEventListener('scroll', navHighlighter);
    navHighlighter();

    const catImageSources = [ 
        'images/hero-cat1.png',
        'images/hero-cat2.png',
        'images/hero-cat3.png', 
        'images/hero-cat4.png' 
    ];
    const heroCatSlot1Img = document.querySelector('#heroCatSlot1 img');
    const heroCatSlot2Img = document.querySelector('#heroCatSlot2 img');
    const catImagePrevBtn = document.getElementById('catImagePrev');
    const catImageNextBtn = document.getElementById('catImageNext');
    let currentCatImageIndex1 = 0; 
    let currentCatImageIndex2 = 1;
    function updateCatImages() {
        if (heroCatSlot1Img && heroCatSlot2Img && catImageSources.length >= 2) {
            currentCatImageIndex1 = (currentCatImageIndex1 + catImageSources.length) % catImageSources.length;
            currentCatImageIndex2 = (currentCatImageIndex2 + catImageSources.length) % catImageSources.length;
            heroCatSlot1Img.src = catImageSources[currentCatImageIndex1];
            heroCatSlot1Img.alt = `街貓展示 ${currentCatImageIndex1 + 1}`;
            heroCatSlot2Img.src = catImageSources[currentCatImageIndex2];
            heroCatSlot2Img.alt = `街貓展示 ${currentCatImageIndex2 + 1}`;
        }
    }
    if (catImagePrevBtn && catImageNextBtn && heroCatSlot1Img && heroCatSlot2Img) {
        catImageNextBtn.addEventListener('click', () => {
            currentCatImageIndex1 = currentCatImageIndex2;
            currentCatImageIndex2 = (currentCatImageIndex2 + 1) % catImageSources.length;
            if (currentCatImageIndex1 === currentCatImageIndex2 && catImageSources.length > 1) {
                currentCatImageIndex2 = (currentCatImageIndex2 + 1) % catImageSources.length;
            }
            updateCatImages();
        });
        catImagePrevBtn.addEventListener('click', () => {
            currentCatImageIndex2 = currentCatImageIndex1;
            currentCatImageIndex1 = (currentCatImageIndex1 - 1 + catImageSources.length) % catImageSources.length;
            if (currentCatImageIndex1 === currentCatImageIndex2 && catImageSources.length > 1) {
                currentCatImageIndex1 = (currentCatImageIndex1 - 1 + catImageSources.length) % catImageSources.length;
            }
            updateCatImages();
        });
        if (catImageSources.length >= 2) {
            updateCatImages();
        } else if (catImageSources.length === 1 && heroCatSlot1Img) { 
            heroCatSlot1Img.src = catImageSources[0];
            if(heroCatSlot2Img) heroCatSlot2Img.style.display = 'none'; 
        }
    }


const testimonialSlider = document.querySelector('#testimonials .testimonial-slider');
const testimonialPrevBtn = document.getElementById('testimonialPrev');
const testimonialNextBtn = document.getElementById('testimonialNext');

if (testimonialSlider && testimonialPrevBtn && testimonialNextBtn) {
    let cardStyle = testimonialSlider.querySelector('.testimonial-card');
    let cardComputedStyle = cardStyle ? window.getComputedStyle(cardStyle) : null;
    let cardMarginRight = cardComputedStyle ? parseInt(cardComputedStyle.marginRight) : 0; 
    let gapBetweenCards = parseInt(window.getComputedStyle(testimonialSlider).gap) || 30; 
    let scrollAmount = cardStyle ? cardStyle.offsetWidth + gapBetweenCards : 330; 
    testimonialPrevBtn.addEventListener('click', () => {
        testimonialSlider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    testimonialNextBtn.addEventListener('click', () => {
        testimonialSlider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
}

    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) { // Show after 300px scroll
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

});


document.addEventListener('DOMContentLoaded', function() {
    const galleryWrapper = document.querySelector('.cat-gallery-wrapper');
    const galleryRow = document.querySelector('.cat-gallery-row');
    if (galleryWrapper && galleryRow) {
        const images = galleryRow.querySelectorAll('img');
        if (images.length === 0) return;
        images.forEach(img => {
            const clone = img.cloneNode(true);
            galleryRow.appendChild(clone);
        });
        const firstImage = images[0];
        const imageWidthWithMargin = firstImage.offsetWidth + 
        parseInt(window.getComputedStyle(firstImage).marginRight);
        const originalContentWidth = imageWidthWithMargin * images.length;
        galleryRow.style.width = originalContentWidth * 2 + 'px';
        let scrollAmount = 0;
        const scrollSpeed = 1;
        function animateGallery() {
            scrollAmount -= scrollSpeed;
            galleryRow.style.transform = `translateX(${scrollAmount}px)`;
            if (Math.abs(scrollAmount) >= originalContentWidth) {
                scrollAmount += originalContentWidth; 
            }
            requestAnimationFrame(animateGallery);
        }
        animateGallery();
        galleryWrapper.addEventListener('mouseenter', () => {
            galleryRow.style.animationPlayState = 'paused'; 
        });
        galleryWrapper.addEventListener('mouseleave', () => {
            galleryRow.style.animationPlayState = 'running'; 
        });
    }
});