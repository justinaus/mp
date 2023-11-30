import { Box } from '@mui/material';
import { Container as MapDiv } from 'react-naver-maps';

import ExploreNaverMap from '@/components/explore/ExploreNaverMap';
import PageLayout from '@/components/layout/PageLayout';

import { drawerBleeding } from './SwipeableEdgeDrawer';

export default function Maps() {
  return (
    <PageLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          paddingBottom: `${drawerBleeding - 4}px`,
        }}
      >
        <MapDiv
          style={{
            flex: 1,
          }}
        >
          <ExploreNaverMap />
        </MapDiv>
      </Box>
    </PageLayout>
  );
}
