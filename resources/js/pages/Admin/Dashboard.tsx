import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
    ShoppingBag, 
    Users, 
    Package, 
    DollarSign, 
    TrendingUp,
    Clock,
    Eye
} from 'lucide-react';

interface Order {
    id: number;
    order_number: string;
    user: {
        name: string;
        email: string;
    };
    total_amount: number;
    status: string;
    created_at: string;
    items: Array<{
        product_name: string;
        quantity: number;
    }>;
}

interface Stats {
    total_products: number;
    total_orders: number;
    total_customers: number;
    pending_orders: number;
    total_revenue: number;
    recent_orders: Order[];
}

interface Props {
    stats: Stats;
}

export default function AdminDashboard({ stats }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'processing':
                return 'bg-blue-100 text-blue-800';
            case 'shipped':
                return 'bg-purple-100 text-purple-800';
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AppLayout>
            <Head title="Admin Dashboard" />
            
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <p className="text-gray-600">Welcome to your ecommerce admin panel</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_products}</div>
                            <Link href="/admin/products" className="text-xs text-muted-foreground hover:underline">
                                View all products
                            </Link>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_orders}</div>
                            <Link href="/admin/orders" className="text-xs text-muted-foreground hover:underline">
                                View all orders
                            </Link>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_customers}</div>
                            <p className="text-xs text-muted-foreground">
                                Active customers
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${stats.total_revenue.toFixed(2)}</div>
                            <p className="text-xs text-muted-foreground">
                                <TrendingUp className="inline h-3 w-3 mr-1" />
                                All time revenue
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Orders */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Recent Orders</CardTitle>
                            <Link href="/admin/orders">
                                <Button variant="outline" size="sm">
                                    View All
                                </Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {stats.recent_orders.map((order) => (
                                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <span className="font-medium">#{order.order_number}</span>
                                                <Badge className={getStatusColor(order.status)}>
                                                    {order.status}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-gray-600">{order.user.name}</p>
                                            <p className="text-xs text-gray-500">
                                                {order.items.length} item(s) • {new Date(order.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold">${order.total_amount.toFixed(2)}</p>
                                            <Link href={`/admin/orders/${order.id}`}>
                                                <Button variant="ghost" size="sm">
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                                
                                {stats.recent_orders.length === 0 && (
                                    <div className="text-center py-8 text-gray-500">
                                        No recent orders
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <Link href="/admin/products/create">
                                    <Button className="w-full h-20 flex flex-col items-center justify-center">
                                        <Package className="w-6 h-6 mb-2" />
                                        Add Product
                                    </Button>
                                </Link>
                                
                                <Link href="/admin/orders?status=pending">
                                    <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                                        <Clock className="w-6 h-6 mb-2" />
                                        Pending Orders
                                        {stats.pending_orders > 0 && (
                                            <Badge className="mt-1" variant="destructive">
                                                {stats.pending_orders}
                                            </Badge>
                                        )}
                                    </Button>
                                </Link>
                                
                                <Link href="/admin/products">
                                    <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                                        <ShoppingBag className="w-6 h-6 mb-2" />
                                        Manage Products
                                    </Button>
                                </Link>
                                
                                <Link href="/admin/orders">
                                    <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                                        <Users className="w-6 h-6 mb-2" />
                                        View Orders
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
