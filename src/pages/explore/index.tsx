import { Stack } from '@mui/material';
import { useEffect } from 'react';
import { Container as MapDiv } from 'react-naver-maps';

import ExploreGeolocationButton from '@/components/explore/ExploreGeolocationButton';
import ExploreNaverMap from '@/components/explore/ExploreNaverMap';
import PageLayout from '@/components/layout/PageLayout';

export default function Maps() {
  useEffect(() => {
    fetch(
      `/api/naver/search/allSearch?query=%EC%9D%8C%EC%8B%9D%EC%A0%90&type=all&searchCoord=127.10845479999955%3B37.367722699999945&boundary=`,
    );
  }, []);

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
            zIndex: 100,
            alignItems: 'flex-end',
          }}
        >
          <ExploreGeolocationButton />
        </Stack>
      </MapDiv>
    </PageLayout>
  );
}
