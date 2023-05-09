import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { campRouter } from "./camp";
import { favoriteRouter } from "./favorite";
import { providerRouter } from "./Provider";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  camps: campRouter,
  favorites: favoriteRouter,
  provider: providerRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
