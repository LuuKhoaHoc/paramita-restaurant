/*
  Warnings:

  - You are about to alter the column `discount` on the `customer_level` table. The data in that column could be lost. The data in that column will be cast from `Decimal(2,2)` to `TinyInt`.
  - You are about to drop the column `voucher_code` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `shipping_address` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `shipping_cost` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `shipping_method` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `reservations` table. All the data in the column will be lost.
  - You are about to drop the column `expire_date` on the `vouchers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `customers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `customers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[voucher_id]` on the table `invoices` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[voucher_id]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tsid` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tsid` to the `contents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tsid` to the `customer_address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tsid` to the `customer_level` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tsid` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tsid` to the `employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tsid` to the `invoice_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_price` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tsid` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tsid` to the `menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tsid` to the `order_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delivery_address` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_price` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transport_fee` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tsid` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tsid` to the `point_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `positions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tsid` to the `positions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tsid` to the `promotions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `capacity` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reservation_time` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tsid` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tsid` to the `revenue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tsid` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tsid` to the `tables` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expired_date` to the `vouchers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max_discount` to the `vouchers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `min_spend` to the `vouchers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tsid` to the `vouchers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `invoices` DROP FOREIGN KEY `invoices_ibfk_1`;

-- DropForeignKey
ALTER TABLE `menu` DROP FOREIGN KEY `menu_ibfk_1`;

-- DropForeignKey
ALTER TABLE `menu` DROP FOREIGN KEY `menu_ibfk_6`;

-- DropForeignKey
ALTER TABLE `order_details` DROP FOREIGN KEY `order_details_ibfk_1`;

-- DropForeignKey
ALTER TABLE `order_details` DROP FOREIGN KEY `order_details_ibfk_4`;

-- DropForeignKey
ALTER TABLE `reservations` DROP FOREIGN KEY `reservations_ibfk_1`;

-- DropForeignKey
ALTER TABLE `reservations` DROP FOREIGN KEY `reservations_ibfk_5`;

-- DropForeignKey
ALTER TABLE `tables` DROP FOREIGN KEY `tables_ibfk_1`;

-- AlterTable
ALTER TABLE `categories` ADD COLUMN `tsid` VARCHAR(13) NOT NULL,
    MODIFY `category_id` INTEGER NOT NULL AUTO_INCREMENT;

-- AlterTable
ALTER TABLE `contents` ADD COLUMN `image` TEXT NULL,
    ADD COLUMN `page_id` INTEGER NULL,
    ADD COLUMN `position` TINYINT NULL,
    ADD COLUMN `tsid` VARCHAR(13) NOT NULL,
    MODIFY `content_id` INTEGER NOT NULL AUTO_INCREMENT;

-- AlterTable
ALTER TABLE `customer_address` ADD COLUMN `tsid` VARCHAR(13) NOT NULL;

-- AlterTable
ALTER TABLE `customer_level` ADD COLUMN `tsid` VARCHAR(13) NOT NULL,
    MODIFY `level_id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `discount` TINYINT NOT NULL;

-- AlterTable
ALTER TABLE `customers` ADD COLUMN `resetPin` VARCHAR(4) NULL,
    ADD COLUMN `resetPinRequestedAt` DATETIME(3) NULL,
    ADD COLUMN `tsid` VARCHAR(13) NOT NULL,
    MODIFY `name` VARCHAR(255) NULL,
    MODIFY `phone` CHAR(11) NULL,
    MODIFY `birthday` DATE NULL,
    MODIFY `level_id` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `employees` ADD COLUMN `image` TEXT NULL,
    ADD COLUMN `tsid` VARCHAR(13) NOT NULL,
    MODIFY `birthday` DATE NULL;

-- AlterTable
ALTER TABLE `invoice_details` ADD COLUMN `tsid` VARCHAR(13) NOT NULL;

-- AlterTable
ALTER TABLE `invoices` DROP COLUMN `voucher_code`,
    ADD COLUMN `total_price` FLOAT NOT NULL,
    ADD COLUMN `tsid` VARCHAR(13) NOT NULL,
    ADD COLUMN `voucher_id` INTEGER NULL,
    MODIFY `invoice_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `customer_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `menu` ADD COLUMN `tsid` VARCHAR(13) NOT NULL;

-- AlterTable
ALTER TABLE `order_details` ADD COLUMN `tsid` VARCHAR(13) NOT NULL;

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `shipping_address`,
    DROP COLUMN `shipping_cost`,
    DROP COLUMN `shipping_method`,
    ADD COLUMN `delivery_address` VARCHAR(255) NOT NULL,
    ADD COLUMN `note` TEXT NULL,
    ADD COLUMN `total_price` FLOAT NOT NULL,
    ADD COLUMN `transport_fee` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `tsid` VARCHAR(13) NOT NULL,
    ADD COLUMN `voucher_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `point_history` ADD COLUMN `invoice_id` INTEGER NULL,
    ADD COLUMN `tsid` VARCHAR(13) NOT NULL;

-- AlterTable
ALTER TABLE `positions` ADD COLUMN `description` TEXT NOT NULL,
    ADD COLUMN `tsid` VARCHAR(13) NOT NULL,
    MODIFY `position_id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `salary` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `promotions` ADD COLUMN `tsid` VARCHAR(13) NOT NULL,
    MODIFY `promotion_id` INTEGER NOT NULL AUTO_INCREMENT;

-- AlterTable
ALTER TABLE `reservations` DROP COLUMN `description`,
    ADD COLUMN `capacity` TINYINT NOT NULL,
    ADD COLUMN `email` VARCHAR(255) NOT NULL,
    ADD COLUMN `name` VARCHAR(255) NOT NULL,
    ADD COLUMN `note` TEXT NULL,
    ADD COLUMN `phone` CHAR(11) NOT NULL,
    ADD COLUMN `reservation_time` VARCHAR(255) NOT NULL,
    ADD COLUMN `tsid` VARCHAR(13) NOT NULL,
    MODIFY `customer_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `revenue` ADD COLUMN `tsid` VARCHAR(13) NOT NULL,
    MODIFY `revenue_id` INTEGER NOT NULL AUTO_INCREMENT;

-- AlterTable
ALTER TABLE `reviews` ADD COLUMN `tsid` VARCHAR(13) NOT NULL;

-- AlterTable
ALTER TABLE `tables` ADD COLUMN `tsid` VARCHAR(13) NOT NULL,
    MODIFY `table_id` INTEGER NOT NULL AUTO_INCREMENT;

-- AlterTable
ALTER TABLE `vouchers` DROP COLUMN `expire_date`,
    ADD COLUMN `expired_date` VARCHAR(255) NOT NULL,
    ADD COLUMN `max_discount` INTEGER NOT NULL,
    ADD COLUMN `min_spend` INTEGER NOT NULL,
    ADD COLUMN `tsid` VARCHAR(13) NOT NULL;

-- CreateTable
CREATE TABLE `pages` (
    `page_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `pages_name_key`(`name`),
    PRIMARY KEY (`page_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `contents_page_id_fkey` ON `contents`(`page_id`);

-- CreateIndex
CREATE UNIQUE INDEX `customers_email_key` ON `customers`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `customers_username_key` ON `customers`(`username`);

-- CreateIndex
CREATE UNIQUE INDEX `invoices_voucher_id_key` ON `invoices`(`voucher_id`);

-- CreateIndex
CREATE UNIQUE INDEX `orders_voucher_id_key` ON `orders`(`voucher_id`);

-- CreateIndex
CREATE INDEX `invoice_id` ON `point_history`(`invoice_id`);

-- AddForeignKey
ALTER TABLE `contents` ADD CONSTRAINT `contents_page_id_fkey` FOREIGN KEY (`page_id`) REFERENCES `pages`(`page_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`customer_id`) ON DELETE SET NULL ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_voucher_id_fkey` FOREIGN KEY (`voucher_id`) REFERENCES `vouchers`(`voucher_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `menu` ADD CONSTRAINT `menu_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_details` ADD CONSTRAINT `order_details_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `menu`(`item_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_details` ADD CONSTRAINT `order_details_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_voucher_id_fkey` FOREIGN KEY (`voucher_id`) REFERENCES `vouchers`(`voucher_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `point_history` ADD CONSTRAINT `point_history_ibfk_13` FOREIGN KEY (`invoice_id`) REFERENCES `invoices`(`invoice_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`customer_id`) ON DELETE SET NULL ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_table_id_fkey` FOREIGN KEY (`table_id`) REFERENCES `tables`(`table_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
