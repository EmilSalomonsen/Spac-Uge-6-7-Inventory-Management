import axiosClient from "@/api/axiosClient";
import { CustomerEndpoints } from '@/api/endpoints';
import { convertToURLSearchParams } from '@/lib/utils';
import { Customer, type AllCustomersResponse, type PaginationParams } from "@/types";

/**
 * Service class for handling customer-related API calls
 */
export default class CustomerService {
    /**
     * Fetch all customers with optional pagination
     * @param params - Query parameters for pagination
     * @returns Promise with all customer data
     */
    static async getAll(params?: PaginationParams): Promise<AllCustomersResponse> {
        const queryParams = params ? convertToURLSearchParams(params) : "";
        const response = await axiosClient.get(
            CustomerEndpoints.getAll(queryParams)
        );
        return response.data;
    }

    /**
     * Fetch a single customer by ID
     * @param id - Customer ID
     * @returns Promise with customer data
     */
    static async getById(id: string): Promise<Customer> {
        const response = await axiosClient.get(CustomerEndpoints.getById(id));
        return response.data;
    }
} 