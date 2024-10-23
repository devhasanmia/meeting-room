import { z } from "zod";

export const userValidation = z.object({
  name: z
    .string({
      invalid_type_error: "Name must be a string",
      required_error: "Name is required",
    })
    .min(3, "Name must be at least 3 characters long"),
  email: z
    .string({
      invalid_type_error: "Email must be a string",
      required_error: "Email is required",
    })
    .email("Invalid email format"),
  password: z
    .string({
      invalid_type_error: "Password must be a string",
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters long"),
  phone: z
    .string({
      invalid_type_error: "Phone must be a string",
      required_error: "Phone is required",
    })
    .min(11, "Phone must be at least 3 characters"),
  address: z
    .string({
      invalid_type_error: "Address must be a string",
      required_error: "Address is required",
    })
    .min(3, "Address must be at least 3 characters long"),
  role: z.enum(["user", "admin"]).default("user"),
});



export const loginValidation = z.object({
  email: z
    .string({
      invalid_type_error: "The email address must be a valid string.",
      required_error: "Please enter your email address.",
    })
    .min(4, "Email must be at least 4 characters long.")
    .email("Please enter a valid email address."),
    
  password: z
    .string({
      invalid_type_error: "The password must be a valid string.",
      required_error: "Please enter your password.",
    })
    .min(6, "Password must be at least 6 characters long for better security."),
});

