import type {
  MediaItem,
  MediaItemWithOwner,
  UserWithNoPassword,
} from "hybrid-types";
import { useEffect, useState } from "react";
import { fetchData } from "../utils/fetch-data";

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState<MediaItemWithOwner[]>([]);

  useEffect(() => {
    const getMedia = async () => {
      const media = await fetchData<MediaItem[]>(
        import.meta.env.VITE_MEDIA_API + "/media",
      );

      const mediaWithOwners = await Promise.all(
        media.map(async (item) => {
          const owner = await fetchData<UserWithNoPassword>(
            import.meta.env.VITE_AUTH_API + "/users/" + item.user_id,
          );
          const mediaItemWithOwner: MediaItemWithOwner = {
            ...item,
            username: owner.username,
          };
          return mediaItemWithOwner;
        }),
      );
      setMediaArray(mediaWithOwners);
      console.log(mediaWithOwners);
    };
    getMedia();
  }, []);
  return {mediaArray};
};

export {useMedia};
