import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { useMemo } from 'react';

import { BLUR_DATA_URL } from '@/constants/image';
import { NaverPlace } from '@/pages/api/naver/search/allSearch';

import Links from './Links';

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

export default function RestaurantListItem({
  data: {
    id,
    name,
    rank,
    thumUrls,
    address,
    businessStatus,
    microReview,
    context,
    homePage,
  },
}: Props) {
  const statusText = useMemo(() => {
    const { text, detailInfo } = businessStatus.status;

    if (!text && !detailInfo) return null;

    if (!detailInfo) return text;

    return `${text} | ${detailInfo}`;
  }, [businessStatus.status]);

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
      {statusText && <Typography>{statusText}</Typography>}
      <Typography>{address}</Typography>
      {microReview.length && <Typography>{microReview.join(' | ')}</Typography>}
      {context.length && <Typography>{context.join(' | ')}</Typography>}
      <Links naverId={id} homePage={homePage} />
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
