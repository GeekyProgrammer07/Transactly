const z = require('zod');

const passwordSchema = z.string().min(8, { message: "Password must be at least 8 characters" });

const emailSchema = z.string().email({ message: "Invalid email format" });

const firstNameSchema = z.string()
  .min(1, { message: "First name is required" })
  .max(50, { message: "First name must be less than 50 characters" });

const lastNameSchema = z.string()
  .min(1, { message: "Last name is required" })
  .max(50, { message: "Last name must be less than 50 characters" });

const usernameSchema = z.string()
  .min(3, { message: "Username must be at least 3 characters" })
  .max(30, { message: "Username must be less than 30 characters" })

const signupSchema = z.object({
  username: z.string(),
  email: emailSchema,
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  password: passwordSchema,
});

const signinSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

const updateInfoSchema = z.object({
  password: passwordSchema.optional(),
  firstName: firstNameSchema.optional(),
  lastName: lastNameSchema.optional()
});

const tranferSchema = z.object({
  to: usernameSchema,
  amount: z.number(),
}).required();

module.exports = {
  signupSchema,
  signinSchema,
  updateInfoSchema,
  tranferSchema
};
