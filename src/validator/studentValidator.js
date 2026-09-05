const { z } = require('zod');

const registerStudentSchema = z.object({
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
    .min(8, "Use a complete registeration number")
})

const updateStudentSchma = z.object({
    name: z.string()
    .trim()
    .toLowerCase()
    .min(12, "Make use of your full name")
})

module.exports = { registerStudentSchema, updateStudentSchma }