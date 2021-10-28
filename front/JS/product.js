"use strict";

getProducts();
let product;
async function getProducts() {
  const productId = getProductId();
  await fetch(`http://localhost:3000/api/products/${productId}`).then((res) =>
    res.json().then((data) => (product = data))
  );
  displayProducts();
  colorSelection();
  addToCart();
}

function getProductId() {
  return new URL(document.location).searchParams.get("id");
}

function displayProducts() {
  let imgDiv = document.querySelector(".item__img");

  let img = document.createElement("img");
  img.src = product.imageUrl;
  img.alt = product.altTxt;
  imgDiv.appendChild(img);

  let title = document.getElementById("title");
  title.innerHTML = product.name;

  let price = document.getElementById("price");
  price.innerHTML = product.price;

  let description = document.getElementById("description");
  description.innerHTML = product.description;
}

function colorSelection() {
  let colors = product.colors;
  colors.forEach((color) => {
    let colorPicking = document.getElementById("colors");
    let option = document.createElement("option");
    option.value = color;
    option.innerHTML = color;
    colorPicking.appendChild(option);
  });
}

function addToCart() {
  let addToCart = document.getElementById("addToCart");
  let quantity = document.getElementById("quantity");

  addToCart.addEventListener("click", () => {
    let article = {
      id: getProductId(),
      color: colors.value,
      quantity: Number(quantity.value),
      img: product.imageUrl,
      name: product.name,
      price: product.price,
      descript: product.description,
      alt: product.altTxt,
    };

    let cart = [];

    if (JSON.parse(localStorage.getItem("articlesInCart")) == null) {
      cart.push(article);
      localStorage.setItem("articlesInCart", JSON.stringify(cart));
    } else {
      let storage = JSON.parse(localStorage.getItem("articlesInCart"));
      storage.forEach((data) => {
        if (article.id == data.id && article.color == data.color) {
          article.quantity = article.quantity + data.quantity;
        } else {
          cart.push(data);
        }
      });
      cart.push(article);
      localStorage.setItem("articlesInCart", JSON.stringify(cart));
    }
  });
}

// AMELIORATION:
// message d'erreur quand pas de couleurs sélectionnées

// storage.forEach((data) => {
//   if (article.id == data.id && article.color == data.color) {
//     article.quantity = article.quantity + data.quantity;
//   } else {
//     cart.push(data);
//   }
// });
// cart.push(article);
// localStorage.setItem("articlesInCart", JSON.stringify(cart));
