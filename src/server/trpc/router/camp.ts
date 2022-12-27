import { BsCartX } from "react-icons/bs";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const createCampSchema = z.object({
  title: z.string().max(150),
  address: z.string().max(255),
  email: z.string().max(100).optional(),
  website: z.string().max(150),
  link: z.string().optional(),
  facebook: z.string().max(150).optional(),
  instagram: z.string().optional(),
  description: z.string().max(500).optional(),
  image: z.string().optional(),
  location: z.object({
    lat: z.string(),
    lng: z.string()
  }),
  tags: z.string().optional(),
  quadrant: z.string().optional()
})

export const campRouter = router({
  addCamp: publicProcedure.input(createCampSchema).mutation(({ input, ctx }) => {
    const { title, address, email, website, link, location, description, facebook, instagram, image, quadrant, tags } = input
    return ctx.prisma.camp.create({
      data: {
        title,
        address,
        website,
        email,
        link,
        location: {
          create: {
            lat: parseFloat(location.lat),
            lng: parseFloat(location.lng)
          }
        },
        description,
        facebook,
        instagram,
        quadrant,
        tags,
        image: {
          create: {
            src: image || '/img-place-holder.png'
          }
        }
      }
    })
  }),
  getAllCamps: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.camp.findMany({ include: { location: true, image: true } });
  }),
  getAllLocations: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.location.findMany({ include: { camp: true } })
  }),
  getYourCamps: publicProcedure.input(z.object({ userId: z.string() })).query(({ input, ctx }) => {
    return ctx.prisma.camp.findUnique({ where: {} })
  })
})