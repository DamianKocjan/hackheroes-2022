import { z } from "zod";
import { t } from "../trpc";

export const ofertRouter = t.router({
  getAll: t.procedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
        exclude: z.string().optional(),
        filters: z
          .object({
            title: z.string().optional(),
            condition: z.enum(["NEW", "USED", "UNKNOWN"]).optional(),
            minPrice: z.number().optional(),
            maxPrice: z.number().optional(),
            category: z.string().optional(),
          })
          .optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const { cursor, exclude, filters } = input;

      const feed = await ctx.prisma.ofert.findMany({
        take: limit + 1,
        where: {
          id: {
            not: exclude,
          },
          title: filters?.title
            ? {
                contains: filters?.title,
                mode: "insensitive",
              }
            : undefined,
          category: filters?.category
            ? {
                contains: filters?.category,
                mode: "insensitive",
              }
            : undefined,
          condition: filters?.condition
            ? {
                equals: filters?.condition,
              }
            : undefined,
          price: {
            gte: filters?.minPrice || undefined,
            lte: filters?.minPrice || undefined,
          },
        },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: "desc",
        },
      });

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
