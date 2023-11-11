import z from "zod";

import { deliverytSchema } from "./validateSchema/Delivery.shema";

export type TDelivery = z.infer<typeof deliverytSchema>;

export type TDeliveryAddress = Omit<
  TDelivery,
  "email" | "billing-address" | "payment-method"
>;

export type TOptions = { value: string; label: string }[];

export type TShippingMethod = {
  isFreeShipping: boolean;
  isShippingAddressFilled: boolean;
};
