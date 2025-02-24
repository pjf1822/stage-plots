import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { comment } = await req.json();

    if (!comment || !comment.trim()) {
      return NextResponse.json(
        { message: "Message cannot be empty" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "pjf18222@gmail.com",
        pass: process.env.GOOGLE_PASSCODE,
      },
    });

    const mailOptions = {
      to: "pjf18222@gmail.com",
      subject: "New Suggestion Submitted",
      text: `New message: ${comment}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { message: "Failed to send message" },
      { status: 500 }
    );
  }
}
