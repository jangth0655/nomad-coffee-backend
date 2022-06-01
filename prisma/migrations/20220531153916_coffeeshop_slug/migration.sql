/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `CoffeeShop` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `CoffeeShop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CoffeeShop" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CoffeeShop_slug_key" ON "CoffeeShop"("slug");
