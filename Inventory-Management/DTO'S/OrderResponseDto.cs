using Inventory_Management.Model;

namespace Inventory_Management.DTOs
{
    public class OrderResponseDto
    {
        public int OrderId { get; set; }
        public int CustomerId { get; set; }
        public DateTime OrderDate { get; set; }
        public string PaymentMethod { get; set; }
        public Order.Status OrderStatus { get; set; }
        public List<OrderItemResponseDto> OrderItems { get; set; }

        public static OrderResponseDto FromOrder(Order order)
        {
            return new OrderResponseDto
            {
                OrderId = order.OrderId,
                CustomerId = order.CustomerId,
                OrderDate = order.OrderDate,
                PaymentMethod = order.PaymentMethod,
                OrderStatus = order.OrderStatus,
                OrderItems = order.OrderItems?.Select(item => OrderItemResponseDto.FromOrderItem(item)).ToList() ?? new List<OrderItemResponseDto>()
            };
        }
    }

    public class OrderItemResponseDto
    {
        public int OrderItemId { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public string ProductName { get; set; }
        public decimal Price { get; set; }
        public ProductCategoryDto Category { get; set; }

        public static OrderItemResponseDto FromOrderItem(OrderItem item)
        {
            return new OrderItemResponseDto
            {
                OrderItemId = item.OrderItemId,
                OrderId = item.OrderId,
                ProductId = item.ProductId,
                Quantity = item.Quantity,
                ProductName = item.Product?.ProductName,
                Price = item.Product?.Price ?? 0,
                Category = item.Product?.Category != null ? new ProductCategoryDto 
                {
                    CategoryId = item.Product.Category.CategoryId,
                    CategoryName = item.Product.Category.CategoryName
                } : null
            };
        }
    }

    public class ProductCategoryDto
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
    }
} 