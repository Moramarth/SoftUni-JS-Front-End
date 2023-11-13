function solve() {
   let addButtons = Array.from(document.querySelectorAll("button.add-product"));
   let productsInCart = [];
   let totalPrice = 0;
   let outputElement = document.querySelector("textarea");

   let checkoutButton = document.querySelector("button.checkout");
   checkoutButton.addEventListener("click", handleCheckOut);


   for (let button of addButtons) {
      button.addEventListener("click", addproductToCart)
   };

   function addproductToCart(event) {
      let button = event.target;

      let productName = button.parentElement.parentElement.children[1].children[0].textContent;
      let productPrice = Number(button.parentElement.parentElement.children[3].textContent);

      if (!productsInCart.find(element => element === productName)) {
         productsInCart.push(productName)
      };

      totalPrice += productPrice;

      outputElement.textContent += `Added ${productName} for ${productPrice.toFixed(2)} to the cart.\n`;
   };

   function handleCheckOut() {
      outputElement.textContent += `You bought ${productsInCart.join(", ")} for ${totalPrice.toFixed(2)}.`;
      Array.from(document.querySelectorAll("button")).forEach(button => button.disabled = "disabled");
   };
}