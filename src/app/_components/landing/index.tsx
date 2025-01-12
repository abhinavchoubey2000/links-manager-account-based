import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogInIcon, UserRoundPlusIcon } from "lucide-react";

export function Landing() {
	return (
		<div className="w-full h-full px-6 py-6 text-center flex flex-col justify-between">
			<h1 className="text-[#f7ff00] scroll-m-20 text-lg font-extrabold tracking-tight lg:text-2xl">
				All your links at one place.
			</h1>
			<p className="italic font-bold tracking-wider text-xs lg:text-md">
				Stay organized, save time, and access your favorite links effortlessly.
			</p>
			<p className="italic font-bold tracking-wider text-xs lg:text-md">
				Simplify your digital life with a sleek and easy-to-use link management
				tool.
			</p>
			<div className="flex justify-between flex-col lg:flex-row gap-4 p-8">
				<div className="text-center flex flex-col gap-3">
					<h1 className="text-[#f7ff00] scroll-m-20 text-lg font-extrabold tracking-tight lg:text-2xl ">
						Don&apos;t have account?
					</h1>
					<p className="italic font-bold tracking-wider text-xs lg:text-md">
						Start managing your links today.
					</p>
					<Link href={"/signup"}>
						<Button className="text-left font-bold" variant={"outline"}>
							Create one now
							<UserRoundPlusIcon className="lg:hidden" />
						</Button>
					</Link>
				</div>
				<div className="text-center flex flex-col gap-3">
					<h1 className="text-[#f7ff00] scroll-m-20 text-lg font-extrabold tracking-tight lg:text-2xl ">
						Already a user?
					</h1>
					<p className="italic font-bold tracking-wider text-xs lg:text-md">
						Welcome back and start accessing your links.
					</p>
					<Link href={"/login"}>
						<Button className="text-left font-bold" variant={"outline"}>
							Login now
							<LogInIcon className="lg:hidden" />
						</Button>
					</Link>
				</div>
			</div>
			<div className="flex flex-col gap-3 items-center">
				<h1 className="text-[#f7ff00] scroll-m-20 text-lg font-extrabold tracking-tight lg:text-2xl">
					Features at a glance:
				</h1>
				<ul className="list-disc list-inside text-left inline-flex flex-col gap-2 italic font-bold tracking-wider text-xs lg:text-md">
					<li>Save and organize links effortlessly.</li>
					<li>Access your links anytime, anywhere.</li>
					<li>Clean and simple design for quick navigation.</li>
					<li>Save your links with favourite colors.</li>
				</ul>
			</div>
		</div>
	);
}
