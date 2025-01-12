"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogTitle,
	DialogFooter,
	DialogHeader,
	DialogContent,
	DialogDescription,
} from "@/components/ui/dialog";

// Manually declare the BeforeInstallPromptEvent type if not defined
interface BeforeInstallPromptEvent extends Event {
	prompt: () => void;
	userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export const AddToDevicePrompt = () => {
	const [openDialog, setOpenDialog] = useState(true);
	const [deferredPrompt, setDeferredPrompt] =
		useState<BeforeInstallPromptEvent | null>(null);
	const [showInstallButton, setShowInstallButton] = useState<boolean>(false);

	useEffect(() => {
		const handleBeforeInstallPrompt = (e: Event) => {
			e.preventDefault();
			const promptEvent = e as BeforeInstallPromptEvent;
			setDeferredPrompt(promptEvent);
			setShowInstallButton(true);
		};

		window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

		return () => {
			window.removeEventListener(
				"beforeinstallprompt",
				handleBeforeInstallPrompt
			);
		};
	}, []);

	const handleInstallClick = () => {
		if (deferredPrompt) {
			deferredPrompt.prompt();
			deferredPrompt.userChoice.then((choiceResult) => {
				if (choiceResult.outcome === "accepted") {
					console.log("User accepted the install prompt");
				} else {
					console.log("User dismissed the install prompt");
				}
				setOpenDialog(false);
				setDeferredPrompt(null);
				setShowInstallButton(false);
			});
		}
	};

	return (
		<>
			{showInstallButton && (
				<Dialog open={openDialog} onOpenChange={setOpenDialog}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Make this app all yours</DialogTitle>
							<DialogDescription>
								Click on the &quot;Install&quot; button to install it as an app.
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<Button onClick={handleInstallClick}>Install</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}
		</>
	);
};
