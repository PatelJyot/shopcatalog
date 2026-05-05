export enum CheckoutStep {
  Address = "address",
  Payment = "payment",
  Review = "review",
}

export interface AddressFormData {
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pinCode: string;
  saveAddress: boolean;
}

export type PaymentOption = "COD" | "UPI" | "Card";

export interface PaymentFormData {
  method: PaymentOption;
  upiId: string;
  cardToken: string;
}
