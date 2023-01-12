import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { campRouter } from "./camp";
import { favoriteRouter } from "./favorite";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  camps: campRouter,
  favorites: favoriteRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
