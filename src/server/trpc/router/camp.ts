import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const campRouter = router({
  getAllCamps: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.camp.findMany({ include: { location: true, image: true } });
  }),
  getAllLocations: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.location.findMany({ include: { camp: true } })
  })
})