"use client";

import { RootState } from "@/redux/store";
import { LinkCard, AddLinkButton, Landing } from "./_components";
import { useSelector } from "react-redux";
import { Loader } from "lucide-react";
import { Header } from "@/shared";
export default function Home() {
	const { loading, userData, isAuthenticated } = useSelector(
		(state: RootState) => state.User
	);

	return (
		<div className="flex flex-col items-center w-full h-screen">
			<Header />
			<div className="w-full h-4/5 bg-[#1f1f1f] rounded-md flex flex-wrap items-center justify-center gap-4 lg:w-4/5 overflow-y-auto">
				{!isAuthenticated ? (
					<Landing />
				) : loading ? (
					<Loader className="w-20 h-20 animate-spin" />
				) : (
					<>
						{userData.links?.length !== 0
							? userData.links?.map((link: LinkObjectInterface, index) => {
									return (
										<LinkCard
											key={index}
											id={link.id}
											fullname={link.fullname}
											shortname={link.shortname}
											url={link.url}
											icon_url={link.icon_url}
										/>
									);
							  })
							: null}
						<AddLinkButton />
					</>
				)}
			</div>
		</div>
	);
}
