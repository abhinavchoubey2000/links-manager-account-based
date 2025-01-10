import { Loader } from "lucide-react";
import React from "react";

export default function Loading() {
	return (
		<div className="h-screen w-full flex justify-center items-center">
			<Loader className="w-20 h-20 animate-spin" />
		</div>
	);
}
