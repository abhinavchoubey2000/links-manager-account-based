import React from "react";
import { InputsDialog } from "./_components";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export function AddLinkButton() {
	return (
		<>
			<Dialog>
				<DialogTrigger asChild>
					<Button variant={"default"}>
						<PlusIcon />
					</Button>
				</DialogTrigger>
				<DialogContent>
					<InputsDialog />
				</DialogContent>
			</Dialog>
		</>
	);
}
