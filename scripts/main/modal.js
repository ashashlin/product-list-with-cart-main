import { cart, newEmptyCart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { renderCart } from "./renderCart.js";
import { renderProducts } from "./renderProducts.js";

export function renderModal() {
  let orderTotal = 0;

  cart.forEach((cartItem) => {
    const {productId} = cartItem;
    const {quantity} = cartItem;

    let matchingProduct;

    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });

    orderTotal += quantity * matchingProduct.price;
  });

  const modalHTML = `
    <div class="container">
      <div class="modal-top">
        <img src="assets/images/icon-order-confirmed.svg" alt="a check icon to illustrate order confirmation">
        <h2>
          Order Confirmed
        </h2>
        <p class="modal-top-msg">
          We hope you enjoy your food!
        </p>
      </div>

      <div class="modal-middle">
        <div class="modal-cart-items">
          ${renderModalCartItems()}
        </div>

        <div class="modal-order-total">
          <p class="modal-order-total-text">
            Order Total
          </p>

          <p class="modal-order-total-price">
            $${orderTotal.toFixed(2)}
          </p>
        </div>
      </div>

      <button class="start-new-order js-start-new-order">
        Start New Order
      </button>
    </div>
  `;

  document.querySelector('.js-modal')
    .innerHTML = modalHTML;

  const modal = document.querySelector('.js-modal');

  document.querySelector('.js-start-new-order')
    .addEventListener('click', () => {
      newEmptyCart();
      modal.close();
      renderProducts();
      renderCart();
    });
}

function renderModalCartItems() {
  let modalCartItemsHTML = '';

  cart.forEach((cartItem) => {
    const {productId} = cartItem;

    let matchingProduct;

    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });

    modalCartItemsHTML += `
      <div class="modal-cart-item">
        <div class="modal-cart-item-thumbnail-container">
          <img class="modal-cart-item-thumbnail" src="${matchingProduct.image.thumbnail}" alt="an image of ${matchingProduct.name}">
        </div>

        <div class="modal-cart-item-details">
          <p>
            ${matchingProduct.name}
          </p>

          <div class="modal-cart-item-q-p">
            <div class="modal-cart-item-quantity">
              ${cartItem.quantity}x
            </div>
            <div class="modal-cart-item-price">
              @ $${(matchingProduct.price).toFixed(2)}
            </div>
          </div>
        </div>

        <div class="modal-cart-item-price-total">
          $${(cartItem.quantity * matchingProduct.price).toFixed(2)}
        </div>
      </div>
    `;
  });

  return modalCartItemsHTML;
}
