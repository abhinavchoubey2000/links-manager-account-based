"use client";
import gsap from "gsap";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSignupMutation } from "@/redux/api-slices";
import { Loader2, UserRoundPlusIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export default function SignUp() {
	// States and Hookes
	const router = useRouter();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [signup, { isLoading }] = useSignupMutation();
	const { isAuthenticated } = useSelector((state: RootState) => state.User);

	// refs of performing animations
	const logoRef = useRef(null);

	// Conditions
	useEffect(() => {
		if (isAuthenticated) {
			router.replace("/");
		}
	}, [isAuthenticated, router]);

	// Functions
	const createAccount = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const response = await signup({ email, password, name });
		if (response.data.success) {
			toast.success(
				`Account created successfully, now please login with your credentials.`,
				{ duration: 8000, position: "top-right" }
			);
			return router.push("/login");
		}
		toast.error(`${response.data.message}`);
	};

	useGSAP(() => {
		gsap.from(logoRef.current, {
			x: 300,
			opacity: 0,
			rotate: 360,
			duration: 1,
		});
	});

	return (
		<div className="flex flex-col items-center w-full h-screen overflow-hidden">
			<h1 className="scroll-m-20 my-5 text-xl text-center font-extrabold tracking-tight lg:text-4xl">
				Create your account
			</h1>
			<Link href={"/"}>
				<Image
					ref={logoRef}
					className="my-10"
					src={"/logo.png"}
					alt="logo"
					width={130}
					height={130}
				/>
			</Link>

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

				<Button className="w-full" type="submit">
					Sign Up
					{!isLoading ? (
						<UserRoundPlusIcon />
					) : (
						<Loader2 className="animate-spin" />
					)}
				</Button>
			</form>
			<p className="flex my-2 flex-col gap-3 justify-center items-center">
				<span className="opacity-[0.6]">Already have an account? </span>
				<Link className="underline text-[#f7ff00]" href="/login">
					Login now.
				</Link>
			</p>
		</div>
	);
}
