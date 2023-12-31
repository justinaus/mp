import { Box, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import queryString from 'query-string';
import { useCallback, useEffect } from 'react';
import { useMap } from 'react-naver-maps';
import { useRecoilState, useRecoilValue } from 'recoil';

import { NaverAllSearchResponse } from '@/pages/api/naver/search/allSearch';
import { getIsMobileDevice } from '@/utils/device';

import MpOverlay from '../shared/map/MpOverlay';
import ExploreDrawerOpenButton from './buttons/ExploreDrawerOpenButton';
import ExploreGeolocationButton from './buttons/ExploreGeolocationButton';
import ExploreMapSearchButton from './buttons/ExploreMapSearchButton';
import ExploreRestaurantsDrawer from './ExploreRestaurantsDrawer';
import {
  exploreMapDefaultCenterAndZoomState,
  exploreQueryParamsState,
} from './exploreState';

export default function ExploreNaverMapContent() {
  const map = useMap();

  const [queryParams, setQueryParams] = useRecoilState(exploreQueryParamsState);

  const mapDefaultCenterAndZoom = useRecoilValue(
    exploreMapDefaultCenterAndZoomState,
  );

  useEffect(() => {
    let boundary: string | null = null;

    if (map) {
      const bounds = map.getBounds();

      const arr = [bounds.minX(), bounds.minY(), bounds.maxX(), bounds.maxY()];

      boundary = arr.join(';');
    }

    setQueryParams((oldValue) => ({
      page: 1,
      query: oldValue?.query || '음식점',
      type: oldValue?.type || 'all',
      center: {
        lat: mapDefaultCenterAndZoom.lat,
        lng: mapDefaultCenterAndZoom.lng,
      },
      boundary: boundary,
    }));
  }, [map, mapDefaultCenterAndZoom, setQueryParams]);

  const { data } = useQuery<NaverAllSearchResponse>({
    queryKey: ['naver/search/allSearch', queryParams],
    queryFn: () => {
      if (!queryParams) return Promise.resolve(null);

      const obj = {
        query: queryParams.query,
        type: queryParams.type,
        searchCoord: `${queryParams.center.lng};${queryParams.center.lat}`,
        page: queryParams.page,
        boundary: queryParams.boundary,
      };

      return fetch(
        `/api/naver/search/allSearch?${queryString.stringify(obj)}`,
      ).then((res) => res.json());
    },
  });

  const handleNext = useCallback(() => {
    setQueryParams((oldValue) => ({
      page: oldValue?.page ? oldValue.page + 1 : 1,
      query: oldValue?.query || '음식점',
      type: oldValue?.type || 'all',
      center: {
        lat: mapDefaultCenterAndZoom.lat,
        lng: mapDefaultCenterAndZoom.lng,
      },
      boundary: oldValue?.boundary || null,
    }));
  }, [
    mapDefaultCenterAndZoom.lat,
    mapDefaultCenterAndZoom.lng,
    setQueryParams,
  ]);

  const isMobile = getIsMobileDevice();

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
      {!isMobile && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 20,
            // paddingBottom: 4,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            zIndex: 100,
          }}
        >
          <ExploreDrawerOpenButton />
        </Box>
      )}
      <ExploreRestaurantsDrawer
        restaurants={data?.data || null}
        hasMore={data?.pagination ? data?.pagination?.hasMore : null}
        onNext={handleNext}
      />
    </>
  );
}
