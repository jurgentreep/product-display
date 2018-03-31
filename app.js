var productList = [];
var mainElement = document.querySelector('main');
var productListElement = null;
var backButtonElement = document.querySelector('.back-button');
var productElement = null;
var galleryImageElements = [];

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

    var title = document.createElement('h2');
    title.textContent = product.title;

    var price = document.createElement('span');
    price.textContent = '€ ' + product.price;

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
        } else if (this.readyState === 4 && this.status !== 200) {
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
    backButtonElement.style.opacity = 1;
}

function hideBackButton() {
    backButtonElement.style.opacity = 0;
}

function renderProduct(product) {
    var container = document.createElement('div');
    container.className = 'product-detail';

    var galleryContainer = document.createElement('div');
    galleryContainer.className = 'gallery-container';

    var gallery = createGallery(product.images);
    galleryContainer.appendChild(gallery);

    var thumbnails = createThumbnails(product.images);
    galleryContainer.appendChild(thumbnails);

    container.appendChild(galleryContainer);

    var productInfo = createProductInfo(product);
    container.appendChild(productInfo);

    productElement = container;
    mainElement.appendChild(container);
}

function createProductInfo(product) {
    var container = document.createElement('div');
    container.className = 'product-info';

    var title = document.createElement('h1');
    title.textContent = product.title;
    container.appendChild(title);

    var priceTitle = document.createElement('h2');
    priceTitle.textContent = 'Price';
    container.appendChild(priceTitle);

    var priceParagraph = document.createElement('p');
    priceParagraph.textContent = '€' + product.price;
    container.appendChild(priceParagraph);

    var buy = document.createElement('button');
    buy.textContent = 'Buy now';
    container.appendChild(buy);

    var descriptionTitle = document.createElement('h2');
    descriptionTitle.textContent = 'Description';
    container.appendChild(descriptionTitle);

    var descriptionParagraph = document.createElement('p');
    descriptionParagraph.textContent = product.description;
    container.appendChild(descriptionParagraph);

    var specificationTitle = document.createElement('h2');
    specificationTitle.textContent = 'Specification';
    container.appendChild(specificationTitle);

    var specificationParagraph = document.createElement('p');
    specificationParagraph.textContent = product.specification;
    container.appendChild(specificationParagraph);

    return container;
}

function createGallery(images) {
    var container = document.createElement('div');
    container.className = 'gallery';
    
    var imageHolder = document.createElement('div');
    imageHolder.className = 'image-holder';

    galleryImageElements = [];
    images.forEach(function(image, index) {
        var imageElement = document.createElement('img');
        imageElement.src = image.original;

        if (index === 0) {
            imageElement.className = 'active';
        }

        galleryImageElements.push(imageElement);
        imageHolder.appendChild(imageElement);
    });

    container.appendChild(imageHolder);

    return container;
}

function createThumbnails(images) {
    var container = document.createElement('div');
    container.className = 'thumbnail-container clearfix';

    images.forEach(function(image, index) {
        var imageElement = document.createElement('img');
        imageElement.src = image.thumb;
        imageElement.dataset.index = index;

        imageElement.addEventListener('click', showImage);

        container.appendChild(imageElement);
    });

    return container;
}

function showImage(event) {
    galleryImageElements.forEach(function(imageElemnt) {
        // The following will not work in EI9 but I'm not sure how many browsers I want to support
        imageElemnt.classList.remove('active');
    });

    galleryImageElements[event.currentTarget.dataset.index].className = 'active';
}

function goBack() {
    hideBackButton();
    hideProduct();
    showProductList();
}

function displayError() {
    var errorMessage = document.createElement('p');
    errorMessage.className = 'error-message';
    errorMessage.innerHTML = 'Something went wrong while trying to load the products please try refreshing the page and if the problem persists please contact <a href="mailto:info@nerfgunexpress.com">info@nerfgunexpress.com</a>.';
    mainElement.appendChild(errorMessage);
}

function initialize() {
    backButtonElement.addEventListener('click', goBack);
    getProducts(renderProductList);
}

initialize();