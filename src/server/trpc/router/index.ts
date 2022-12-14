// src/server/trpc/router/index.ts
import { t } from "../trpc";
import { commentRouter } from "./comment";
import { eventRouter } from "./event";
import { feedRouter } from "./feed";
import { interactionRouter } from "./interaction";
import { ofertRouter } from "./ofert";
import { pollRouter } from "./poll";

export const appRouter = t.router({
  comment: commentRouter,
  event: eventRouter,
  feed: feedRouter,
  interaction: interactionRouter,
  ofert: ofertRouter,
  poll: pollRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
