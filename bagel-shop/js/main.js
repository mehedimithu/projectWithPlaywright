function showPromoWindow() {
    const promoContent = `
        <html>
        <head>
            <title>Special Offer Details</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    background-color: #fdf2e9;
                    margin: 0;
                }
                h2 {
                    color: #e67e22;
                    margin-top: 0;
                }
                .close-btn {
                    background-color: #e67e22;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-top: 20px;
                }
                .close-btn:hover {
                    background-color: #d35400;
                }
            </style>
        </head>
        <body>
            <h2>Special Offer Details</h2>
            <p>Get 2 free bagels when you buy 6! Limited time offer!</p>
            <p>Valid for any bagel variety. Toppings extra.</p>
            <p>Cannot be combined with other offers.</p>
            <button class="close-btn" onclick="window.close()">Close</button>
        </body>
        </html>
    `;

    const promoWindow = window.open('', 'PromoWindow', 'width=400,height=300,left=100,top=100');
    if (promoWindow) {
        promoWindow.addEventListener('load', () => {
            promoWindow.document.open();
            promoWindow.document.write(promoContent);
            promoWindow.document.close();
        });
    }
}