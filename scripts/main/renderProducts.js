import { products } from "../../data/products.js";
import { cart } from "../../data/cart.js";
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
      <div class="product">
        <div class="img-container">
          <picture>
            <source media="(min-width: 90rem)"
                    srcset="${productImgDesktop}">

            <source media="(min-width: 48rem)"
                    srcset="${productImgTablet}">

            <source srcset="${productImgMobile}">

            <img class="product-img" src="${productImgMobile}" alt="an image of ${productCategory}">
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

        if (matchingItem) {
          matchingItem.quantity++;
        } else {
          cart.push({
            productId,
            quantity: 1
          });

          let matchingItem;
          let quantity;

          cart.forEach((cartItem) => {
            if (cartItem.productId === productId) {
              matchingItem = cartItem;
              quantity = matchingItem.quantity;
            }
          });

          document.querySelector(`.js-atc-${productId}`)
            .innerHTML = `
              <div class="adjust-q-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2">
                  <path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/>
                </svg>
              </div>

              <div>${quantity}</div>

              <div class="adjust-q-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
                  <path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/>
                </svg>
              </div>
            `;

          document.querySelector(`.js-atc-${productId}`)
            .classList.add('added-to-cart');
        }

        // localStorage.setItem('cart', JSON.stringify(cart));

        renderCart();
      });
    });
}
