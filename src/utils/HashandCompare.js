import bcrypt from 'bcryptjs'

export const hashPass = (plainText , sult = +process.env.SULT_ROUND) => {
    const hashPassword = bcrypt.hashSync(plainText, parseInt(sult))
    return hashPassword
}

export const compare = ({plainText , hashValeau} = {}) => {
    const match= bcrypt.compareSync(plainText ,hashValeau)
    return match 
}