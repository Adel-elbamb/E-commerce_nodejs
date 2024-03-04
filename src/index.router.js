import connection from './DB/connection.js'
import catogreyRouter from './modules/catogrey/catogrey.router.js'
import SubcatogeryRouter from './modules/subcatogery/subcatogery.router.js'
import brandRouter from './modules/brand/brand.router.js'
import couponRouter from './modules/coupon/coupon.router.js'
import authRouter from './modules/auth/auth.router.js'
import productRouter from './modules/product/product.router.js'
import { globalError } from './utils/asyncHandeller.js'
const bootstrap = (app , express)=> {
    app.use(express.json())
    connection()
    //router from app
    app.use('/categrey' , catogreyRouter)
    app.use('/subcatogery' , SubcatogeryRouter)
    app.use('/brand' , brandRouter)
    app.use('/coupon' , couponRouter)
    app.use('/auth' , authRouter)
    app.use('/product' , productRouter)

    app.use( '*' , (req ,res, next) => {
    return res.json({message : 'invalid routing '})
    })

    app.use(globalError)
}

export  default  bootstrap 