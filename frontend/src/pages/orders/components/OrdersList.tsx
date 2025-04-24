import { useOrders } from "../queries/OrderQueries";
import {
    ColumnDef,
    type ColumnFiltersState,
    type PaginationState,
    type SortingState,
} from "@tanstack/react-table";
import { Order, OrderStatus } from '@/types';
import { DataTable } from '@/components/ui/data-table';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

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
        accessorKey: "orderId",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Id
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const id: number = row.getValue("orderId");
            return (
                <Link to={`/orders/${id}`} className="text-blue-600 hover:text-blue-800">
                    {id}
                </Link>
            );
        }
    },
    {
        accessorKey: "customerId",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Customer ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
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
        accessorKey: "orderDate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Order Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue("orderDate"));
            return date.toLocaleDateString();
        }
    },
    {
        accessorKey: "paymentMethod",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Payment Method
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        }
    },
    {
        accessorKey: "orderStatus",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return getOrderStatusBadge(row.getValue("orderStatus"));
        }
    }
];

const DEFAULT_PAGE_SIZE = 40;

export const OrdersList: React.FC = () => {
    const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: DEFAULT_PAGE_SIZE });
    const [sorting, setSorting] = useState<SortingState>([]);
    const [filters, setFilters] = useState<ColumnFiltersState>([]);

    const { data, isLoading, error } = useOrders({
        pageNumber: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
    });

    if (isLoading) {
        return <div className="p-6">Loading orders...</div>;
    }

    if (error) {
        return <div className="p-6 text-red-500">Error: {error.message}</div>;
    }

    if (!data?.orders?.length) {
        return (
            <div className="p-6">
                <p className="mb-4">No orders found</p>
            </div>
        );
    }

    return (
        <DataTable
            columns={columns}
            data={data.orders}
            tableTitle='Orders'
            pagination={pagination}
            setPagination={setPagination}
            pageCount={data.totalPages}
            sorting={sorting}
            setSorting={setSorting}
            filters={filters}
            setFilters={setFilters}
        />
    );
}; 