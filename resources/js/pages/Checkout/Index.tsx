import { Head, router, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { CreditCard, MapPin, Package } from 'lucide-react';

interface CartItem {
    id: number;
    quantity: number;
    price: number;
    product: {
        name: string;
        images?: string[];
    };
}

interface Cart {
    items: CartItem[];
}

interface Address {
    id: number;
    first_name: string;
    last_name: string;
    address_line_1: string;
    address_line_2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone?: string;
}

interface Props {
    cart: Cart;
    addresses: Address[];
    total: number;
}

export default function CheckoutIndex({ cart, addresses, total }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        billing_address: {
            first_name: '',
            last_name: '',
            address_line_1: '',
            address_line_2: '',
            city: '',
            state: '',
            postal_code: '',
            country: 'US',
            phone: '',
        },
        shipping_address: {
            first_name: '',
            last_name: '',
            address_line_1: '',
            address_line_2: '',
            city: '',
            state: '',
            postal_code: '',
            country: 'US',
            phone: '',
        },
        payment_method: 'credit_card',
        coupon_code: '',
        same_as_billing: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const submitData = {
            ...data,
            shipping_address: data.same_as_billing ? data.billing_address : data.shipping_address,
        };
        
        post('/checkout', submitData);
    };

    const subtotal = total;
    const taxAmount = subtotal * 0.1;
    const shippingAmount = 10.00;
    const finalTotal = subtotal + taxAmount + shippingAmount;

    return (
        <AppLayout>
            <Head title="Checkout" />
            
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Checkout</h1>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Checkout Form */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Billing Address */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <MapPin className="w-5 h-5 mr-2" />
                                        Billing Address
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="billing_first_name">First Name</Label>
                                            <Input
                                                id="billing_first_name"
                                                value={data.billing_address.first_name}
                                                onChange={(e) => setData('billing_address', {
                                                    ...data.billing_address,
                                                    first_name: e.target.value
                                                })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="billing_last_name">Last Name</Label>
                                            <Input
                                                id="billing_last_name"
                                                value={data.billing_address.last_name}
                                                onChange={(e) => setData('billing_address', {
                                                    ...data.billing_address,
                                                    last_name: e.target.value
                                                })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <Label htmlFor="billing_address_1">Address Line 1</Label>
                                        <Input
                                            id="billing_address_1"
                                            value={data.billing_address.address_line_1}
                                            onChange={(e) => setData('billing_address', {
                                                ...data.billing_address,
                                                address_line_1: e.target.value
                                            })}
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <Label htmlFor="billing_address_2">Address Line 2 (Optional)</Label>
                                        <Input
                                            id="billing_address_2"
                                            value={data.billing_address.address_line_2}
                                            onChange={(e) => setData('billing_address', {
                                                ...data.billing_address,
                                                address_line_2: e.target.value
                                            })}
                                        />
                                    </div>
                                    
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <Label htmlFor="billing_city">City</Label>
                                            <Input
                                                id="billing_city"
                                                value={data.billing_address.city}
                                                onChange={(e) => setData('billing_address', {
                                                    ...data.billing_address,
                                                    city: e.target.value
                                                })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="billing_state">State</Label>
                                            <Input
                                                id="billing_state"
                                                value={data.billing_address.state}
                                                onChange={(e) => setData('billing_address', {
                                                    ...data.billing_address,
                                                    state: e.target.value
                                                })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="billing_postal_code">Postal Code</Label>
                                            <Input
                                                id="billing_postal_code"
                                                value={data.billing_address.postal_code}
                                                onChange={(e) => setData('billing_address', {
                                                    ...data.billing_address,
                                                    postal_code: e.target.value
                                                })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <Label htmlFor="billing_phone">Phone</Label>
                                        <Input
                                            id="billing_phone"
                                            type="tel"
                                            value={data.billing_address.phone}
                                            onChange={(e) => setData('billing_address', {
                                                ...data.billing_address,
                                                phone: e.target.value
                                            })}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Payment Method */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <CreditCard className="w-5 h-5 mr-2" />
                                        Payment Method
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Select value={data.payment_method} onValueChange={(value) => setData('payment_method', value)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="credit_card">Credit Card</SelectItem>
                                            <SelectItem value="paypal">PayPal</SelectItem>
                                            <SelectItem value="stripe">Stripe</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Order Summary */}
                        <div>
                            <Card className="sticky top-4">
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Package className="w-5 h-5 mr-2" />
                                        Order Summary
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Order Items */}
                                    <div className="space-y-3">
                                        {cart.items.map((item) => (
                                            <div key={item.id} className="flex items-center space-x-3">
                                                <img
                                                    src={item.product.images?.[0] || '/placeholder-product.jpg'}
                                                    alt={item.product.name}
                                                    className="w-12 h-12 object-cover rounded"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium truncate">
                                                        {item.product.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        Qty: {item.quantity}
                                                    </p>
                                                </div>
                                                <p className="text-sm font-medium">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    <Separator />

                                    {/* Totals */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span>Subtotal</span>
                                            <span>${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Shipping</span>
                                            <span>${shippingAmount.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Tax</span>
                                            <span>${taxAmount.toFixed(2)}</span>
                                        </div>
                                        <Separator />
                                        <div className="flex justify-between text-lg font-semibold">
                                            <span>Total</span>
                                            <span>${finalTotal.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <Button 
                                        type="submit" 
                                        className="w-full" 
                                        size="lg"
                                        disabled={processing}
                                    >
                                        {processing ? 'Processing...' : 'Place Order'}
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
