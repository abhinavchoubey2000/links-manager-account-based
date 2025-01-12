"use client";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, LogInIcon } from "lucide-react";
import { useLoginMutation } from "@/redux/api-slices";
import { useDispatch, useSelector } from "react-redux";
import { handleAuthentication, storeUserDataInState } from "@/redux/slices";
import { RootState } from "@/redux/store";

export default function Login() {
	// States and Hooks
	const router = useRouter();
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [login, { isLoading }] = useLoginMutation();
	const { isAuthenticated } = useSelector((state: RootState) => state.User);

	// Condtions
	if (isAuthenticated) return router.replace("/");

	// Functions
	const loginAccount = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const response = await login({ email, password });
		if (response.data.success) {
			dispatch(storeUserDataInState(response.data.data));
			dispatch(handleAuthentication(true));
			return router.push("/");
		}
		toast.error("Invalid credentials, please try again.");
	};

	return (
		<div className="flex flex-col items-center w-full h-screen">
			<h1 className="scroll-m-20 my-5 text-xl text-center font-extrabold tracking-tight lg:text-4xl">
				Log In
			</h1>
			<Image
				className="my-10"
				src={"/logo.png"}
				alt="logo"
				width={130}
				height={130}
			/>

			<form
				onSubmit={loginAccount}
				className="w-full px-2 lg:w-2/6  flex flex-col items-center gap-8"
			>
				<Input
					className="bg-seconday"
					required
					type="email"
					placeholder="*Email"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
				<Input
					className="bg-seconday"
					placeholder="*Password"
					required
					type="password"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>

				<Button type="submit" className="w-full">
					Log in
					{!isLoading ? <LogInIcon /> : <Loader2 className="animate-spin" />}
				</Button>
			</form>
			<p className="flex my-2 flex-col gap-3 justify-center items-center">
				<span className="opacity-[0.6]">Don't have account? </span>
				<Link className="underline text-[#f7ff00]" href="/signup">
					Create account
				</Link>
			</p>
		</div>
	);
}
