export interface IdParameter {
  id: string;
}

export interface Product {
  id?: string;
  name: string;
  quantity: number;
  price: string;
}

export interface Brand {
  name: string;
  image_url: string;
}