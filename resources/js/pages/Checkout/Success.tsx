import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Package, MapPin, CreditCard } from 'lucide-react';

interface OrderItem {
    id: number;
    product_name: string;
    product_sku: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    product: {
        slug: string;
        images?: string[];
    };
}

interface Order {
    id: number;
    order_number: string;
    status: string;
    payment_status: string;
    subtotal: number;
    tax_amount: number;
    shipping_amount: number;
    discount_amount: number;
    total_amount: number;
    billing_address: {
        first_name: string;
        last_name: string;
        address_line_1: string;
        address_line_2?: string;
        city: string;
        state: string;
        postal_code: string;
        country: string;
    };
    shipping_address: {
        first_name: string;
        last_name: string;
        address_line_1: string;
        address_line_2?: string;
        city: string;
        state: string;
        postal_code: string;
        country: string;
    };
    payment_method: string;
    created_at: string;
    items: OrderItem[];
}

interface Props {
    order: Order;
}

export default function CheckoutSuccess({ order }: Props) {
    return (
        <AppLayout>
            <Head title="Order Confirmation" />
            
            <div className="container mx-auto px-4 py-8">
                {/* Success Header */}
                <div className="text-center mb-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-green-600 mb-2">Order Confirmed!</h1>
                    <p className="text-gray-600">
                        Thank you for your order. We'll send you a confirmation email shortly.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Order Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Order Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span className="flex items-center">
                                        <Package className="w-5 h-5 mr-2" />
                                        Order #{order.order_number}
                                    </span>
                                    <div className="flex space-x-2">
                                        <Badge className="bg-green-100 text-green-800">
                                            {order.status}
                                        </Badge>
                                        <Badge variant="secondary">
                                            {order.payment_status}
                                        </Badge>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600">
                                    Order placed on {new Date(order.created_at).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Payment method: {order.payment_method.replace('_', ' ').toUpperCase()}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Order Items */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Items</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                                            <img
                                                src={item.product.images?.[0] || '/placeholder-product.jpg'}
                                                alt={item.product_name}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-medium">{item.product_name}</h3>
                                                <p className="text-sm text-gray-500">SKU: {item.product_sku}</p>
                                                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium">${item.total_price.toFixed(2)}</p>
                                                <p className="text-sm text-gray-500">${item.unit_price.toFixed(2)} each</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Addresses */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <MapPin className="w-5 h-5 mr-2" />
                                        Billing Address
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-sm">
                                        <p>{order.billing_address.first_name} {order.billing_address.last_name}</p>
                                        <p>{order.billing_address.address_line_1}</p>
                                        {order.billing_address.address_line_2 && (
                                            <p>{order.billing_address.address_line_2}</p>
                                        )}
                                        <p>
                                            {order.billing_address.city}, {order.billing_address.state} {order.billing_address.postal_code}
                                        </p>
                                        <p>{order.billing_address.country}</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Package className="w-5 h-5 mr-2" />
                                        Shipping Address
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-sm">
                                        <p>{order.shipping_address.first_name} {order.shipping_address.last_name}</p>
                                        <p>{order.shipping_address.address_line_1}</p>
                                        {order.shipping_address.address_line_2 && (
                                            <p>{order.shipping_address.address_line_2}</p>
                                        )}
                                        <p>
                                            {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postal_code}
                                        </p>
                                        <p>{order.shipping_address.country}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <Card className="sticky top-4">
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>${order.subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span>${order.shipping_amount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Tax</span>
                                        <span>${order.tax_amount.toFixed(2)}</span>
                                    </div>
                                    {order.discount_amount > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Discount</span>
                                            <span>-${order.discount_amount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <Separator />
                                    <div className="flex justify-between text-lg font-semibold">
                                        <span>Total</span>
                                        <span>${order.total_amount.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-4">
                                    <Link href="/dashboard">
                                        <Button className="w-full">
                                            View Order History
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
