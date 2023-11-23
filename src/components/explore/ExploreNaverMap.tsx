import { useMemo } from 'react';
import { NaverMap, useNavermaps } from 'react-naver-maps';
import { useRecoilValue } from 'recoil';

import MarkerCluster from '../map/MarkerCluster';
import { exploreMapCenterState } from './exploreMapCenterState';

export default function ExploreNaverMap() {
  const navermaps = useNavermaps();

  const mapCenter = useRecoilValue(exploreMapCenterState);

  const center = useMemo(() => {
    return new navermaps.LatLng(mapCenter.lat, mapCenter.lng);
  }, [mapCenter.lat, mapCenter.lng, navermaps.LatLng]);

  return (
    <NaverMap
      // defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
      // defaultZoom={15}
      center={center}
      zoom={mapCenter.zoom}
    >
      {/* <Marker defaultPosition={new navermaps.LatLng(37.3595704, 127.105399)} /> */}
      <MarkerCluster />
    </NaverMap>
  );
}
