import * as z from 'zod';

export const profileSchema = z.object({
  firstname: z
    .string()
    .min(3, { message: 'Product Name must be at least 3 characters' }),
  lastname: z
    .string()
    .min(3, { message: 'Product Name must be at least 3 characters' }),
  email: z
    .string()
    .email({ message: 'Product Name must be at least 3 characters' }),
  country: z.string().min(1, { message: 'Country is Required' }),
  city: z.string().min(1, { message: 'City is Required' }),
  contactno: z.coerce.number(),
  ageno: z.coerce.number()
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
