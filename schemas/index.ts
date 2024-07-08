import { z } from "zod";

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must have more than 6 characters"),
});

export const ResetSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
});

export const CustomerSignInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export const CustomerSignUpSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(255),
  lastName: z.string().min(1, "Last name is required").max(255),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must have more than 6 characters"),
});

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const Address = z.object({
  address: z
    .string({
      required_error: "Address is required.",
    })
    .min(1),
  city: z
    .string({
      required_error: "City is required.",
    })
    .min(1),
  zipCode: z
    .string({
      required_error: "Zip code is required.",
    })
    .min(1),
  state: z
    .string({
      required_error: "State is required.",
    })
    .min(1),
  country: z
    .string({
      required_error: "Country is required.",
    })
    .min(1),
});

export const CheckoutSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  phone: z.string().regex(phoneRegex, "Invalid Number!"),
  isCustomerInfo: z.boolean().default(false).optional(),
  address: Address,
});
