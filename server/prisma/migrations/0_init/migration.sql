-- CreateTable
CREATE TABLE `categories` (
    `category_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contents` (
    `content_id` INTEGER NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `slogan` VARCHAR(255) NULL,
    `description` TEXT NOT NULL,

    PRIMARY KEY (`content_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer_address` (
    `address_id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER NOT NULL,
    `address` VARCHAR(255) NOT NULL,

    INDEX `customer_id`(`customer_id`),
    PRIMARY KEY (`address_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer_level` (
    `level_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `discount` DECIMAL(2, 2) NOT NULL,
    `points` INTEGER NOT NULL,
    `benefits` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`level_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customers` (
    `customer_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `phone` CHAR(11) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `birthday` DATE NOT NULL,
    `point` SMALLINT NOT NULL,
    `level_id` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `customers_email_key`(`email`),
    INDEX `level_id`(`level_id`),
    PRIMARY KEY (`customer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employees` (
    `employee_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `gender` VARCHAR(50) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` CHAR(11) NOT NULL,
    `birthday` DATE NOT NULL,
    `position_id` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `is_admin` BOOLEAN NOT NULL DEFAULT false,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,

    INDEX `position_id`(`position_id`),
    PRIMARY KEY (`employee_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoice_details` (
    `invoice_detail_id` INTEGER NOT NULL AUTO_INCREMENT,
    `invoice_id` INTEGER NOT NULL,
    `item_id` INTEGER NOT NULL,
    `quantity` TINYINT NOT NULL,
    `unit_price` DECIMAL(10, 2) NOT NULL,
    `total_price` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`invoice_detail_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoices` (
    `invoice_id` INTEGER NOT NULL AUTO_INCREMENT,
    `invoice_time` DATE NOT NULL,
    `customer_id` INTEGER NOT NULL,
    `voucher_code` VARCHAR(255) NULL,
    `payment_method` VARCHAR(255) NOT NULL,
    `payment_status` VARCHAR(255) NOT NULL,
    `note` VARCHAR(255) NULL,

    INDEX `customer_id`(`customer_id`),
    PRIMARY KEY (`invoice_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menu` (
    `item_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `image` TEXT NOT NULL,
    `category_id` INTEGER NOT NULL,

    INDEX `category_id`(`category_id`),
    PRIMARY KEY (`item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_details` (
    `order_detail_id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` INTEGER NOT NULL,
    `item_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `unit_price` DECIMAL(10, 2) NOT NULL,
    `total_price` DECIMAL(10, 2) NOT NULL,

    UNIQUE INDEX `order_details_item_id_key`(`item_id`),
    INDEX `item_id`(`item_id`),
    INDEX `order_id`(`order_id`),
    PRIMARY KEY (`order_detail_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `order_id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER NOT NULL,
    `status` VARCHAR(255) NOT NULL,
    `shipping_address` VARCHAR(255) NOT NULL,
    `shipping_method` VARCHAR(255) NOT NULL,
    `shipping_cost` DECIMAL(10, 2) NOT NULL,
    `payment_method` VARCHAR(255) NOT NULL,
    `payment_status` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    INDEX `customer_id`(`customer_id`),
    PRIMARY KEY (`order_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `point_history` (
    `point_history_id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER NOT NULL,
    `order_id` INTEGER NULL,
    `voucher_id` INTEGER NULL,
    `points_earned` TINYINT NULL,
    `points_deducted` TINYINT NULL,
    `transaction_date` DATE NOT NULL,

    INDEX `customer_id`(`customer_id`),
    INDEX `order_id`(`order_id`),
    INDEX `voucher_id`(`voucher_id`),
    PRIMARY KEY (`point_history_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `positions` (
    `position_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `salary` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`position_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `promotions` (
    `promotion_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `target` VARCHAR(255) NOT NULL,
    `conditions` TEXT NOT NULL,
    `discount` DECIMAL(10, 2) NOT NULL,
    `status` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`promotion_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reservations` (
    `reservation_id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER NOT NULL,
    `table_id` INTEGER NOT NULL,
    `description` TEXT NOT NULL,
    `status` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `reservations_table_id_key`(`table_id`),
    INDEX `customer_id`(`customer_id`),
    INDEX `table_id`(`table_id`),
    PRIMARY KEY (`reservation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `revenue` (
    `revenue_id` INTEGER NOT NULL,
    `date` DATE NOT NULL,
    `revenue` DECIMAL(10, 2) NOT NULL,
    `cost` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`revenue_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviews` (
    `review_id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER NOT NULL,
    `content` TEXT NOT NULL,
    `rating` BOOLEAN NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `customer_id`(`customer_id`),
    PRIMARY KEY (`review_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tables` (
    `table_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `capacity` INTEGER NOT NULL,
    `status` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`table_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vouchers` (
    `voucher_id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER NOT NULL,
    `code` VARCHAR(255) NOT NULL,
    `discount` DECIMAL(10, 2) NOT NULL,
    `expire_date` DATE NOT NULL,
    `status` VARCHAR(255) NOT NULL,

    INDEX `customer_id`(`customer_id`),
    PRIMARY KEY (`voucher_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `customer_address` ADD CONSTRAINT `customer_address_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`customer_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `customers` ADD CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`level_id`) REFERENCES `customer_level`(`level_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `employees` ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`position_id`) REFERENCES `positions`(`position_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`customer_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `menu` ADD CONSTRAINT `menu_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories`(`category_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `menu` ADD CONSTRAINT `menu_ibfk_6` FOREIGN KEY (`item_id`) REFERENCES `order_details`(`item_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `order_details` ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `order_details` ADD CONSTRAINT `order_details_ibfk_4` FOREIGN KEY (`item_id`) REFERENCES `menu`(`item_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`customer_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `point_history` ADD CONSTRAINT `point_history_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`customer_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `point_history` ADD CONSTRAINT `point_history_ibfk_11` FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `point_history` ADD CONSTRAINT `point_history_ibfk_12` FOREIGN KEY (`voucher_id`) REFERENCES `vouchers`(`voucher_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`customer_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_ibfk_5` FOREIGN KEY (`table_id`) REFERENCES `tables`(`table_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`customer_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tables` ADD CONSTRAINT `tables_ibfk_1` FOREIGN KEY (`table_id`) REFERENCES `reservations`(`table_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `vouchers` ADD CONSTRAINT `vouchers_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`customer_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

