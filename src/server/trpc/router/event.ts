import { z } from "zod";
import { authedProcedure, t } from "../trpc";

export const eventRouter = t.router({
  interestedIn: authedProcedure
    .input(
      z.object({
        eventId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const polinterestedInEventlVotes =
        await ctx.prisma.interestedInEvent.findMany({
          where: {
            event: {
              id: input.eventId,
            },
            user: {
              id: ctx.session.user.id,
            },
          },
        });

      if (polinterestedInEventlVotes.length > 0) {
        await ctx.prisma.interestedInEvent.deleteMany({
          where: {
            id: {
              in: polinterestedInEventlVotes.map((v) => v.id),
            },
          },
        });
      } else {
        await ctx.prisma.interestedInEvent.create({
          data: {
            event: {
              connect: {
                id: input.eventId,
              },
            },
            user: {
              connect: {
                id: ctx.session.user.id,
              },
            },
          },
        });
      }
    }),
  isInterestedIn: authedProcedure
    .input(
      z.object({
        eventId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const polinterestedInEventlVotes =
        await ctx.prisma.interestedInEvent.findMany({
          where: {
            event: {
              id: input.eventId,
            },
            user: {
              id: ctx.session.user.id,
            },
          },
        });

      return polinterestedInEventlVotes.length > 0;
    }),
});
