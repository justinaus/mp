import { useMemo } from 'react';
import { NaverMap, useNavermaps } from 'react-naver-maps';
import { useRecoilValue } from 'recoil';

import { getIsMobileDevice } from '@/utils/device';

import ExploreNaverMapContent from './ExploreNaverMapContent';
import { exploreMapDefaultCenterAndZoomState } from './exploreState';

export default function ExploreNaverMap() {
  const navermaps = useNavermaps();

  const mapDefaultCenterAndZoom = useRecoilValue(
    exploreMapDefaultCenterAndZoomState,
  );

  const defaultCenter = useMemo(() => {
    return new navermaps.LatLng(
      mapDefaultCenterAndZoom.lat,
      mapDefaultCenterAndZoom.lng,
    );
  }, [
    mapDefaultCenterAndZoom.lat,
    mapDefaultCenterAndZoom.lng,
    navermaps.LatLng,
  ]);

  return (
    <NaverMap
      defaultCenter={defaultCenter}
      defaultZoom={mapDefaultCenterAndZoom.zoom}
      // onCenterChanged={handleChangeCenter}
      // onZoomChanged={handleChangeZoom}
      zoomControl={!getIsMobileDevice()}
      zoomControlOptions={{
        position: navermaps.Position.LEFT_BOTTOM,
      }}
    >
      <ExploreNaverMapContent />
    </NaverMap>
  );
}
