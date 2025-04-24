export type PaginationParams = {
    pageNumber: number,
    pageSize: number;
};

export type PaginatedResponse = {
    totalCount: number,
    pageNumber: number,
    pageSize: number,
    totalPages: number,
};

export type Product = {
    productId: number;
    productName?: string;
    price: number;
    category: ProductCategory;
    quantity: number;
};

export type ProductQueryParams = {
    sortBy?: string;
    isDescending?: boolean;
    productName?: string;
    categoryName?: string;
    minPrice?: number,
    maxPrice?: number,
    pageNumber: number,
    pageSize: number;
};

export type AllProductsResponse = {
    products: Product[];
} & PaginatedResponse;

export type ProductCategory = {
    categoryId: number;
    categoryName: string;
};

export type AllProductCategoriesResponse = {
    categories: ProductCategory[];
} & PaginatedResponse;

export type OrderItemDto = {
    productId: number;
    quantity: number;
};

export interface Order {
    orderId: number;
    customerId: number;
    orderDate: string;
    paymentMethod: string;
    orderStatus: OrderStatus;
    orderItems: OrderItem[];
}

export enum OrderStatus {
    Pending = 0,
    Completed = 1,
    Cancelled = 2
}

export interface OrderItem {
    orderItemId: number;
    orderId: number;
    productId: number;
    quantity: number;
    product?: Product;
}

export interface AllOrdersResponse {
    orders: Order[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
}

export interface OrderQueryParams {
    customerId?: number;
    orderStatus?: OrderStatus;
    startDate?: string;
    endDate?: string;
}

export type ApiError = {
    message: string;
    code: string;
    status: number;
};

export type SidebarGroupArgs = {
    label: string;
    items?: {
        label: string;
        url: string;
    }[];
};

export type AuthStatus = {
    success: boolean;
    err?: {
        message: string;
    };
    token: string;
};

export type Credentials = {
    username: string,
    password: string;
};

export interface Customer {
    customerId: number;
    city: string;
}

export interface AllCustomersResponse {
    customers: Customer[];
    totalPages: number;
    currentPage: number;
    pageSize: number;
    totalCount: number;
}