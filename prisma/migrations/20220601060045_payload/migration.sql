/*
  Warnings:

  - You are about to drop the column `title` on the `CoffeeShop` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "CoffeeShop_title_key";

-- AlterTable
ALTER TABLE "CoffeeShop" DROP COLUMN "title";
