import type { Activity, Event, Ofert, Poll, Post } from "@prisma/client";
import { z } from "zod";
import { t } from "../trpc";

export const feedRouter = t.router({
  get: t.procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const content = await ctx.prisma.activity.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!content) {
        throw new Error("NOT_FOUND");
      }
      return {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        result: (await ctx.prisma[content.type].findUnique({
          where: {
            id: content.id,
          },
        })) as Ofert | Post | Event | Poll,
      };
    }),
  getAll: t.procedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;

      const content = await ctx.prisma.activity.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          id: "asc",
        },
      });

      const feed: ((Ofert | Post | Event | Poll) & Activity)[] =
        await Promise.all(
          content.map((contentItem) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const item = prisma[contentItem.type].findUnique({
              where: { id: contentItem.id },
            });
            return Object.assign(item, { type: contentItem.type });
          })
        );

      let nextCursor: string | undefined = undefined;
      if (feed.length > limit) {
        const nextItem = feed.pop();
        nextCursor = nextItem!.id;
      }

      return {
        items: feed,
        nextCursor,
      };
    }),
});
