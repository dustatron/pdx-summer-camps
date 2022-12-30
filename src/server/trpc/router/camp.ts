import { z } from "zod";
import { campSchema } from '../../../types/camp'

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
  addCamp: publicProcedure.input(campSchema).mutation(({ input, ctx }) => {
    const { id, title, address, email, website, link, lat, lng, description, facebook, instagram, image, quadrant, tags, userId, authorName } = input
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
  update: publicProcedure.input(campSchema).mutation(({ input, ctx }) => {
    const { title, address, email, website, link, description, facebook, instagram, quadrant, tags, id, lat, lng, image } = input
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
      }
    })
  }),
  delete: publicProcedure.input(z.object({ campId: z.string() })).mutation(({ input, ctx }) => {
    return ctx.prisma.camp.delete({ where: { id: input.campId } })
  }),
  removeImage: publicProcedure.input(z.object({ imgId: z.string() })).mutation(({ input, ctx }) => {
    return ctx.prisma.campImage.delete({ where: { id: input.imgId } })
  }),
  addImage: publicProcedure.input(z.object({ campId: z.string(), src: z.string() })).mutation(({ input, ctx }) => {
    return ctx.prisma.camp.update({ where: { id: input.campId }, data: { image: { create: { src: input.src } } } })
  }),
  getImages: publicProcedure.input(z.object({ campId: z.string() })).query(({ input, ctx }) => {
    return ctx.prisma.campImage.findMany({ where: { campId: input.campId } })
  })
})