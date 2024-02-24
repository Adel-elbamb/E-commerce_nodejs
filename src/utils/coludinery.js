import cloudinary from 'cloudinary'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({path : path.resolve('./../../config/.env')})
 // to upload  image or pdf  on cloud 
  // console.log(process.env.APP_NAME)
          
  cloudinary.config({ 
    cloud_name: 'dmmkfcntf', 
    api_key: '971262943692946', 
    api_secret: 'VPZyrVT_gb_FmQuRgwJrlO7IqgE' 
  });

  export default cloudinary.v2

