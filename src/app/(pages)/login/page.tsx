"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, LogInIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useLoginMutation } from "@/redux/api-slices";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { handleAuthentication, storeUserDataInState } from "@/redux/slices";

export default function Login() {
	const router = useRouter();
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [login, { isLoading }] = useLoginMutation();
	const dispatch = useDispatch();

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

				<p className="self-end">
					Don't have account?{" "}
					<Link className="underline" href="/signup">
						Create account
					</Link>
				</p>
				<Button type="submit">
					Log in
					{!isLoading ? <LogInIcon /> : <Loader2 className="animate-spin" />}
				</Button>
			</form>
		</div>
	);
}
