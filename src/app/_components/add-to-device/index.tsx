'use client'
import { useEffect, useState } from "react";

export const AddToDevicePrompt = () => {
	const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
	const [showInstallButton, setShowInstallButton] = useState(false);

	useEffect(() => {
		const handleBeforeInstallPrompt = (e: any) => {
			e.preventDefault();
			setDeferredPrompt(e);
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
			deferredPrompt.userChoice.then((choiceResult: any) => {
				if (choiceResult.outcome === "accepted") {
					console.log("User accepted the install prompt");
				} else {
					console.log("User dismissed the install prompt");
				}
				setDeferredPrompt(null);
				setShowInstallButton(false);
			});
		}
	};

	return (
		<>
			{showInstallButton && (
				<button
					onClick={handleInstallClick}
					className="p-2 bg-blue-500 text-white rounded"
				>
					Add to Device
				</button>
			)}
		</>
	);
};

