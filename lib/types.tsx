// lib/types.ts

export interface Service {
  id: number;
  salon_id?: number | null;
  gender?: string | null;
  name?: string | null;
  price?: number | null;
}

export interface Barber {
  id: number;
  salon_id?: number | null;
  name?: string | null;
  phoneNumber?: string | null;
  avatarUrl?: string | null;
}

export interface Salon {
  id: number;
  name: string;
  salonImage?: string | null;
  salonAddress?: string | null;
  managerId?: string | null;
  barbers: Barber[];
  services: Service[];
  lat?: number;
  lng?: number;
}

export interface Order {
  id: number;
  salonid: number;
  serviceid: number;
  barberid: number;
  reserveddatetime: string; // DateTime → string
  totalprice: number;
  phonenumber: number;
}
