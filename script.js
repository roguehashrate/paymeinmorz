document.getElementById("payment-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const coin = document.getElementById("coin").value;
  const address = document.getElementById("address").value.trim();
  const amount = document.getElementById("amount").value.trim();
  const label = document.getElementById("label").value.trim();

  let uri = "";

  if (coin === "monero") {
    uri = `monero:${address}`;
    if (amount || label) {
      uri += "?";
      if (amount) uri += `tx_amount=${amount}`;
      if (label) uri += `${amount ? "&" : ""}tx_description=${encodeURIComponent(label)}`;
    }
  } else if (coin === "zcash") {
    uri = `zcash:${address}`;
    if (amount || label) {
      uri += "?";
      if (amount) uri += `amount=${amount}`;
      if (label) uri += `${amount ? "&" : ""}memo=${encodeURIComponent(label)}`;
    }
  }

  const linkElement = document.getElementById("payment-link");
  linkElement.href = uri;
  linkElement.textContent = uri;

  document.getElementById("output").classList.remove("hidden");

  const qrContainer = document.getElementById("qrcode");
  qrContainer.innerHTML = "";

  new QRious({
    element: qrContainer.appendChild(document.createElement("canvas")),
    value: uri,
    size: 200
  });
});

document.getElementById("copy-button").addEventListener("click", function () {
  const text = document.getElementById("payment-link").textContent;
  navigator.clipboard.writeText(text).then(() => {
    alert("Copied to clipboard!");
  });
});
