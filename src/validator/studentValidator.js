import { z } from 'zod'

export const registerStudentSchema = z.object({
    body: z.object({
        name: z.string()
            .trim()
            .min(12, "Make use of your full name")
            .toLowerCase(),
        email: z.email()
            .trim()
            .toLowerCase(),
        password: z.string()
            .min(8, "Password must be at least 8 characters"),
        registrationNumber: z.string()
            .toUpperCase()
            .min(12, "Use a complete registeration number")
    }),
});

export const loginStudentSchema = z.object ({
    body: z.object({
        registrationNumber: z.string()
        .toUpperCase()
        .min(12, "Please provide a valid registration number"),
        password: z.string()
        .min(8, "Password must be at least 8 characters")
    })
})

export const updateStudentSchema = z.object({
    body: z.object({
        name: z.string()
        .trim()
        .toLowerCase()
        .min(12, "Make use of your full name")
    }),
})