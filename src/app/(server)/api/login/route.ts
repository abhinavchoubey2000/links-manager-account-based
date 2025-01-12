import { NextResponse } from "next/server";
import { Users } from "@/app/(server)/database/db";

export async function POST(request: Request) {
	try {
		// Getting data from client
		const { email, password }: LoginRequestDataInterface = await request.json();

		// Finding the user with matched email and password
		const matchedUser = await Users.findFirst({
			where: { email, password },
			include: { links: {} },
		});

		// Checking login credentials
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

		// Converting userId string to base-64 string and setting cookies
		const token = btoa(String(matchedUser.id));
		response.cookies.set("token", token, {
			httpOnly: true,
			secure: true,
			maxAge: 864000,
		});

		// Returning response with found user data
		return response;
	} catch (error) {
		// Catching error
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
