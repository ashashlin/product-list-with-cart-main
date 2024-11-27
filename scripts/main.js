import { products } from "../data/products.js";

function renderProducts() {
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

          <button class="atc-btn">
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
}

renderProducts();
