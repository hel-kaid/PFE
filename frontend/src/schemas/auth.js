import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username trop court")
      .max(50, "Maximum 50 caractères"),

    email: z
      .string()
      .email("Email invalide"),

    password: z
      .string()
      .min(8, "Minimum 8 caractères")
      .regex(/[a-z]/, "Doit contenir une minuscule")
      .regex(/[A-Z]/, "Doit contenir une majuscule")
      .regex(/[0-9]/, "Doit contenir un chiffre"),

    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Les mots de passe ne correspondent pas",
    path: ["password_confirmation"],
  });

export const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});