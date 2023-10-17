import z from "zod";

import { deliverytSchema } from "./validateSchema/Delivery.shema";

export type TDelivery = z.infer<typeof deliverytSchema>;
