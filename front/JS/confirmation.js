let orderNumber = document.getElementById("orderId");
orderNumber.textContent = getIdInUrl();

//Récupère l'order Id dans l'URL afin de l'afficher sur le DOM
function getIdInUrl() {
  return new URL(document.location).searchParams.get("id");
}
