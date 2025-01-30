import { Request , Response  } from "express"
import cloudinary from "../config/cloudnary/cloudnary";
import { UploadStream } from "cloudinary";


export const uploadImage = async ( req:Request , res:Response )=>{

    try {
        // Upload file to Cloudinary
        const result = await cloudinary.uploader.upload_stream(
          { resource_type: 'auto' },
          (error, result) => {
            if (error) {
              return res.status(500).json({ error: `error from cloudnary : ${error.message}` });
            }
            // Send the Cloudinary URL back as response
            return res.status(200).json({ imageUrl: result?.secure_url , publicKey: result?.public_id});
          }
        );
    
        // Pipe the file data to Cloudinary
        result.end(req?.file?.buffer);
      } catch (error) {
        res.status(500).json({ error: 'Error handling image upload' });
      }
}




export const deleteImage = async (req: Request, res: Response) => {
    
    const { publicKey } = req.body;

    if(!publicKey){
        return res.status(400).json({ error: 'publicKey is required to delete the image' });
    } 

    try {
        const deletedImage = await cloudinary.uploader.destroy(publicKey, { resource_type: 'image' });

        if (deletedImage.result !== 'ok') {
           console.error('Failed to delete image:', deletedImage);
            return res.status(500).json({ message: "Failed to delete image",error:deletedImage });
        }

        return res.status(200).json({ message: "Image deleted successfully" });

    } catch (err) {
        return res.status(500).json({ error: 'Error handling image deletion' });
    }
};


export const uploadImages = async (req: Request, res: Response):Promise<any> => {
  try {
      if (!req.files || req.files.length === 0) {
         return  res.status(400).json({ message: 'no image found' });
      }

      const files = req.files as Express.Multer.File[];

      const uploadPromises = files.map((file: Express.Multer.File) => {
          return new Promise((resolve, reject) => {
              const uploadStream = cloudinary.uploader.upload_stream(
                  { resource_type: 'auto' },
                  (error, result) => {
                      if (error) {
                          reject(error);
                      } else {
                          resolve(result);
                      }
                  }
              );
              uploadStream.end(file.buffer);
          });
      });

      const results = await Promise.all(uploadPromises);
      
      const arrayObject = results.map( (item:any)=>({
        imageUrl:item?.secure_url,
        publicKey:item?.public_id
      }) )

     return  res.status(200).json({ images: arrayObject });
  } catch (error) {
       res.status(500).json({ error: 'Error handling image upload' });
  }
};