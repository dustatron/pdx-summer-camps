import { z } from "zod";
import { campSchema } from '../../../types/camp'
import cloudinary from 'cloudinary'
import { router, publicProcedure } from "../trpc";


export const campRouter = router({
  getAllCamps: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.camp.findMany({ include: { image: true } });
  }),
  getYourCamps: publicProcedure.input(z.object({ userId: z.number() })).query(({ input, ctx }) => {
    return ctx.prisma.campAuthor.findMany({ where: { userId: input.userId }, include: { camp: true } })
  }),
  getCamp: publicProcedure.input(z.object({ campId: z.string() })).query(({ input, ctx }) => {
    return ctx.prisma.camp.findFirst({ where: { id: input.campId }, include: { image: true } })
  }),
  addCamp: publicProcedure.input(campSchema).mutation(({ input, ctx }) => {
    const { title, address, email, website, link, lat, lng, description, facebook, instagram, quadrant, tags, userId, authorName, ages, phone } = input
    return ctx.prisma.camp.create({
      data: {
        title,
        address,
        ages,
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
        phone,
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
    const { title, address, email, website, link, description, facebook, instagram, quadrant, tags, id, lat, lng, ages, phone } = input
    return ctx.prisma.camp.update({
      where: { id: id }, data: {
        title,
        address,
        ages,
        website,
        phone,
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
  removeImage: publicProcedure.input(z.object({ imgId: z.string(), public_id: z.string().optional().nullable() })).mutation(({ input, ctx }) => {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });

    if (input.public_id) {
      cloudinary.v2.uploader.destroy(input.public_id).then((result) => {
        return ctx.prisma.campImage.delete({ where: { id: input.imgId } })
        console.log('result', result)
      }).catch((err) => {
        console.error(err)
        return err
      });
    }
    return ctx.prisma.campImage.delete({ where: { id: input.imgId } })
  }),
  addImage: publicProcedure.input(z.object({ campId: z.string(), src: z.string(), public_id: z.string().optional(), asset_id: z.string().optional(), created_at: z.string().optional(), folder: z.string().optional(), original_filename: z.string().optional() })).mutation(({ input, ctx }) => {
    const { src, campId, asset_id, created_at, folder, original_filename, public_id } = input
    return ctx.prisma.camp.update({ where: { id: campId }, data: { image: { create: { src, asset_id, created_at, folder, original_filename, public_id } } } })
  }),
  getImages: publicProcedure.input(z.object({ campId: z.string() })).query(({ input, ctx }) => {
    return ctx.prisma.campImage.findMany({ where: { campId: input.campId } })
  })
})