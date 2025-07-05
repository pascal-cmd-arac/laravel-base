import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Heart, ShoppingCart, Star } from 'lucide-react';

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
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="mb-6 text-5xl font-bold">Welcome to Our Store</h1>
                    <p className="mb-8 text-xl">Discover amazing products at unbeatable prices</p>
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
                    <h2 className="mb-12 text-center text-3xl font-bold">Shop by Category</h2>
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
                        {categories.map((category) => (
                            <Link key={category.id} href={`/products?category=${category.id}`} className="group">
                                <Card className="transition-shadow hover:shadow-lg">
                                    <CardContent className="p-6 text-center">
                                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 group-hover:bg-blue-50">
                                            {category.image ? (
                                                <img src={category.image} alt={category.name} className="h-10 w-10 rounded-full object-cover" />
                                            ) : (
                                                <div className="h-10 w-10 rounded-full bg-blue-500"></div>
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
            <section className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="mb-12 text-center text-3xl font-bold">Featured Products</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {featuredProducts.map((product) => (
                            <Card key={product.id} className="group transition-shadow hover:shadow-lg">
                                <CardHeader className="p-0">
                                    <div className="relative overflow-hidden rounded-t-lg">
                                        <img
                                            src={product.images?.[0] || '/placeholder-product.jpg'}
                                            alt={product.name}
                                            className="h-48 w-full object-cover transition-transform group-hover:scale-105"
                                        />
                                        <div className="absolute top-2 right-2 space-y-2">
                                            <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                                                <Heart className="h-4 w-4" />
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
                                        {product.brand && <p className="text-sm text-gray-500">{product.brand.name}</p>}
                                        <CardTitle className="text-lg">
                                            <Link href={`/products/${product.slug}`} className="hover:text-blue-600">
                                                {product.name}
                                            </Link>
                                        </CardTitle>
                                        <div className="flex items-center space-x-1">
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-4 w-4 ${
                                                            i < Math.floor(product.average_rating) ? 'fill-current text-yellow-400' : 'text-gray-300'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-sm text-gray-500">({product.review_count})</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xl font-bold">${product.price}</span>
                                            {product.compare_price && product.compare_price > product.price && (
                                                <span className="text-sm text-gray-500 line-through">${product.compare_price}</span>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="p-4 pt-0">
                                    <Button className="w-full">
                                        <ShoppingCart className="mr-2 h-4 w-4" />
                                        Add to Cart
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                    <div className="mt-12 text-center">
                        <Link href="/products">
                            <Button variant="outline" size="lg">
                                View All Products
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="bg-blue-600 py-16 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-4 text-3xl font-bold">Stay Updated</h2>
                    <p className="mb-8 text-xl">Subscribe to our newsletter for the latest deals and updates</p>
                    <div className="mx-auto flex max-w-md space-x-4">
                        <input type="email" placeholder="Enter your email" className="flex-1 rounded-lg px-4 py-2 text-gray-900" />
                        <Button variant="secondary">Subscribe</Button>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
