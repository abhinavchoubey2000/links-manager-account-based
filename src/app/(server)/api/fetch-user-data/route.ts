import { NextResponse } from "next/server";
import { Users } from "@/app/(server)/database/db";
import { cookies } from "next/headers";

export async function GET(request: Request) {
	
	
	try {
		const cookie = cookies();
		const currentCookie = (await cookie).get("token");

		if (!currentCookie) {
			return NextResponse.json({
				success: false,
				message:
					"Your are not authorized to perform this action. You need to login first.",
			});
		}
		const userId = atob(String(currentCookie?.value));
		const matchedUser = await Users.findUnique({
			where: { id: userId },
			include: { links: {} },
		});

		return NextResponse.json({
			success: true,
			message: `Fetched data for ${matchedUser?.name}.`,
			data: matchedUser,
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
