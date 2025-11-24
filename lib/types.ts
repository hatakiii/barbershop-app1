export interface Service {
  id: string;
  name: string;
  price: number;
  gender: string;
}

export interface Barber {
  id: string;
  name: string;
  phoneNumber: number;
}

export interface Category {
  id: string;
  name: string;
  salon_image?: string;
  salon_address?: string;
  services: Service[];
  barbers?: Barber[];
}

export interface User {
  id: number;
  clerkid: string;
  email: string;
  name?: string;
  createdat?: Date;
  updatedat?: Date;
  role?: string;
}