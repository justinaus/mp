import { Stack } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { Container as MapDiv } from 'react-naver-maps';
import { useRecoilState } from 'recoil';

import PageLayout from '@/components/layout/PageLayout';
import { exploreMapCenterState } from '@/components/map/exploreMapCenterState';
import ExploreNaverMap from '@/components/map/ExploreNaverMap';
import GeolocationButton from '@/components/map/GeolocationButton';
import { LatLng } from '@/components/map/types';

export default function Maps() {
  useEffect(() => {
    fetch(
      `/api/naver/search/allSearch?query=%EC%9D%8C%EC%8B%9D%EC%A0%90&type=all&searchCoord=127.10845479999955%3B37.367722699999945&boundary=`,
    );
  }, []);

  const [exploreMapCenter, setExploreMapCenter] = useRecoilState(
    exploreMapCenterState,
  );

  const handleGetGeolocationPosition = useCallback(
    (latLng: LatLng) => {
      setExploreMapCenter((originData) => ({
        ...originData,
        ...latLng,
      }));
    },
    [setExploreMapCenter],
  );

  return (
    <PageLayout>
      <MapDiv
        style={{
          flex: 1,
        }}
      >
        <ExploreNaverMap />
        <Stack
          spacing={3}
          sx={{
            position: 'absolute',
            right: 4,
            bottom: 20,
            paddingBottom: 4,
            paddingRight: 4,
            zIndex: 1050,
            alignItems: 'flex-end',
          }}
        >
          <GeolocationButton
            onGetGeolocationPosition={handleGetGeolocationPosition}
          />
        </Stack>
      </MapDiv>
    </PageLayout>
  );
}
