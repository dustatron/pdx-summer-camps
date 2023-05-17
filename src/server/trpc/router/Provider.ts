import { z } from "zod";
import cloudinary, { Status } from 'cloudinary'

import { providerSchema } from '../../../types/provider'
import { router, publicProcedure, protectedProcedure } from "../trpc";


export const providerRouter = router({
  getAllProviders: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.provider.findMany({ include: { image: true, camps: true, favorites: true } })
  }),
  getYourProviders: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.session.user.id
    return ctx.prisma.providerAuthor.findMany({ where: { userId: Number(userId) } })
  }),
  getProvider: publicProcedure.input(z.object({ providerId: z.string() })).query(({ input, ctx }) => {
    return ctx.prisma.provider.findFirst({ where: { id: input.providerId }, include: { image: true, camps: { include: { image: true } }, author: true, favorites: true } })
  }),
  addProvider: protectedProcedure.input(providerSchema).mutation(({ input, ctx }) => {
    const { name, id } = ctx.session.user
    return ctx.prisma.provider.create({
      data: {
        title: input.title,
        lat: parseFloat(input.lat),
        lng: parseFloat(input.lng),
        website: input.website,
        email: input.email,
        ages: input?.agesObject?.map((age) => age.value),
        facebook: input.facebook,
        instagram: input.instagram,
        brief: input.brief,
        description: input.description,
        phone: input.phone,
        pickUp: input.pickUp,
        dropOff: input.dropOff,
        contact: input.contact,
        contactName: input.contactName,
        address: input.address,
        author: {
          create: {
            providerName: input.title,
            userId: Number(id),
            authorName: name as string,
          }
        }
      }
    })
  }),
  updateProvider: protectedProcedure.input(providerSchema).mutation(({ input, ctx }) => {
    const { id } = input

    return ctx.prisma.camp.update({
      where: { id: id }, data: {
        ...input,
        status: input.status,
        quadrant: input.quadrant as string[],
        tags: input.tags as string[],
        title: input.title,
        lat: parseFloat(input.lat),
        lng: parseFloat(input.lng),
        website: input.website,
        ages: input?.agesObject?.map((age) => age.value),
        address: input.address,
      }
    })
  }),
  delete: publicProcedure.input(z.object({ providerId: z.string() })).mutation(({ input, ctx }) => {
    return ctx.prisma.camp.delete({ where: { id: input.providerId } })
  }),
  removeImage: publicProcedure.input(z.object({ imgId: z.string(), public_id: z.string().optional().nullable() })).mutation(({ input, ctx }) => {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });

    if (input.public_id) {
      cloudinary.v2.uploader.destroy(input.public_id).then(() => {
        return ctx.prisma.providerImage.delete({ where: { id: input.imgId } })
      }).catch((err) => {
        console.error(err)
        return err
      });
    }
    return ctx.prisma.campImage.delete({ where: { id: input.imgId } })
  }),
  addImage: protectedProcedure.input(z.object({ providerId: z.string(), src: z.string(), public_id: z.string().optional(), asset_id: z.string().optional(), created_at: z.string().optional(), folder: z.string().optional(), original_filename: z.string().optional() })).mutation(({ input, ctx }) => {
    const { src, providerId, asset_id, created_at, folder, original_filename, public_id } = input
    return ctx.prisma.provider.update({ where: { id: providerId }, data: { image: { create: { src, asset_id, created_at, folder, original_filename, public_id } } } })
  }),
  getImages: publicProcedure.input(z.object({ providerId: z.string() })).query(({ input, ctx }) => {
    return ctx.prisma.providerImage.findMany({ where: { providerId: input.providerId } })
  }),
  addCamp: protectedProcedure.input(z.object({ campId: z.string(), providerId: z.string() })).mutation(({ input, ctx }) => {
    return ctx.prisma.provider.update({ where: { id: input.providerId }, data: { camps: { connect: { id: input.campId } } } })
  })
});
