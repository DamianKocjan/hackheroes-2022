// src/server/trpc/router/index.ts
import { t } from "../trpc";
import { authRouter } from "./auth";
import { commentRouter } from "./comment";
import { feedRouter } from "./feed";
import { interactionRouter } from "./interaction";
import { pollRouter } from "./poll";

export const appRouter = t.router({
  auth: authRouter,
  comment: commentRouter,
  feed: feedRouter,
  interaction: interactionRouter,
  poll: pollRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
