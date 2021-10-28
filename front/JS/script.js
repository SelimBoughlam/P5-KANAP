"use strict";
getProducts();
let products;
/**
 * Fonction qui récupère les données dans l'API
 * Appel de l'API
 * promesse 1: traduction de la réponse en .json
 * promesse 2 :stocke la réponse dans une variable
 */
async function getProducts() {
  await fetch("http://localhost:3000/api/products/")
    .then((res) => res.json())
    .then((data) => (products = data));
  displayProducts();
}

/**
 *fonction qui injecte les produits extraits de l'api dans l'HTML
 * pour chaque objet(forEach()) présent dans l'api:
 * Cree un lien('a')
 * Cree un article('article') dans chaque lien ('a')
 * Cree une image('img')et son texte alternatif,un titre('h3'),une description('p')
   dans chaque article
 */
function displayProducts() {
  products.forEach((product) => {
    let items = document.getElementById("items");

    let link = document.createElement("a");
    link.setAttribute("href", `product.html?id=${product._id}`);
    items.appendChild(link);

    let article = document.createElement("article");
    link.appendChild(article);

    let img = document.createElement("img");
    img.src = product.imageUrl;
    img.setAttribute("alt", product.altTxt);

    let title = document.createElement("h3");
    title.classList.add("productName");
    title.textContent = product.name;

    let paragraphe = document.createElement("p");
    paragraphe.classList.add("productDescription");
    paragraphe.textContent = product.description;

    article.append(title, img, paragraphe);
  });
}
