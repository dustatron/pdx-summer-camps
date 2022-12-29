import { z } from "zod";
import { createCampSchema } from '../../../types/camp'

import { router, publicProcedure } from "../trpc";


export const campRouter = router({
  getAllCamps: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.camp.findMany({ include: { image: true } });
  }),
  getYourCamps: publicProcedure.input(z.object({ userId: z.number() })).query(({ input, ctx }) => {
    return ctx.prisma.campAuthor.findMany({ where: { userId: input.userId } })
  }),
  getCamp: publicProcedure.input(z.object({ campId: z.string() })).query(({ input, ctx }) => {
    return ctx.prisma.camp.findFirst({ where: { id: input.campId }, include: { image: true } })
  }),
  addCamp: publicProcedure.input(createCampSchema).mutation(({ input, ctx }) => {
    const { title, address, email, website, link, lat, lng, description, facebook, instagram, image, quadrant, tags, userId, authorName } = input
    return ctx.prisma.camp.create({
      data: {
        title,
        address,
        website,
        email,
        link,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        description,
        facebook,
        instagram,
        quadrant,
        tags,
        image: {
          create: {
            src: image || '/img-place-holder.png'
          }
        },
        author: {
          create: {
            authorName,
            campName: title,
            userId
          }
        }
      }
    })
  }),
  update: publicProcedure.input(createCampSchema).mutation(({ input, ctx }) => {
    const { title, address, email, website, link, description, facebook, instagram, image, quadrant, tags, userId, authorName, id, lat, lng } = input
    return ctx.prisma.camp.update({
      where: { id: id }, data: {
        title,
        address,
        website,
        email,
        link,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
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
  delete: publicProcedure.input(z.object({ campId: z.string() })).mutation(({ input, ctx }) => {
    return ctx.prisma.camp.delete({ where: { id: input.campId } })
  })
})