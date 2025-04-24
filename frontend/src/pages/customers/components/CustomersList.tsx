import { DataTable } from '@/components/ui/data-table';
import { useCustomers } from '../queries/CustomerQueries';
import type { Customer } from '@/types';
import type { ColumnDef, ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

const columns: ColumnDef<Customer>[] = [
    {
        accessorKey: "customerId",
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
            const id: number = row.getValue("customerId");
            return (
                <Link to={`/customers/${id}`} className="text-blue-600 hover:text-blue-800">
                    {id}
                </Link>
            );
        }
    },
    {
        accessorKey: "city",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    City
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        }
    }
];

const DEFAULT_PAGE_SIZE = 40;

export const CustomersList: React.FC = () => {
    const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: DEFAULT_PAGE_SIZE });
    const [sorting, setSorting] = useState<SortingState>([]);
    const [filters, setFilters] = useState<ColumnFiltersState>([]);

    const { data, isLoading, error } = useCustomers({
        pageNumber: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
    });

    if (isLoading) {
        return <div className="p-6">Loading customers...</div>;
    }

    if (error) {
        return <div className="p-6 text-red-500">Error: {error.message}</div>;
    }

    if (!data?.customers?.length) {
        return (
            <div className="p-6">
                <p className="mb-4">No customers found</p>
            </div>
        );
    }

    return (
        <DataTable
            columns={columns}
            data={data.customers}
            tableTitle='Customers'
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