import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Heart, Star, Plus, Minus } from 'lucide-react';
import { useState } from 'react';

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    short_description?: string;
    price: number;
    compare_price?: number;
    images?: string[];
    gallery?: string[];
    category?: {
        name: string;
    };
    brand?: {
        name: string;
    };
    stock_quantity: number;
    in_stock: boolean;
}

interface Review {
    id: number;
    rating: number;
    title?: string;
    comment?: string;
    user: {
        name: string;
    };
    created_at: string;
}

interface Props {
    product: Product;
    relatedProducts: Product[];
    averageRating: number;
    reviewCount: number;
}

export default function ProductShow({ product, relatedProducts, averageRating, reviewCount }: Props) {
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);

    const images = product.gallery || product.images || [];

    const addToCart = () => {
        router.post('/cart/add', {
            product_id: product.id,
            quantity: quantity,
        });
    };

    const addToWishlist = () => {
        router.post('/wishlist/add', {
            product_id: product.id,
        });
    };

    return (
        <AppLayout>
            <Head title={product.name} />
            
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="aspect-square overflow-hidden rounded-lg border">
                            <img
                                src={images[selectedImage] || '/placeholder-product.jpg'}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {images.length > 1 && (
                            <div className="grid grid-cols-4 gap-2">
                                {images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`aspect-square overflow-hidden rounded border-2 ${
                                            selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                                        }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            {product.brand && (
                                <p className="text-sm text-gray-500 mb-2">{product.brand.name}</p>
                            )}
                            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                            
                            {/* Rating */}
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${
                                                i < Math.floor(averageRating)
                                                    ? 'text-yellow-400 fill-current'
                                                    : 'text-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-500">
                                    {averageRating.toFixed(1)} ({reviewCount} reviews)
                                </span>
                            </div>

                            {/* Price */}
                            <div className="flex items-center space-x-3 mb-4">
                                <span className="text-3xl font-bold">${product.price}</span>
                                {product.compare_price && product.compare_price > product.price && (
                                    <>
                                        <span className="text-xl text-gray-500 line-through">
                                            ${product.compare_price}
                                        </span>
                                        <Badge variant="destructive">
                                            Save ${(product.compare_price - product.price).toFixed(2)}
                                        </Badge>
                                    </>
                                )}
                            </div>

                            {/* Short Description */}
                            {product.short_description && (
                                <p className="text-gray-600 mb-6">{product.short_description}</p>
                            )}

                            {/* Stock Status */}
                            <div className="mb-6">
                                {product.in_stock ? (
                                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                                        In Stock ({product.stock_quantity} available)
                                    </Badge>
                                ) : (
                                    <Badge variant="destructive">
                                        Out of Stock
                                    </Badge>
                                )}
                            </div>

                            {/* Quantity and Add to Cart */}
                            {product.in_stock && (
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4">
                                        <label className="font-medium">Quantity:</label>
                                        <div className="flex items-center border rounded-lg">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                disabled={quantity <= 1}
                                            >
                                                <Minus className="w-4 h-4" />
                                            </Button>
                                            <Input
                                                type="number"
                                                value={quantity}
                                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                                className="w-16 text-center border-0"
                                                min="1"
                                                max={product.stock_quantity}
                                            />
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                                                disabled={quantity >= product.stock_quantity}
                                            >
                                                <Plus className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="flex space-x-4">
                                        <Button onClick={addToCart} className="flex-1">
                                            <ShoppingCart className="w-4 h-4 mr-2" />
                                            Add to Cart
                                        </Button>
                                        <Button variant="outline" onClick={addToWishlist}>
                                            <Heart className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Product Description */}
                <div className="mb-12">
                    <Card>
                        <CardHeader>
                            <CardTitle>Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div 
                                className="prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: product.description }}
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((relatedProduct) => (
                                <Card key={relatedProduct.id} className="group hover:shadow-lg transition-shadow">
                                    <CardHeader className="p-0">
                                        <div className="relative overflow-hidden rounded-t-lg">
                                            <img
                                                src={relatedProduct.images?.[0] || '/placeholder-product.jpg'}
                                                alt={relatedProduct.name}
                                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                                            />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-4">
                                        <CardTitle className="text-lg mb-2">
                                            <a
                                                href={`/products/${relatedProduct.slug}`}
                                                className="hover:text-blue-600"
                                            >
                                                {relatedProduct.name}
                                            </a>
                                        </CardTitle>
                                        <p className="text-xl font-bold">${relatedProduct.price}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
