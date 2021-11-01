"use strict";
let storageContent = JSON.parse(localStorage.getItem("articlesInCart"));
displayProductsInCart();

function displayProductsInCart() {
  createElement();
  totals();
  deleteArticle();
}

function createElement() {
  storageContent.forEach((element) => {
    let itemsContainer = document.getElementById("cart__items");

    itemsContainer.innerHTML += `<article class = "cart__item" data-id ="${element.id}" data-color ="${element.color}">
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
  });
}

function totals() {
  let totalQuantity = document.getElementById("totalQuantity");
  let totalPrice = document.getElementById("totalPrice");

  const sumQuantity = storageContent.map((element) => element.quantity);
  let resultQuantity = sumQuantity.reduce(
    (number1, number2) => number1 + number2
  );
  totalQuantity.textContent = resultQuantity;

  const sumPrices = storageContent.map((element) => {
    return element.quantity * element.price;
  });
  let resultPrice = sumPrices.reduce((number1, number2) => number1 + number2);

  totalPrice.textContent = resultPrice;
}

function deleteArticle() {
  let deleteButton = document.querySelectorAll(".deleteItem");

  deleteButton.forEach((button) => {
    let parent = button.closest("article");
    let parentId = parent.dataset.id;
    let parentColor = parent.dataset.color;
    console.log(parentColor);

    button.addEventListener("click", () => {
      let storageContentFilter = storageContent.filter(
        (element) => element.id != parentId || element.color != parentColor
      );

      localStorage.setItem(
        "articlesInCart",
        JSON.stringify(storageContentFilter)
      );
      window.location.reload();
    });
  });
}
