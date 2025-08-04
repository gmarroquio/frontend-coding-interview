import { Logo } from "@/components/svg/logo";
import { PhotoInfo, PhotoInfoLoading } from "@/components/photo-info";

export default function Photos() {
  return (
    <div className="max-w-xs md:max-w-125 md:py-6 md:h-screen md:mx-auto">
      <div className="mb-6">
        <Logo />
      </div>
      <h1 className="font-bold text-xl mb-10">All photos</h1>
      <div className="space-y-3">
        <PhotoInfo
          name={"Jane Doe"}
          alt={"Gold Hour Raindrops"}
          link={"#"}
          color={"#374824"}
          img="/image.png"
          selected
        />
        <PhotoInfo
          name={"photo.photographer"}
          alt={"photo.alt"}
          link={"#"}
          color={"#374824"}
          img="/image.png"
          selected
        />
        <PhotoInfoLoading />
        <PhotoInfoLoading />
        <PhotoInfoLoading />
        <PhotoInfoLoading />
      </div>
    </div>
  );
}
