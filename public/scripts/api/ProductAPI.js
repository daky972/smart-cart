export default class ProductAPI {
  constructor(baseUrl = 'https://fakestoreapi.com/products') {
      this.baseUrl = baseUrl;
  }

  async fetchProducts() {
      try {
          const response = await fetch(this.baseUrl);
          if (!response.ok) throw new Error('Failed to fetch products:', response.status);
          const data = await response.json();
          return data;
      } catch (error) {
          console.error('Error fetching products:', error);
          return [];
      }
  }
}