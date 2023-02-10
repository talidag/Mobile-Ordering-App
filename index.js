import { productData } from './data.js';

let countOfProduct = {}
let priceOfProduct = {}
let totalPrice = 0
let productHtml = {}

const orderContainer = document.getElementById("order-container")
const cardContainer = document.getElementById("card-container")

document.addEventListener("click", function(event) {
    if(event.target.dataset.product) {
        addProduct(event.target.dataset.product)
    }
    else if(event.target.dataset.remove) {
        removeProduct(event.target.dataset.remove)
    }
    else if(event.target.id === "complete-btn") {
        completeOrder()
    }
    else if(event.target.id === "close-btn"){
        cardContainer.style.display = 'none'
    }
    else if(event.target.dataset.removeall) {
        removeAllProducts(event.target.dataset.removeall)
    }
})

document.addEventListener("submit", function(event) {
    event.preventDefault()
    const cardFormData = new FormData(document.getElementById('card-form'))
    const fullName = cardFormData.get('fullName')

    cardContainer.style.display = 'none'
    orderContainer.innerHTML =  `<h3 id="thanks-text">Thanks, ${fullName}! Your order is on its way!</h3>`
    const buttons = document.getElementsByTagName("button");
        for (const button of buttons) {
            button.disabled = true;
        }
})

function renderMenu() {
    let html = '';
    productData.forEach(individualProduct => {
        
        const {product, ingredients, price, emoji} = individualProduct;
        countOfProduct[product] = 0
        priceOfProduct[product] = price
        productHtml[product] = ``

        html += `
        <div class="product-information">
            <div class="product-photo">
                <p>${emoji}</p>
                    <div class="product-details">
                        <h3>${product}</h3>
                        <p>${ingredients}</p>
                        <h3>$${price}</h3> 
                    </div>
            </div>
            <button class="add-btn" data-product=${product} >+</button>
        </div>
        <hr>`
    })
    return html
}

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

function renderOrder(productToRender) {

    if (countOfProduct[productToRender] > 1) {
        productHtml[productToRender] = `
        <p class="product-to-order">
            <span class="product-name">
                ${productToRender} x ${countOfProduct[productToRender]}
            </span>
            <button class="remove-btn" data-remove="${productToRender}">remove one</button>
            <button class="remove-all-btn" data-removeall="${productToRender}">remove all</button>
            <span class="product-price">
                $${priceOfProduct[productToRender]*countOfProduct[productToRender]}
            </span>
        </p>
        <br>`
    } else if (countOfProduct[productToRender] === 0) {
        productHtml[productToRender] = ''
    }
    else {
        productHtml[productToRender] = `   
        <p class="product-to-order">
        <span class="product-name">
            ${productToRender}
        </span>
        <button class="remove-btn" data-remove="${productToRender}">remove</button>
        <span class="product-price">
            $${priceOfProduct[productToRender]}
        </span>
        </p>
        <br>
            ` 
    }

    if (totalPrice === 0) {
        orderContainer.innerHTML = ''
        return
    }

    orderContainer.innerHTML = `
    <h2>Your order</h2>
        <div id="products-to-order">
        </div>
    <br>
    <hr>
    <p id="total-price">Total price: $${totalPrice}</p>
    <button id="complete-btn">Complete order</button>`

    for(const [key, value] of Object.entries(productHtml)) {
        document.getElementById("products-to-order").innerHTML += value
    }
}

function completeOrder() {
    cardContainer.innerHTML = `
    <div id="card-info">
        <h2>Enter card details</h2>
        <button id="close-btn">X</button>
    </div>
    <form id="card-form">
        <input type="text" name="fullName" placeholder="Enter your name" required />
        <input type="number" name="cardNumber" placeholder="Enter card number" required />
        <input type="number" name="cardCvv" placeholder="Enter CVV" required />
        <button id="submit-btn" type="submit">Pay</button>
    </form>`
    
    cardContainer.style.display = 'inline'
}

document.getElementById("menu-container").innerHTML = renderMenu()




