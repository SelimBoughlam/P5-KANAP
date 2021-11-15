"use strict";
let storageContent = JSON.parse(localStorage.getItem("articlesInCart"));
displayProductsInCart();

function displayProductsInCart() {
  createElement();
  totals();
  deleteArticle();
  changeQuantity();
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

function changeQuantity() {
  let quantityInputs = document.querySelectorAll(".itemQuantity");

  quantityInputs.forEach((quantityInput) => {
    let parent = quantityInput.closest("article");
    let parentId = parent.dataset.id;
    let parentColor = parent.dataset.color;

    quantityInput.addEventListener("change", () => {
      let newQantity = Number(quantityInput.value);

      storageContent.forEach((element) => {
        if (element.id == parentId && element.color == parentColor) {
          element.quantity = newQantity;
        }
      });
      localStorage.setItem("articlesInCart", JSON.stringify(storageContent));
      window.location.reload();
    });
  });
}

const errorDisplay = (tag, message, valid) => {
  let errorMsg = document.getElementById(tag + "ErrorMsg");
  if (!valid) {
    errorMsg.textContent = message;
  } else {
    errorMsg.textContent = "";
  }
};

function firstNameLastNameCityChecker(value, id) {
  if (value.match(/^[a-z ,.'-]+$/i) || value.length < 1) {
    if (id == "firstName") {
      errorDisplay("firstName", "", true);
    } else if (id == "lastName") {
      errorDisplay("lastName", "", true);
    } else {
      errorDisplay("city", "", true);
    }
  } else {
    if (id == "firstName") {
      errorDisplay("firstName", "merci d'entrer un prénom valide", false);
    } else if (id == "lastName") {
      errorDisplay("lastName", "merci d'entrer un nom valide", false);
    } else {
      errorDisplay("city", "merci d'entrer un nom de ville valide", false);
    }
  }
}

function addressChecker(value) {
  if (value.match(/^[a-z0-9 ,.'-]+$/i) || value.length < 1) {
    errorDisplay("address", "ok", true);
  } else {
    errorDisplay("address", "merci d'entrer une adresse valide", false);
  }
}
function emailChecker(value) {
  if (
    value.match(/\b[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}\b/i) ||
    value.length < 1
  ) {
    errorDisplay("email", "", true);
  } else {
    errorDisplay(
      "email",
      "merci d'entrer une adresse email au format correct",
      false
    );
  }
}

const inputs = document.querySelectorAll("input[type=text],input[type=email]");

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "firstName":
        firstNameLastNameCityChecker(e.target.value, e.target.id);
        break;
      case "lastName":
        firstNameLastNameCityChecker(e.target.value, e.target.id);
        break;
      case "city":
        firstNameLastNameCityChecker(e.target.value, e.target.id);
        break;
      case "address":
        addressChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;

      default:
        break;
    }
  });
});
