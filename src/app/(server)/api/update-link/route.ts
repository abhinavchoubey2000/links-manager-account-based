import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Links } from "@/app/(server)/database/db";

export async function PUT(request: Request) {
	try {
		// Getting cookies
		const cookie = cookies();
		const currentCookie = (await cookie).get("token");

		// Getting data from the client
		const { id, fullname, url, linkColor }: UpdateLinkDataRequestInterface =
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

		// Getting favicon url
		const icon_url = getIconUrl(url);

		// Creating shortname from updated fullname
		const shortname =
			fullname.length > 12 ? fullname.slice(0, 12) + "..." : fullname;

		// Updating and saving the data in the database
		const updatedLink = await Links.update({
			where: { id },
			data: {
				fullname,
				url,
				shortname,
				linkColor,
				icon_url,
			},
		});

		// Returning the the response with updated data
		return NextResponse.json({
			success: true,
			message: "Name updated successfully",
			data: updatedLink,
		});
	} catch (error) {
		// Cathing error
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
