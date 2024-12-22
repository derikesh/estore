import { Router } from "express";

// Import all router functions product
import { addProducts, getProduct, getProductSingle, updateProduct, deleteProduct } from "../routerFunction/addProduct";

// import all router function users
import { createNewUser , readAllUsers } from "../routerFunction/usersFunction";

// import all login functions 
import { loginFunction } from "../routerFunction/loginFunction";

// import middlewares
import authMiddleware from "../utility/authentication";

// import admin funcitons
import { handleAdminGet } from "../routerFunction/adminFunction";
import { addCategory, readCategory, readSingleCategory, updateCategory } from "../routerFunction/category";

const router = Router();



// product routes

// Route to add a product (should be POST)
router.post('/product/add',authMiddleware, addProducts);
// Route to get all products
router.get('/product', getProduct);
// Route to get a single product by ID
router.get('/product/:id', getProductSingle);
// Route to update a product by ID
router.patch('/product/:id',authMiddleware, updateProduct);
// Route to delete a product by ID
router.delete('/product/:id',authMiddleware, deleteProduct);



// user router 

// creating a new user 
router.post( '/users/newUser' ,authMiddleware , createNewUser );
// reall all users
router.get( '/users', readAllUsers );

``


// login router
router.post( '/login' , loginFunction );



// product routes


// creating a new category
router.post('/category/add',authMiddleware , addCategory);
router.get('categories',readCategory)
router.get('category/:id',readSingleCategory)
router.patch( 'category/:id',updateCategory );


export default router;