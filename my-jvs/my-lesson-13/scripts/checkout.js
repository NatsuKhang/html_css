import { cart, deleteFromCart, calculateCartQuantity, updateItemQuantity } from "../data/cart.js"
import { products } from "../data/products.js"
import { formatCurrency } from "./utils/money.js"
import { isValidProductNumber } from "./utils/number.js";

function updateCartQuantity(){
  let cartQuantity = calculateCartQuantity();

  document.querySelector('.js-cart-quantity')
    .innerHTML = `${cartQuantity} items`;
};
updateCartQuantity();

let cartSummaryHTML="";

cart.forEach(cartItem => {
  const {productId} = cartItem;

  let matchingItem;
  products.forEach( item => {
    if (item.id === productId)
      matchingItem=item;
  })

  cartSummaryHTML+=
  `
    <div class="cart-item-container js-cart-item-container-${matchingItem.id}
      data-product-id=${matchingItem.id}
    ">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src=${matchingItem.image}>

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingItem.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingItem.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-quantity-link" 
              data-product-id=${matchingItem.id}>
              Update
            </span>
            <input class="quantity-input js-quantity-input" 
              data-product-id=${matchingItem.id}>
            <span class="save-quantity-link link-primary js-save-quantity-link" 
              data-product-id=${matchingItem.id}>Save</span>
            <span class="delete-quantity-link link-primary js-delete-quantity-link" 
              data-product-id=${matchingItem.id}>
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingItem.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingItem.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingItem.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
});

document.querySelector('.js-order-summary')
  .innerHTML=cartSummaryHTML;

document.querySelectorAll('.js-delete-quantity-link')
  .forEach((link)=>{
    link.addEventListener('click',()=>{
      const {productId}=link.dataset;
      deleteFromCart(productId);

      updateCartQuantity();

      //deleteHTML
      document.querySelector(`.js-cart-item-container-${productId}`)
        .remove();
    });
  });

document.querySelectorAll('.js-update-quantity-link')
  .forEach((link)=>{
    link.addEventListener('click',()=>{
      const {productId}=link.dataset;

      const cartItemContainer = document.querySelector(`.js-cart-item-container-${productId}`);

      cartItemContainer.classList.add('is-editing-quantity');
    });
  });

document.querySelectorAll('.js-save-quantity-link')
  .forEach((link)=>{
    link.addEventListener('click',()=>{
      const {productId}=link.dataset;

      const cartItemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
      const inputElement=cartItemContainer.querySelector('.js-quantity-input');
      
      if(isValidProductNumber(inputElement.value)){
        const newQuantity=Number(inputElement.value)

        updateItemQuantity(productId,newQuantity);
        cartItemContainer.querySelector('.js-quantity-label').innerHTML=newQuantity;
        updateCartQuantity();
      }

      inputElement.value='';
      cartItemContainer.classList.remove('is-editing-quantity');
    });
  });

document.querySelectorAll('.js-quantity-input')
  .forEach((inputElement)=>{
    inputElement.addEventListener('keyup',(value)=>{
      if(value.key==="Enter"){
        const {productId}=inputElement.dataset;

        const cartItemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
        
        if(isValidProductNumber(inputElement.value)){
          const newQuantity=Number(inputElement.value)

          updateItemQuantity(productId,newQuantity);
          cartItemContainer.querySelector('.js-quantity-label').innerHTML=newQuantity;
          updateCartQuantity();
        }

        inputElement.value='';
        cartItemContainer.classList.remove('is-editing-quantity');
      }
    })
  });

