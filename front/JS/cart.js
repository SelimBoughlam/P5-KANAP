"use strict";

let storageContent = JSON.parse(localStorage.getItem("articlesInCart"));

displayProductsInCart();

function displayProductsInCart() {
  storageContent.forEach((element) => {
    let itemsContainer = document.getElementById("cart__items");

    itemsContainer.innerHTML += `<article class = "cart__item" data-id ="${element.id}">
    <div class ="cart__item__img">
     <img src = ${element.img} alt = "${element.alt}">
    </div>

    <div class = "cart__item__content">
      <div class = "cart_item__content__titlePrice">
       <h2>${element.name}</h2>
       <p>${element.price}€</p>
       <p>couleur : ${element.color}</p>

       </div> 

      <div class = "cart__item__content__settings">
        <div class = "cart__item__content__settings__quantity">
          <p>qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.quantity}">
        </div>  
    
      <div style = "padding-top:40px" class = "cart__item__content__settings__delete">
        <p  class ="deleteItem">Supprimer</p>
      </div> 
      </div>
    </div>       
    </article>`;
    totals();
  });
}

function totals() {
  let totalQuantity = document.getElementById("totalQuantity");
  // let totalPrice = document.getElementById("totalPrice");

  const sumQuantity = storageContent.map((element) => element.quantity);
  let result = sumQuantity.reduce((number1, number2) => number1 + number2);
  totalQuantity.textContent = result;
}
