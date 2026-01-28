-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PREPARING', 'DELIVERED', 'CANCELLED');

-- CreateTable
CREATE TABLE "provide_profile" (
    "id" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "restaurant_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "provide_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodCategory" (
    "id" TEXT NOT NULL,
    "category_name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "food_meal" (
    "id" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "meal_name" TEXT NOT NULL,
    "image_url" TEXT,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "is_available" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "food_meal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "order_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "delivery_address" TEXT NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,
    "order_status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "meal_id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "meal_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "rating" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "food_meal_provider_id_idx" ON "food_meal"("provider_id");

-- CreateIndex
CREATE INDEX "food_meal_category_id_idx" ON "food_meal"("category_id");

-- CreateIndex
CREATE INDEX "order_customer_id_idx" ON "order"("customer_id");

-- CreateIndex
CREATE INDEX "order_items_order_id_idx" ON "order_items"("order_id");

-- CreateIndex
CREATE INDEX "order_items_meal_id_idx" ON "order_items"("meal_id");

-- CreateIndex
CREATE INDEX "reviews_meal_id_idx" ON "reviews"("meal_id");

-- CreateIndex
CREATE INDEX "reviews_customer_id_idx" ON "reviews"("customer_id");

-- AddForeignKey
ALTER TABLE "provide_profile" ADD CONSTRAINT "provide_profile_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_meal" ADD CONSTRAINT "food_meal_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_meal" ADD CONSTRAINT "food_meal_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "FoodCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("order_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "food_meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "food_meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
