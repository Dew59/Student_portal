import { z } from "zod";

export const uploadProductSchema = z.object({
    body: z.object({
        name: z.string().min(1).trim(),
        description: z.string().min(3, 'Describe this product').trim(),
        price: z.number().positive('Price must be greater than zero'),
        category: z.string().min(1),
        stock: z.boolean(),
        quantity: z.number().positive('Quantity must be greater than zero'),
        image: z.string()
    })
});