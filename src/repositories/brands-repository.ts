import BrandAlreadyExistsError from "../errors/brands/brand-already-exists-error";
import BrandNotFoundError from "../errors/brands/brand-not-found-error";
import { Brand } from "../models/types"

export default class Brands {

  async get(id: string): Promise<Brand> {
    const brand = DB[id];
    if (!brand) {
      throw new BrandNotFoundError(id);
    }

    return brand;
  }

  async getAll(): Promise<Brand[]> {
    return Object.values(DB);
  }

  async create(brand: Brand): Promise<void> {
    const brandName = brand.name.toLowerCase();

    if (DB[brandName]) {
      throw new BrandAlreadyExistsError(brandName);
    }

    /**
     * JSON.parse - parsira string u objekat (string mora biti validan JSON format)
     * JSON.stringify - pretvara objekat u string
     * 
     * Kada koristimo ove dve funkcije na ovaj nacin, to znaci da pravimo kopiju naseg objekta. To radimo kako bi sprecili da
     * neka druga funkcija koja ima pristup nasem objektu izmeni ga. Izmena je moguca zasto sto se objekat salje po referenci,
     * a ne kao prosta vrednosti
     */
    DB[brandName] = JSON.parse(JSON.stringify(brand));
  }

  async delete(id: string): Promise<void> {
    delete DB[id];
  }

  /**
   * Svi pozivi ka bazi su zapravo asinhroni. Zato cemo koristiti ovu funkciju kako bi simulirali asinhrono izvrsavanje
   */
  private async asyncCallToDatabase<T>(func: Function): Promise<T> {
    return new Promise((resolve, reject) => {
      resolve(func as T);
    });
  }
}

const DB: { [key: string]: Brand } = {
  'lacoste': { name: 'Lacoste', image_url: 'https://logos-world.net/wp-content/uploads/2020/09/Lacoste-Logo-700x394.png' },
  'zara': { name: 'Zara', image_url: 'https://logos-world.net/wp-content/uploads/2020/05/Zara-Logo-700x394.png' },
  'prada': { name: 'Prada', image_url: 'https://logos-world.net/wp-content/uploads/2020/05/Prada-Logo-700x394.png' },
  'gap': { name: 'Gap', image_url: 'https://logos-world.net/wp-content/uploads/2020/09/Gap-Logo-700x394.png' },
  'chanel': { name: 'Chanel', image_url: 'https://logos-world.net/wp-content/uploads/2020/04/Chanel-Logo-700x394.png' },
  'adidas': { name: 'Adidas', image_url: 'https://logos-world.net/wp-content/uploads/2020/04/Adidas-Logo-700x394.png' },
  'nike': { name: 'Nike', image_url: 'https://logos-world.net/wp-content/uploads/2020/04/Nike-Logo-700x394.png' },
};
