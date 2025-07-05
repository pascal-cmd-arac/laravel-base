import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Filter, Heart, ShoppingCart, Star } from 'lucide-react';
import { useState } from 'react';

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
}

interface Brand {
    id: number;
    name: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationMeta {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
}

interface Props {
    products: {
        data: Product[];
        links: PaginationLink[];
        meta: PaginationMeta;
    };
    categories: Category[];
    brands: Brand[];
    filters: {
        search?: string;
        category?: string;
        brand?: string;
        min_price?: string;
        max_price?: string;
        sort?: string;
        order?: string;
    };
}

export default function ProductsIndex({ products, categories, brands, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [showFilters, setShowFilters] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/products', { ...filters, search: searchTerm });
    };

    const handleFilter = (key: string, value: string) => {
        router.get('/products', { ...filters, [key]: value });
    };

    const handleSort = (sort: string, order: string) => {
        router.get('/products', { ...filters, sort, order });
    };

    const addToCart = (productId: number) => {
        router.post('/cart/add', {
            product_id: productId,
            quantity: 1,
        });
    };

    return (
        <AppLayout>
            <Head title="Products" />

            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="mb-4 text-3xl font-bold">Products</h1>

                    {/* Search and Filters */}
                    <div className="mb-6 flex flex-col gap-4 lg:flex-row">
                        <form onSubmit={handleSearch} className="flex-1">
                            <div className="flex gap-2">
                                <Input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="flex-1"
                                />
                                <Button type="submit">Search</Button>
                            </div>
                        </form>

                        <div className="flex gap-2">
                            <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
                                <Filter className="mr-2 h-4 w-4" />
                                Filters
                            </Button>

                            <Select
                                onValueChange={(value) => {
                                    const [sort, order] = value.split('-');
                                    handleSort(sort, order);
                                }}
                            >
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="name-asc">Name A-Z</SelectItem>
                                    <SelectItem value="name-desc">Name Z-A</SelectItem>
                                    <SelectItem value="price-asc">Price Low-High</SelectItem>
                                    <SelectItem value="price-desc">Price High-Low</SelectItem>
                                    <SelectItem value="created_at-desc">Newest First</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Filter Panel */}
                    {showFilters && (
                        <Card className="mb-6">
                            <CardContent className="p-6">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium">Category</label>
                                        <Select onValueChange={(value) => handleFilter('category', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="All Categories" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="">All Categories</SelectItem>
                                                {categories.map((category) => (
                                                    <SelectItem key={category.id} value={category.id.toString()}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium">Brand</label>
                                        <Select onValueChange={(value) => handleFilter('brand', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="All Brands" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="">All Brands</SelectItem>
                                                {brands.map((brand) => (
                                                    <SelectItem key={brand.id} value={brand.id.toString()}>
                                                        {brand.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium">Min Price</label>
                                        <Input type="number" placeholder="0" onChange={(e) => handleFilter('min_price', e.target.value)} />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium">Max Price</label>
                                        <Input type="number" placeholder="1000" onChange={(e) => handleFilter('max_price', e.target.value)} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.data.map((product) => (
                        <Card key={product.id} className="group transition-shadow hover:shadow-lg">
                            <CardHeader className="p-0">
                                <div className="relative overflow-hidden rounded-t-lg">
                                    <img
                                        src={product.images?.[0] || '/placeholder-product.jpg'}
                                        alt={product.name}
                                        className="h-48 w-full object-cover transition-transform group-hover:scale-105"
                                    />
                                    <div className="absolute top-2 right-2">
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
                                <Button className="w-full" onClick={() => addToCart(product.id)}>
                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                    Add to Cart
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {/* Pagination */}
                {products.links && (
                    <div className="mt-8 flex justify-center">
                        <div className="flex space-x-2">
                            {products.links.map((link, index) => (
                                <Button
                                    key={index}
                                    variant={link.active ? 'default' : 'outline'}
                                    size="sm"
                                    disabled={!link.url}
                                    onClick={() => link.url && router.visit(link.url)}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
