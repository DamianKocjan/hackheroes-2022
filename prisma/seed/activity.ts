import type { PrismaClient } from "@prisma/client";
import cuid from "cuid";
import { randomCondition } from "./utils";

const COMMENTS_TO_CREATE = 5;

async function createComments(
  prisma: PrismaClient,
  userId: string,
  model: "post" | "ofert" | "event" | "poll",
  modelId: string
) {
  const comments = await prisma.comment.createMany({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    data: Array.from({ length: COMMENTS_TO_CREATE }).map(() => ({
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nunc nisl ultricies nunc, ut aliquam massa nunc eget nisl. Sed euismod, nisl nec ultricies lacinia, nunc nisl ultricies nunc, ut aliquam massa nunc eget nisl.",
      userId,
      [`${model}Id`]: modelId,
    })),
  });

  console.log("Created comments", comments);
}

async function createActivityPost(prisma: PrismaClient, userId: string) {
  const postId = cuid();
  const posts = await prisma.$transaction([
    prisma.post.create({
      data: {
        id: postId,
        title: "My first post",
        content: "Hello world",
        user: {
          connect: {
            id: userId,
          },
        },
      },
    }),
    prisma.activity.create({ data: { id: postId, type: "post" } }),
  ]);
  await createComments(prisma, userId, "post", postId);

  console.log("Created post", posts[0]);
}

async function createActivityOfert(prisma: PrismaClient, userId: string) {
  const ofertId = cuid();
  const oferts = await prisma.$transaction([
    prisma.ofert.create({
      data: {
        id: ofertId,
        title: `${ofertId} - ofert title`,
        description:
          "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
        condition: randomCondition(),
        price: 100,
        category: "ELECTRONICS",
        image: {
          create: {},
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    }),
    prisma.activity.create({ data: { id: ofertId, type: "ofert" } }),
  ]);
  await createComments(prisma, userId, "ofert", ofertId);

  console.log("Created ofert", oferts[0]);
}

async function createActivityEvent(prisma: PrismaClient, userId: string) {
  const eventId = cuid();
  const events = await prisma.$transaction([
    prisma.event.create({
      data: {
        id: eventId,
        title: `${eventId} - event title`,
        description:
          "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
        from: new Date(),
        to: new Date(+new Date() + 1000 * 60 * 60 * 24),
        location: "Calle 1, 2, 3",
        user: {
          connect: {
            id: userId,
          },
        },
      },
    }),
    prisma.activity.create({ data: { id: eventId, type: "event" } }),
  ]);
  await createComments(prisma, userId, "event", eventId);

  console.log("Created event", events[0]);
}

async function createActivityPoll(prisma: PrismaClient, userId: string) {
  const pollId = cuid();
  const polls = await prisma.$transaction([
    prisma.poll.create({
      data: {
        id: pollId,
        title: `${pollId} - poll title`,
        description:
          "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
        options: {
          createMany: {
            data: [
              {
                title: "Option 1",
              },
              {
                title: "Option 2",
              },
            ],
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    }),
    prisma.activity.create({ data: { id: pollId, type: "poll" } }),
  ]);
  await createComments(prisma, userId, "poll", pollId);

  console.log("Created poll", polls[0]);
}

const NUMBER_OF_EACH_ACTIVITIES = 10;

export async function seedActivity(prisma: PrismaClient) {
  const users = await prisma.user.findMany({
    take: 1,
  });

  const user = users[0];
  if (!user) {
    throw new Error("No user found");
  }

  for (let i = 0; i < NUMBER_OF_EACH_ACTIVITIES; i++) {
    await createActivityPost(prisma, user.id);
    await createActivityOfert(prisma, user.id);
    await createActivityEvent(prisma, user.id);
    await createActivityPoll(prisma, user.id);
  }
}
