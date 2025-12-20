"use client";

import Link from "next/link";
import Image from "next/image";

import { useState, useEffect, useMemo } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { createClient } from "@/lib/supabase/client";

const baseNavigation = [
  { name: "Home", href: "/" },
  { name: "Gallery", href: "/gallery" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    const checkAdmin = (user: any) => {
      setIsAdmin(!!user);
    };

    // Check initial state
    supabase.auth.getUser().then(({ data: { user } }) => {
      checkAdmin(user);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      checkAdmin(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const navigation = useMemo(
    () => [
      ...baseNavigation,
      ...(isAdmin ? [{ name: "Dashboard", href: "/admin" }] : []),
    ],
    [isAdmin]
  );

  return (
    <header className="h-22 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 mt-5 hidden md:flex">
          <Link href="/" className="m-10 flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Gyulinyan signature"
              width={90}
              height={50}
              className="hidden object-center sm:inline-block"
            />
          </Link>
          <nav
            key={navigation.length}
            className="flex items-center space-x-6 text-sm font-medium"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link
              href="/"
              className="flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <Image
                src="/logo.png"
                alt="Gyulinyan Gallery"
                width={150}
                height={40}
              />
            </Link>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div key={navigation.length} className="flex flex-col space-y-3">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="transition-colors hover:text-foreground/80"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link href="/" className="flex items-center space-x-2 md:hidden">
              <Image
                src="/logo.png"
                alt="Gyulinyan Gallery"
                width={150}
                height={40}
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
