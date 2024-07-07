import { db } from "@/lib/db";

export const getUserByEmail = async (email : string | undefined) => {
    try {
        const user = await db.user.findUnique({
            where: {
                email,

            }
        })
        return user
    } catch (error) {
        
    }
}

export const getUserById = async (id : number) =>{
    try {
        const user = await db.user.findUnique({
            where:{
                id
            }
        })
        return user
    } catch (error) {
        return null
    }
}