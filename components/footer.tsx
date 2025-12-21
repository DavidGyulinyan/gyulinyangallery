import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Twitter } from "lucide-react";

const socialLinks = [
  { name: "Instagram", href: "#", icon: Instagram },
  // { name: "Facebook", href: "#", icon: Facebook },
  // { name: "Twitter", href: "#", icon: Twitter },
];

export function Footer() {
  return (
    <footer className="border-t bg-background flex justify-center items-center p-4">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 items-center justify-center">
          <div className="space-y-3">
            <Link href="/" className="m-10 flex items-center justify-center space-x-2">
              <Image
                src="/logo.png"
                alt="Gyulinyan signature"
                width={120}
                height={50}
                className="hidden object-center sm:inline-block"
              />
            </Link>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Contact</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Yerevan, Armenia</p>
              <p>gyulinyangallery@gmail.com</p>
              <p>+374 93176809</p>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Gyulinyan Gallery. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
