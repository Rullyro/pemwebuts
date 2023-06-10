// Menu
let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menu.onclick = () => {
    menu.classList.toggle('fa-x');
    navlist.classList.toggle('open');
};
// scroll Reveal
const sr = ScrollReveal ({
    distance: '65px',
    duration: 2600,
    delay: 450,
    reset: true
});
// Reveal
sr.reveal('.produk-text', {delay:200, origin:'top'});
sr.reveal('.produk-img', {delay:400, origin:'top'});

// Slideshow
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let touchStartX = 0;
let touchEndX = 0;
const SWIPE_THRESHOLD = 50;

function showSlide(slideIndex) {
  if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  } else if (slideIndex >= slides.length) {
    slideIndex = 0;
  }

  slides.forEach((slide) => slide.classList.remove('active'));
  dots.forEach((dot) => dot.classList.remove('active'));

  slides[slideIndex].classList.add('active');
  dots[slideIndex].classList.add('active');
  currentSlide = slideIndex;
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

function goToSlide(slideIndex) {
  showSlide(slideIndex);
}

document.querySelector('.next-button').addEventListener('click', nextSlide);
document.querySelector('.prev-button').addEventListener('click', prevSlide);

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    goToSlide(index);
  });
});

slides.forEach((slide) => {
  slide.addEventListener('touchstart', touchStart);
  slide.addEventListener('touchmove', touchMove);
  slide.addEventListener('touchend', touchEnd);
});

function touchStart(event) {
  touchStartX = event.touches[0].clientX;
}

function touchMove(event) {
  touchEndX = event.touches[0].clientX;
}

function touchEnd() {
  const diffX = touchEndX - touchStartX;
  if (diffX > SWIPE_THRESHOLD) {
    prevSlide();
  } else if (diffX < -SWIPE_THRESHOLD) {
    nextSlide();
  }
}

showSlide(currentSlide);
setInterval(nextSlide, 2500);


// scroll to top / bottom
const scrollButton = document.querySelector('.scroll-top');
let isAtTop = true;

window.addEventListener('scroll', toggleScrollButton);
scrollButton.addEventListener('click', scrollToTopOrBottom);

function toggleScrollButton() {
  if (window.pageYOffset > 100) {
    scrollButton.classList.add('active');
    isAtTop = false;
  } else {
    scrollButton.classList.remove('active');
    isAtTop = true;
  }

  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    scrollButton.style.bottom = '280px'; // Adjust the distance above the footer
  } else {
    scrollButton.style.bottom = '40px'; // Adjust the original distance from the bottom
  }

  if (isAtTop) {
    scrollButton.innerHTML = '<i class="fa-solid fa-arrow-down"></i>';
  } else {
    scrollButton.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  }
}

function scrollToTopOrBottom() {
  if (isAtTop) {
    // Scroll to bottom
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  } else {
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

