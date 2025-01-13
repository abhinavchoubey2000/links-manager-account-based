"use client";
import gsap from "gsap";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, LogInIcon } from "lucide-react";
import { useLoginMutation } from "@/redux/api-slices";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useRef, useEffect } from "react";
import { handleAuthentication, storeUserDataInState } from "@/redux/slices";

export default function Login() {
	// States and Hooks
	const router = useRouter();
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [login, { isLoading }] = useLoginMutation();
	const { isAuthenticated } = useSelector((state: RootState) => state.User);

	// refs of performing animations
	const logoRef = useRef(null);

	// Condtions
	useEffect(() => {
		if (isAuthenticated) {
			router.replace("/");
		}
	}, [isAuthenticated, router]);

	// Functions
	const loginAccount = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const response = await login({ email, password });
		if (response.data.success) {
			dispatch(storeUserDataInState(response.data.data));
			dispatch(handleAuthentication(true));
			return router.push("/");
		}
		toast.error("Invalid credentials, please try again.", {
			position: "top-right",
		});
	};

	const performAnimation = () => {
		gsap.from(logoRef.current, {
			x: -300,
			opacity: 0,
			rotate: 360,
			duration: 1,
		});
	};
	useGSAP(performAnimation);

	return (
		<div className="flex flex-col items-center w-full h-screen overflow-hidden">
			<h1 className="scroll-m-20 my-5 text-xl text-center font-extrabold tracking-tight lg:text-4xl">
				Log In
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
				<span className="opacity-[0.6]">Don&apos;t have account? </span>
				<Link className="underline text-[#f7ff00]" href="/signup">
					Create account
				</Link>
			</p>
		</div>
	);
}
