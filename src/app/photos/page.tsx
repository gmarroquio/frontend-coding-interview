"use client";
import { Logo } from "@/components/svg/logo";
import { PhotoInfo, PhotoInfoLoading } from "@/components/photo-info";
import { useGetPhotos } from "@/lib/photos";

export default function Photos() {
  const { data, isLoading, isError } = useGetPhotos();

  return (
    <div className="max-w-xs md:max-w-125 md:py-6 md:h-screen md:mx-auto">
      <div className="mb-6">
        <Logo />
      </div>
      <h1 className="font-bold text-xl mb-10">All photos</h1>
      <div className="space-y-3">
        {isLoading ? (
          <>
            <PhotoInfoLoading />
            <PhotoInfoLoading />
            <PhotoInfoLoading />
            <PhotoInfoLoading />
          </>
        ) : (
          data.photos.map((photo) => (
            <PhotoInfo
              key={photo.id}
              name={photo.photographer}
              alt={photo.alt}
              link={photo.photographer_url}
              color={photo.avg_color}
              img={photo.src.medium}
              selected
            />
          ))
        )}
      </div>
    </div>
  );
}
