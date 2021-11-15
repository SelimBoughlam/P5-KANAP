let orderNumber = document.getElementById("orderId");

function getIdInUrl() {
  return new URL(document.location).searchParams.get("id");
}

orderNumber.textContent = getIdInUrl();
