import { deliverytSchema } from "./Delivery.shema";

export const billingAddressSchema = deliverytSchema.omit({
  "payment-method": true,
  "billing-address": true,
});
