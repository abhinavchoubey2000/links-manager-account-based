import "dotenv/config";
import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { ReduxProvider } from "@/redux/ReduxProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { FetchUserData, AddToDevicePrompt } from "./_components";

export const metadata: Metadata = {
	title: "Links Manager",
	description:
		"Manage your links with ease. Links Manager is a free and open-source link management tool.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="manifest" href="/manifest.json" />
			</head>
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					<ReduxProvider>
						<FetchUserData />
						{children}
						<AddToDevicePrompt />
					</ReduxProvider>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
