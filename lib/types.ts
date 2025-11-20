export interface Service {
  id: string;
  name: string;
  price: number;
  gender: string;
}

export interface Barber {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  services: Service[];
  barbers?: Barber[];
}
