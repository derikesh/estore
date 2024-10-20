import { Router } from "express";

// all router functions
import { addProducts } from "../routerFunction/addProduct";

 const router = Router();


// router to post the prducts
router.get( '/add/product' , addProducts);




export default router;