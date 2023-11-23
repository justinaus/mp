import { Container as MapDiv } from 'react-naver-maps';

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
      </MapDiv>
    </PageLayout>
  );
}
