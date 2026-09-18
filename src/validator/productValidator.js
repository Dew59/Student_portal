import { z } from "zod";

export const uploadProductSchema = z.object({
    body: z.object({
        name: z.string().min(1).trim(),
        description: z.string().min(3, 'Describe this product').trim(),
        price: z.coerce.number().positive('Price must be greater than zero'),
        category: z.string().min(1),
        stock: z.preprocess((value) => {
            if (value === "true") return true;
            if (value === "false")  throw new Error('Stock must be true');
            return value;
        }, z.boolean()),
        quantity: z.coerce.number().positive('Quantity must be greater than zero')
    }),

    file: z.any()
});