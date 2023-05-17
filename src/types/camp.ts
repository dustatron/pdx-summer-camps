import type { Camp, Favorite } from "@prisma/client";
import { z } from "zod";
export const campSchema = z.object({
  title: z.string().max(150),
  address: z.string().max(255),
  website: z.string().max(150),
  email: z.string().max(100).optional().nullable(),
  phone: z.string().max(20).optional().nullable(),
  link: z.string().optional().nullable(),
  facebook: z.string().max(150).optional().nullable(),
  instagram: z.string().optional().nullable(),
  brief: z.string().max(150, 'Brief message was too long').optional().nullable(),
  description: z.string().max(2500).optional().nullable(),
  contactName: z.string().optional().nullable(),
  lat: z.number(),
  lng: z.number(),
  tags: z.array(z.string()),
  quadrant: z.array(z.string()),
  ages: z.array(z.string()),
  price: z.string().optional().nullable(),
  pickUp: z.string().max(100).optional().nullable(),
  dropOff: z.string().max(100).optional().nullable(),
  dateStart: z.string().optional(),
  dateEnd: z.string().optional(),
  userId: z.number().optional(),
  status: z.enum(["OPEN", "FULL", "UNKNOWN"]),
  authorName: z.string().optional(),
  id: z.string().optional(),
  providerId: z.string().optional()
});

export const campImages = z.object({
  images: z.array(z.object({ src: z.string(), id: z.string().optional().nullable(), campId: z.string().optional().nullable() }))
})

export type CampImages = z.input<typeof campImages>
export type CampData = z.input<typeof campSchema>

export type CampDataToAPI = Camp

export type CampDetailFromAPI = CampData & { image: { src: string, id: string, campId: string, public_id: string, original_filename: string, folder: string, created_at: string, asset_id: string }[] } & {
  favorites: Favorite[];
};

export interface MultiSelectOption { value: string; label: string }

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
  8: "8th Grade",
  9: "9th Grade",
  10: "10th Grade",
  11: "11th Grade",
  12: "12th Grade",
  13: "Parents Too"
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
  { label: AgeValues[9], value: "9" },
  { label: AgeValues[10], value: "10" },
  { label: AgeValues[11], value: "11" },
  { label: AgeValues[12], value: "12" },
  { label: AgeValues[13], value: "Parents Too" },
];