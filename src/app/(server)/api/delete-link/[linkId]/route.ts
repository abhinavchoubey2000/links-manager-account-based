import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Links } from "@/app/(server)/database/db";

export async function DELETE(
	// Getting linkId from the url as params
	request: Request,
	{ params }: { params: Promise<{ linkId: number }> }
) {
	try {
		// Getting cookie and LinkId
		const cookie = cookies();
		const linkId = String((await params).linkId);
		const currentCookie = (await cookie).get("token");

		// Checking if there is not cookie present then login first
		if (!currentCookie) {
			return NextResponse.json({
				success: false,
				message:
					"Your are not authorized to perform this action. You need to login first.",
			});
		}

		// Checking if linkId is not provided then provide it first
		if (!linkId) {
			return NextResponse.json({
				success: false,
				message: "Link ID is required",
			});
		}

		// Deleting link from Links table by linkId
		const deletedLink = await Links.delete({ where: { id: linkId } });

		// Returning response with deleted link object
		return NextResponse.json({
			success: true,
			message: "Link deleted successfully",
			data: deletedLink,
		});
	} catch (error) {
		// Catching error
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
