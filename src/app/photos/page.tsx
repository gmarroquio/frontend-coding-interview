import { Logo } from "@/components/svg/logo";
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
        <div>
          <p className="font-bold">{name}</p>
          <p>{alt}</p>
          <div className="flex items-center space-x-2">
            <p>{color}</p>
            <div className={`h-3 w-3 bg-[${color}]`} />
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

export default function Photos() {
  return (
    <div className="max-w-125 py-6 md:h-screen mx-auto">
      <div className="mb-6">
        <Logo />
      </div>
      <h1 className="font-bold text-xl mb-10">All photos</h1>
      <div className="space-y-3">
        <PhotoInfo
          name={"Jane Doe"}
          alt={"Gold Hour Raindrops"}
          link={"#"}
          color="#374824"
          img="/image.png"
          selected
        />
        <PhotoInfo
          name={"Jane Doe"}
          alt={"Gold Hour Raindrops"}
          link={"#"}
          color="#374824"
          img="/image.png"
          selected
        />
      </div>
    </div>
  );
}
