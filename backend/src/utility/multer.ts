import multer from 'multer';

const storage = multer.memoryStorage();

// middleware function 
export const uploadMulter = multer({storage});