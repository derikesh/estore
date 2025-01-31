import multer from 'multer';

const storage = multer.memoryStorage();

// Middleware function for single file upload
export const uploadMulter = multer({ storage });

// Middleware function for multiple file uploads`