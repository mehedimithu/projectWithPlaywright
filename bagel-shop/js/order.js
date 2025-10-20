function handleOrder(event) {
  event.preventDefault();

  const fileInput = document.getElementById("designUpload");
  const instructions = document.getElementById("instructions").value;
  const quantity = document.getElementById("quantity").value;

  if (fileInput.files.length > 0) {
    alert(`File "${fileInput.files[0].name}" uploaded successfully!`);
  }

  document.getElementById("downloadSection").style.display = "block";
  return false;
}

function downloadReceipt() {
  const receipt = `Order Receipt\n-------------\nDate: ${new Date().toLocaleDateString()}\nQuantity: ${
    document.getElementById("quantity").value
  }\nTotal: $${document.getElementById("quantity").value * 2.99}`;

  const blob = new Blob([receipt], { type: "text/plain" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "bagel-shop-receipt.txt";
  a.click();
  window.URL.revokeObjectURL(url);
}
