import { NextResponse } from "next/server";
import { Users } from "@/app/(server)/database/db";

export async function POST(request: Request) {
	try {
		//Getting data from client
		const { email, password }: LoginRequestDataInterface = await request.json();

		const matchedUser = await Users.findFirst({
			where: { email, password },
			include: { links: {} },
		});

		//Checkin login credentials
		if (!matchedUser) {
			return NextResponse.json({
				success: false,
				message: "Invalid credentials",
			});
		}

		//Instead of returning response directly, storing it into a variable to set cookies
		const response = NextResponse.json({
			success: true,
			message: `Welcome back ${matchedUser.name.split(" ")[0]}!`,
			data: matchedUser,
		});

		//Setting cookies
		const token = btoa(String(matchedUser.id));
		response.cookies.set("token", token, {
			httpOnly: true,
			secure: true,
			maxAge: 3600,
		});

		return response;
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
