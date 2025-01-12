"use client";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useState } from "react";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	useUpdateLinkMutation,
	useDeleteLinkMutation,
} from "@/redux/api-slices";
import {
	updateLinkInState,
	changeLoadingState,
	deleteLinkInState,
	undoLinkDeletionInState,
} from "@/redux/slices";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { RootState } from "@/redux/store";
import { ExternalLinkIcon, Loader2 } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectTrigger,
} from "@/components/ui/select";

export function OptionsButton({
	id,
	fullname,
	linkColor,
	url,
}: OptionsButtonPropInterface) {
	const [editDialogOpen, setEditDialogOpen] = useState(false);
	const [colorBoxOpen, setColorBoxOpen] = useState(false);
	const [updatedName, setUpdatedName] = useState(fullname);
	const [updatedLink, setUpdatedLink] = useState(url);
	const [color, setColor] = useState(linkColor);
	const { userData } = useSelector((state: RootState) => state.User);
	const [updateLink, { isLoading }] = useUpdateLinkMutation();
	const [deleteLink] = useDeleteLinkMutation();
	const dispatch = useDispatch();

	const removeLink = async (id: string, fullname: string) => {
		const undoUserData = userData;
		let undo = false;
		dispatch(deleteLinkInState(id));
		toast.success("Deleted", {
			description: `You have 15 seconds to undo this action.`,
			descriptionClassName: "text-red-500",
			position: "top-right",
			duration: 15000,
			action: {
				label: "Undo",
				onClick: () => {
					dispatch(undoLinkDeletionInState(undoUserData));
					undo = true;
					clearTimeout(deletePermanent);
				},
			},
		});
		// Delete the link permanently after 15 seconds
		const deletePermanent = setTimeout(async () => {
			if (!undo) {
				await deleteLink(id);
				toast.success("Deleted Successfully", {
					description: `Deleted ${fullname}`,
					position: "top-right",
					descriptionClassName: "text-red-500",
					duration: 5000,
				});
			}
		}, 16000);
	};
	const handleEdit = (fullname: string, url: string) => {
		setUpdatedName(fullname);
		setUpdatedLink(url);
		setEditDialogOpen(true);
	};
	const changeColor = (name: string, colorCode: string) => {
		setColor({ name, colorCode });
		setColorBoxOpen(false);
	};
	const editLink = async (
		id: string,
		updatedName: string,
		updatedLink: string
	) => {
		dispatch(changeLoadingState(true));
		const response = await updateLink({
			url: updatedLink,
			fullname: updatedName,
			id,
			linkColor: color.name,
		});
		toast.success(`Updated to "${response.data.data.fullname}"`, {
			description: `From "${fullname}"`,
			position: "top-right",
			descriptionClassName: "text-green-500",
			duration: 3000,
		});
		dispatch(updateLinkInState(response.data.data));
		dispatch(changeLoadingState(false));
	};
	return (
		<div>
			<DropdownMenu modal>
				<DropdownMenuTrigger asChild>
					<Button
						variant={"secondary"}
						className="p-0 bg-transparent shadow-none hover:bg-transparent"
					>
						<svg
							width="15"
							height="15"
							viewBox="0 0 15 15"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z"
								fill="currentColor"
								fillRule="evenodd"
								clipRule="evenodd"
							></path>
						</svg>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem
						onClick={() => {
							removeLink(id, fullname);
						}}
					>
						Delete
					</DropdownMenuItem>

					<DropdownMenuItem
						onClick={() => {
							handleEdit(fullname, url);
						}}
					>
						Edit
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Update</DialogTitle>
						<DialogDescription>
							Update the name and url of your link.
						</DialogDescription>
					</DialogHeader>
					<div className="flex flex-col gap-4">
						<Input
							className="bg-seconday"
							placeholder="Name"
							value={updatedName}
							onChange={(e) => {
								setUpdatedName(e.target.value);
							}}
						/>
						<Input
							className="bg-seconday"
							placeholder="URL"
							value={updatedLink}
							onChange={(e) => {
								setUpdatedLink(e.target.value);
							}}
						/>
					</div>
					<DialogFooter>
						<div className="w-full flex justify-between items-center">
							<Select open={colorBoxOpen} onOpenChange={setColorBoxOpen}>
								<SelectTrigger className="w-20 h-14">
									<div className="flex flex-col justify-between items-center gap-2">
										<span className="text-[0.60rem]">{color.name}</span>{" "}
										<p
											className="w-3 h-3 inline-block rounded-xl"
											style={{ backgroundColor: color.colorCode }}
										></p>
									</div>
								</SelectTrigger>
								<SelectContent className="w-[20rem]">
									<SelectGroup className="flex flex-row flex-wrap gap-3 w-[20rem]">
										<Button
											className="w-12 h-12 flex justify-center"
											variant={"ghost"}
											onClick={() => {
												changeColor("Default", "#292524");
											}}
											value="#292524"
										>
											<div className="flex flex-col justify-between items-center gap-2">
												<span className="text-[0.60rem]">Default</span>{" "}
												<p className="w-3 h-3 inline-block bg-[#292524] rounded-xl"></p>
											</div>
										</Button>
										<Button
											className="w-12 h-12 flex justify-center"
											variant={"ghost"}
											onClick={() => {
												changeColor("Green", "#166534");
											}}
											value="#166534"
										>
											<div className="flex flex-col justify-between items-center gap-2">
												<span className="text-[0.60rem]">Green</span>{" "}
												<p className="w-3 h-3 inline-block bg-[#166534] rounded-xl"></p>
											</div>
										</Button>
										<Button
											variant={"ghost"}
											className="w-12 h-12 flex justify-center"
											onClick={() => {
												changeColor("Blue", "#0e7490");
											}}
											value="#0e7490"
										>
											<div className="flex flex-col justify-between items-center gap-2">
												<span className="text-[0.60rem]">Blue</span>{" "}
												<p className="w-3 h-3 inline-block bg-[#0e7490] rounded-xl"></p>
											</div>
										</Button>
										<Button
											variant={"ghost"}
											className="w-12 h-12 flex justify-center"
											onClick={() => {
												changeColor("Purple", "#3b0764");
											}}
											value="#3b0764"
										>
											<div className="flex flex-col justify-between items-center gap-2">
												<span className="text-[0.60rem]">Purple</span>{" "}
												<p className="w-3 h-3 inline-block bg-[#3b0764] rounded-xl"></p>
											</div>
										</Button>
										<Button
											variant={"ghost"}
											className="w-12 h-12 flex justify-center"
											onClick={() => {
												changeColor("Pink", "#831843");
											}}
											value="#831843"
										>
											<div className="flex flex-col justify-between items-center gap-2">
												<span className="text-[0.60rem]">Pink</span>{" "}
												<p className="w-3 h-3 inline-block bg-[#831843] rounded-xl"></p>
											</div>
										</Button>
										<Button
											variant={"ghost"}
											className="w-12 h-12 flex justify-center"
											onClick={() => {
												changeColor("Red", "#991b1b");
											}}
											value="#991b1b"
										>
											<div className="flex flex-col justify-between items-center gap-2">
												<span className="text-[0.60rem]">Red</span>{" "}
												<p className="w-3 h-3 inline-block bg-[#991b1b] rounded-xl"></p>
											</div>
										</Button>
										<Button
											variant={"ghost"}
											className="w-12 h-12 flex justify-center"
											onClick={() => {
												changeColor("Orange", "#c2410c");
											}}
											value="#c2410c"
										>
											<div className="flex flex-col justify-between items-center gap-2">
												<span className="text-[0.60rem]">Orange</span>{" "}
												<p className="w-3 h-3 inline-block bg-[#c2410c] rounded-xl"></p>
											</div>
										</Button>
										<Button
											variant={"ghost"}
											className="w-12 h-12 flex justify-center"
											onClick={() => {
												changeColor("Yellow", "#ca8a04");
											}}
											value="#ca8a04"
										>
											<div className="flex flex-col justify-between items-center gap-2">
												<span className="text-[0.60rem]">Yellow</span>{" "}
												<p className="w-3 h-3 inline-block bg-[#ca8a04] rounded-xl"></p>
											</div>
										</Button>
										<Button
											variant={"ghost"}
											className="w-12 h-12 flex justify-center"
											onClick={() => {
												changeColor("Black", "#000000");
											}}
											value="#000000"
										>
											<div className="flex flex-col justify-between items-center gap-2">
												<span className="text-[0.60rem]">Black</span>{" "}
												<p className="w-3 h-3 inline-block bg-[#000000] rounded-xl"></p>
											</div>
										</Button>
										<Button
											variant={"ghost"}
											className="w-12 h-12 flex justify-center"
											onClick={() => {
												changeColor("Brown", "#431407");
											}}
											value="#431407"
										>
											<div className="flex flex-col justify-between items-center gap-2">
												<span className="text-[0.60rem]">Brown</span>{" "}
												<p className="w-3 h-3 inline-block bg-[#431407] rounded-xl"></p>
											</div>
										</Button>
									</SelectGroup>
								</SelectContent>
							</Select>

							<DialogClose asChild>
								<Button
									onClick={() => {
										editLink(id, updatedName, updatedLink);
									}}
									variant={"default"}
								>
									Update link
									{!isLoading ? (
										<ExternalLinkIcon />
									) : (
										<Loader2 className="animate-spin" />
									)}
								</Button>
							</DialogClose>
						</div>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
