import { DetailView } from '@/components/ui/detail-view';
import { useOrder } from '@/pages/orders/queries/OrderQueries';
import { Order, OrderStatus } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const getOrderStatusBadge = (status: OrderStatus) => {
    switch (status) {
        case OrderStatus.Pending:
            return <Badge variant="outline">Pending</Badge>;
        case OrderStatus.Completed:
            return <Badge variant="success">Completed</Badge>;
        case OrderStatus.Cancelled:
            return <Badge variant="destructive">Cancelled</Badge>;
        default:
            return <Badge variant="outline">{status}</Badge>;
    }
};

const columns: ColumnDef<Order>[] = [
    {
        header: "Id",
        accessorKey: "orderId"
    },
    {
        header: "Customer ID",
        accessorKey: "customerId",
        cell: ({ row }) => {
            const customerId: number = row.getValue("customerId");
            return (
                <Link to={`/customers/${customerId}`}>
                    {customerId}
                </Link>
            );
        }
    },
    {
        header: "Order Date",
        accessorKey: "orderDate",
        cell: ({ row }) => {
            const date = new Date(row.getValue("orderDate"));
            return date.toLocaleDateString();
        }
    },
    {
        header: "Payment Method",
        accessorKey: "paymentMethod"
    },
    {
        header: "Status",
        accessorKey: "orderStatus",
        cell: ({ row }) => {
            return getOrderStatusBadge(row.getValue("orderStatus"));
        }
    }
];

export const OrderDetail: React.FC = () => {
    return (
        <DetailView 
            dataName="order" 
            query={useOrder} 
            columns={columns} 
            tableTitle='Order Detail'
        />
    );
}; 