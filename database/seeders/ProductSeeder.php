<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $electronics = Category::where('slug', 'electronics')->first();
        $smartphones = Category::where('slug', 'smartphones')->first();
        $laptops = Category::where('slug', 'laptops')->first();
        $clothing = Category::where('slug', 'clothing')->first();

        $apple = Brand::where('slug', 'apple')->first();
        $samsung = Brand::where('slug', 'samsung')->first();
        $nike = Brand::where('slug', 'nike')->first();
        $dell = Brand::where('slug', 'dell')->first();

        $products = [
            [
                'name' => 'iPhone 15 Pro',
                'slug' => 'iphone-15-pro',
                'description' => 'The latest iPhone with advanced features and powerful performance.',
                'short_description' => 'Latest iPhone with Pro features',
                'sku' => 'IPHONE-15-PRO',
                'price' => 999.99,
                'compare_price' => 1099.99,
                'cost_price' => 700.00,
                'stock_quantity' => 50,
                'category_id' => $smartphones->id,
                'brand_id' => $apple->id,
                'is_featured' => true,
                'is_active' => true,
                'status' => 'active',
                'weight' => 0.2,
                'images' => ['/images/iphone-15-pro.jpg'],
            ],
            [
                'name' => 'Samsung Galaxy S24',
                'slug' => 'samsung-galaxy-s24',
                'description' => 'Premium Android smartphone with excellent camera and display.',
                'short_description' => 'Premium Android smartphone',
                'sku' => 'GALAXY-S24',
                'price' => 899.99,
                'compare_price' => 999.99,
                'cost_price' => 600.00,
                'stock_quantity' => 30,
                'category_id' => $smartphones->id,
                'brand_id' => $samsung->id,
                'is_featured' => true,
                'is_active' => true,
                'status' => 'active',
                'weight' => 0.18,
                'images' => ['/images/galaxy-s24.jpg'],
            ],
            [
                'name' => 'MacBook Pro 16"',
                'slug' => 'macbook-pro-16',
                'description' => 'Powerful laptop for professionals with M3 chip and stunning display.',
                'short_description' => 'Professional laptop with M3 chip',
                'sku' => 'MBP-16-M3',
                'price' => 2499.99,
                'compare_price' => 2699.99,
                'cost_price' => 1800.00,
                'stock_quantity' => 15,
                'category_id' => $laptops->id,
                'brand_id' => $apple->id,
                'is_featured' => true,
                'is_active' => true,
                'status' => 'active',
                'weight' => 2.1,
                'images' => ['/images/macbook-pro-16.jpg'],
            ],
            [
                'name' => 'Dell XPS 13',
                'slug' => 'dell-xps-13',
                'description' => 'Compact and powerful ultrabook perfect for productivity.',
                'short_description' => 'Compact ultrabook for productivity',
                'sku' => 'XPS-13-2024',
                'price' => 1299.99,
                'cost_price' => 900.00,
                'stock_quantity' => 25,
                'category_id' => $laptops->id,
                'brand_id' => $dell->id,
                'is_featured' => false,
                'is_active' => true,
                'status' => 'active',
                'weight' => 1.2,
                'images' => ['/images/dell-xps-13.jpg'],
            ],
            [
                'name' => 'Nike Air Max 270',
                'slug' => 'nike-air-max-270',
                'description' => 'Comfortable running shoes with excellent cushioning.',
                'short_description' => 'Comfortable running shoes',
                'sku' => 'NIKE-AM-270',
                'price' => 149.99,
                'compare_price' => 179.99,
                'cost_price' => 80.00,
                'stock_quantity' => 100,
                'category_id' => $clothing->id,
                'brand_id' => $nike->id,
                'is_featured' => true,
                'is_active' => true,
                'status' => 'active',
                'weight' => 0.8,
                'images' => ['/images/nike-air-max-270.jpg'],
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
