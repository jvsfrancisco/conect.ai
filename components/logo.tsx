import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export function Logo(props: { className?: string, link?: string }) {
  return (
    <Link href={props.link ?? '/'} className={cn("items-center space-x-2", props.className)}>
      <div className="flex gap-2">
        <span className="text-2xl font-bold sm:inline-block">Conect<span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F8711DFF] to-[#FF0800FF]">.</span>AI</span>
      </div>
    </Link>
  );
}
