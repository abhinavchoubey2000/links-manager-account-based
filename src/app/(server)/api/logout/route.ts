import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
	try {
		// Initializing cookie function
		const storedCookies = cookies();
		// Checking if cookie is already present or not
		const cookie = (await storedCookies).get("token");

		// Checking if there is no cookie
		if (!cookie) {
			return NextResponse.json({
				success: false,
				message: "You are already logged out.",
			});
		}

		// Storing response into a variable
		const response = NextResponse.json({
			success: true,
			message: "Logged out.",
		});

		//Deleting cookie
		response.cookies.delete("token");

		// Returning response
		return response;
	} catch (error) {
		// Catching error
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
