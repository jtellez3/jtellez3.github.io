/* Slideshow script for Soft Shore Suites
   This controls the arrows, thumbnails, captions, and automatic timer.
*/

/* keeps track of which slide we are on */
let slideIndex = 1;

/* variable for automatic slideshow */
let autoSlide;

/* waits until the page loads before running the slideshow */
document.addEventListener("DOMContentLoaded", function () {

  /* show first slide when page loads */
  showSlides(slideIndex);

  /* start slideshow automatically */
  startAutoSlides();
});

/* next and previous buttons */
function plusSlides(n) {
  showSlides(slideIndex += n);

  /* restart timer when user clicks */
  restartAutoSlides();
}

/* when user clicks thumbnail */
function currentSlide(n) {
  showSlides(slideIndex = n);

  /* restart timer so it feels smooth */
  restartAutoSlides();
}

/* main slideshow function */
function showSlides(n) {
  let i;

  /* get all slides and thumbnails */
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");
  let captionText = document.getElementById("caption");

  /* stop errors if slideshow is not on the page */
  if (slides.length === 0) {
    return;
  }

  /* loop back to first slide */
  if (n > slides.length) {
    slideIndex = 1;
  }

  /* go to last slide if below 1 */
  if (n < 1) {
    slideIndex = slides.length;
  }

  /* hide all slides */
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  /* remove active from thumbnails */
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  /* show current slide */
  slides[slideIndex - 1].style.display = "block";

  /* highlight current thumbnail */
  dots[slideIndex - 1].className += " active";

  /* update caption text */
  captionText.innerHTML = dots[slideIndex - 1].alt;
}

/* automatically change slides every 4 seconds */
function startAutoSlides() {
  autoSlide = setInterval(function () {
    slideIndex++;
    showSlides(slideIndex);
  }, 4000);
}

/* restart slideshow when user interacts */
function restartAutoSlides() {
  clearInterval(autoSlide);
  startAutoSlides();
}