<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Electronics',
                'slug' => 'electronics',
                'description' => 'Electronic devices and gadgets',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Clothing',
                'slug' => 'clothing',
                'description' => 'Fashion and apparel',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Home & Garden',
                'slug' => 'home-garden',
                'description' => 'Home improvement and garden supplies',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Sports & Outdoors',
                'slug' => 'sports-outdoors',
                'description' => 'Sports equipment and outdoor gear',
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'Books',
                'slug' => 'books',
                'description' => 'Books and literature',
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'name' => 'Health & Beauty',
                'slug' => 'health-beauty',
                'description' => 'Health and beauty products',
                'is_active' => true,
                'sort_order' => 6,
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }

        // Create subcategories
        $electronics = Category::where('slug', 'electronics')->first();
        $subcategories = [
            [
                'name' => 'Smartphones',
                'slug' => 'smartphones',
                'parent_id' => $electronics->id,
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Laptops',
                'slug' => 'laptops',
                'parent_id' => $electronics->id,
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Headphones',
                'slug' => 'headphones',
                'parent_id' => $electronics->id,
                'is_active' => true,
                'sort_order' => 3,
            ],
        ];

        foreach ($subcategories as $subcategory) {
            Category::create($subcategory);
        }
    }
}
