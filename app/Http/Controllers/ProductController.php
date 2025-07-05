<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['category', 'brand', 'reviews'])
            ->active();

        // Search
        if ($request->search) {
            $query->where('name', 'like', '%'.$request->search.'%')
                ->orWhere('description', 'like', '%'.$request->search.'%');
        }

        // Category filter
        if ($request->category) {
            $query->where('category_id', $request->category);
        }

        // Brand filter
        if ($request->brand) {
            $query->where('brand_id', $request->brand);
        }

        // Price range filter
        if ($request->min_price) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->max_price) {
            $query->where('price', '<=', $request->max_price);
        }

        // Sorting
        $sortBy = $request->sort ?? 'name';
        $sortOrder = $request->order ?? 'asc';
        $query->orderBy($sortBy, $sortOrder);

        $products = $query->paginate(12);
        $categories = Category::active()->get();
        $brands = Brand::active()->get();

        return Inertia::render('Products/Index', [
            'products' => $products,
            'categories' => $categories,
            'brands' => $brands,
            'filters' => $request->only(['search', 'category', 'brand', 'min_price', 'max_price', 'sort', 'order']),
        ]);
    }

    public function show(Product $product)
    {
        $product->load(['category', 'brand', 'reviews.user']);

        $relatedProducts = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->active()
            ->limit(4)
            ->get();

        return Inertia::render('Products/Show', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
            'averageRating' => $product->average_rating,
            'reviewCount' => $product->review_count,
        ]);
    }
}
