import { NextResponse } from "next/server";
import { Users } from "@/app/(server)/database/db";

export async function POST(request: Request) {
	try {
		//Getting data from client
		const { name, email, password }: SignupRequestDataInterface =
			await request.json();

		const userExist = await Users.findFirst({
			where: {
				email,
			},
		});

		if (userExist) {
			return NextResponse.json({
				success: false,
				message: "Seems like you are already registered.",
				data: userExist,
			});
		}

		const newUser = await Users.create({
			data: {
				name,
				email,
				password,
			},
		});

		return NextResponse.json({
			success: true,
			message: "User created!",
			data: newUser,
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
