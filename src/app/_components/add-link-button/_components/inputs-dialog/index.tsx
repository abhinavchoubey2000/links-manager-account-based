"use client";
import { toast } from "sonner";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAddLinkMutation } from "@/redux/api-slices";
import { SquareCheckBigIcon, Loader2 } from "lucide-react";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { changeLoadingState, storeLinkDataInState } from "@/redux/slices";
import {
	DialogClose,
	DialogDescription,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectTrigger,
} from "@/components/ui/select";

export function InputsDialog() {
	// States and Hooks
	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [link, setLink] = useState("");
	const [addLink, { isLoading }] = useAddLinkMutation();
	const [colorBoxOpen, setColorBoxOpen] = useState(false);
	const [color, setColor] = useState({ name: "Default", colorCode: "#292524" });
	
	// Functions and Handlers
	const saveLink = async () => {
		dispatch(changeLoadingState(true));
		const response = await addLink({
			fullname: name,
			url: link,
			linkColor: color.name,
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
	const changeColor = (name: string, colorCode: string) => {
		setColor({ name, colorCode });
		setColorBoxOpen(false);
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
						<Button onClick={saveLink} variant={"default"}>
							Save link
							{!isLoading ? (
								<SquareCheckBigIcon />
							) : (
								<Loader2 className="animate-spin" />
							)}
						</Button>
					</DialogClose>
				</div>
			</DialogFooter>
		</>
	);
}
