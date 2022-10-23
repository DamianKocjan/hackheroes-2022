import { z } from "zod";
import { authedProcedure, t } from "../trpc";
import { getSignredUrl } from "../utils/images";

export const ofertRouter = t.router({
  getAll: authedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
        filters: z.object({
          title: z.string().optional(),
          condition: z.enum(["NEW", "USED", "UNKNOWN"]).optional(),
          minPrice: z.number().optional(),
          maxPrice: z.number().optional(),
          category: z.string().optional(),
        }),
      })
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const { cursor, filters } = input;

      const feed = await ctx.prisma.ofert.findMany({
        take: limit + 1,
        where: {
          title:
            filters.title !== undefined
              ? {
                  contains: filters.title,
                  mode: "insensitive",
                }
              : undefined,
          category:
            filters.category !== undefined
              ? {
                  contains: filters.category,
                  mode: "insensitive",
                }
              : undefined,
          condition:
            filters.condition !== undefined
              ? {
                  equals: filters.condition,
                }
              : undefined,
          price: {
            gte: filters.minPrice,
            lte: filters.maxPrice,
          },
        },
        include: {
          user: true,
          _count: {
            select: {
              interactions: true,
              comments: true,
            },
          },
        },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: "desc",
        },
      });

      feed.map(async (ofert) => ({
        ...ofert,
        image: await getSignredUrl(ofert.id),
      }));

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
