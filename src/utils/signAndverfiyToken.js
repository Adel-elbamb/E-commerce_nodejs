 import jwt from 'jsonwebtoken'

 export  const genrateToken = ({payload = {} , Signture = process.env.TOKEN_SIGNETURE  ,expireIn =  60*60} = {}) => {
    const token = jwt.sign(payload , Signture , {expiresIn : (parseInt(expireIn))})
    return token 
 }

  export const verify = ({token , Signture =  process.env.TOKEN_SIGNETURE } = {}) => {
    const decode = jwt.verify(token , Signture)
    return decode 
 }
