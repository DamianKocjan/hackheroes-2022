import { z } from "zod";
import { authedProcedure, t } from "../trpc";

export const commentRouter = t.router({
  getAll: t.procedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
        postId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const { cursor, postId } = input;

      const comments = await ctx.prisma.comment.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          id: "asc",
        },
        where: {
          postId: postId,
        },
      });

      let nextCursor: string | undefined = undefined;
      if (comments.length > limit) {
        const nextItem = comments.pop();
        nextCursor = nextItem!.id;
      }

      return {
        items: comments,
        nextCursor,
      };
    }),
  create: authedProcedure
    .input(z.object({ postId: z.string(), content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.comment.create({
        data: {
          content: input.content,
          post: {
            connect: {
              id: input.postId,
            },
          },
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),
});
