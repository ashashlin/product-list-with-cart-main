import { cart } from "./cart.js";

export const products = [
  {
     "id": '1',
     "image": {
          "thumbnail": "./assets/images/image-waffle-thumbnail.jpg",
          "mobile": "./assets/images/image-waffle-mobile.jpg",
          "tablet": "./assets/images/image-waffle-tablet.jpg",
          "desktop": "./assets/images/image-waffle-desktop.jpg"
     },
     "name": "Waffle with Berries",
     "category": "Waffle",
     "price": 6.50
  },
  {
      "id": '2',
      "image": {
          "thumbnail": "./assets/images/image-creme-brulee-thumbnail.jpg",
          "mobile": "./assets/images/image-creme-brulee-mobile.jpg",
          "tablet": "./assets/images/image-creme-brulee-tablet.jpg",
          "desktop": "./assets/images/image-creme-brulee-desktop.jpg"
      },
      "name": "Vanilla Bean Crème Brûlée",
      "category": "Crème Brûlée",
      "price": 7.00
   },
   {
      "id": '3',
      "image": {
          "thumbnail": "./assets/images/image-macaron-thumbnail.jpg",
          "mobile": "./assets/images/image-macaron-mobile.jpg",
          "tablet": "./assets/images/image-macaron-tablet.jpg",
          "desktop": "./assets/images/image-macaron-desktop.jpg"
      },
      "name": "Macaron Mix of Five",
      "category": "Macaron",
      "price": 8.00
   },
   {
      "id": '4',
      "image": {
          "thumbnail": "./assets/images/image-tiramisu-thumbnail.jpg",
          "mobile": "./assets/images/image-tiramisu-mobile.jpg",
          "tablet": "./assets/images/image-tiramisu-tablet.jpg",
          "desktop": "./assets/images/image-tiramisu-desktop.jpg"
      },
      "name": "Classic Tiramisu",
      "category": "Tiramisu",
      "price": 5.50
   },
   {
      "id": '5',
      "image": {
          "thumbnail": "./assets/images/image-baklava-thumbnail.jpg",
          "mobile": "./assets/images/image-baklava-mobile.jpg",
          "tablet": "./assets/images/image-baklava-tablet.jpg",
          "desktop": "./assets/images/image-baklava-desktop.jpg"
      },
      "name": "Pistachio Baklava",
      "category": "Baklava",
      "price": 4.00
   },
   {
      "id": '6',
      "image": {
          "thumbnail": "./assets/images/image-meringue-thumbnail.jpg",
          "mobile": "./assets/images/image-meringue-mobile.jpg",
          "tablet": "./assets/images/image-meringue-tablet.jpg",
          "desktop": "./assets/images/image-meringue-desktop.jpg"
      },
      "name": "Lemon Meringue Pie",
      "category": "Pie",
      "price": 5.00
   },
   {
      "id": '7',
      "image": {
          "thumbnail": "./assets/images/image-cake-thumbnail.jpg",
          "mobile": "./assets/images/image-cake-mobile.jpg",
          "tablet": "./assets/images/image-cake-tablet.jpg",
          "desktop": "./assets/images/image-cake-desktop.jpg"
      },
      "name": "Red Velvet Cake",
      "category": "Cake",
      "price": 4.50
   },
   {
      "id": '8',
      "image": {
          "thumbnail": "./assets/images/image-brownie-thumbnail.jpg",
          "mobile": "./assets/images/image-brownie-mobile.jpg",
          "tablet": "./assets/images/image-brownie-tablet.jpg",
          "desktop": "./assets/images/image-brownie-desktop.jpg"
      },
      "name": "Salted Caramel Brownie",
      "category": "Brownie",
      "price": 4.50
   },
   {
      "id": '9',
      "image": {
          "thumbnail": "./assets/images/image-panna-cotta-thumbnail.jpg",
          "mobile": "./assets/images/image-panna-cotta-mobile.jpg",
          "tablet": "./assets/images/image-panna-cotta-tablet.jpg",
          "desktop": "./assets/images/image-panna-cotta-desktop.jpg"
      },
      "name": "Vanilla Panna Cotta",
      "category": "Panna Cotta",
      "price": 6.50
   }
];

export function renderATCBtn(productId) {
   let isFound = false;
   let matchingItem;
   let btnHTML;

   cart.forEach((cartItem) => {
      if (cartItem.productId === productId) {
         isFound = true;
         matchingItem = cartItem;
      }
   });

   if (!isFound) {
      btnHTML = `
         <img src="assets/images/icon-add-to-cart.svg" alt="an icon of a shopping cart with a plus sign in it">
         <div>Add to Cart</div>
      `;
   } else {
      btnHTML = `
         <div class="adjust-q-icon js-decrement js-decrement-${productId}"
         data-product-id="${productId}">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2">
            <path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/>
            </svg>
         </div>

         <div class="js-cart-quantity-${productId}">
            ${matchingItem.quantity}
         </div>

         <div class="adjust-q-icon js-increment js-increment-${productId}"
         data-product-id="${productId}">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
            <path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/>
            </svg>
         </div>
      `;
   }

   return btnHTML;
}

export function renderATCBtnClass(productId) {
   let isFound = false;
   let btnClassHTML;

   cart.forEach((cartItem) => {
      if (cartItem.productId === productId) {
         isFound = true;
      }
   });

   if (!isFound) {
      btnClassHTML = `
         atc-btn js-atc-btn js-atc-${productId}
      `;
   } else {
      btnClassHTML = `
         added-to-cart js-added-to-cart js-added-to-cart-${productId}
      `;
   }

   return btnClassHTML;
}
