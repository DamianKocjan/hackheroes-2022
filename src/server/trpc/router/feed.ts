import type { Event, Ofert, Poll, Post } from "@prisma/client";
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
          createdAt: "desc",
        },
      });

      const feed = await Promise.all(
        content.map(async (contentItem) => {
          let item;

          if (contentItem.type === "ofert") {
            item = await ctx.prisma.ofert.findUnique({
              where: { id: contentItem.id },
              include: {
                user: true,
                interactions: true,
                _count: {
                  select: {
                    interactions: true,
                    comments: true,
                  },
                },
              },
            });
          } else if (contentItem.type === "post") {
            item = await ctx.prisma.post.findUnique({
              where: { id: contentItem.id },
              include: {
                user: true,
                interactions: true,
                _count: {
                  select: {
                    interactions: true,
                    comments: true,
                  },
                },
              },
            });
          } else if (contentItem.type === "event") {
            item = await ctx.prisma.event.findUnique({
              where: { id: contentItem.id },
              include: {
                user: true,
                interactions: true,
                _count: {
                  select: {
                    interactions: true,
                    comments: true,
                    interestedInEvent: true,
                  },
                },
              },
            });
          } else {
            item = await ctx.prisma.poll.findUnique({
              where: { id: contentItem.id },
              include: {
                user: true,
                interactions: true,
                _count: {
                  select: {
                    interactions: true,
                    comments: true,
                  },
                },
              },
            });
          }

          return {
            ...item,
            id: contentItem.id,
            type: contentItem.type,
          };
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
