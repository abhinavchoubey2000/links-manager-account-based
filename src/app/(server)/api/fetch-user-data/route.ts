import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Users } from "@/app/(server)/database/db";

export async function GET() {
	try {
		// Getting cookies
		const cookie = cookies();
		const currentCookie = (await cookie).get("token");

		// Checking if there is not cookie present then login first
		if (!currentCookie) {
			return NextResponse.json({
				success: false,
				message:
					"Your are not authorized to perform this action. You need to login first.",
			});
		}

		// Converting base-64 string to userId
		const userId = atob(String(currentCookie?.value));

		// Getting user object with matched userId with included its link object
		const matchedUser = await Users.findUnique({
			where: { id: userId },
			include: { links: {} },
		});

		// Returning the response with found user object
		return NextResponse.json({
			success: true,
			message: `Fetched data for ${matchedUser?.name}.`,
			data: matchedUser,
		});
	} catch (error) {
		// Catching error
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
