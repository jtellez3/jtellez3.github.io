/*  This page feature using arrays and JavaScript.
   This script displays guest reviews for Soft Shore Suites.
*/

/* Arrays storing review information */
let reviewerNames = ["Ariana M.", "Sofia T.", "Janelle R.", "Mia C."];
let reviewTitles = [
   "So relaxing and peaceful",
   "Beautiful weekend stay",
   "Perfect birthday getaway",
   "Loved the suite and service"
];
let reviewDates = ["04/01/2026", "03/28/2026", "03/20/2026", "03/15/2026"];
let starRatings = [5, 5, 5, 5];
let reviewText = [
   "Soft Shore Suites was exactly what I needed. The room felt calm, clean, and luxurious. I loved waking up to a peaceful view and the whole property had such a relaxing feel.",
   "I stayed for the weekend and everything looked beautiful. The staff was kind, the suite was spotless, and the atmosphere felt very upscale without being overwhelming.",
   "I booked this stay for my birthday and it was perfect. The room was cozy, elegant, and private. I would absolutely come back for another special occasion.",
   "From check-in to check-out, everything was smooth. The suite was comfortable, the details were beautiful, and the extra services made the whole stay feel special."
];

/* Function to create star symbols */
function buildStars(rating) {
   let stars = "";
   for (let i = 0; i < rating; i++) {
      stars += "★";
   }
   return stars;
}

/* Get the review section from the page */
let reviewSection = document.getElementById("reviewSection");

/* Loop through arrays and build each review card */
for (let i = 0; i < reviewerNames.length; i++) {
   let reviewCard = "<div class='review-card'>";
   reviewCard += "<h4>" + reviewTitles[i] + "</h4>";
   reviewCard += "<p class='review-meta'><strong>Guest:</strong> " + reviewerNames[i] + "</p>";
   reviewCard += "<p class='review-meta'><strong>Date:</strong> " + reviewDates[i] + "</p>";
   reviewCard += "<p class='review-stars'>" + buildStars(starRatings[i]) + "</p>";
   reviewCard += "<p>" + reviewText[i] + "</p>";
   reviewCard += "</div>";

   reviewSection.insertAdjacentHTML("beforeend", reviewCard);
}