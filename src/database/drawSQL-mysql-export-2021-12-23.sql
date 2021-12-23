CREATE TABLE `users`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` INT NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `imagen` INT NOT NULL,
    `user_id` INT NOT NULL
);
ALTER TABLE
    `users` ADD PRIMARY KEY `users_id_primary`(`id`);
ALTER TABLE
    `users` ADD UNIQUE `users_user_id_unique`(`user_id`);
CREATE TABLE `products`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` INT NOT NULL,
    `description` INT NOT NULL,
    `price` INT NOT NULL,
    `quantity_S` INT NOT NULL,
    `quantity_M` INT NOT NULL,
    `quantity_L` INT NOT NULL,
    `image_1` INT NOT NULL,
    `image_2` INT NOT NULL,
    `image_3` INT NOT NULL,
    `category_id` INT NOT NULL,
    `material_id` INT NOT NULL,
    `comment_id` INT NOT NULL
);
ALTER TABLE
    `products` ADD PRIMARY KEY `products_id_primary`(`id`);
ALTER TABLE
    `products` ADD UNIQUE `products_category_id_unique`(`category_id`);
ALTER TABLE
    `products` ADD UNIQUE `products_material_id_unique`(`material_id`);
ALTER TABLE
    `products` ADD UNIQUE `products_comment_id_unique`(`comment_id`);
CREATE TABLE `categories`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `nombre` INT NOT NULL,
    `category_id` INT NOT NULL
);
ALTER TABLE
    `categories` ADD PRIMARY KEY `categories_id_primary`(`id`);
ALTER TABLE
    `categories` ADD UNIQUE `categories_category_id_unique`(`category_id`);
CREATE TABLE `comments`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `issue` INT NOT NULL,
    `content` INT NOT NULL,
    `created_at` DATE NOT NULL,
    `user_id` INT NOT NULL,
    `product_id` INT NOT NULL
);
ALTER TABLE
    `comments` ADD PRIMARY KEY `comments_id_primary`(`id`);
ALTER TABLE
    `comments` ADD UNIQUE `comments_user_id_unique`(`user_id`);
ALTER TABLE
    `comments` ADD UNIQUE `comments_product_id_unique`(`product_id`);
CREATE TABLE `materials`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `nombre` INT NOT NULL,
    `material_id` INT NOT NULL
);
ALTER TABLE
    `materials` ADD PRIMARY KEY `materials_id_primary`(`id`);
ALTER TABLE
    `materials` ADD UNIQUE `materials_material_id_unique`(`material_id`);
CREATE TABLE `product_category`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `created_at` INT NOT NULL,
    `updated_at` INT NOT NULL,
    `product_id` INT NOT NULL,
    `category_id` INT NOT NULL
);
ALTER TABLE
    `product_category` ADD PRIMARY KEY `product_category_id_primary`(`id`);
CREATE TABLE `user_product`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `created_at` INT NOT NULL,
    `updated_at` INT NOT NULL,
    `user_id` INT NOT NULL,
    `product_id` INT NOT NULL
);
ALTER TABLE
    `user_product` ADD PRIMARY KEY `user_product_id_primary`(`id`);
ALTER TABLE
    `user_product` ADD UNIQUE `user_product_user_id_unique`(`user_id`);
ALTER TABLE
    `user_product` ADD UNIQUE `user_product_product_id_unique`(`product_id`);
ALTER TABLE
    `users` ADD CONSTRAINT `users_first_name_foreign` FOREIGN KEY(`first_name`) REFERENCES `comments`(`id`);
ALTER TABLE
    `products` ADD CONSTRAINT `products_name_foreign` FOREIGN KEY(`name`) REFERENCES `comments`(`id`);
ALTER TABLE
    `products` ADD CONSTRAINT `products_name_foreign` FOREIGN KEY(`name`) REFERENCES `product_category`(`id`);
ALTER TABLE
    `categories` ADD CONSTRAINT `categories_nombre_foreign` FOREIGN KEY(`nombre`) REFERENCES `product_category`(`id`);
ALTER TABLE
    `users` ADD CONSTRAINT `users_email_foreign` FOREIGN KEY(`email`) REFERENCES `user_product`(`id`);