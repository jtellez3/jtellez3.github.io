/* Reservation page estimate calculator
   This script calculates the room cost, extra service cost,
   tax, and final total for the reservation page.
*/

document.addEventListener("DOMContentLoaded", function () {

   /* Extra service prices */
   const ROOM_SERVICE_PRICE = 25.00;
   const CHAMPAGNE_PRICE = 45.00;
   const VALET_PARKING_PRICE = 20.00;

   /* Sales tax rate */
   const SALES_TAX = 0.07;

   /* Function to calculate estimate totals */
   function calcTotal() {
      /* Get selected room price, or 0 if nothing is selected */
      let roomCost = parseFloat(document.getElementById("roomType").value) || 0;
      let serviceCost = 0;

      /* Check each selected add-on and add to service total */
      let roomService = document.getElementById("roomService").checked;
      let champagne = document.getElementById("champagne").checked;
      let valetParking = document.getElementById("valetParking").checked;

      serviceCost += roomService ? ROOM_SERVICE_PRICE : 0;
      serviceCost += champagne ? CHAMPAGNE_PRICE : 0;
      serviceCost += valetParking ? VALET_PARKING_PRICE : 0;

      /* Display room cost and extra service total */
      document.getElementById("roomCost").innerHTML = "$" + roomCost.toFixed(2);
      document.getElementById("serviceTotal").innerHTML = "$" + serviceCost.toFixed(2);

      /* Calculate and display tax */
      let tax = (roomCost + serviceCost) * SALES_TAX;
      document.getElementById("serviceTax").innerHTML = "$" + tax.toFixed(2);

      /* Calculate and display final total */
      let totalBill = roomCost + serviceCost + tax;
      document.getElementById("totalBill").innerHTML = "$" + totalBill.toFixed(2);
   }

   /* Run calculator when room selection changes */
   document.getElementById("roomType").onchange = calcTotal;

   /* Run calculator when extra services are clicked */
   document.getElementById("roomService").onclick = calcTotal;
   document.getElementById("champagne").onclick = calcTotal;
   document.getElementById("valetParking").onclick = calcTotal;
});