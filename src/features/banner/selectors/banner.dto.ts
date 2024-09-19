import { ImageDTO } from '@/features/image';
import { BannersQuery } from '@/generated/graphql';

export const bannerSelector = (data: BannersQuery): Array<ImageDTO> => {
  return (
    data?.banners?.data.map((banner) => ({
      id: banner.id || '',
      image: banner.attributes?.image.data?.attributes?.url || '',
    })) ?? []
  );
};
