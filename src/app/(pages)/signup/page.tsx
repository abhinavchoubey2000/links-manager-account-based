"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignupMutation } from "@/redux/api-slices";
import { Loader2, UserRoundPlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function SignUp() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [signup, { isLoading }] = useSignupMutation();
	const router = useRouter();

	const createAccount = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const response = await signup({ email, password, name });
		if (response.data.success) {
			toast.success(
				`Account created successfully, now please login with your credentials.`,
				{ duration: 8000 }
			);
			return router.push("/login");
		}
		toast.error(`${response.data.message}`);
	};

	return (
		<div className="flex flex-col items-center w-full h-screen">
			<h1 className="scroll-m-20 my-5 text-xl text-center font-extrabold tracking-tight lg:text-4xl">
				Create your account
			</h1>
			<Image
				className="my-10"
				src={"/logo.png"}
				alt="logo"
				width={130}
				height={130}
			/>

			<form
				onSubmit={createAccount}
				className="w-full px-2 lg:w-2/6  flex flex-col items-center gap-8"
			>
				<Input
					className="bg-seconday"
					required
					type="text"
					placeholder="*Name"
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}}
				/>
				<Input
					className="bg-seconday"
					placeholder="*Email"
					required
					type="email"
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
					Already have an account?{" "}
					<Link className="underline" href="/login">
						Login now.
					</Link>
				</p>
				<Button type="submit">
					Sign Up
					{!isLoading ? (
						<UserRoundPlusIcon />
					) : (
						<Loader2 className="animate-spin" />
					)}
				</Button>
			</form>
		</div>
	);
}
