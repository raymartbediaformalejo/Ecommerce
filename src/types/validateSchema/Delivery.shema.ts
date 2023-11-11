import z from "zod";

export const deliverytSchema = z
  .object({
    email: z.string().min(1, "Email is required").email(),
    "first-name": z
      .string()
      .min(1, "First name is required")
      .refine((value) => /^[a-zA-Z]+$/.test(value), {
        message: "First name should only contain alphabet characters (letters)",
      }),
    "last-name": z
      .string()
      .min(1, "Last name is required")
      .refine((value) => /^[a-zA-Z]+$/.test(value), {
        message: "Last name should only contain alphabet characters (letters)",
      }),
    "lbc-branch-and-address": z
      .string()
      .optional()
      .refine((value) => value === "" || /^[a-zA-Z]+$/.test(value as string), {
        message: "Should only contain alphabet characters (letters)",
      }),
    country: z
      .object({
        value: z.string(),
        label: z.string(),
      })
      .refine(
        (value) => value.label.trim() !== "" && value.value.trim() !== "",
        {
          message: "Country is required",
        }
      ),
    address: z
      .string()
      .min(1, "Address is required")
      .refine((value) => /^[a-zA-Z0-9\s,.]+$/.test(value), {
        message: "Invalid address",
      }),
    "postal-code": z
      .string()
      .min(1, "Postal code is required")
      .min(4, "Postal code should be atleast 4 digits")
      .max(5, "Postal code should not be greater than 5 digits"),
    city: z
      .string()
      .min(1, "City is required")
      .refine((value) => /^[a-zA-Z0-9\s,.]+$/.test(value), {
        message: "Invalid city",
      }),
    region: z
      .object({
        value: z.string(),
        label: z.string(),
      })
      .refine(
        (value) => value.label.trim() !== "" && value.value.trim() !== "",
        {
          message: "Region is required",
        }
      ),
    phone: z
      .string()
      .min(1, "Phone is required")
      .refine(
        (value) => /^(\+\S{1,12}|\S{11,13})$/.test(value.replace(/\s/g, "")),
        {
          message: "Invalid phone number",
        }
      ),
    "payment-method": z.enum(["cash-on-delivery", "lbc"]),
    "billing-address": z.enum([
      "same-as-shipping-address",
      "different-billing-address",
    ]),
  })
  .required({
    email: true,
    "first-name": true,
    "last-name": true,
    address: true,
    "postal-code": true,
    city: true,
    region: true,
    phone: true,
  });

// export type NestedKey<O extends Record<string, unknown>> = {
//   [K in Extract<keyof O, string>]: O[K] extends Array<any>
//     ? K
//     : O[K] extends Record<string, unknown>
//     ? `${K}` | `${K}.${NestedKey<O[K]>}`
//     : K;
// }[Extract<keyof O, string>];

// export type TNestedKeys = NestedKey<TDelivery>;
