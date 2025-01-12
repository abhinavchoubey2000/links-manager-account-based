import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Links } from "@/app/(server)/database/db";

export async function POST(request: Request) {
	try {
		// Getting cookies
		const cookie = cookies();
		const currentCookie = (await cookie).get("token");
		
		// Getting data from client
		const { url, fullname, linkColor }: AddLinkDataRequestInterface =
			await request.json();

		// Checking if there is not cookie present then login first
		if (!currentCookie) {
			return NextResponse.json({
				success: false,
				message:
					"Your are not authorized to perform this action. You need to login first.",
			});
		}

		// Function to create favicon url
		const getIconUrl: GetIconUrlFunctionInterface = (url) => {
			const protocol = url.split("/")[0];
			const hostname = new URL(url).hostname;
			const iconUrl = `${protocol}//${hostname}/favicon.ico`;
			return iconUrl;
		};

		// Checking if url or fullname is given or not
		if (!url || !fullname) {
			return NextResponse.json({
				success: false,
				message: "All fields are required",
			});
		}
		// Getting favicon url
		const icon_url = getIconUrl(url);

		// Creating short name from fullname
		const shortname =
			fullname.length > 12 ? fullname.slice(0, 12) + "..." : fullname;

		// Parsing base-64 string to an userId string
		const userId = atob(String(currentCookie.value));

		// Creating and saving new link to database
		const newLink = await Links.create({
			data: {
				fullname,
				shortname,
				icon_url,
				url,
				userId,
				linkColor,
			},
		});

		// Returning response with created link object
		return NextResponse.json({
			success: true,
			message: "New link created.",
			data: newLink,
		});
	} catch (error) {
		// Catching error
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
