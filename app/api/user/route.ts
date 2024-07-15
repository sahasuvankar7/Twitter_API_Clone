import prisma from "@/prisma";
import { connectToDB } from "@/utils"
import { NextResponse } from "next/server";

export const GET = async (req:Request)=>{
    try {
        await connectToDB(); // to connect to db
        const users = await prisma.user.findMany({include:{tweets:true}});
        return NextResponse.json({users},{status:200});
        
    } catch (error:any) {
        console.log(error);
        return NextResponse.json({error:error.message},{status:500});   
    }finally{
        await prisma.$disconnect();// to disconnect from db after the operation is done 
    }
}
