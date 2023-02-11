import { z } from "zod";
import { providerSchema } from '../../../types/provider'
import { router, publicProcedure, protectedProcedure } from "../trpc";


export const providerRouter = router({
  getAllProviders: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.provider.findMany({ include: { image: true, camps: true } })
  }),

});
