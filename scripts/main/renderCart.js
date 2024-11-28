import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";

export function renderCart() {
  let cartQuantity = 0;
  let orderTotal = 0;

  if (cart.length === 0) {
    const emptyCartHTML = `
      <h2>
        Your Cart (0)
      </h2>

      <div class="empty-cart">
        <img class="empty-cart-img" src="assets/images/illustration-empty-cart.svg" alt="an illustration of a birthday cake being cut into two pieces">
        <p class="empty-cart-msg">
          Your added items will appear here
        </p>
      </div>
    `;

    document.querySelector('.js-cart')
      .innerHTML = emptyCartHTML;

    return;
  }

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;

    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });

    orderTotal += cartItem.quantity * matchingProduct.price;
  });

const cartHTML = `
  <h2>
    Your Cart (${cartQuantity})
  </h2>

  <div class="cart-items">
    ${renderCartItems()}
  </div>

  <div class="cart-total">
    <div class="cart-order-total">
      <p class="order-total">
        Order Total
      </p>
      <p class="price-total">
        $${orderTotal.toFixed(2)}
      </p>
    </div>

    <div class="delivery-msg">
      <img src="assets/images/icon-carbon-neutral.svg" alt="an icon of a little tree">

      <p>
        This is a <span>carbon-neutral</span> delivery
      </p>
    </div>

    <button class="confirm-order">
      Confirm Order
    </button>
  </div>
`;

document.querySelector('.js-cart')
  .innerHTML = cartHTML;
}

function renderCartItems() {
  let cartItemsHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });

    cartItemsHTML += `
      <div class="cart-item">
        <div class="cart-item-details">
          <p class="cart-item-name">
            ${matchingProduct.name}
          </p>

          <div class="cart-item-q-p">
            <div class="cart-item-quantity">
              ${cartItem.quantity}x
            </div>
            <div class="cart-item-price">
              @ $${(matchingProduct.price).toFixed(2)}
            </div>
            <div class="cart-item-price-total">
              $${(cartItem.quantity * matchingProduct.price).toFixed(2)}
            </div>
          </div>
        </div>

        <div class="remove-item-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
            <path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/>
          </svg>
        </div>
      </div>
    `;
  });

  return cartItemsHTML;
}
