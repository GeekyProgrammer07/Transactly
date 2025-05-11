const z = require('zod')

const signupSchema = z.object({
    username: z.string(),
    email: z.string().email({ message: "Invalid email format" }),
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const signinSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

module.exports = {
    signupSchema,
    signinSchema
}