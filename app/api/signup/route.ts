// post request 


import prisma from "@/prisma";
import { connectToDB } from "@/utils";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";


interface UserRequest {
    name: string;
    email: string;
    password: string;
}


export const POST = async (req: Request) => {
    try {
        await connectToDB(); // to connect to db

        const body: UserRequest = await req.json();
        const { name, email, password } = body;

        if (!name || !email || !password) {
            return NextResponse.json({ error: "Please fill all the fields" }, { status: 400 });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        // if user is already present in the database
        const userExist = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (!userExist) {
            const user = await prisma.user.create({
                data: {
                    email: email,
                    name: name,
                    password: hashedPassword
                }
            })
            return NextResponse.json({ message: "user has been created" }, { status: 200 });
        } else {
            return NextResponse.json({ message: "user already exists" },{status:401});
        }


    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });

    } finally {
        await prisma.$disconnect();
    }

}