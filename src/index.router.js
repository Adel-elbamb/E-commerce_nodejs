import connection from './DB/connection.js'
import catogreyRouter from './modules/catogrey/catogrey.router.js'
const bootstrap = (app , express)=> {
    app.use(express.json())
    connection()
    app.use('/categrey' , catogreyRouter)

    app.use( '*' , (req ,res, next) => {
    return res.json({message : 'invalid routing '})
    })
}

export  default  bootstrap 