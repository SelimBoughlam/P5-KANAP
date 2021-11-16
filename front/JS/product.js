"use strict";

getProducts();
let product;

/**
 *  Fonction principale
 * assignation de l'id récupéré dans une constante
 * requête get à l'api en incluant l'id récupréré
 * Appel de la fonction d'affichage des produits
 * Appel de la fonction qui permet la sélection des couleurs
 * Appel de la fonction qui ajoute les articles sélectionnés dans le panier
 */
async function getProducts() {
  const productId = getProductId();
  await fetch(`http://localhost:3000/api/products/${productId}`).then((res) =>
    res.json().then((data) => (product = data))
  );
  displayProducts();
  colorSelection();
  addToCart();
}

/**
 * Récupère l'id du produit dans l'URL
 */
function getProductId() {
  return new URL(document.location).searchParams.get("id");
}

/**
 *      Fonction affichant le produit et ses caractéristiques à l'écran
 * création et affichage de l'image
 * création et affichage du titre
 * création et affichage du prix
 * création et affichage de la description du produit
 */
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

/**
 *    Fonction permettant la sélection des couleurs
 * récupération des couleurs disponibles dans l'api pour chaque produit
 * création d'options correspondant aux couleurs pour le tag select
 */
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

/**
 *     Fonction permettant l'ajout du produit sélectionné dans le panier
 * création objet qui contient l'article choisi
 * création d'un tableau vide qui représente le panier
 * SI le localStorage est vide: push un article dans le tableau panier et afficher ce tableau dans le localStorage
 * déclaration du LocalStorage en variable storage
 * pour chaque article présent dans le localStorage(storage):si l'ID et la couleur sont les mêmes=>on ajuste la quantité,sinon on ajoute un nouvel article
 *
 */
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
      cart.sort((a, b) => parseInt(a.id) - parseInt(b.id));
      console.log(cart);
      localStorage.setItem("articlesInCart", JSON.stringify(cart));
    }
  });
}
