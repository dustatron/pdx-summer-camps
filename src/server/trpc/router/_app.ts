import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { campRouter } from "./camp";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  camps: campRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
