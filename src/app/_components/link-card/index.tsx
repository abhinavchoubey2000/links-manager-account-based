"use client";
import gsap from "gsap";
import Link from "next/link";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { LinkIcon } from "lucide-react";
import { OptionsButton } from "./_components";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function LinkCard({
	id,
	url,
	fullname,
	icon_url,
	shortname,
	linkColor,
}: LinkCardPropsInterface) {
	// Colors Object
	const colorsArray: { [key: string]: string } = {
		Default: "#292524",
		Green: "#166534",
		Blue: "#0e7490",
		Purple: "#3b0764",
		Pink: "#831843",
		Red: "#991b1b",
		Orange: "#c2410c",
		Yellow: "#ca8a04",
		Black: "#000000",
		Brown: "#431407",
	};

	const linkCardRef = useRef(null);

	useGSAP(() => {
		const tl = gsap.timeline();
		tl.from(linkCardRef.current, {
			y: -100,
			opacity: 0,
			duration: 1,
		});
	});
	return (
		<div
			ref={linkCardRef}
			className="flex flex-row gap-1 justify-center items-center "
		>
			<Link href={url}>
				<Button
					title={fullname}
					style={{ backgroundColor: colorsArray[linkColor] }}
					className="flex justify-start w-44 text-white tracking-[0.1em]"
				>
					<Avatar className="h-6 w-6 bg-transparent">
						<AvatarImage
							loading="eager"
							className="bg-transparent"
							src={icon_url}
						/>
						<AvatarFallback className="flex items-center justify-center bg-transparent">
							<LinkIcon />
						</AvatarFallback>
					</Avatar>
					{shortname}
				</Button>
			</Link>
			<OptionsButton
				id={id}
				fullname={fullname}
				url={url}
				linkColor={{ name: linkColor, colorCode: colorsArray[linkColor] }}
			/>
		</div>
	);
}
