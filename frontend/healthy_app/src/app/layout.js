import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

export const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata = {
    title: "Healthy",
    description: "Healthy life, Healthy living",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                suppressHydrationWarning={true}
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable
                )}
            >
                {children}
            </body>
        </html>
    );
}
