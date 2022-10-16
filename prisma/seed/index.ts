import { PrismaClient } from "@prisma/client";
import { seedActivity } from "./activity";

const prisma = new PrismaClient();

async function main() {
  // await prisma.user.deleteMany();
  // await prisma.session.deleteMany();

  console.log("Seeding...");

  await seedActivity(prisma);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
