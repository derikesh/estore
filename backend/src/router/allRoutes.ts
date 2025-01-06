import { Router } from "express";

// Import all router functions product
import { addProducts, getProduct, getProductSingle, updateProduct, deleteProduct } from "../routerFunction/addProduct";

// import all router function users
import { createNewUser , readAllUsers } from "../routerFunction/usersFunction";

// import all login functions 
import { loginFunction } from "../routerFunction/loginFunction";

// import middlewares
import { cookieAuth, refreshTokenHandlerr } from "../utility/cookieAuth";

// import admin funcitons
import { handleAdminGet } from "../routerFunction/adminFunction";
import { addCategory, readCategory, readSingleCategory, updateCategory , deleteCategory } from "../routerFunction/category";

// upload image 
import {  uploadImage } from "../routerFunction/uploadImage";
import { uploadMulter } from "../utility/multer";
import { deleteImage } from "../routerFunction/uploadImage";

export const router = Router();



// product routes

// Route to add a product (should be POST)
router.post('/product/add',cookieAuth, addProducts);
// Route to get all products
router.get('/product', getProduct);
// Route to get a single product by ID
router.get('/product/:id', getProductSingle);
// Route to update a product by ID
router.patch('/product/:id',cookieAuth, updateProduct);
// Route to delete a product by ID
router.delete('/product/delete/:id',cookieAuth, deleteProduct);



// user router 

// creating a new user 
router.post( '/users/newUser' ,cookieAuth , createNewUser );
// reall all users
router.get( '/users', readAllUsers );


// login router (access token is generated here )
router.post( '/login' , loginFunction );


// authoization function middleware 
router.post('/refreshToken',refreshTokenHandlerr, ( req , res )=>{
        res.status(200).json({message:"acces token refreshed"});
})


// creating a new category
router.post('/category/add',cookieAuth , addCategory);
router.get('/category',readCategory)
router.get('/category/:id',readSingleCategory)
router.patch( '/category/:id',cookieAuth,updateCategory );
router.delete('/category/delete/:id',cookieAuth,deleteCategory);



// upload an image 
router.post('/uploadImage',uploadMulter.single('file'),uploadImage);
router.post('/deleteImage',deleteImage as any );

export default router;