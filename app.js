var productList = [];
var mainElement = document.querySelector('main');

function renderProductList(productList) {
    var list = document.createElement('ul');

    productList.forEach(function (product) {
        list.appendChild(createListItem(product));
    });

    mainElement.appendChild(list);
}

function createListItem(product) {
    var listItem = document.createElement('li');

    var thumbnail = document.createElement('img');
    thumbnail.src = product.images[0].thumb;

    var title = document.createElement('strong');
    title.textContent = product.title;

    var price = document.createElement('span');
    price.textContent = product.price;

    listItem.appendChild(thumbnail)
    listItem.appendChild(title)
    listItem.appendChild(price);

    return listItem;
}

function getProducts(callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            callback(JSON.parse(this.responseText));
        } else {
            displayError();
        }
    };
    request.open('GET', 'http://private-5815fe-recommendationsknip.apiary-mock.com/products');
    request.send();
}

function displayError() {
    // TODO: Display error
}

function initialize() {
    getProducts(renderProductList);
}

initialize();