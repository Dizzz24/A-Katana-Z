import bcrypt from "bcryptjs"

export const hashPass = (pass: string): string => {
    return bcrypt.hashSync(pass)
}

export const verifyPass = (pass: string, hashPass: string): boolean => {
    return bcrypt.compareSync(pass, hashPass)
}