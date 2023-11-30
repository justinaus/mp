import { Box, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import queryString from 'query-string';
import { useRecoilValue } from 'recoil';

import { NaverAllSearchResponse } from '@/pages/api/naver/search/allSearch';

import MpOverlay from '../shared/map/MpOverlay';
import ExploreGeolocationButton from './ExploreGeolocationButton';
import { exploreMapCenterState } from './exploreMapCenterState';
import ExploreMapSearchButton from './ExploreMapSearchButton';
import ExploreRestaurantsDrawer from './ExploreRestaurantsDrawer';

export default function ExploreNaverMapContent() {
  const mapCenter = useRecoilValue(exploreMapCenterState);

  const { data } = useQuery<NaverAllSearchResponse>({
    queryKey: ['naver/search/allSearch', mapCenter.lng, mapCenter.lat],
    queryFn: () => {
      const obj = {
        query: '음식점',
        type: 'all',
        searchCoord: `${mapCenter.lng};${mapCenter.lat}`,
        // page: '2',
        // boundary
      };

      return fetch(
        `/api/naver/search/allSearch?${queryString.stringify(obj)}`,
      ).then((res) => res.json());
    },
  });

  return (
    <>
      {/* <Marker defaultPosition={new navermaps.LatLng(37.3595704, 127.105399)} /> */}
      {data?.data &&
        data?.data
          .slice()
          .reverse()
          .map((item) => <MpOverlay key={item.id} restaurant={item} />)}
      <Box
        sx={{
          position: 'absolute',
          top: 4,
          paddingTop: 4,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          zIndex: 100,
        }}
      >
        <ExploreMapSearchButton />
      </Box>
      <Stack
        spacing={3}
        sx={{
          position: 'absolute',
          right: 4,
          bottom: 20,
          paddingBottom: 4,
          paddingRight: 4,
          zIndex: 100,
          alignItems: 'flex-end',
        }}
      >
        <ExploreGeolocationButton />
      </Stack>
      <ExploreRestaurantsDrawer restaurants={data?.data || null} />
    </>
  );
}