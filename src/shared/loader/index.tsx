import React from "react";
import { Loader2 } from "lucide-react";

export function Loader({title}:{title:string}) {
	return (
		<div className="flex justify-center items-center gap-4">
			<p className="text-xl lg:text-5xl text-center text-[#f7ff00] tracking-wider">
				{title}
			</p>
			<Loader2 className="w-10 h-10 lg:w-14 lg:h-14 animate-spin" />
		</div>
	);
}
