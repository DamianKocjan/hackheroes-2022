/*
  Warnings:

  - The values [FUNNY] on the enum `InteractionType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "InteractionType_new" AS ENUM ('LIKE', 'HAHA', 'SAD', 'ANGRY', 'LOVE', 'WOW');
ALTER TABLE "Interaction" ALTER COLUMN "type" TYPE "InteractionType_new" USING ("type"::text::"InteractionType_new");
ALTER TYPE "InteractionType" RENAME TO "InteractionType_old";
ALTER TYPE "InteractionType_new" RENAME TO "InteractionType";
DROP TYPE "InteractionType_old";
COMMIT;
