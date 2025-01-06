import { NextResponse } from "next/server";
import { Links } from "@/app/(server)/database/db";
import { cookies } from "next/headers";

export async function POST(request: Request) {
	try {
		const { url, fullname }: AddLinkDataRequestInterface = await request.json();
		const cookie = cookies();
		const currentCookie = (await cookie).get("token");

		if (!currentCookie) {
			return NextResponse.json({
				success: false,
				message:
					"Your are not authorized to perform this action. You need to login first.",
			});
		}

		const getIconUrl: GetIconUrlFunctionInterface = (url) => {
			const protocol = url.split("/")[0];
			const hostname = new URL(url).hostname;
			const iconUrl = `${protocol}//${hostname}/favicon.ico`;
			return iconUrl;
		};

		if (!url || !fullname) {
			return NextResponse.json({
				success: false,
				message: "All fields are required",
			});
		}

		const icon_url = getIconUrl(url);

		const shortname =
			fullname.length > 12 ? fullname.slice(0, 12) + "..." : fullname;

		// Create and save new Link
		const userId = atob(String(currentCookie.value));

		const newLink = await Links.create({
			data: {
				fullname,
				shortname,
				icon_url,
				url,
				userId,
			},
		});

		return NextResponse.json({
			success: true,
			message: "New link created.",
			newLink,
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
