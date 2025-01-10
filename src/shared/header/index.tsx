import React from "react";
import { Button } from "@/components/ui/button";
import {
	LogOutIcon,
	LogInIcon,
	UserRoundPlusIcon,
	Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { useLogoutMutation } from "@/redux/api-slices";
import { handleAuthentication } from "@/redux/slices";

export function Header() {
	const { isAuthenticated, userData } = useSelector(
		(state: RootState) => state.User
	);
	const dispatch = useDispatch();
	const [logout, { isLoading }] = useLogoutMutation();
	const router = useRouter();

	const logoutAccount = async () => {
		await logout();
		dispatch(handleAuthentication(false));
		router.push("/login");
	};
	return (
		<div className="flex flex-row items-center justify-between w-full px-4 py-4">
			<Image
				src={"/logo.png"}
				alt="logo"
				width={50}
				height={50}
				className="hidden lg:mr-36 lg:block "
			/>
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
						<Button variant={"default"} title="Login">
							<LogInIcon />
							<span className="text-xs hidden lg:block">Login</span>
						</Button>
					</Link>
					<Link
						href={"/signup"}
						className="flex flex-col justify-center items-center"
					>
						<Button variant={"secondary"} title="Create account">
							<UserRoundPlusIcon />
							<span className="text-xs hidden lg:block">Signup</span>
						</Button>
					</Link>
				</div>
			)}
		</div>
	);
}
