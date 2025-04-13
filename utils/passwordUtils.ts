import bycrpt from 'bcrypt'

export const comparePassword = async (hashedPassword: string, plainPassword: string) : Promise<Boolean> => {
    const isPasswordCorrect = await bycrpt.compare(plainPassword, hashedPassword)
    return isPasswordCorrect
}

export const hashPassword = async(plainPassword: string) : Promise<string> => {
    const hashedPassword = await bycrpt.hash(plainPassword, 10) as string
    return hashedPassword
}