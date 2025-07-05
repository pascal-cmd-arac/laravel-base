import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart, Star } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    compare_price?: number;
    images?: string[];
    category?: {
        name: string;
    };
    brand?: {
        name: string;
    };
    average_rating: number;
    review_count: number;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    image?: string;
}

interface Props {
    featuredProducts: Product[];
    categories: Category[];
}

export default function Home({ featuredProducts, categories }: Props) {
    return (
        <AppLayout>
            <Head title="Home" />
            
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-6">Welcome to Our Store</h1>
                    <p className="text-xl mb-8">Discover amazing products at unbeatable prices</p>
                    <Link href="/products">
                        <Button size="lg" variant="secondary">
                            Shop Now
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/products?category=${category.id}`}
                                className="group"
                            >
                                <Card className="hover:shadow-lg transition-shadow">
                                    <CardContent className="p-6 text-center">
                                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-50">
                                            {category.image ? (
                                                <img
                                                    src={category.image}
                                                    alt={category.name}
                                                    className="w-10 h-10 object-cover rounded-full"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
                                            )}
                                        </div>
                                        <h3 className="font-semibold">{category.name}</h3>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredProducts.map((product) => (
                            <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                                <CardHeader className="p-0">
                                    <div className="relative overflow-hidden rounded-t-lg">
                                        <img
                                            src={product.images?.[0] || '/placeholder-product.jpg'}
                                            alt={product.name}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                                        />
                                        <div className="absolute top-2 right-2 space-y-2">
                                            <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                                                <Heart className="w-4 h-4" />
                                            </Button>
                                        </div>
                                        {product.compare_price && product.compare_price > product.price && (
                                            <Badge className="absolute top-2 left-2" variant="destructive">
                                                Sale
                                            </Badge>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <div className="space-y-2">
                                        {product.brand && (
                                            <p className="text-sm text-gray-500">{product.brand.name}</p>
                                        )}
                                        <CardTitle className="text-lg">
                                            <Link
                                                href={`/products/${product.slug}`}
                                                className="hover:text-blue-600"
                                            >
                                                {product.name}
                                            </Link>
                                        </CardTitle>
                                        <div className="flex items-center space-x-1">
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${
                                                            i < Math.floor(product.average_rating)
                                                                ? 'text-yellow-400 fill-current'
                                                                : 'text-gray-300'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-sm text-gray-500">
                                                ({product.review_count})
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xl font-bold">${product.price}</span>
                                            {product.compare_price && product.compare_price > product.price && (
                                                <span className="text-sm text-gray-500 line-through">
                                                    ${product.compare_price}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="p-4 pt-0">
                                    <Button className="w-full">
                                        <ShoppingCart className="w-4 h-4 mr-2" />
                                        Add to Cart
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Link href="/products">
                            <Button variant="outline" size="lg">
                                View All Products
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-16 bg-blue-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                    <p className="text-xl mb-8">Subscribe to our newsletter for the latest deals and updates</p>
                    <div className="max-w-md mx-auto flex space-x-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-2 rounded-lg text-gray-900"
                        />
                        <Button variant="secondary">Subscribe</Button>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
