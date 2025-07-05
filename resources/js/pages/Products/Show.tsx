import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { Heart, Minus, Plus, ShoppingCart, Star } from 'lucide-react';
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
                <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="aspect-square overflow-hidden rounded-lg border">
                            <img
                                src={images[selectedImage] || '/placeholder-product.jpg'}
                                alt={product.name}
                                className="h-full w-full object-cover"
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
                                        <img src={image} alt={`${product.name} ${index + 1}`} className="h-full w-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            {product.brand && <p className="mb-2 text-sm text-gray-500">{product.brand.name}</p>}
                            <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>

                            {/* Rating */}
                            <div className="mb-4 flex items-center space-x-2">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-5 w-5 ${i < Math.floor(averageRating) ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-500">
                                    {averageRating.toFixed(1)} ({reviewCount} reviews)
                                </span>
                            </div>

                            {/* Price */}
                            <div className="mb-4 flex items-center space-x-3">
                                <span className="text-3xl font-bold">${product.price}</span>
                                {product.compare_price && product.compare_price > product.price && (
                                    <>
                                        <span className="text-xl text-gray-500 line-through">${product.compare_price}</span>
                                        <Badge variant="destructive">Save ${(product.compare_price - product.price).toFixed(2)}</Badge>
                                    </>
                                )}
                            </div>

                            {/* Short Description */}
                            {product.short_description && <p className="mb-6 text-gray-600">{product.short_description}</p>}

                            {/* Stock Status */}
                            <div className="mb-6">
                                {product.in_stock ? (
                                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                                        In Stock ({product.stock_quantity} available)
                                    </Badge>
                                ) : (
                                    <Badge variant="destructive">Out of Stock</Badge>
                                )}
                            </div>

                            {/* Quantity and Add to Cart */}
                            {product.in_stock && (
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4">
                                        <label className="font-medium">Quantity:</label>
                                        <div className="flex items-center rounded-lg border">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                disabled={quantity <= 1}
                                            >
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                            <Input
                                                type="number"
                                                value={quantity}
                                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                                className="w-16 border-0 text-center"
                                                min="1"
                                                max={product.stock_quantity}
                                            />
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                                                disabled={quantity >= product.stock_quantity}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="flex space-x-4">
                                        <Button onClick={addToCart} className="flex-1">
                                            <ShoppingCart className="mr-2 h-4 w-4" />
                                            Add to Cart
                                        </Button>
                                        <Button variant="outline" onClick={addToWishlist}>
                                            <Heart className="h-4 w-4" />
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
                            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: product.description }} />
                        </CardContent>
                    </Card>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div>
                        <h2 className="mb-6 text-2xl font-bold">Related Products</h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {relatedProducts.map((relatedProduct) => (
                                <Card key={relatedProduct.id} className="group transition-shadow hover:shadow-lg">
                                    <CardHeader className="p-0">
                                        <div className="relative overflow-hidden rounded-t-lg">
                                            <img
                                                src={relatedProduct.images?.[0] || '/placeholder-product.jpg'}
                                                alt={relatedProduct.name}
                                                className="h-48 w-full object-cover transition-transform group-hover:scale-105"
                                            />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-4">
                                        <CardTitle className="mb-2 text-lg">
                                            <a href={`/products/${relatedProduct.slug}`} className="hover:text-blue-600">
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
