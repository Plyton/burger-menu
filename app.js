'use strict'
class Product {
    constructor() {
        this.burger = document.querySelectorAll('input[name="burger"]');
        this.nachinka = document.querySelectorAll('input[name="nachika"]');
        this.adds = document.querySelectorAll('input[name="adds"]');
        this.priceCart = {};
        this.calCart = {};
        this._init();
    }

    _init() {
        this.handleEvents();
    }

    handleEvents() {
        this.handleEventsBurgers();
    }

    handleEventsBurgers() {
        this.burger.forEach(el => {
            el.addEventListener('change', event => {
                this.clearData();
                this.priceCart.burger = +event.target.parentNode.querySelector('.price').dataset.price;
                this.calCart.burger = +event.target.parentNode.querySelector('.cal').dataset.cal;
                this.addHamburgerToOrder(event);
                this.handleData();
                if (event.target.checked) {
                    this.removeChecked(this.nachinka);
                    this.removeChecked(this.adds);
                    this.handleEventsNachika();
                }
            })
        })
    }

    handleEventsNachika() {
        this.nachinka.forEach(el => {
            el.addEventListener('change', event => {
                this.priceCart.nachinka = +event.target.parentNode.querySelector('.price').dataset.price;
                this.calCart.nachinka = +event.target.parentNode.querySelector('.cal').dataset.cal;
                this.handleData();
                if (event.target.checked) {
                    this.handleEventsAdds();
                }
            })
        })
    }

    handleEventsAdds() {
        this.adds.forEach(el => {
            el.addEventListener('click', event => {
                if (event.target.checked) {
                    if (event.target.classList.contains('sauce')) {
                        this.priceCart.addsFirst = +event.target.parentNode.querySelector('.price').dataset.price;
                        this.calCart.addsFirst = +event.target.parentNode.querySelector('.cal').dataset.cal;
                        this.handleData();
                    }

                    if (event.target.classList.contains('spice')) {
                        this.priceCart.addsSecond = +event.target.parentNode.querySelector('.price').dataset.price;
                        this.calCart.addsSecond = +event.target.parentNode.querySelector('.cal').dataset.cal;
                        this.handleData();
                    }
                }

                if (!event.target.checked) {
                    if (event.target.classList.contains('sauce')) {
                        this.priceCart.addsFirst = 0;
                        this.calCart.addsFirst = 0;
                        this.handleData();
                    }

                    if (event.target.classList.contains('spice')) {
                        this.priceCart.addsSecond = 0;
                        this.calCart.addsSecond = 0;
                        this.handleData();
                    }
                }
            })
        }
        )
    }

    addHamburgerToOrder(event) {
        document.querySelector('.order__txt').innerHTML = event.target.value;
        this.checkPictureContent();
        let imgEl = `<img src=${event.target.parentNode.querySelector('img').src} id="burger" alt="burger" width="40" height="40">`;
        document.querySelector('.order__txt').insertAdjacentHTML('afterend', imgEl);
    }

    checkPictureContent() {
        if (document.getElementById('burger')) {
            document.getElementById('burger').remove();
        }
    }

    handleData() {
        let totalPrice = 0;
        let totalCal = 0;
        for (let key in this.priceCart) {
            totalPrice += this.priceCart[key];
        }
        for (let key in this.calCart) {
            totalCal += this.calCart[key];
        }
        this.renderData(totalPrice, totalCal)
    }

    renderData(price, cal) {
        document.querySelector('.total__txt').innerText = `${cal}кал.`;
        document.querySelector('.total__price').innerText = `${price}₱`;
    }

    clearData() {
        this.priceCart = {};
        this.calCart = {};
    }

    removeChecked(goods) {
        goods.forEach(el => el.checked = false);
    }
}

let product = new Product();