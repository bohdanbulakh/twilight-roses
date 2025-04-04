-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('INDIVIDUAL', 'COMMERCIAL');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT,
    "type" "UserType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "parent_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_categories" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_orders" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_tokens" (
    "token" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "email_tokens_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("token")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_categories_product_id_category_id_key" ON "product_categories"("product_id", "category_id");

-- CreateIndex
CREATE UNIQUE INDEX "product_orders_product_id_order_id_key" ON "product_orders"("product_id", "order_id");

-- CreateIndex
CREATE UNIQUE INDEX "email_tokens_email_key" ON "email_tokens"("email");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_user_id_key" ON "refresh_tokens"("user_id");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_orders" ADD CONSTRAINT "product_orders_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_orders" ADD CONSTRAINT "product_orders_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
