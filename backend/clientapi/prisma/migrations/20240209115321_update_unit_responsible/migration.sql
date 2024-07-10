/*
  Warnings:

  - You are about to drop the column `responsibleId` on the `Unit` table. All the data in the column will be lost.
  - Added the required column `responsible` to the `Unit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Unit` DROP COLUMN `responsibleId`,
    ADD COLUMN `responsible` VARCHAR(191) NOT NULL;
