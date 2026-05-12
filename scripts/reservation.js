/* Reservation page estimate calculator
   This script calculates the room cost, extra service cost, tax,
   and final total. I also added a custom confirmation message
   so the guest stays on my website after submitting the form.
*/

document.addEventListener("DOMContentLoaded", function () {

   /* Extra service prices */
   const ROOM_SERVICE_PRICE = 25.00;
   const CHAMPAGNE_PRICE = 45.00;
   const VALET_PARKING_PRICE = 20.00;
   const SPA_SERVICE_PRICE = 80.00;
   const MASSAGE_SERVICE_PRICE = 95.00;
   const SPA_PACKAGE_PRICE = 120.00;

   /* Sales tax rate */
   const SALES_TAX = 0.07;

   /* Function to calculate estimate totals */
   function calcTotal() {
      let roomCost = parseFloat(document.getElementById("roomType").value) || 0;
      let serviceCost = 0;

      /* Check which add-ons are selected */
      let roomService = document.getElementById("roomService").checked;
      let champagne = document.getElementById("champagne").checked;
      let valetParking = document.getElementById("valetParking").checked;
      let spaService = document.getElementById("spaService").checked;
      let massageService = document.getElementById("massageService").checked;
      let spaPackage = document.getElementById("spaPackage").checked;

      /* Add selected service prices */
      serviceCost += roomService ? ROOM_SERVICE_PRICE : 0;
      serviceCost += champagne ? CHAMPAGNE_PRICE : 0;
      serviceCost += valetParking ? VALET_PARKING_PRICE : 0;
      serviceCost += spaService ? SPA_SERVICE_PRICE : 0;
      serviceCost += massageService ? MASSAGE_SERVICE_PRICE : 0;
      serviceCost += spaPackage ? SPA_PACKAGE_PRICE : 0;

      /* Display room cost and extra service total */
      document.getElementById("roomCost").innerHTML = "$" + roomCost.toFixed(2);
      document.getElementById("serviceTotal").innerHTML = "$" + serviceCost.toFixed(2);

      /* Calculate tax */
      let tax = (roomCost + serviceCost) * SALES_TAX;
      document.getElementById("serviceTax").innerHTML = "$" + tax.toFixed(2);

      /* Calculate final total */
      let totalBill = roomCost + serviceCost + tax;
      document.getElementById("totalBill").innerHTML = "$" + totalBill.toFixed(2);
   }

   /* Run calculator when room selection changes */
   document.getElementById("roomType").onchange = calcTotal;

   /* Run calculator when extra services are clicked */
   document.getElementById("roomService").onclick = calcTotal;
   document.getElementById("champagne").onclick = calcTotal;
   document.getElementById("valetParking").onclick = calcTotal;
   document.getElementById("spaService").onclick = calcTotal;
   document.getElementById("massageService").onclick = calcTotal;
   document.getElementById("spaPackage").onclick = calcTotal;

   /* Run calculator once when page loads */
   calcTotal();

   /* This stops the form from going to the plain demo page */
   document.getElementById("reservationForm").addEventListener("submit", function(event) {
      event.preventDefault();

      /* Get guest information from the form */
      let guestName = document.getElementById("fullName").value;
      let guestEmail = document.getElementById("email").value;
      let checkinDate = document.getElementById("checkin").value;
      let checkoutDate = document.getElementById("checkout").value;
      let totalEstimate = document.getElementById("totalBill").innerHTML;

      /* Put guest information into the confirmation box */
      document.getElementById("confirmName").innerHTML = guestName;
      document.getElementById("confirmEmail").innerHTML = guestEmail;
      document.getElementById("confirmCheckin").innerHTML = checkinDate;
      document.getElementById("confirmCheckout").innerHTML = checkoutDate;
      document.getElementById("confirmTotal").innerHTML = totalEstimate;

      /* Hide the form and show the luxury confirmation message */
      document.getElementById("reservationForm").style.display = "none";
      document.getElementById("confirmationBox").style.display = "block";
   });

});