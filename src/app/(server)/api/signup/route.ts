import { NextResponse } from "next/server";
import { Users } from "@/app/(server)/database/db";

export async function POST(request: Request) {
	try {
		// Getting data from client
		const { name, email, password }: SignupRequestDataInterface =
			await request.json();

		// Finding the user matching is with given email
		const userExist = await Users.findFirst({
			where: {
				email,
			},
		});

		// Checking if provided email is already present in database
		if (userExist) {
			return NextResponse.json({
				success: false,
				message: "Seems like you are already registered.",
				data: userExist,
			});
		}

		// Creating and saving new user in the database
		const newUser = await Users.create({
			data: {
				name,
				email,
				password,
			},
		});

		// Returning response with created user data
		return NextResponse.json({
			success: true,
			message: "User created!",
			data: newUser,
		});
	} catch (error) {
		// Catching error
		return NextResponse.json({
			success: false,
			message: (error as Error).message,
		});
	}
}
