import { Router } from "express";

// Import all router functions
import { addProducts, getProduct, getProductSingle, updateProduct, deleteProduct } from "../routerFunction/addProduct";

const router = Router();

// Route to add a product (should be POST)
router.post('/product/add', addProducts);

// Route to get all products
router.get('/product', getProduct);

// Route to get a single product by ID
router.get('/product/:id', getProductSingle);

// Route to update a product by ID
router.patch('/product/:id', updateProduct);

// Route to delete a product by ID
router.delete('/product/:id', deleteProduct);

export default router;