"use client";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { handleAuthentication } from "@/redux/slices";
import { useLogoutMutation } from "@/redux/api-slices";
import { useSelector, useDispatch } from "react-redux";
import {
	Loader2,
	LogInIcon,
	LogOutIcon,
	UserRoundPlusIcon,
} from "lucide-react";

export function Header() {
	// States and Hooks
	const router = useRouter();
	const dispatch = useDispatch();
	const [logout, { isLoading }] = useLogoutMutation();
	const { isAuthenticated, userData } = useSelector(
		(state: RootState) => state.User
	);

	// Ref of performing animations
	const loginButtonRef = useRef(null);
	const logoutButtonRef = useRef(null);
	const signupButtonRef = useRef(null);
	const logoRef = useRef(null);

	// Functions
	const logoutAccount = async () => {
		await logout();
		dispatch(handleAuthentication(false));
		router.push("/login");
	};

	const performAnimations = () => {
		const tl = gsap.timeline();
		tl.from(loginButtonRef.current, {
			y: -50,
			opacity: 0,
			duration: 0.4,
		});
		tl.from(signupButtonRef.current, {
			y: -50,
			opacity: 0,
			duration: 0.4,
		});
		tl.from(logoRef.current, {
			scale: 0,
			opacity: 0,
			duration: 0.5,
		});
	};

	useGSAP(performAnimations);
	return (
		<div className="flex flex-row items-center justify-between w-full px-4 py-4">
			<Link href={'/'}>
				<Image
					ref={logoRef}
					src={"/logo.png"}
					alt="logo"
					width={50}
					height={50}
					className="hidden lg:mr-36 lg:block "
				/>
			</Link>
			<h1 className="scroll-m-20 text-lg text-center font-extrabold tracking-tight lg:text-4xl">
				{isAuthenticated ? (
					<span>
						Hi there{" "}
						<span className="text-[#f7ff00]">
							{userData.name?.split(" ")[0]}
						</span>
						, feel free to add your links here
					</span>
				) : (
					"Welcome to Link Manager"
				)}
			</h1>
			{isAuthenticated ? (
				<div className="flex gap-4 items-center">
					<Button
						ref={logoutButtonRef}
						onClick={logoutAccount}
						title="Logout account"
						variant={"destructive"}
					>
						{!isLoading ? <LogOutIcon /> : <Loader2 className="animate-spin" />}
						<span className="text-xs hidden lg:block">Logout</span>
					</Button>
				</div>
			) : (
				<div className="flex gap-4 items-center">
					<Link
						href={"/login"}
						className="flex flex-col justify-center items-center"
					>
						<Button ref={loginButtonRef} variant={"default"} title="Login">
							<LogInIcon />
							<span className="text-xs hidden lg:block">Login</span>
						</Button>
					</Link>
					<Link
						href={"/signup"}
						className="flex flex-col justify-center items-center"
					>
						<Button
							ref={signupButtonRef}
							variant={"secondary"}
							title="Create account"
						>
							<UserRoundPlusIcon />
							<span className="text-xs hidden lg:block">Signup</span>
						</Button>
					</Link>
				</div>
			)}
		</div>
	);
}
