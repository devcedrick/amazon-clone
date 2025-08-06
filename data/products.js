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

  getImagePath() {
    return this.image;
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

export async function fetchProducts() {
  try {
    console.log('load products');
    const response = await fetch('https://supersimplebackend.dev/products');
    const data  = await response.json();
    products = data.map(productDetails => {
      if(productDetails.type === 'clothing')
        return new Clothing(productDetails);
      return new Product(productDetails);
    });
  } catch (e) {
    console.log('Unexpected error. Please try again later', error);
  }
}

function updateProductMap() {
  const map = new Map();
  map.clear();
  products.forEach(product => {
    map.set(product.id, product);
  });
  return map;
}

// Will return a product object
export function findProduct(key){ return productsMap.get(key); }


