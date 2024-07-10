/*
  Warnings:

  - You are about to drop the `UnitResponsible` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `city` to the `Unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsibleId` to the `Unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Unit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `UnitResponsible` DROP FOREIGN KEY `UnitResponsible_unitId_fkey`;

-- AlterTable
ALTER TABLE `Unit` ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `responsibleId` INTEGER NOT NULL,
    ADD COLUMN `state` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `UnitResponsible`;
