"use client";
import { Logo } from "@/components/svg/logo";
import { PhotoInfo, PhotoInfoLoading } from "@/components/photo-info";
import { useGetPhotos } from "@/lib/photos";
import { useUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function Photos() {
  const { data, isLoading } = useGetPhotos();
  const { user, signOut } = useUser();

  if (!user) redirect("/");

  return (
    <div className="max-w-xs md:max-w-125 md:py-6 md:h-screen md:mx-auto">
      <div className="mb-6">
        <Logo />
      </div>
      <div className="mb-10 flex justify-between">
        <h1 className="font-bold text-xl ">All photos</h1>
        <button onClick={signOut}>Sign Out</button>
      </div>
      <div className="space-y-3 max-h-[calc(100vh-40px-28px-75px-24px-24px-48px)] overflow-y-auto">
        {isLoading ? (
          <>
            <PhotoInfoLoading />
            <PhotoInfoLoading />
            <PhotoInfoLoading />
            <PhotoInfoLoading />
          </>
        ) : (
          data?.photos.map((photo) => (
            <PhotoInfo
              key={photo.id}
              id={photo.id}
              name={photo.photographer}
              alt={photo.alt}
              link={photo.photographer_url}
              color={photo.avg_color}
              img={photo.src.medium}
              selected={user?.liked[photo.id]}
            />
          ))
        )}
      </div>
    </div>
  );
}
