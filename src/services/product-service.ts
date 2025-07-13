export default class ProductService {
  private baseUrl = 'https://fakestoreapi.com/products';

  async getAll() {
    try {
      const response = await fetch(this.baseUrl);
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    } catch (error) {
      throw new Error('Error while getting products');
    }
  }
}
