/*
  Warnings:

  - You are about to drop the column `address` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `point` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `customers` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reservation_date` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `vouchers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `vouchers` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `customers_email_key` ON `customers`;

-- AlterTable
ALTER TABLE `customers` DROP COLUMN `address`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `point`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `points` SMALLINT NOT NULL DEFAULT 0,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `employees` ADD COLUMN `address` VARCHAR(255) NOT NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `orders` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `reservations` ADD COLUMN `reservation_date` DATE NOT NULL;

-- AlterTable
ALTER TABLE `reviews` ADD COLUMN `status` VARCHAR(255) NOT NULL,
    MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `vouchers` ADD COLUMN `description` TEXT NOT NULL,
    ADD COLUMN `name` VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE `invoice_details` ADD CONSTRAINT `invoice_details_invoice_id_fkey` FOREIGN KEY (`invoice_id`) REFERENCES `invoices`(`invoice_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
