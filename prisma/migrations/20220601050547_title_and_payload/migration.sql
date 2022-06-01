/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `CoffeeShop` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `payload` to the `CoffeeShop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `CoffeeShop` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "CoffeeShop_name_key";

-- AlterTable
ALTER TABLE "CoffeeShop" ADD COLUMN     "payload" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CoffeeShop_title_key" ON "CoffeeShop"("title");
