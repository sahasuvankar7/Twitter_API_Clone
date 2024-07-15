import prisma from "@/prisma";
import { connectToDB } from "@/utils";
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";

interface UserRequest {
    email: string;
    password: string;
}
export const POST = async (req: Request) => {

    try {
        await connectToDB();
        const body: UserRequest = await req.json();
        const { email, password } = body;
        const response = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (response && response.password) {
            const isPasswordValid = await bcrypt.compare(password, response.password)
            if (isPasswordValid) {
                return NextResponse.json({ message: "log in successfull" }, { status: 200 });
            } else {
                return NextResponse.json({ message: "invalid credentials" }, { status: 400 });
            }
        }

    } catch (err: any) {
        console.log(err.message);
        return NextResponse.json({ message: "internal server error" }, { status: 500 });

    } finally {
        await prisma.$disconnect();
    }


}