/*
  Warnings:

  - Added the required column `phone_number` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderMethod" AS ENUM ('CASH_ON', 'PREPAID');

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "order_method" "OrderMethod" NOT NULL DEFAULT 'CASH_ON',
ADD COLUMN     "phone_number" TEXT NOT NULL;
