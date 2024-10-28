import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/Header/Header";
import SideNav from "@/components/SideNav/SideNav";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ResCulina",
  description:
    "A recipe generator application built for the technical audition at Payroc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.className} antialiased`}>
        {/* Header */}
        <Header />
        <div className="flex">
          {/* Side Navigation */}
          <div className="hidden md:block">
            <SideNav />
          </div>
          <div className="w-full overflow-x-auto">
            <div className="sm:h-[calc(99vh-60px)] overflow-auto ">
              <div className="w-full flex justify-center mx-auto   overflow-auto h-[calc(100vh - 120px)] overflow-y-auto relative">
                <div className="w-full">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
