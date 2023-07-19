import { sendEmail } from "@/helpers/mailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, _id } = reqBody;
        await sendEmail({email, emailType: "RESET", userID: _id});
    } catch (error: any) {
        console.log(error);
    }
    return NextResponse.json({
        message: "token generated successfully",
        success: true
    });
}