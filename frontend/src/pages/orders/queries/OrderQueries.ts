import { useQuery } from '@tanstack/react-query';
import type { AllOrdersResponse, ApiError, Order, OrderQueryParams, PaginationParams } from '@/types';
import { queryKeys } from '@/api/queryClient';
import OrderService from '@/pages/orders/services/OrderService';

export const useOrders = (params?: OrderQueryParams & PaginationParams) => {
    return useQuery<AllOrdersResponse, ApiError>({
        queryKey: [...queryKeys.orders.all, params],
        queryFn: () => OrderService.getAll(params),
    });
};

export const useOrder = (id: string) => {
    return useQuery<Order, ApiError>({
        queryKey: queryKeys.orders.byId(id),
        queryFn: () => OrderService.getById(id),
        placeholderData: (prev) => prev
    });
};

export const useCustomerOrders = (customerId: string) => {
    return useQuery<Order[], ApiError>({
        queryKey: queryKeys.orders.byCustomerId(customerId),
        queryFn: () => OrderService.getByCustomerId(customerId),
    });
}; 