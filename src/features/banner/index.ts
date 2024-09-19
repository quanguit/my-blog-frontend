import { BannersQuery } from '@/generated/graphql';

export type ImageDTO = {
  id: string;
  image: string;
};

export const bannerSelector = (data: BannersQuery): Array<ImageDTO> => {
  return (
    data?.banners?.data.map((banner) => ({
      id: banner.id || '',
      image: banner.attributes?.image.data?.attributes?.url || '',
    })) ?? []
  );
};
