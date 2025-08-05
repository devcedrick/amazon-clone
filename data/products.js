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
fetchProducts().then(() => {
  productsMap = updateProductMap();
});

export function fetchProducts() {
  const promise = fetch('https://supersimplebackend.dev/products')
  .then(response => {
    return response.json()
  })
  .then(productData => {
    products = productData.map(productDetails => {
      if(productDetails.type === 'clothing')
        return new Clothing(productDetails);
      return new Product(productDetails);
    });
  });

  return promise;
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


