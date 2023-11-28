import { Stack, Typography } from '@mui/material';
import Image from 'next/image';

import { BLUR_DATA_URL } from '@/constants/image';
import { NaverPlace } from '@/pages/api/naver/search/allSearch';

export type RestaurantInfo = Pick<
  NaverPlace,
  | 'id'
  | 'rank'
  | 'name'
  | 'michelinGuide'
  | 'address'
  | 'businessStatus'
  | 'microReview'
  | 'context'
  | 'homePage'
  | 'thumUrls'
>;

type Props = {
  data: RestaurantInfo;
};

export default function RestaurantListItem({ data }: Props) {
  const { name, rank, thumUrls } = data;

  return (
    <Stack spacing={4}>
      <Stack
        direction={'row'}
        spacing={2}
        sx={{
          alignItems: 'center',
        }}
      >
        <Typography variant="subtitle2">{rank}</Typography>
        <Typography variant="subtitle1">{name}</Typography>
      </Stack>
      <Stack
        spacing={2}
        direction="row"
        sx={
          {
            // overflow: 'scroll',
          }
        }
      >
        {thumUrls.map((url) => (
          <Image
            key={url}
            src={url}
            alt="thumbnail"
            width={80}
            height={80}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            style={{
              borderRadius: 16,
              objectFit: 'cover',
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
}
