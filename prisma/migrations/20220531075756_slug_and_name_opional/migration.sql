/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `CoffeeShop` will be added. If there are existing duplicate values, this will fail.
  - Made the column `slug` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Category` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Category_slug_key";

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "slug" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CoffeeShop_name_key" ON "CoffeeShop"("name");
