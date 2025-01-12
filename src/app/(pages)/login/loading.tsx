import { Loader } from "@/shared";
import React from "react";

export default function Loading() {
	return (
		<div className="h-screen w-full flex justify-center items-center">
			<Loader title="Loading..." />
		</div>
	);
}
