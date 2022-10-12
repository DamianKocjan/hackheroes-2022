import { Event, Ofert, Poll, Post } from "@prisma/client";
import { z } from "zod";
import { t } from "../trpc";

const PER_PAGE = 10;

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
  getAll: t.procedure.input(z.object({
      limit: z.number().min(1).max(100).nullish(),
			cursor: z.string().nullish(),
  })).query(async ({ ctx, input }) => {
    const {cursor} = input;
    const content = await ctx.prisma.activity.findMany({
      take: PER_PAGE + 1,
      cursor: {
        cursor: cursor ? { myCursor: cursor } : undefined,
      },
    });

    const feed: (Ofert | Post | Event | Poll)[] = await Promise.all(
      content.map((contentItem) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return prisma[contentItem.type].findUnique({
          where: { id: contentItem.id },
        });
      })
    );

    let nextCursor: string | undefined = undefined;
    if (feed.length > PER_PAGE) {
      const nextItem = feed.pop();
      nextCursor = nextItem!.id;
    }

    return {
      items: feed,
      nextCursor,
    };
  }),
});
