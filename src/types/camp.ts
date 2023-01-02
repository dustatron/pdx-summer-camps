import { z } from "zod";
export const campSchema = z.object({
  title: z.string().max(150),
  address: z.string().max(255),
  website: z.string().max(150),
  email: z.string().max(100).optional().nullable(),
  phone: z.string().max(12).optional().nullable(),
  link: z.string().optional().nullable(),
  facebook: z.string().max(150).optional().nullable(),
  instagram: z.string().optional().nullable(),
  description: z.string().max(2500).optional().nullable(),
  image: z.array(z.object({ src: z.string(), id: z.string().optional().nullable(), campId: z.string().optional().nullable() })),
  lat: z.string(),
  lng: z.string(),
  tags: z.array(z.string()),
  quadrant: z.array(z.string()),
  ages: z.array(z.string()),
  price: z.number().optional().nullable(),
  dateStart: z.date().optional().nullable(),
  endDate: z.date().optional().nullable(),
  userId: z.number(),
  authorName: z.string(),
  id: z.string().optional(),
});

export type CampData = z.input<typeof campSchema>;

export type MultiSelectOption = { value: string; label: string };

export const QuadrantValues = {
  n: "North",
  ne: "North East",
  nw: "North West",
  s: "South",
  sw: "South West",
  se: "South East",
  van: "Vancouver",
  none: 'None'
} as const

export const quadrantsOptions: MultiSelectOption[] = [
  { label: QuadrantValues.n, value: "n" },
  { label: QuadrantValues.ne, value: "ne" },
  { label: QuadrantValues.nw, value: "nw" },
  { label: QuadrantValues.s, value: "s" },
  { label: QuadrantValues.sw, value: "sw" },
  { label: QuadrantValues.se, value: "se" },
  { label: QuadrantValues.van, value: "van" },
  { label: QuadrantValues.none, value: "none" },
];

export const AgeValues = {
  k: "Kindergarten",
  1: "1st Grade",
  2: "2nd Grade",
  3: "3rd Grade",
  4: "4th Grade",
  5: "5th Grade",
  6: "6th Grade",
  7: "7th Grade",
  8: "8th Grade"
}

export const ageOptions: MultiSelectOption[] = [
  { label: AgeValues.k, value: "k" },
  { label: AgeValues[1], value: "1" },
  { label: AgeValues[2], value: "2" },
  { label: AgeValues[3], value: "3" },
  { label: AgeValues[4], value: "4" },
  { label: AgeValues[5], value: "5" },
  { label: AgeValues[6], value: "6" },
  { label: AgeValues[7], value: "7" },
  { label: AgeValues[8], value: "8" },
];