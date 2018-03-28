var productList = [];
var mainElement = document.querySelector('main');
var productListElement = null;
var backButtonElement = document.querySelector('.back-button');
var productElement = null;

function renderProductList(productList) {
    var list = productListElement = document.createElement('ul');
    list.className = 'product-list';

    productList.forEach(function (product) {
        list.appendChild(createListItem(product));
    });

    mainElement.appendChild(list);
}

function createListItem(product) {
    var listItem = document.createElement('li');
    listItem.dataset.id = product.id;
    listItem.addEventListener('click', showProduct);

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
            productList = JSON.parse(this.responseText);
            callback(productList);
        } else {
            displayError();
        }
    };
    request.open('GET', 'http://private-5815fe-recommendationsknip.apiary-mock.com/products');
    request.send();
}

function getProductById(productId) {
    for (var index = 0; index < productList.length; index++) {
        if (productList[index].id === parseInt(productId)) {
            return productList[index];
        }
    }
}

function showProduct(event) {
    hideProductList();
    showBackButton();
    renderProduct(getProductById(event.currentTarget.dataset.id));
}

function hideProduct() {
    mainElement.removeChild(productElement);
}

function showProductList() {
    productListElement.style.display = 'initial';
}

function hideProductList() {
    productListElement.style.display = 'none';
}

function showBackButton() {
    backButtonElement.style.display = 'initial';
}

function hideBackButton() {
    backButtonElement.style.display = 'none';
}

function renderProduct(product) {
    var container = document.createElement('div');
    container.className = 'product-detail';

    var gallery = createGallery(product.images);
    container.appendChild(gallery);

    var thumbnails = createThumbnails(product.images);
    container.appendChild(thumbnails);
    
    var title = document.createElement('h1');
    title.textContent = product.title;
    container.appendChild(title);

    var descriptionParagraph = document.createElement('p');
    descriptionParagraph.textContent = product.description;
    container.appendChild(descriptionParagraph);

    var specificationParagraph = document.createElement('p');
    specificationParagraph.textContent = product.specification;
    container.appendChild(specificationParagraph);

    productElement = container;
    mainElement.appendChild(container);
}

function createGallery(images) {
    var container = document.createElement('div');
    container.className = 'gallery';
    
    var imageHolder = document.createElement('div');
    imageHolder.className = 'image-holder';

    images.forEach(function(image) {
        var imageElement = document.createElement('img');
        imageElement.src = image.original;
        imageHolder.appendChild(imageElement);
    });

    container.appendChild(imageHolder);

    return container;
}

function createThumbnails(images) {
    var container = document.createElement('div');
    container.className = 'thumbnail-container';

    images.forEach(function(image) {
        var imageElement = document.createElement('img');
        imageElement.src = image.thumb;
        container.appendChild(imageElement);
    });

    return container;
}

function goBack() {
    hideBackButton();
    hideProduct();
    showProductList();
}

function displayError() {
    // TODO: Display error
}

function initialize() {
    backButtonElement.addEventListener('click', goBack);
    getProducts(renderProductList);
}

initialize();