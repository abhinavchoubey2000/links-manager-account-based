"use client";
import React, { useState } from "react";
import { useAddLinkMutation } from "@/redux/api-slices";
import { changeLoadingState, storeLinkDataInState } from "@/redux/slices";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SquareCheckBigIcon, Loader2 } from "lucide-react";
import {
	DialogClose,
	DialogDescription,
	DialogTitle,
} from "@/components/ui/dialog";

export function InputsDialog() {
	const [name, setName] = useState("");
	const [link, setLink] = useState("");
	const dispatch = useDispatch();
	const [addLink, { isLoading }] = useAddLinkMutation();

	const saveLink = async () => {
		dispatch(changeLoadingState(true));
		const response = await addLink({
			fullname: name,
			url: link,
		});
		toast.success(`${name}`, {
			description: `Added successfully.`,
			descriptionClassName: "text-green-500",
			position: "top-right",
			duration: 3000,
		});
		dispatch(storeLinkDataInState(response.data.data));
		setName("");
		setLink("");
		dispatch(changeLoadingState(false));
	};

	return (
		<>
			<DialogHeader>
				<DialogTitle>Add Link</DialogTitle>
				<DialogDescription>
					Add your favourite links along with the name you like with its url.
				</DialogDescription>
			</DialogHeader>
			<div className="flex flex-col gap-4">
				<Input
					className="bg-seconday"
					placeholder="Name"
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}}
				/>
				<Input
					className="bg-seconday"
					placeholder="URL"
					value={link}
					onChange={(e) => {
						setLink(e.target.value);
					}}
				/>
			</div>
			<DialogFooter>
				<DialogClose asChild>
					<Button onClick={saveLink} variant={"default"}>
						Save link
						{!isLoading ? (
							<SquareCheckBigIcon />
						) : (
							<Loader2 className="animate-spin" />
						)}
					</Button>
				</DialogClose>
			</DialogFooter>
		</>
	);
}
