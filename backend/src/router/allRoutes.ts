import { Router } from "express";

// Import all router functions product
import { addProducts, getProduct, getProductSingle, updateProduct, deleteProduct , deleteSelected, addDetail } from "../routerFunction/addProduct";

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
import { uploadImages } from "../routerFunction/uploadImage";


// faq

import { addFAQ , deleteFAQ, } from "../routerFunction/faq";
import { readFaq } from "../routerFunction/faq";
export const router = Router();

import { homeFunction, searchFunction } from "../routerFunction/homePage";


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

router.delete( '/product/selected',cookieAuth , deleteSelected );

router.post('/product/detail',cookieAuth,addDetail);



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
router.delete('/category/delete/',cookieAuth,deleteCategory);



// upload an image 

router.post('/uploadImage',uploadMulter.single('file'),uploadImage);
router.post('/uploadImages',uploadMulter.array( 'files',5 ) , uploadImages)
router.post('/deleteImage',deleteImage as any );



// faq
router.get('/faq',readFaq)
router.post( '/faq/add',cookieAuth,addFAQ );
router.delete( '/faq/delete/:id',cookieAuth,deleteFAQ );


// home page data 
router.get('/home/firstPage',homeFunction);


// search api
router.post('/search/all',searchFunction);


export default router;