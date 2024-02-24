import connection from './DB/connection.js'
import catogreyRouter from './modules/catogrey/catogrey.router.js'
import SubcatogeryRouter from './modules/subcatogery/subcatogery.router.js'
import { globalError } from './utils/asyncHandeller.js'
const bootstrap = (app , express)=> {
    app.use(express.json())
    connection()
    app.use('/categrey' , catogreyRouter)
    app.use('/subcatogery' , SubcatogeryRouter)

    app.use( '*' , (req ,res, next) => {
    return res.json({message : 'invalid routing '})
    })

    app.use(globalError)
}

export  default  bootstrap 