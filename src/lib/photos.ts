import { useQuery } from "@tanstack/react-query";

type PhotoResponse = {
  photos: {
    id: number;
    photographer: string;
    alt: string;
    photographer_url: string;
    avg_color: string;
    src: { medium: string };
  }[];
};

export const useGetPhotos = (page = 1) =>
  useQuery<PhotoResponse>({
    queryKey: ["all", page],
    queryFn: async () => {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=nature&per_page=10&page=${page}`,
        {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY!,
          },
        }
      );
      if (response.ok) {
        const photos = await response.json();
        return photos;
      } else throw new Error("Can't fetch photos");
    },
  });
