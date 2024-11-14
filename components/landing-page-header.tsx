"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ColorModeSwitcher } from "./color-mode-switcher";
import { Logo } from "./logo";
import { Button } from "./ui/button";

interface NavProps {
  items?: {
    title: string;
    href: string;
    disabled?: boolean;
    external?: boolean;
  }[];
}

function MobileItems(props: NavProps) {
  return (
    <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 animate-in slide-in-from-bottom-80 md:hidden">
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {props.items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                item.disabled && "cursor-not-allowed opacity-60"
              )}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

function DesktopItems(props: NavProps) {
  const segment = useSelectedLayoutSegment();

  return (
    <nav className="hidden gap-6 md:flex">
      {props.items?.map((item, index) => (
        <Link
          key={index}
          href={item.disabled ? "#" : item.href}
          className={cn(
            "flex items-center text-xl font-medium transition-colors hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-[#ff8c45] to-[#ff0000] sm:text-xl",
            item.href.startsWith(`/${segment}`)
              ? "text-foreground"
              : "text-foreground/60",
            item.disabled && "cursor-not-allowed opacity-80"
          )}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noreferrer" : undefined}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

export function LandingPageHeader({ items }: NavProps) {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

    React.useEffect(() => {
      const handleScroll = () => {
        setIsVisible(window.scrollY > 0); 
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

  return (
    <header
      className={cn(
        `fixed w-full z-50 bg-background/80 px-4 md:px-8 backdrop-blur transition-all duration-500`,
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
      )}
    >
      <div className="flex h-18 items-center justify-between py-4">
        <div className="flex items-center gap-4 md:gap-10">
          <Logo className="hidden md:flex" />

          {items?.length ? <DesktopItems items={items} /> : null}

          <Button
            className="space-x-2 md:hidden"
            variant="ghost"
            size="icon"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>

          <Logo className="md:hidden" />

          {showMobileMenu && items && <MobileItems items={items} />}
        </div>

        <div className="flex gap-4 items-center">
          <ColorModeSwitcher />
        </div>
      </div>
    </header>
  );
}
