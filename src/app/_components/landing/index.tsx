"use client";
import gsap from "gsap";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { LogInIcon, UserRoundPlusIcon } from "lucide-react";

export function Landing() {
	// All refs to animate
	const loginRef = useRef(null);
	const signupRef = useRef(null);
	const headingRef = useRef(null);
	const glance1Ref = useRef(null);
	const glance2Ref = useRef(null);
	const glance3Ref = useRef(null);
	const glance4Ref = useRef(null);

	// Animation function
	const performAnimations = () => {
		const tl = gsap.timeline();
		tl.from(headingRef.current, {
			y: 100,
			duration: 0.5,
			opacity: 0,
			scale: 0,
		});
		tl.from(glance1Ref.current, {
			x: 100,
			duration: 0.5,
			opacity: 0,
		});
		tl.from(glance2Ref.current, {
			x: 100,
			duration: 0.5,
			opacity: 0,
		});
		tl.from(glance3Ref.current, {
			x: 100,
			duration: 0.5,
			opacity: 0,
		});
		tl.from(glance4Ref.current, {
			x: 100,
			duration: 0.5,
			opacity: 0,
		});
		tl.from(signupRef.current, {
			y: -100,
			duration: 0.5,
			opacity: 0,
		});
		tl.from(loginRef.current, {
			y: 100,
			duration: 0.5,
			opacity: 0,
		});
	};

	// Calling animations
	useGSAP(performAnimations);
	return (
		<div className="w-full h-full px-6 py-6 text-center flex flex-col justify-between overflow-hidden">
			<h1
				ref={headingRef}
				className="text-[#f7ff00] scroll-m-20 text-lg font-extrabold tracking-tight lg:text-2xl"
			>
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
				<div ref={signupRef} className="text-center flex flex-col gap-3">
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
				<div ref={loginRef} className="text-center flex flex-col gap-3">
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
					<li ref={glance1Ref}>Save and organize links effortlessly.</li>
					<li ref={glance2Ref}>Access your links anytime, anywhere.</li>
					<li ref={glance3Ref}>
						Clean and simple design for quick navigation.
					</li>
					<li ref={glance4Ref}>Save your links with favourite colors.</li>
				</ul>
			</div>
		</div>
	);
}
