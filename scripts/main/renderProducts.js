import { products } from "../../data/products.js";
import { cart, removeFromCart } from "../../data/cart.js";
import { renderCart } from "./renderCart.js";

export function renderProducts() {
  let productsHTML = '';

  products.forEach((product) => {
    const productImgDesktop = product.image.desktop;
    const productImgTablet = product.image.tablet;
    const productImgMobile = product.image.mobile;
    const productCategory = product.category;
    const productName = product.name;
    const productPrice = (product.price).toFixed(2);

    productsHTML += `
      <div class="product js-product-${product.id}">
        <div class="img-container">
          <picture>
            <source media="(min-width: 90rem)"
                    srcset="${productImgDesktop}">

            <source media="(min-width: 48rem)"
                    srcset="${productImgTablet}">

            <source srcset="${productImgMobile}">

            <img class="product-img" src="${productImgMobile}" alt="an image of ${productName}">
          </picture>

          <button class="atc-btn js-atc-btn js-atc-${product.id}"
          data-product-id="${product.id}">
            <img src="assets/images/icon-add-to-cart.svg" alt="an icon of a shopping cart with a plus sign in it">
            <div>Add to Cart</div>
          </button>
        </div>

        <p class="product-category">
          ${productCategory}
        </p>
        <p class="product-name">
          ${productName}
        </p>
        <p class="product-price">
          $${productPrice}
        </p>
      </div>
    `;
  });

  document.querySelector('.js-products-container')
    .innerHTML = productsHTML;

  document.querySelectorAll('.js-atc-btn')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const {productId} = button.dataset;

        let matchingItem;

        cart.forEach((cartItem) => {
          if (cartItem.productId === productId) {
            matchingItem = cartItem;
          }
        });

        if (!matchingItem) {
          cart.push({
            productId,
            quantity: 1
          });

          // localStorage.setItem('cart', JSON.stringify(cart));

          let quantity;

          cart.forEach((cartItem) => {
            let matchingItem;

            if (cartItem.productId === productId) {
              matchingItem = cartItem;
              quantity = matchingItem.quantity;
            }
          });

          document.querySelector(`.js-atc-${productId}`)
            .innerHTML = `
              <div class="adjust-q-icon js-decrement js-decrement-${productId}"
              data-product-id="${productId}">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2">
                  <path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/>
                </svg>
              </div>

              <div class="js-cart-quantity-${productId}">
                ${quantity}
              </div>

              <div class="adjust-q-icon js-increment js-increment-${productId}"
              data-product-id="${productId}">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
                  <path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/>
                </svg>
              </div>
            `;

          document.querySelector(`.js-product-${productId}`)
            .classList.add('added-to-cart');

          renderCart();

          const decrementBtn = document.querySelector(`.js-decrement-${productId}`);

          decrementBtn.addEventListener('click', (e) => {
            e.stopPropagation();

            const {productId} = decrementBtn.dataset;

            let matchingItem;

            cart.forEach((cartItem) => {
              if (cartItem.productId === productId) {
                matchingItem = cartItem;
              }
            });

            if (matchingItem.quantity > 0) {
              matchingItem.quantity--;

              if (matchingItem.quantity === 0) {
                removeFromCart(productId);

                document.querySelector(`.js-atc-${productId}`)
                  .innerHTML = `
                    <img src="assets/images/icon-add-to-cart.svg" alt="an icon of a shopping cart with a plus sign in it">
                    <div>Add to Cart</div>
                  `;

                document.querySelector(`.js-product-${productId}`)
                  .classList.remove('added-to-cart');

              } else {
                document.querySelector(`.js-cart-quantity-${productId}`)
                  .innerHTML = `${matchingItem.quantity}`;
              }

              renderCart();
            }
          });

          const incrementBtn = document.querySelector(`.js-increment-${productId}`);

          incrementBtn.addEventListener('click', (e) => {
            e.stopPropagation();

            let matchingItem;

            cart.forEach((cartItem) => {
              if (cartItem.productId === productId) {
                matchingItem = cartItem;
              }
            });

            matchingItem.quantity++;

            document.querySelector(`.js-cart-quantity-${productId}`)
              .innerHTML = `${matchingItem.quantity}`;

            renderCart();
          });
        }
      });
    });
}
