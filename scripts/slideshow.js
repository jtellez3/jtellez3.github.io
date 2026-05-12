/* Slideshow script for Soft Shore Suites
   I moved this code out of my HTML page and into this external JavaScript file.
   This keeps my index.html cleaner and shows that the gallery uses JavaScript.
*/

/* This keeps track of which slide is showing */
let slideIndex = 1;

/* This variable stores the automatic timer */
let autoSlide;

/* Waits for the page to load before JavaScript runs */
document.addEventListener("DOMContentLoaded", function () {

  /* Show the first slide when the page opens */
  showSlides(slideIndex);

  /* Start the slideshow timer */
  startAutoSlides();

  /* Connect previous arrow to JavaScript */
  document.getElementById("prevBtn").addEventListener("click", function () {
    plusSlides(-1);
  });

  /* Connect next arrow to JavaScript */
  document.getElementById("nextBtn").addEventListener("click", function () {
    plusSlides(1);
  });

  /* Connect each thumbnail image to JavaScript */
  let thumbnails = document.getElementsByClassName("demo");

  for (let i = 0; i < thumbnails.length; i++) {
    thumbnails[i].addEventListener("click", function () {

      /* data-slide tells JavaScript which slide to open */
      let slideNumber = Number(this.getAttribute("data-slide"));

      currentSlide(slideNumber);
    });
  }
});

/* Moves slideshow forward or backward */
function plusSlides(n) {
  showSlides(slideIndex += n);

  /* Restart timer after clicking arrow */
  restartAutoSlides();
}

/* Opens the slide that matches the thumbnail */
function currentSlide(n) {
  showSlides(slideIndex = n);

  /* Restart timer after clicking thumbnail */
  restartAutoSlides();
}

/* Main slideshow function */
function showSlides(n) {
  let i;

  /* Get slides, thumbnails, and caption from HTML */
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");
  let captionText = document.getElementById("caption");

  /* Stops errors if the slideshow is not found */
  if (slides.length === 0) {
    return;
  }

  /* If slide number is too high, go back to first slide */
  if (n > slides.length) {
    slideIndex = 1;
  }

  /* If slide number is too low, go to last slide */
  if (n < 1) {
    slideIndex = slides.length;
  }

  /* Hide all slides first */
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  /* Remove active class from all thumbnails */
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  /* Show the current slide */
  slides[slideIndex - 1].style.display = "block";

  /* Highlight the current thumbnail */
  dots[slideIndex - 1].className += " active";

  /* Show the caption from the thumbnail alt text */
  captionText.innerHTML = dots[slideIndex - 1].alt;
}

/* Automatically changes slides every 4 seconds */
function startAutoSlides() {
  autoSlide = setInterval(function () {
    slideIndex++;
    showSlides(slideIndex);
  }, 4000);
}

/* Restarts the timer when user clicks */
function restartAutoSlides() {
  clearInterval(autoSlide);
  startAutoSlides();
}