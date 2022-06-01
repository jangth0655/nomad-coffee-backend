/*
  Warnings:

  - Made the column `coffeeShopId` on table `CoffeeShopPhoto` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "CoffeeShopPhoto" DROP CONSTRAINT "CoffeeShopPhoto_coffeeShopId_fkey";

-- AlterTable
ALTER TABLE "CoffeeShopPhoto" ALTER COLUMN "coffeeShopId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "CoffeeShopPhoto" ADD CONSTRAINT "CoffeeShopPhoto_coffeeShopId_fkey" FOREIGN KEY ("coffeeShopId") REFERENCES "CoffeeShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
