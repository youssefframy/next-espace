import NavMenu from "@/components/NavMenu";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next space",
  description: "a modern clone for e space",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <NavMenu />
          {children}
        </div>
      </body>
    </html>
  );
}
