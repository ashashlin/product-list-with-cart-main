export let cart = [];

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  // localStorage.setItem('cart', JSON.stringify(cart));
}

export function newEmptyCart() {
  const newCart = [];

  cart = newCart;
}
