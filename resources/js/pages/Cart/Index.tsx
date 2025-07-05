import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface CartItem {
    id: number;
    quantity: number;
    price: number;
    product: {
        id: number;
        name: string;
        slug: string;
        images?: string[];
        stock_quantity: number;
    };
}

interface Cart {
    id: number;
    items: CartItem[];
}

interface Props {
    cart: Cart | null;
    total: number;
    itemCount: number;
}

export default function CartIndex({ cart, total, itemCount }: Props) {
    const [updatingItems, setUpdatingItems] = useState<Set<number>>(new Set());

    const updateQuantity = (itemId: number, newQuantity: number) => {
        if (newQuantity < 1) return;

        setUpdatingItems((prev) => new Set(prev).add(itemId));

        router.patch(
            `/cart/${itemId}`,
            {
                quantity: newQuantity,
            },
            {
                onFinish: () => {
                    setUpdatingItems((prev) => {
                        const newSet = new Set(prev);
                        newSet.delete(itemId);
                        return newSet;
                    });
                },
            },
        );
    };

    const removeItem = (itemId: number) => {
        router.delete(`/cart/${itemId}`);
    };

    const clearCart = () => {
        if (confirm('Are you sure you want to clear your cart?')) {
            router.delete('/cart');
        }
    };

    if (!cart || cart.items.length === 0) {
        return (
            <AppLayout>
                <Head title="Shopping Cart" />

                <div className="container mx-auto px-4 py-8">
                    <div className="py-16 text-center">
                        <ShoppingCart className="mx-auto mb-4 h-24 w-24 text-gray-300" />
                        <h1 className="mb-4 text-3xl font-bold">Your cart is empty</h1>
                        <p className="mb-8 text-gray-600">Looks like you haven't added any items to your cart yet.</p>
                        <Link href="/products">
                            <Button size="lg">Continue Shopping</Button>
                        </Link>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <Head title="Shopping Cart" />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Shopping Cart</h1>
                    <Button variant="outline" onClick={clearCart}>
                        Clear Cart
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Cart Items */}
                    <div className="space-y-4 lg:col-span-2">
                        {cart.items.map((item) => (
                            <Card key={item.id}>
                                <CardContent className="p-6">
                                    <div className="flex items-center space-x-4">
                                        {/* Product Image */}
                                        <div className="h-20 w-20 flex-shrink-0">
                                            <img
                                                src={item.product.images?.[0] || '/placeholder-product.jpg'}
                                                alt={item.product.name}
                                                className="h-full w-full rounded-lg object-cover"
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="min-w-0 flex-1">
                                            <h3 className="text-lg font-semibold">
                                                <Link href={`/products/${item.product.slug}`} className="hover:text-blue-600">
                                                    {item.product.name}
                                                </Link>
                                            </h3>
                                            <p className="text-gray-600">${item.price.toFixed(2)} each</p>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                disabled={item.quantity <= 1 || updatingItems.has(item.id)}
                                            >
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                            <Input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => {
                                                    const newQuantity = parseInt(e.target.value) || 1;
                                                    if (newQuantity !== item.quantity) {
                                                        updateQuantity(item.id, newQuantity);
                                                    }
                                                }}
                                                className="w-16 text-center"
                                                min="1"
                                                max={item.product.stock_quantity}
                                                disabled={updatingItems.has(item.id)}
                                            />
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                disabled={item.quantity >= item.product.stock_quantity || updatingItems.has(item.id)}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        {/* Item Total */}
                                        <div className="text-right">
                                            <p className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>

                                        {/* Remove Button */}
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => removeItem(item.id)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div>
                        <Card className="sticky top-4">
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Items ({itemCount})</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>$10.00</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>${(total * 0.1).toFixed(2)}</span>
                                </div>

                                <Separator />

                                <div className="flex justify-between text-lg font-semibold">
                                    <span>Total</span>
                                    <span>${(total + 10 + total * 0.1).toFixed(2)}</span>
                                </div>

                                <div className="space-y-3 pt-4">
                                    <Link href="/checkout">
                                        <Button className="w-full" size="lg">
                                            Proceed to Checkout
                                        </Button>
                                    </Link>

                                    <Link href="/products">
                                        <Button variant="outline" className="w-full">
                                            Continue Shopping
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
