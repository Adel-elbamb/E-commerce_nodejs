import * as dotenv from 'dotenv'
import path from 'path'
dotenv.config({path:path.resolve('./config/.env')})
import cloudinary from 'cloudinary'

cloudinary.v2.config({
    api_key :"971262943692946",
    api_secret:"VPZyrVT_gb_FmQuRgwJrlO7IqgE",
    cloud_name :"dmmkfcntf",
    secure : true 
})

export default cloudinary.v2