if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}


function ready() {
    var removeCartItemButton = document.getElementsByClassName("remove")
    console.log(removeCartItemButton)
    for (i = 0; i < removeCartItemButton.length; i++) {
        var remove = removeCartItemButton[i]
        remove.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName("cart-quantity-input")
    for (i = 0; i < quantityInputs.length; i++) {
        var quantityInput = quantityInputs[i]
        quantityInput.addEventListener("change", quantityChanged)
    }

    var addButtons = document.getElementsByClassName("store-item-btn")
    for (i = 0; i < addButtons.length; i++) {
        var addBtn = addButtons[i]
        addBtn.addEventListener("click", addItem)
    }

    var purchaseButton = document.getElementsByClassName("purchase")[0]
    purchaseButton.addEventListener("click", purchasing)

}

function purchasing(event) {
    var purchase = event.target
    var total = document.getElementsByClassName("cart-total")[0].innerText.replace("TOTAL ", '')
    alert("Thank you for you purchase, the cart total is " + total+"!")
    

    var cartItems = document.getElementsByClassName("cart-items")[0]
    while(cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var removable = event.target
    removable.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var quantityInput = event.target
    if(isNaN(quantityInput.value) || quantityInput.value <= 0) {
        quantityInput.value = 1
    }
    updateCartTotal()
}

function addItem(event) {
    var button = event.target
    var storeItemDetails = button.parentElement
    var price = storeItemDetails.getElementsByClassName("store-item-price")[0].innerText
    var storeItem = storeItemDetails.parentElement
    var storeItemImage = storeItem.getElementsByClassName("store-item-img")[0].src
    var storeItemTitle = storeItem.getElementsByClassName("store-item-title")[0].innerText
    addItemToList(storeItemTitle, price, storeItemImage)
    updateCartTotal()
}

function addItemToList(storeItemTitle, price, storeItemImage) {
    var cartItemNames = document.getElementsByClassName("cart-item-title")
    for (i = 0; i < cartItemNames.length; i++) {
        if(cartItemNames[i].innerText == storeItemTitle) {
            alert("The item is already in the cart")
            return
        }
    }

    var cartRow = document.createElement('div')
    cartRow.classList.add("cart-row")
    var cartRowContent = `<div class="cart-item cart-column">
                        <img class="cart-item-img" src="${storeItemImage}">

                        <span class="cart-item-title">${storeItemTitle}</span>
                    </div>

                    <span class="cart-price cart-column">${price}</span>

                    <div class="cart-quantity cart-column"> 
                        <input class="cart-quantity-input" type="number" value="1">
                        <button class="btn-tour remove" role="button">REMOVE</button>
                    </div>`
    cartRow.innerHTML = cartRowContent
    var cartItems = document.getElementsByClassName("cart-items")[0]
    cartItems.append(cartRow)
    cartRow.getElementsByClassName("remove")[0].addEventListener("click", removeCartItem)
    cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", quantityChanged)
}


function updateCartTotal() {
    
    var cartItems = document.getElementsByClassName("cart-items")[0]
    var cartRows = cartItems.getElementsByClassName('cart-row')
    var total = 0
    console.log(cartRows)
    for (i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName("cart-price")[0]
        var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = parseFloat(quantityElement.value)
        total = total + (price * quantity)
        total = total
        console.log(total)
        
    }
    total = Math.round(total*100)/100
    document.getElementsByClassName("cart-total-price")[0].innerText = "$"+total
}