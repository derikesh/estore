import { Request , Response  } from "express"
import cloudinary from "../config/cloudnary/cloudnary";

export const uploadImage = async ( req:Request , res:Response )=>{

    try {
        // Upload file to Cloudinary
        const result = await cloudinary.uploader.upload_stream(
          { resource_type: 'auto' },
          (error, result) => {
            if (error) {
              return res.status(500).json({ error: error.message });
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
            return res.status(500).json({ message: "Failed to delete image" });
        }

        return res.status(200).json({ message: "Image deleted successfully" });

    } catch (err) {
        return res.status(500).json({ error: 'Error handling image deletion' });
    }
};