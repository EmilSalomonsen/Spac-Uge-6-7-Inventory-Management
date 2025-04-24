import axiosClient from "@/api/axiosClient";
import { OrderEndpoints } from '@/api/endpoints';
import { convertToURLSearchParams } from '@/lib/utils';
import { Order, type AllOrdersResponse, type PaginationParams, type OrderQueryParams } from "@/types";

/**
 * Service class for handling order-related API calls
 */
export default class OrderService {
    /**
     * Fetch all orders with optional filtering and pagination
     * @param params - Query parameters for filtering and pagination
     * @returns Promise with all order data
     */
    static async getAll(
        params?: OrderQueryParams & PaginationParams
    ): Promise<AllOrdersResponse> {
        const queryParams = params ? convertToURLSearchParams(params) : "";
        const response = await axiosClient.get(
            OrderEndpoints.getAll(queryParams)
        );
        return response.data;
    }

    /**
     * Fetch a single order by ID
     * @param id - Order ID
     * @returns Promise with order data
     */
    static async getById(id: string): Promise<Order> {
        const response = await axiosClient.get(OrderEndpoints.getById(id));
        return response.data;
    }

    /**
     * Fetch orders by customer ID
     * @param customerId - Customer ID
     * @returns Promise with orders data
     */
    static async getByCustomerId(customerId: string): Promise<Order[]> {
        const response = await axiosClient.get(OrderEndpoints.getByCustomerId(customerId));
        return response.data;
    }
} 