import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getUser: publicProcedure.input(z.object({ id: z.number() })).query(({ input, ctx }) => {
    return ctx.prisma.user.findUnique({ where: { id: input.id } })
  }),

});
