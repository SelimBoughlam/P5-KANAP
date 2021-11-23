"use strict";
// Récupération du LocalStorage sur cette page
let storageContent = JSON.parse(localStorage.getItem("articlesInCart"));

//Appel de la fonction principale
displayProductsInCart();

/**
 * Fonction Principale qui affichera les produits dans le panier
 * Appel des fonctions Annexes
 */
function displayProductsInCart() {
  if (storageContent) {
    createElement();
    totals();
    deleteArticle();
    changeQuantity();
  }
}
/**
 * Fonction qui crée la structure HTML
 * pour chaque élement présents dans le LocalStorage:création de la structure HTML
 */
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

// Fonction qui calcule et affiche sur le DOM les totaux(produits + prix)
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

// Fonction qui permet la suppression d'un article via le bouton supprimer
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

// Fonction qui permet le changement de quantité des articles via le DOM
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

let firstName, lastName, address, city, email;

function firstNameLastNameCityChecker(value, id) {
  if (value.match(/^[a-z ,.'-]{1,25}$/i) || value.length < 1) {
    if (id == "firstName") {
      errorDisplay("firstName", "", true);
      firstName = value;
    } else if (id == "lastName") {
      errorDisplay("lastName", "", true);
      lastName = value;
    } else {
      errorDisplay("city", "", true);
      city = value;
    }
  } else {
    if (id == "firstName") {
      errorDisplay("firstName", "merci d'entrer un prénom valide", false);
      firstName = null;
    } else if (id == "lastName") {
      errorDisplay("lastName", "merci d'entrer un nom valide", false);
      lastName = null;
    } else {
      errorDisplay("city", "merci d'entrer un nom de ville valide", false);
      city = null;
    }
  }
}

function addressChecker(value) {
  if (value.match(/^[a-z0-9 ,.'-]{10,}$/i) || value.length < 1) {
    errorDisplay("address", "ok", true);
    address = value;
  } else {
    errorDisplay("address", "merci d'entrer une adresse valide", false);
    address = null;
  }
}

function emailChecker(value) {
  if (
    value.match(/\b[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}\b/i) ||
    value.length < 1
  ) {
    errorDisplay("email", "", true);
    email = value;
  } else {
    errorDisplay(
      "email",
      "merci d'entrer une adresse email au format correct",
      false
    );
    email = null;
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
    }
  });
});

const form = document.querySelector("form");
let formErrorsContainer = document.querySelector(".cart__order__form__submit");
let formErrors = document.createElement("span");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let contact;
  let products;
  let dataToSend;

  if (firstName && lastName && address && city && email) {
    contact = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      address: address.trim(),
      city: city.trim(),
      email: email,
    };

    products = storageContent.map((element) => element.id);

    dataToSend = {
      contact,
      products,
    };

    getOrderId();
  } else {
    formErrors.textContent = "Merci de remplir correctement tous les champs";
    formErrorsContainer.style =
      "display:flex;flex-direction:column;align-items:center";
    formErrors.style = "color:orange;margin-top:20px";
    formErrorsContainer.appendChild(formErrors);
  }

  async function getOrderId() {
    await fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(dataToSend),

      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) =>
        window.location.replace("./confirmation.html?id=" + data.orderId)
      );

    localStorage.clear();
  }
});
