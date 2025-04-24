import { DetailView } from '@/components/ui/detail-view';
import { useCustomer } from '../queries/CustomerQueries';
import type { Customer } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';

const columns: ColumnDef<Customer>[] = [
    {
        header: "Id",
        accessorKey: "customerId"
    },
    {
        header: "City",
        accessorKey: "city"
    }
];

export const CustomerDetail: React.FC = () => {
    return (
        <DetailView 
            dataName="customer" 
            query={useCustomer} 
            columns={columns} 
            tableTitle='Customer Detail'
        />
    );
}; 