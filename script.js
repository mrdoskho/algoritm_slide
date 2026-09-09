const slides = document.querySelectorAll('.slide');
let current = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.transform = `translateY(${(i - index) * 100}vh)`;
    });
}

function nextSlide() {
    if (current < slides.length - 1) {
        current++;
        showSlide(current);
    }
}

function prevSlide() {
    if (current > 0) {
        current--;
        showSlide(current);
    }
}

// Клик мышью — следующий слайд
document.addEventListener('click', nextSlide);

// Стрелки клавиатуры
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextSlide();
    }

    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        prevSlide();
    }
});

showSlide(0);
slide.style.transform = `translateX(${(i - index) * 100}vw)`;