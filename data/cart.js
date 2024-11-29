export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function newEmptyCart() {
  const newCart = [];

  cart = newCart;

  saveToStorage();
}

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}
