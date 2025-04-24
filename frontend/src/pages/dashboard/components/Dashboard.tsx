import { useOrders } from '@/pages/orders/queries/OrderQueries';
import { useProducts } from '@/pages/products/queries/ProductQueries';
import { useCustomers } from '@/pages/customers/queries/CustomerQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, ShoppingBag, Users, Package, ClipboardList } from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const Dashboard: React.FC = () => {
    const { data: ordersData } = useOrders({
        pageNumber: 1,
        pageSize: 1000 // Get more orders for better statistics
    });

    const { data: productsData } = useProducts({
        pageNumber: 1,
        pageSize: 1000
    });

    const { data: customersData } = useCustomers({
        pageNumber: 1,
        pageSize: 1000
    });

    // Calculate total sales, number of orders, and number of customers
    const totalOrders = ordersData?.orders.length || 0;
    const totalCustomers = customersData?.customers.length || 0;
    const totalProducts = productsData?.products.length || 0;

    const totalSales = ordersData?.orders.reduce((acc, order) => {
        const orderTotal = order.orderItems.reduce((sum, item) => 
            sum + (item.product?.price || 0) * item.quantity, 0);
        return acc + orderTotal;
    }, 0) || 0;

    const expenses = totalSales * 0.45; // Assuming 45% of sales are expenses
    const profits = totalSales - expenses;

    // Prepare data for category distribution pie chart
    const categoryData = productsData?.products.reduce((acc: any[], product) => {
        const existingCategory = acc.find(cat => cat.name === product.category.categoryName);
        if (existingCategory) {
            existingCategory.value++;
        } else {
            acc.push({ name: product.category.categoryName, value: 1 });
        }
        return acc;
    }, []) || [];

    // Prepare data for category sales distribution
    const categorySalesData = ordersData?.orders.reduce((acc: any[], order) => {
        order.orderItems.forEach(item => {
            const categoryName = item.product?.category?.categoryName;
            if (categoryName) {
                const existingCategory = acc.find(cat => cat.name === categoryName);
                const saleAmount = (item.product?.price || 0) * item.quantity;
                
                if (existingCategory) {
                    existingCategory.value += saleAmount;
                } else {
                    acc.push({ name: categoryName, value: saleAmount });
                }
            }
        });
        return acc;
    }, []) || [];

    // Prepare monthly sales data
    const monthlySalesData = ordersData?.orders.reduce((acc: any[], order) => {
        const date = new Date(order.orderDate);
        const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
        const existingMonth = acc.find(m => m.month === monthYear);
        
        const orderTotal = order.orderItems.reduce((sum, item) => 
            sum + (item.product?.price || 0) * item.quantity, 0);

        if (existingMonth) {
            existingMonth.sales += orderTotal;
        } else {
            acc.push({ month: monthYear, sales: orderTotal });
        }
        return acc;
    }, []).sort((a, b) => {
        const [aMonth, aYear] = a.month.split('/');
        const [bMonth, bYear] = b.month.split('/');
        return new Date(aYear, aMonth - 1).getTime() - new Date(bYear, bMonth - 1).getTime();
    }) || [];

    return (
        <div className="p-6 space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-5">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalCustomers}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                        <ClipboardList className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalOrders}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalProducts}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalSales.toFixed(2)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Profits</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${profits.toFixed(2)}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid gap-4 md:grid-cols-2">
                {/* Monthly Sales Trend */}
                <Card>
                    <CardHeader>
                        <CardTitle>Monthly Sales Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={monthlySalesData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line 
                                        type="monotone" 
                                        dataKey="sales" 
                                        name="Sales ($)"
                                        stroke="#8884d8" 
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Product Category Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle>Product Category Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Category Sales Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle>Category Sales Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categorySalesData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {categorySalesData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => `$${(value as number).toFixed(2)}`} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}; 