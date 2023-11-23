import { useEffect } from 'react';
import { Container as MapDiv } from 'react-naver-maps';

import PageLayout from '@/components/layout/PageLayout';
import MapContainer from '@/components/map/MapContainer';

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
        <MapContainer />
      </MapDiv>
    </PageLayout>
  );
}
