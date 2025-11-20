/*
  Warnings:

  - You are about to drop the column `order` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Size" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "order",
ADD COLUMN     "sizes" "Size" NOT NULL DEFAULT 'LARGE';

-- DropTable
DROP TABLE "Service";
