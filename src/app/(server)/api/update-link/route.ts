import { NextResponse } from "next/server";
import { Links } from "@/app/(server)/database/db";
import { cookies } from "next/headers";

export async function PUT(request: Request) {
	try {
		const { id, fullname, url, linkColor }: UpdateLinkDataRequestInterface =
			await request.json();
		const cookie = cookies();
		const currentCookie = (await cookie).get("token");

		if (!currentCookie) {
			return NextResponse.json({
				success: false,
				message:
					"Your are not authorized to perform this action. You need to login first.",
			});
		}

		if (!id || !fullname || !url) {
			return NextResponse.json({
				success: false,
				message: "Link ID and Fullname are required",
			});
		}
		const shortname =
			fullname.length > 12 ? fullname.slice(0, 12) + "..." : fullname;

		const updatedLink = await Links.update({
			where: { id },
			data: {
				fullname,
				url,
				shortname,
				linkColor,
			},
		});

		return NextResponse.json({
			success: true,
			message: "Name updated successfully",
			data: updatedLink,
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
