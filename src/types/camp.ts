import { z } from "zod";
export const campSchema = z.object({
  title: z.string().max(150),
  address: z.string().max(255),
  website: z.string().max(150),
  email: z.string().max(100).optional().nullable(),
  phone: z.string().max(11).optional().nullable(),
  link: z.string().optional().nullable(),
  facebook: z.string().max(150).optional().nullable(),
  instagram: z.string().optional().nullable(),
  description: z.string().max(2500).optional().nullable(),
  image: z.array(z.object({ src: z.string(), id: z.string().optional().nullable(), campId: z.string().optional().nullable() })),
  lat: z.string(),
  lng: z.string(),
  tags: z.array(z.string()).optional().nullable(),
  quadrant: z.string().optional().nullable(),
  userId: z.number(),
  authorName: z.string(),
  id: z.string().optional(),
});

export type CampData = z.input<typeof campSchema>;