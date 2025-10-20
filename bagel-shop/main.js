import "./style.css";

// Create the blob content as a full HTML document
const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Promo Code</title>
    <style>
      body { font-family: Arial, sans-serif; padding: 2rem; }
      h1 { color: blue; }
    </style>
  </head>
  <body>
    <h1>Promo Code</h1>
    <p>The promo code is: B6G2</p>
  </body>
  </html>
`;

// Create the Blob and its URL
const blob = new Blob([htmlContent], { type: "text/html" });
const blobUrl = URL.createObjectURL(blob);

// Function to open a 400x400 popup window
function openPopup(url) {
  // Window features for a 400x400 popup
  const features =
    "width=400," +
    "height=400," +
    "top=" +
    (window.innerHeight / 2 - 200) +
    "," +
    "left=" +
    (window.innerWidth / 2 - 200) +
    "," +
    "resizable=yes";

  window.open(url, "PopupWindow", features);
}

// Set up popup button
document.getElementById("popup-button").addEventListener("click", () => {
  openPopup(blobUrl);
});
