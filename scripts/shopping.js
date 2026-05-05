/* Shopping cart page - 
   Allows quantity, cart storage, and checkout message
*/

document.addEventListener("DOMContentLoaded", function () {

   /* Product list using JPG thumbnail images */
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

   /* Connect to HTML */
      const shopItems = document.getElementById("shopItems");
      const cartItems = document.getElementById("cartItems");
      const cartTotal = document.getElementById("cartTotal");
      const clearCart = document.getElementById("clearCart");
      const checkoutButton = document.getElementById("checkoutButton");
      const checkoutMessage = document.getElementById("checkoutMessage");
      const cartPopup = document.getElementById("cartPopup");

   let cart = JSON.parse(localStorage.getItem("softShoreCart")) || [];

   function saveCart() {
      localStorage.setItem("softShoreCart", JSON.stringify(cart));
   }

   function showPopup() {
      cartPopup.style.display = "block";
      setTimeout(function () {
         cartPopup.style.display = "none";
      }, 2000);
   }

   function displayProducts() {
      shopItems.innerHTML = "";

      for (let i = 0; i < products.length; i++) {
         let card = "<div class='shop-card'>";

         /* Product image */
         card += "<img src='" + products[i].image + "' alt='" + products[i].name + "' class='shop-img'>";

         card += "<h4>" + products[i].name + "</h4>";
         card += "<p>" + products[i].description + "</p>";
         card += "<p class='shop-price'>$" + products[i].price.toFixed(2) + "</p>";

         card += "<label>Quantity:</label>";
         card += "<input type='number' id='qty" + i + "' min='1' value='1' class='quantity-box'>";

         card += "<button class='shop-button' data-index='" + i + "'>Add to Cart</button>";
         card += "</div>";

         shopItems.insertAdjacentHTML("beforeend", card);
      }
   }

   function addToCart(index) {
      let qty = parseInt(document.getElementById("qty" + index).value);

      if (isNaN(qty) || qty < 1) qty = 1;

      let found = false;

      for (let i = 0; i < cart.length; i++) {
         if (cart[i].name === products[index].name) {
            cart[i].quantity += qty;
            found = true;
         }
      }

      if (!found) {
         cart.push({
            name: products[index].name,
            price: products[index].price,
            quantity: qty
         });
      }

      saveCart();
      displayCart();
      showPopup();
      checkoutMessage.innerHTML = "";
   }

   function displayCart() {
      cartItems.innerHTML = "";
      let total = 0;

      if (cart.length === 0) {
         cartItems.innerHTML = "<p>Your cart is empty.</p>";
      }

      for (let i = 0; i < cart.length; i++) {
         let itemTotal = cart[i].price * cart[i].quantity;
         total += itemTotal;

         let row = "<div class='cart-line'>";
         row += "<span>" + cart[i].name + "</span>";
         row += "<span>Qty: " + cart[i].quantity + "</span>";
         row += "<span>$" + itemTotal.toFixed(2) + "</span>";
         row += "<button class='remove-button' data-index='" + i + "'>Remove</button>";
         row += "</div>";

         cartItems.insertAdjacentHTML("beforeend", row);
      }

      cartTotal.innerHTML = "$" + total.toFixed(2);
   }

   function removeItem(index) {
      cart.splice(index, 1);
      saveCart();
      displayCart();
   }

   function checkoutCart() {
      if (cart.length === 0) {
         checkoutMessage.innerHTML = "Your cart is empty. Please add items before checkout.";
      } else {
         checkoutMessage.innerHTML = "Thank you! Your Soft Shore Suites order has been completed.";
         cart = [];
         saveCart();
         displayCart();
      }
   }

   shopItems.addEventListener("click", function (e) {
      if (e.target.classList.contains("shop-button")) {
         addToCart(e.target.getAttribute("data-index"));
      }
   });

   cartItems.addEventListener("click", function (e) {
      if (e.target.classList.contains("remove-button")) {
         removeItem(e.target.getAttribute("data-index"));
      }
   });

   clearCart.addEventListener("click", function () {
      cart = [];
      saveCart();
      displayCart();
      checkoutMessage.innerHTML = "";
   });

   checkoutButton.addEventListener("click", checkoutCart);

   displayProducts();
   displayCart();

});