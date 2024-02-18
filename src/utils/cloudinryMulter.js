import multer from "multer"
export const validationTypes = {
    image: ['image/png', 'image/jpeg' , 'image/jpg'],
    pdf: ['application/pdf']
}
  export const uploadFile = ({customTypes} ={}) => {
    const storage = multer.diskStorage({})
    const fileFilter = (req, file, cb) => {
        console.log(file.mimetype);
        if (customTypes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error('invalid formate'), false)
        }
    }
    const upload = multer({ fileFilter, storage })

    return upload
}

// export default uploadFile