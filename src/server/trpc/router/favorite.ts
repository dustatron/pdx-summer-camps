import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const favoriteRouter = router({
  getFavorites: publicProcedure.input(z.object({ userId: z.number() })).query(({ ctx, input }) => {

    if (input.userId) {
      return ctx.prisma.favorite.findMany({ where: { userId: input.userId } })
    }
  }),
  getThisUsersFavorites: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.session?.user.id
    return ctx.prisma.favorite.findMany({ where: { userId: Number(userId) }, include: { camp: { include: { image: true } } } })
  }),
  addFavorite: protectedProcedure.input(z.object({ campId: z.string() })).mutation(({ input, ctx }) => {
    const currentUser = ctx.session?.user.id
    return ctx.prisma.favorite.create({ data: { campId: input.campId, userId: Number(currentUser) } })
  }),
  removeFavorite: protectedProcedure.input(z.object({ id: z.string() })).mutation(({ input, ctx }) => {
    return ctx.prisma.favorite.delete({ where: { id: input.id } })
  }),
})