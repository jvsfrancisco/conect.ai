import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export function Logo(props: { className?: string, link?: string }) {
  return (
    <Link href={props.link ?? '/'} className={cn("items-center space-x-2", props.className)}>
      <div className="flex gap-2">
        <Image src="/logo.png" alt="Logo" width={30} height={10}/>
        <span className="text-2xl font-bold sm:inline-block">OportuniMatch</span>
      </div>
    </Link>
  );
}
