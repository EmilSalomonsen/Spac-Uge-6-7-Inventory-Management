export const AuthEndpoints = {
    login: () => '/login'
};

export const ProductEndpoints = {
    getAll: (params: string) => `/products${params ? `?${params}` : ""}`,
    getById: (id: string | number) => `/products/${id}`,
    // getProductsFromOrder: (orderToken: string) => `/product/order-products?token=${orderToken}`,
} as const;

export const ProductCategoryEndpoints = {
    getAll: (params: string) => `/categories${params ? `?${params}` : ""}`,
    getById: (id: string | number) => `/categories/${id}`,
    // getProductsFromOrder: (orderToken: string) => `/product/order-products?token=${orderToken}`,
} as const;

export const OrderEndpoints = {
    getAll: (queryParams: string) => `/order${queryParams ? `?${queryParams}` : ''}`,
    getById: (id: string) => `/order/${id}`,
    getByCustomerId: (customerId: string) => `/order/customer/${customerId}`,
    create: () => '/order',
    updateStatus: (id: string) => `/order/${id}/status`,
    delete: (id: string) => `/order/${id}`
};

export const CustomerEndpoints = {
    getAll: (queryParams: string) => `/customer${queryParams ? `?${queryParams}` : ''}`,
    getById: (id: string) => `/customer/${id}`,
};