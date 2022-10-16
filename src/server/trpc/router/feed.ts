import type { Event, Ofert, Poll, Post } from "@prisma/client";
import cuid from "cuid";
import { z } from "zod";
import { authedProcedure, t } from "../trpc";

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
  create: authedProcedure
    .input(
      z.object({
        type: z.enum(["ofert", "post", "event", "poll"]),
        data: z.object({
          event: z
            .object({
              title: z.string(),
              description: z.string(),
              from: z.string(),
              to: z.string(),
              location: z.string(),
            })
            .optional(),
          ofert: z
            .object({
              title: z.string(),
              description: z.string(),
              price: z.number(),
              condition: z.enum(["NEW", "USED", "UNKNOWN"]),
              image: z.string(),
              category: z.string(),
            })
            .optional(),
          poll: z
            .object({
              title: z.string(),
              description: z.string(),
              options: z.array(z.string()).min(2).max(10),
            })
            .optional(),
          post: z
            .object({
              title: z.string(),
              content: z.string(),
            })
            .optional(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { type, data } = input;

      const id = cuid();

      if (type === "poll") {
        if (!data.poll) {
          throw new Error("INVALID_DATA");
        }

        await ctx.prisma.$transaction([
          ctx.prisma.activity.create({
            data: {
              id,
              type,
            },
          }),
          ctx.prisma.poll.create({
            data: {
              id,
              title: data.poll.title,
              description: data.poll.description,
              options: {
                createMany: {
                  data: data.poll.options.map((option) => ({
                    title: option,
                  })),
                },
              },
              user: {
                connect: {
                  id: ctx.session.user.id,
                },
              },
            },
          }),
        ]);
      } else if (type === "ofert") {
        if (!data.ofert) {
          throw new Error("INVALID_DATA");
        }

        await ctx.prisma.$transaction([
          ctx.prisma.activity.create({
            data: {
              id,
              type,
            },
          }),
          ctx.prisma.ofert.create({
            data: {
              id,
              title: data.ofert.title,
              description: data.ofert.description,
              price: data.ofert.price,
              condition: data.ofert.condition,
              image: data.ofert.image,
              category: data.ofert.category,
              user: {
                connect: {
                  id: ctx.session.user.id,
                },
              },
            },
          }),
        ]);
      } else if (type === "event") {
        if (!data.event) {
          throw new Error("INVALID_DATA");
        }

        await ctx.prisma.$transaction([
          ctx.prisma.activity.create({
            data: {
              id,
              type,
            },
          }),
          ctx.prisma.event.create({
            data: {
              id,
              title: data.event.title,
              description: data.event.description,
              from: data.event.from,
              to: data.event.to,
              location: data.event.location,
              user: {
                connect: {
                  id: ctx.session.user.id,
                },
              },
            },
          }),
        ]);
      } else {
        if (!data.post) {
          throw new Error("INVALID_DATA");
        }

        await ctx.prisma.$transaction([
          ctx.prisma.activity.create({
            data: {
              id,
              type,
            },
          }),
          ctx.prisma.post.create({
            data: {
              id,
              title: data.post.title,
              content: data.post.content,
              user: {
                connect: {
                  id: ctx.session.user.id,
                },
              },
            },
          }),
        ]);
      }

      return {
        id,
      };
    }),
});
