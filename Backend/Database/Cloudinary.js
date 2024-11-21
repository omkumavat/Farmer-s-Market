import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import multer from 'multer';
// import multerStorageCloudinary from 'multer-storage-cloudinary'; // Correct import

dotenv.config();

const cloudinaryConnect = () => {
    try {
        cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET,
        })
        
    } catch (error) {
        console.log(error);
    }
}

export default cloudinaryConnect;

export const uploadToCloudinary = async(fileBuffer, folder, quality, width, height) => {
    const options = {
      folder,
      resource_type: 'auto',
      transformation: [
        {
          width: width || undefined,
          height: height || undefined,
          crop: 'limit',
        },
      ],
      quality,
    };


    
    return new Promise((resolve, reject) => {
      // Use upload_stream for direct upload to Cloudinary
      const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
        if (error) {
          reject(error); // Reject the promise in case of error
        } else {
          resolve(result); // Resolve the promise with the Cloudinary result
        }
      });
      
      // Send the file buffer to Cloudinary via the stream
      stream.end(fileBuffer);
    });
  }

const storage = multer.memoryStorage();
export const upload = multer({ storage }); // Set up multer with the cloudinary storage
