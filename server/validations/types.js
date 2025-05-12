const z = require('zod')

const passwordSchema = z.string().min(6, { message: "Password must be at least 6 characters" });
const emailSchema = z.string().email({ message: "Invalid email format" });
const firstNameSchema = z.string().min(1, { message: "First name is required" });
const lastNameSchema = z.string().min(1, { message: "Last name is required" });

const signupSchema = z.object({
    username: z.string(),
    email: emailSchema,
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    password: passwordSchema
});

const signinSchema = z.object({
    email: emailSchema,
    password: passwordSchema
});

const updateInfoSchema = z.object({
    password: passwordSchema.optional(),
    firstName: firstNameSchema.optional(),
    lastName: lastNameSchema.optional()
});

module.exports = {
    signupSchema,
    signinSchema,
    updateInfoSchema
}