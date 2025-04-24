import { useQuery } from '@tanstack/react-query';
import CustomerService from '../services/CustomerService';
import type { ApiError, Customer, PaginationParams } from '@/types';

export const queryKeys = {
    customers: {
        all: ['customers'] as const,
        byId: (id: string) => ['customers', id] as const,
    },
};

export const useCustomers = (params?: PaginationParams) => {
    return useQuery({
        queryKey: [...queryKeys.customers.all, params],
        queryFn: () => CustomerService.getAll(params),
    });
};

export const useCustomer = (id: string) => {
    return useQuery<Customer, ApiError>({
        queryKey: queryKeys.customers.byId(id),
        queryFn: () => CustomerService.getById(id),
    });
}; 