import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {LinkIcon} from "lucide-react"
import Link from "next/link";
import React from "react";
import { OptionsButton } from "./_components";
export function LinkCard({
	id,
	url,
	fullname,
	icon_url,
	shortname,
}: LinkCardPropsInterface) {
	return (
		<div className="flex flex-row gap-1 justify-center items-center ">
			<Link href={url}>
				<Button title={fullname} variant={"secondary"} className="flex w-40">
					<Avatar className="h-6 w-6">
						<AvatarImage loading="eager" src={icon_url} />
						<AvatarFallback className="flex items-center justify-center">
							<LinkIcon/>
						</AvatarFallback>
					</Avatar>
					{shortname}
				</Button>
			</Link>
			<OptionsButton id={id} fullname={fullname} url={url} />
		</div>
	);
}
