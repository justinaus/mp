import { Stack } from '@mui/material';
import { Container as MapDiv } from 'react-naver-maps';

import ExploreGeolocationButton from '@/components/explore/ExploreGeolocationButton';
import ExploreNaverMap from '@/components/explore/ExploreNaverMap';
import PageLayout from '@/components/layout/PageLayout';

export default function Maps() {
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
