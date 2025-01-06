import { NextResponse } from "next/server";
import {LINKS} from "@/app/(server)/database/db";

export async function GET() {
	try {
		const res = await LINKS.findMany({});
		return NextResponse.json({
			success: true,
			message: "Fetched data successfully",
			data: res,
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
