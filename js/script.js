let cart = []
let modalQuant = 1
let modalKey = 0

const qs = (index) => document.querySelector(index);
const qsa= (index) => document.querySelectorAll(index);

// Criando as pizzas
pizzaJson.map((item, index) => {
    const pizzaItem = qs('.models > .pizza-item').cloneNode(true)

    // Preenchendo as informações da pizza
    pizzaItem.setAttribute('data-key', index)
    pizzaItem.querySelector('.pizza-item-img > img').src = item.img
    pizzaItem.querySelector('.pizza-item-price').innerHTML = "R$ " + item.price.toFixed(2)
    pizzaItem.querySelector('.pizza-item-name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item-desc').innerHTML = item.description

    pizzaItem.addEventListener('click', () => {
        // Preenchendo o modal
        modalKey = item.id
        modalQuant = 1
        qs('.modal-img-bx img').src = item.img
        qs('.modal-item-name').innerHTML = item.name
        qs('.modal-item-price').innerHTML = "R$ " + item.price.toFixed(2)

        qsa('.pizza-size').forEach((size, sizeIndex) => {

            if (sizeIndex === 2) {
                size.classList.add('selected')
            } else {
                size.classList.remove('selected')
            }

            size.setAttribute('data-key', sizeIndex)
            size.querySelector('span').innerHTML = item.sizes[sizeIndex]
        })

        qs('.quant-btn-item p').innerHTML = modalQuant

        // Mostrando o modal na tela
        qs('.modal-container').style.opacity = 0
        qs('.modal-container').style.display = 'flex'
        setTimeout(() => {
            qs('.modal-container').style.opacity = 1
        }, 100)
    })
       
    qs('.container-pizzas').append(pizzaItem)
})

// MODAL EVENTOS

const closeModal = () => {
    qs('.modal-container').style.opacity = 0
    setTimeout(() => {
        qs('.modal-container').style.display = 'none'
    }, 500)
}

qs('.modal-close').addEventListener('click', () => {
    closeModal()
})

qs('.cart-mobile-close').addEventListener('click', () => {
    qs('.cart').style.left = '100vw';
})

qsa('.pizza-size').forEach((size) => {
    size.addEventListener('click', () => {
        qs('.pizza-size.selected').classList.remove('selected')
        size.classList.add('selected')
    })
})

qs('#quant-btn-menos').addEventListener('click', () => {
    if (modalQuant > 1) {
        modalQuant--
        qs('.quant-btn-item p').innerHTML = modalQuant
    } 
})

qs('#quant-btn-mais').addEventListener('click', () => {
    modalQuant++
    qs('.quant-btn-item p').innerHTML = modalQuant
})

qs('.cart-btn-add').addEventListener('click', () => {
    const pizzaType = modalKey
    const pizzaQuant = modalQuant
    const size = parseInt(qs('.pizza-size.selected').getAttribute('data-key'))

    let identifier = pizzaJson[pizzaType].id+'@'+size

    let key = cart.findIndex((item) => {
        return item.identifier == identifier
    })

    if (key > -1) {
        cart[key].quant += pizzaQuant 
    } else {
        cart.push({
            identifier: identifier,
            id: pizzaJson[pizzaType].id,
            size: size,
            quant: pizzaQuant
        })
    }

    updateCart()
    closeModal()
})

qs('.menu-mobile .cart-mobile').addEventListener('click', () => {
    if (cart.length > 0) {
        qs('.cart').style.left = '0';
    }
})

const updateCart = () => {
    qs('.menu-mobile .cart-quant').innerHTML = cart.length // Carrinho Mobile Quant

    if (cart.length > 0) {
        qs('.cart').classList.add('show')
        qs('.cart-pizzas').innerHTML = ""

        let subtotal = 0
        let desconto = 0
        let total = 0

        for (let i in cart) {

            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id)

            // Calculando o subtotal
            subtotal += pizzaItem.price * cart[i].quant

            const cartItem = qs('.models .cart-pizzas-box').cloneNode(true)

            let pizzaSizeName
            switch (cart[i].size) {
                case 0:
                    pizzaSizeName = 'P'
                    break
                case 1:
                    pizzaSizeName = "M"
                    break
                case 2:
                    pizzaSizeName = "G"
                    break
                default:
                    break
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})` 

            cartItem.querySelector('.img-name img').src = pizzaItem.img
            cartItem.querySelector('.img-name .cart-pizzas-item-name').innerHTML = pizzaName
            cartItem.querySelector('#cart-quant-btn-item').innerHTML = cart[i].quant

            cartItem.querySelector('#cart-quant-btn-menos').addEventListener('click', () => {
                if (cart[i].quant > 1) {
                    cart[i].quant--
                } else {
                    cart.splice(i, 1)
                }
                updateCart()
            })

            cartItem.querySelector('#cart-quant-btn-mais').addEventListener('click', () => {
                cart[i].quant++
                updateCart()
            })

            qs('.cart-pizzas').append(cartItem)
        }

        //Calculando o desconto
        desconto = subtotal * 0.1
        // Calculando o total
        total = subtotal - desconto

        qs('.subtotal-item').innerHTML = "R$ " + subtotal.toFixed(2)
        qs('.desconto-item').innerHTML = "R$ " + desconto.toFixed(2)
        qs('.total-item').innerHTML = "R$ " + total.toFixed(2)
    } else {
        qs('.cart').classList.remove('show')
        qs('.cart').style.left = '100vw';
    }
}

