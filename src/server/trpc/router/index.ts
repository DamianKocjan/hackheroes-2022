// src/server/trpc/router/index.ts
import { t } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { feedRouter } from "./feed";

export const appRouter = t.router({
  example: exampleRouter,
  feed: feedRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
