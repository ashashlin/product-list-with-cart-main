import { products, renderATCBtn, renderATCBtnClass } from "../../data/products.js";
import { cart, removeFromCart, saveToStorage } from "../../data/cart.js";
import { renderCart } from "./renderCart.js";

export function renderProducts() {
  let productsHTML = '';

  products.forEach((product) => {
    const productId = product.id;
    const productImgDesktop = product.image.desktop;
    const productImgTablet = product.image.tablet;
    const productImgMobile = product.image.mobile;
    const productCategory = product.category;
    const productName = product.name;
    const productPrice = (product.price).toFixed(2);

    productsHTML += `
      <div class="product js-product-${productId}">
        <div class="img-container">
          <picture>
            <source media="(min-width: 90rem)"
                    srcset="${productImgDesktop}">

            <source media="(min-width: 48rem)"
                    srcset="${productImgTablet}">

            <source srcset="${productImgMobile}">

            <img class="product-img" src="${productImgMobile}" alt="an image of ${productName}">
          </picture>

          <button class="
          product-btn
          js-product-btn
          js-product-btn-${productId}
          ${renderATCBtnClass(productId)}"
          data-product-id="${productId}">
            ${renderATCBtn(productId)}
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

  function atcEventListener() {
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

            saveToStorage();

            document.querySelector(`.js-atc-${productId}`)
              .innerHTML = `
                ${renderATCBtn(productId)}
              `;

            document.querySelector(`.js-product-btn-${productId}`)
              .classList.remove('atc-btn', 'js-atc-btn', `js-atc-${productId}`);

            document.querySelector(`.js-product-btn-${productId}`)
              .classList.add('added-to-cart', 'js-added-to-cart', `js-added-to-cart-${productId}`);

            renderCart();

            const decrementBtn = document.querySelector(`.js-decrement-${productId}`);

            decrementBtn.addEventListener('click', (e) => {
              e.stopPropagation();

              decrementBtnEventListener(decrementBtn);
            });

            const incrementBtn = document.querySelector(`.js-increment-${productId}`);

            incrementBtn.addEventListener('click', (e) => {
              e.stopPropagation();

              incrementBtnEventListener(productId);
            });
          }
        });
      });
  }

  atcEventListener();

  function decrementBtnEventListener(decrementBtn) {
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

        document.querySelector(`.js-added-to-cart-${productId}`)
          .innerHTML = `
            ${renderATCBtn(productId)}
          `;

        document.querySelector(`.js-product-btn-${productId}`)
          .classList.remove('added-to-cart', 'js-added-to-cart', `js-added-to-cart-${productId}`);

        document.querySelector(`.js-product-btn-${productId}`)
          .classList.add('atc-btn', 'js-atc-btn', `js-atc-${productId}`);

        document.querySelector(`.js-atc-${productId}`)
          .addEventListener('click', () => {
            atcEventListener();
          });

      } else {
        document.querySelector(`.js-cart-quantity-${productId}`)
          .innerHTML = `${matchingItem.quantity}`;
      }

      saveToStorage();
      renderCart();
    }
  }

document.querySelectorAll('.js-decrement')
  .forEach((decrementBtn) => {
    decrementBtn.addEventListener('click', () => {
      decrementBtnEventListener(decrementBtn);
    });
  });

function incrementBtnEventListener(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity++;

  saveToStorage();

  document.querySelector(`.js-cart-quantity-${productId}`)
    .innerHTML = `${matchingItem.quantity}`;

  renderCart();
}

document.querySelectorAll('.js-increment')
  .forEach((incrementBtn) => {
    incrementBtn.addEventListener('click', () => {
      const {productId} = incrementBtn.dataset;

      incrementBtnEventListener(productId);
    });
  });
}
