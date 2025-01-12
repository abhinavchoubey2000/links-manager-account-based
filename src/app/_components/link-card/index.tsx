import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { OptionsButton } from "./_components";
export function LinkCard({
	id,
	url,
	fullname,
	icon_url,
	shortname,
	linkColor,
}: LinkCardPropsInterface) {
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
	return (
		<div className="flex flex-row gap-1 justify-center items-center ">
			<Link href={url}>
				<Button
					title={fullname}
					style={{ backgroundColor: colorsArray[linkColor] }}
					className="flex w-40 text-white tracking-[0.1em]"
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
