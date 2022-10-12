// src/server/trpc/router/index.ts
import { t } from "../trpc";
import { authRouter } from "./auth";
import { commentRouter } from "./comment";
import { feedRouter } from "./feed";

export const appRouter = t.router({
  auth: authRouter,
  comment: commentRouter,
  feed: feedRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
