import { NextResponse } from "next/server";
import { Links } from "@/app/(server)/database/db";
import { cookies } from "next/headers";

export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ linkId: number }> }
) {
	try {
		const linkId = String((await params).linkId);
		const cookie = cookies();
		const currentCookie = (await cookie).get("token");

		if (!currentCookie) {
			return NextResponse.json({
				success: false,
				message:
					"Your are not authorized to perform this action. You need to login first.",
			});
		}

		if (!linkId) {
			return NextResponse.json({
				success: false,
				message: "Link ID is required",
			});
		}
		const deletedLink = await Links.delete({ where: { id: linkId } });

		return NextResponse.json({
			success: true,
			message: "Link deleted successfully",
			data: deletedLink,
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
