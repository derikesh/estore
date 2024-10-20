export enum ORDER_STATUS {
    Pending = 'PENDING',
    Processing = 'PROCESSING',
    Shipped = 'SHIPPED',
    Delivered = 'DELIVERED'
}

// Assuming you have a Product model
interface Product {
    id: string;
    name: string;
    status: ORDER_STATUS;
}

// Function to update the shipment status
function updateShipmentStatus(product: Product, newStatus: ORDER_STATUS): Product {
    product.status = newStatus;
    return product;
}

// Example usage
const product: Product = {
    id: '123',
    name: 'Sample Product',
    status: ORDER_STATUS.Pending
};


// Update the status to Shipped
const updatedProduct = updateShipmentStatus(product, ORDER_STATUS.Shipped);
console.log('After update:', updatedProduct.status); 