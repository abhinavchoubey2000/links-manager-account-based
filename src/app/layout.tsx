import type { Metadata } from "next";
import "dotenv/config";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ReduxProvider } from "@/redux/Provider";
import { FetchUserData } from "./_components";
import "./globals.css";

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
					</ReduxProvider>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
