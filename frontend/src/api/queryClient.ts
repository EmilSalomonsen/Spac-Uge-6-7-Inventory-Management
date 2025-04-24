import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: 1000 * 60 * 60 * 24, // 24 hours
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});

export const queryKeys = {
    products: {
        all: ['products'] as const,
        byId: (id: string) => ['products', id] as const,
        categories: {
            all: ['product-categories'] as const,
            byId: (id: string) => ['product-categories', id] as const,
        },
    },
    orders: {
        all: ['orders'] as const,
        byId: (id: string) => ['orders', id] as const,
        byCustomerId: (customerId: string) => ['orders', 'customer', customerId] as const,
    }
    // users: {
    //     all: ["users"] as const,
    //     byId: (id: string) => ["users", id] as const,
    // },
} as const;