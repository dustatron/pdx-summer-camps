import { z } from "zod";
export const providerSchema = z.object({
  title: z.string({ required_error: 'Must provide a camp provider title' }).max(150).min(1, 'Must provide a name for your organization'),
  address: z.string({ required_error: 'Must Provide an address' }),
  website: z.string().url({ message: "Invalid url" }),
  email: z.string().email({ message: 'Not a valid email address' }),
  phone: z.string().min(10).max(14).optional(),
  link: z.string().optional().nullable(),
  facebook: z.string().max(150).optional().nullable(),
  instagram: z.string().max(150).optional().nullable(),
  brief: z.string().max(150, 'Brief message was too long').optional().nullable(),
  description: z.string().max(2500).optional().nullable(),
  contact: z.string().max(250).optional().nullable(),
  contactName: z.string().max(150).optional().nullable(),
  lat: z.string(),
  lng: z.string(),
  tags: z.array(z.string()).optional().nullable(),
  quadrant: z.array(z.string()).optional().nullable(),
  quadrantObject: z.array(z.object({ value: z.string(), label: z.string() })).optional().nullable(),
  ages: z.array(z.string()).optional().nullable(),
  agesObject: z.array(z.object({ value: z.string(), label: z.string() })).optional().nullable(),
  pickUp: z.string().max(100).optional().nullable(),
  dropOff: z.string().max(100).optional().nullable(),
  dateStart: z.string().max(150).optional().nullable(),
  dateEnd: z.string().max(150).optional().nullable(),
  userId: z.number().optional().nullable(),
  status: z.enum(["OPEN", "FULL", "UNKNOWN"]).optional(),
  authorName: z.string().optional().nullable(),
  id: z.string().optional(),
});

export type ProviderSchema = z.infer<typeof providerSchema>;
export type ProviderData = z.input<typeof providerSchema>
