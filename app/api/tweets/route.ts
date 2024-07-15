import prisma from "@/prisma";
import { connectToDB } from "@/utils"
import { NextResponse } from "next/server";

interface TweetRequest {
    tweet: string;
    userId: string;
}

interface UserRequest {
    name: string;
    email: string;
    password: string;
}

export const GET = async (req: Request) => {
    try {
        await connectToDB();
        const res = await prisma.tweets.findMany({});
        return NextResponse.json({ res }, { status: 200 });

    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });

    } finally {
        await prisma.$disconnect();

    }
}

// creating new tweets
export const POST = async (req: Request) => {
    try {

        const body: TweetRequest = await req.json();
        const { tweet, userId} = body;
        if (!tweet || !userId) {
            return NextResponse.json({ error: "Invalid data" }, { status: 422 });
        }
        await connectToDB();
        const existingUser = await prisma.user.findFirst({
            where: {
                id: userId,
            }
        })
        if (!existingUser) {
            return NextResponse.json({ message: "user not found" }, { status: 401 });

        }
        if (existingUser) {
            const res = await prisma.tweets.create({
                data: {
                    tweet: tweet,
                    userId: userId,
                }
            });

            return NextResponse.json({ message: 'tweet has been posted' }, { status: 200 });
        }

    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });

    } finally {
        await prisma.$disconnect();

    }
}

