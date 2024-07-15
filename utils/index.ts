import prisma from "@/prisma"

export const connectToDB = async ()=>{
    try {
        await prisma.$connect();
        
    } catch (error:any) {
        console.log(error.message);
    }

}