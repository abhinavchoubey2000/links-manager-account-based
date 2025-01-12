import React from "react";
import { PlusIcon } from "lucide-react";
import { InputsDialog } from "./_components";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

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
