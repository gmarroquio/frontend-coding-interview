import { Link as LinkIcon } from "@/components/svg/link";
import { Star } from "@/components/svg/star";
import Link from "next/link";

export function PhotoInfo({
  name,
  selected,
  img,
  alt,
  color,
  link,
}: {
  name: string;
  selected?: boolean;
  img: string;
  alt: string;
  color: string;
  link: string;
}) {
  return (
    <div className="flex space-x-3">
      <Star selected={selected} />
      <img src={img} className="w-[75px] h-[75px] rounded-lg" />
      <div className="flex w-full justify-between">
        <div className="text-sm leading-none space-y-1.5">
          <p className="font-bold">{name}</p>
          <p>{alt}</p>
          <div className="flex items-center space-x-2">
            <span style={{ color }}>{color}</span>
            <div className={"h-3 w-3"} style={{ backgroundColor: color }} />
          </div>
        </div>
        <div>
          <Link
            href={link}
            className="text-primary flex items-center text-xs space-x-1"
          >
            <div className="h-3 w-3">
              <LinkIcon />
            </div>
            <span>Portifolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function PhotoInfoLoading() {
  return (
    <div className="flex space-x-3">
      <Star />
      <div className="min-w-[75px] w-[75px] h-[75px] rounded-lg bg-gray-400 animate-pulse" />
      <div className="flex w-full justify-between">
        <div className="text-sm leading-none space-y-1.5">
          <p className="font-bold bg-gray-400 text-gray-400 animate-pulse rounded-lg">
            name
          </p>
          <p className="bg-gray-400 text-gray-400 animate-pulse rounded-lg">
            alt
          </p>
          <div className="flex items-center space-x-2">
            <span className="bg-gray-400 text-gray-400 animate-pulse rounded-lg">
              #000000
            </span>
            <div className="h-3 w-3 bg-gray-400 animate-pulse" />
          </div>
        </div>
        <div className="text-primary flex  items-start text-xs space-x-1">
          <div className="h-3 w-3">
            <LinkIcon />
          </div>
          <span>Portifolio</span>
        </div>
      </div>
    </div>
  );
}
