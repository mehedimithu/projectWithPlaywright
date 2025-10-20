function addToCart(item) {
    const result = confirm(`Add ${item} bagel to cart?`);
    if (result) {
        alert(`${item} bagel added to cart!`);
    }
}