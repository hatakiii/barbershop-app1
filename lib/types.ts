export interface Service {
  id: number | string;
  salon_id: number | null;
  name: string;
  price: number;
  gender: string | null;
}
export interface Barber {
  id: string;
  name: string;
  phoneNumber: string;
  avatarUrl?: string;
  blockedTimes?: string[];
}

export interface Salon {
  id: string;
  name: string;
  salonImage?: string;
  salonAddress?: string;
  lat?: number;
  lng?: number;
  managerId?: string;
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
export interface BusyTime {
  time: string;
  serviceName: string;
  phonenumber: string;
  totalprice: number;
}
