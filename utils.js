let countOfProduct = {}
let priceOfProduct = {}
let totalPrice = 0

function addProduct(productToAdd) {
    countOfProduct[productToAdd]++
    totalPrice += priceOfProduct[productToAdd]
    renderOrder(productToAdd)
}

function removeProduct(productToRemove) {
    countOfProduct[productToRemove]--
    totalPrice -= priceOfProduct[productToRemove]
    renderOrder(productToRemove)
}

function removeAllProducts(productsToRemove) {
    totalPrice -= priceOfProduct[productsToRemove] * countOfProduct[productsToRemove]
    countOfProduct[productsToRemove] = 0
    renderOrder(productsToRemove)
}

export {addProduct, removeProduct, removeAllProducts}