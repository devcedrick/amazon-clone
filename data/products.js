import { formatCurrency } from "../js/utils/money.js";

class Product {
  // Details attributes
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  getStarsURL() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return formatCurrency(this.priceCents);
  }

  extraInfoHTML() {
    return ``;
  }

}

class Clothing extends Product{
  sizeChartLink;

  constructor(productDetails){
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    return `
      <a href=${this.sizeChartLink} target="_blank">Size Chart</a>
    `;
  }
}

export let products = [];
let productsMap;
loadProducts();

export function loadProducts(fun) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    console.log('load products');
    products = JSON.parse(xhr.response).map(productDetails => {
      if(productDetails.type === 'clothing')
        return new Clothing(productDetails);
      return new Product(productDetails);
    });

    productsMap = updateProductMap();

    if(typeof fun === 'function')
      fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();
}

function updateProductMap() {
  const map = new Map();
  map.clear();
  products.forEach(product => {
    map.set(product.id, product);
  });
  return map;
}

export function findProduct(key){ return productsMap.get(key); }


