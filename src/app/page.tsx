"use client";
import { Header, Loader } from "@/shared";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { LinkCard, AddLinkButton, Landing } from "./_components";

export default function Home() {
	// Hooks
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
					<Loader title="Hang on, loading your links"/>
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
											linkColor={link.linkColor}
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
