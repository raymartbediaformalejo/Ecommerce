import z from "zod";

export const deliverytSchema = z
  .object({
    email: z.string().email(),
    "first-name": z
      .string()
      .refine((value) => value.trim() !== "", {
        message: "First name is required",
      })
      .refine((value) => /^[a-zA-Z]+$/.test(value), {
        message: "First name should only contain alphabet characters (letters)",
      }),
    "last-name": z
      .string()
      .refine((value) => value.trim() !== "", {
        message: "Last name is required",
      })
      .refine((value) => /^[a-zA-Z]+$/.test(value), {
        message: "Last name should only contain alphabet characters (letters)",
      }),

    country: z.object({
      value: z.string(),
      label: z.string(),
    }),
    address: z
      .string()
      .refine((value) => /^[a-zA-Z0-9\s,.]+$/.test(value), {
        message: "Invalid address",
      })
      .refine((value) => value.trim() !== "", {
        message: "Address is required",
      }),
    "postal-code": z.coerce
      .number()
      .int()
      .min(1000, "Postal code should be atleast 4 digits")
      .max(9999, "Postal code should not be greater than 5 digits")
      .refine((value) => value.toString().trim() !== "", {
        message: "Postal code is required",
      }),

    city: z
      .string()
      .refine((value) => /^[a-zA-Z0-9\s,.]+$/.test(value), {
        message: "Invalid city",
      })
      .refine((value) => value.trim() !== "", {
        message: "City is required",
      }),
    region: z.object({
      value: z.string(),
      label: z.string(),
    }),
    phone: z
      .string()
      .refine((value) => value.trim() !== "", {
        message: "Phone is required",
      })
      .refine((value) => /^0/.test(value), {
        message: "Phone number must start with '0'",
      })
      .refine((value) => /^\d{11}$/.test(value), {
        message: "Phone number must be 11 digits",
      }),
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
