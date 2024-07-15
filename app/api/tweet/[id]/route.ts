import prisma from "@/prisma";
import { connectToDB } from "@/utils"
import { NextResponse } from "next/server";

interface TweetRequest {
    tweet: string;
}
export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    // destructing the params so that we can get the params
    try {
        await connectToDB();
        const tweet = await prisma.tweets.findFirst({
            where: {
                id: params.id
            }
        })
        return NextResponse.json({ tweet }, { status: 200 });
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ error: error.message }, { status: 500 });

    }
    finally {
        await prisma.$disconnect();
    }
}
export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
    // destructing the params so that we can get the params
    try {
        const body: TweetRequest = await req.json();    
        const {tweet} = body;

        await connectToDB();
        const updateTweet = await prisma.tweets.update({ 
            data:{
                tweet: tweet
            },where:{
                id: params.id
            }
        })
        return NextResponse.json({ updateTweet }, { status: 200 });
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ error: error.message }, { status: 500 });

    }
    finally {
        await prisma.$disconnect();
    }
}

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    // destructing the params so that we can get the params
    try {
        await connectToDB();
        const tweet = await prisma.tweets.delete({
            where: {
                id: params.id
            }
        })
        return NextResponse.json({ tweet }, { status: 200 });
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ error: error.message }, { status: 500 });

    }
    finally {
        await prisma.$disconnect();
    }
}