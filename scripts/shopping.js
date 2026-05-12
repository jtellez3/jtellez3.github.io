/* =====================================================
   Shopping Cart Page - Soft Shore Suites
    This JavaScript file controls:
   - Displaying products on the page
   - Adding products to the shopping cart
   - Saving cart data with localStorage
   - Removing products from the cart
   - Calculating totals
   - Showing checkout messages
===================================================== */


/* Wait until the full HTML page loads before running JavaScript */
document.addEventListener("DOMContentLoaded", function () {

   /* =====================================================
      PRODUCT ARRAY
      Stores all shop product information in one place.
      Each product contains:
      - name
      - price
      - description
      - image path
   ===================================================== */
   const products = [

      {
         name: "Local Seaside Snack Basket",
         price: 27.99,
         description: "A curated basket of local coastal snacks and treats.",
         image: "images/snackbasket_thumb.jpg"
      },

      {
         name: "Soft Shore Beach Towel",
         price: 34.99,
         description: "A premium oversized beach towel with coastal stripes.",
         image: "images/beachtowel_thumb.jpg"
      },

      {
         name: "Soft Shore Tote Bag",
         price: 16.99,
         description: "A reusable tote bag with the Soft Shore logo.",
         image: "images/totebag_thumb.jpg"
      },

      {
         name: "Professional Photo Shoot Session",
         price: 149.99,
         description: "A beachside photo shoot experience.",
         image: "images/photoshoot_thumb.jpg"
      },

      {
         name: "Soft Shore Suites Apparel",
         price: 29.99,
         description: "T-shirts and hats with Soft Shore branding.",
         image: "images/apparel_thumb.jpg"
      },

      {
         name: "Ocean Breeze Candle",
         price: 18.99,
         description: "Luxury candle with ocean scent.",
         image: "images/candle_thumb.jpg"
      },

      {
         name: "Coastal Seashell Décor Set",
         price: 24.99,
         description: "Decor set to bring the beach home.",
         image: "images/seashellset_thumb.jpg"
      }
   ];


   /* =====================================================
      CONNECT JAVASCRIPT TO HTML ELEMENTS
      getElementById connects JavaScript to the page
      so the script can update the HTML content.
   ===================================================== */

   const shopItems = document.getElementById("shopItems");
   const cartItems = document.getElementById("cartItems");
   const cartTotal = document.getElementById("cartTotal");
   const clearCart = document.getElementById("clearCart");
   const checkoutButton = document.getElementById("checkoutButton");
   const checkoutMessage = document.getElementById("checkoutMessage");
   const cartPopup = document.getElementById("cartPopup");


   /* =====================================================
      localStorage saves the shopping cart even if
      the user refreshes the page.
      JSON.parse converts stored text back into an array.
   ===================================================== */

   let cart = JSON.parse(localStorage.getItem("softShoreCart")) || [];


   /* =====================================================
      SAVE CART FUNCTION
      Converts cart array into text and saves it.
   ===================================================== */
   function saveCart() {

      localStorage.setItem("softShoreCart", JSON.stringify(cart));

   }


   /* =====================================================
      POPUP FUNCTION
      Shows a popup message when item is added to cart.
      setTimeout hides popup after 2 seconds.
   ===================================================== */
   function showPopup() {

      cartPopup.style.display = "block";

      setTimeout(function () {

         cartPopup.style.display = "none";

      }, 2000);

   }


   /* =====================================================
      DISPLAY PRODUCTS FUNCTION
      Loops through all products and creates product cards.
      insertAdjacentHTML adds product cards to webpage.
   ===================================================== */
   function displayProducts() {

      shopItems.innerHTML = "";

      /* Loop through product array */
      for (let i = 0; i < products.length; i++) {

         let card = "<div class='shop-card'>";

         /* Product image */
         card += "<img src='" + products[i].image + 
                 "' alt='" + products[i].name + 
                 "' class='shop-img'>";

         /* Product title */
         card += "<h4>" + products[i].name + "</h4>";

         /* Product description */
         card += "<p>" + products[i].description + "</p>";

         /* Product price */
         card += "<p class='shop-price'>$" + 
                 products[i].price.toFixed(2) + "</p>";

         /* Quantity input box */
         card += "<label>Quantity:</label>";

         card += "<input type='number' id='qty" + i + 
                 "' min='1' value='1' class='quantity-box'>";

         /* Add to Cart button */
         card += "<button class='shop-button' data-index='" + 
                 i + "'>Add to Cart</button>";

         card += "</div>";

         /* Add product card into webpage */
         shopItems.insertAdjacentHTML("beforeend", card);
      }
   }


   /* =====================================================
      ADD TO CART FUNCTION
      Adds selected product and quantity into cart array.
   ===================================================== */
   function addToCart(index) {

      /* Get quantity from input box */
      let qty = parseInt(document.getElementById("qty" + index).value);

      /* Prevent invalid quantity */
      if (isNaN(qty) || qty < 1) qty = 1;

      let found = false;

      /* Check if product already exists in cart */
      for (let i = 0; i < cart.length; i++) {

         if (cart[i].name === products[index].name) {

            /* Increase quantity if already exists */
            cart[i].quantity += qty;

            found = true;
         }
      }

      /* If product not in cart, create new object */
      if (!found) {

         cart.push({

            name: products[index].name,
            price: products[index].price,
            quantity: qty

         });
      }

      /* Save and refresh cart display */
      saveCart();
      displayCart();
      showPopup();

      checkoutMessage.innerHTML = "";
   }


   /* =====================================================
      DISPLAY CART FUNCTION
      Shows cart items and calculates total price.
   ===================================================== */
   function displayCart() {

      cartItems.innerHTML = "";

      let total = 0;

      /* Show message if cart empty */
      if (cart.length === 0) {

         cartItems.innerHTML = "<p>Your cart is empty.</p>";

      }

      /* Loop through cart items */
      for (let i = 0; i < cart.length; i++) {

         let itemTotal = cart[i].price * cart[i].quantity;

         total += itemTotal;

         let row = "<div class='cart-line'>";

         row += "<span>" + cart[i].name + "</span>";

         row += "<span>Qty: " + cart[i].quantity + "</span>";

         row += "<span>$" + itemTotal.toFixed(2) + "</span>";

         /* Remove button */
         row += "<button class='remove-button' data-index='" + 
                 i + "'>Remove</button>";

         row += "</div>";

         cartItems.insertAdjacentHTML("beforeend", row);
      }

      /* Display final total price */
      cartTotal.innerHTML = "$" + total.toFixed(2);
   }


   /* =====================================================
      REMOVE ITEM FUNCTION
      Removes selected item from cart array.
   ===================================================== */
   function removeItem(index) {

      cart.splice(index, 1);

      saveCart();

      displayCart();
   }


   /* =====================================================
      CHECKOUT FUNCTION
      Displays confirmation message after checkout.
   ===================================================== */
   function checkoutCart() {

      if (cart.length === 0) {

         checkoutMessage.innerHTML =
         "Your cart is empty. Please add items before checkout.";

      } else {

         checkoutMessage.innerHTML =
         "Thank you! Your Soft Shore Suites order has been completed.";

         /* Clear cart after checkout */
         cart = [];

         saveCart();

         displayCart();
      }
   }


   /* =====================================================
      EVENT LISTENERS
      Detect user actions like button clicks.
   ===================================================== */

   /* Add to Cart button click */
   shopItems.addEventListener("click", function (e) {

      if (e.target.classList.contains("shop-button")) {

         addToCart(e.target.getAttribute("data-index"));
      }
   });


   /* Remove item button click */
   cartItems.addEventListener("click", function (e) {

      if (e.target.classList.contains("remove-button")) {

         removeItem(e.target.getAttribute("data-index"));
      }
   });


   /* Clear entire cart button */
   clearCart.addEventListener("click", function () {

      cart = [];

      saveCart();

      displayCart();

      checkoutMessage.innerHTML = "";
   });


   /* Checkout button */
   checkoutButton.addEventListener("click", checkoutCart);


   /* =====================================================
      RUN FUNCTIONS WHEN PAGE LOADS
   ===================================================== */

   displayProducts();

   displayCart();

});