import { useMemo } from 'react';
import { NaverMap, useNavermaps } from 'react-naver-maps';
import { useRecoilValue } from 'recoil';

import { getIsMobileDevice } from '@/utils/device';

import { exploreMapCenterState } from './exploreMapCenterState';
import ExploreNaverMapContent from './ExploreNaverMapContent';

export default function ExploreNaverMap() {
  const navermaps = useNavermaps();

  const mapCenter = useRecoilValue(exploreMapCenterState);

  const center = useMemo(() => {
    return new navermaps.LatLng(mapCenter.lat, mapCenter.lng);
  }, [mapCenter.lat, mapCenter.lng, navermaps.LatLng]);

  return (
    <NaverMap
      center={center}
      zoom={mapCenter.zoom}
      zoomControl={!getIsMobileDevice()}
      zoomControlOptions={{
        position: navermaps.Position.LEFT_BOTTOM,
      }}
    >
      <ExploreNaverMapContent />
    </NaverMap>
  );
}
