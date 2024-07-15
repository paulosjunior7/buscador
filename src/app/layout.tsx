import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Bell, Menu, Plane, SearchCheck, History, Search } from "lucide-react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Buscador de passagens",
  description: "Buscador de passagens com milhas - Azul e Smiles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = "";

  return (
    <>
      <html lang="pt">
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
              <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                  <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link
                      href="/"
                      className="flex items-center gap-2 font-semibold"
                    >
                      <Plane className="h-6 w-6" />
                      <span className="">Buscador passagens</span>
                    </Link>
                    <Button
                      variant="outline"
                      size="icon"
                      className="ml-auto h-8 w-8"
                    >
                      <Bell className="h-4 w-4" />
                      <span className="sr-only">Toggle notifications</span>
                    </Button>
                  </div>
                  <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                      <Link
                        href="/"
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                          pathname.includes('="#') ? "bg-muted" : ""
                        )}
                      >
                        <Search className="h-4 w-4" />
                        Buscar
                      </Link>
                      <Link
                        href="/history"
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                          pathname.includes('="#') ? "bg-muted" : ""
                        )}
                      >
                        <History className="h-4 w-4" />
                        Histórico
                      </Link>
                    </nav>
                  </div>
                  <div className="mt-auto p-4"></div>
                </div>
              </div>
              <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                      >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="flex flex-col">
                      <nav className="grid gap-2 text-lg font-medium">
                        <Link
                          href="#"
                          className="flex items-center gap-2 text-lg font-semibold"
                        >
                          <Plane className="h-6 w-6" />
                          <span className="sr-only">Buscador</span>
                        </Link>

                        <SheetClose asChild>
                          <Link
                            href="/"
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                              pathname.includes('="#') ? "bg-muted" : ""
                            )}
                          >
                            <Search className="h-4 w-4" />
                            Buscar
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link
                            href="/history"
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                              pathname.includes('="#') ? "bg-muted" : ""
                            )}
                          >
                            <SearchCheck className="h-4 w-4" />
                            Histórico
                          </Link>
                        </SheetClose>
                        <Separator />
                      </nav>
                    </SheetContent>
                  </Sheet>
                  <div className="w-full flex-1"></div>
                  <ThemeSwitcher />
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                  {children}
                </main>
              </div>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
