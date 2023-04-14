export interface AddressModel {
  address_id?: number;
  user_id: number;
  address_line1: string;
  address_line2: string;
  postal_code: number;
  city: string;
  state: string;
  country: string;
}
