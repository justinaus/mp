import { useCallback } from 'react';
import { useMap } from 'react-naver-maps';
import { useSetRecoilState } from 'recoil';

import MapSearchButton from '../shared/map/MapSearchButton';
import { exploreMapDefaultCenterAndZoomState } from './exploreState';

export default function ExploreMapSearchButton() {
  const map = useMap();

  const setExploreMapCenter = useSetRecoilState(
    exploreMapDefaultCenterAndZoomState,
  );

  const handleClick = useCallback(() => {
    if (!map) return;

    const center = map.getCenter();

    setExploreMapCenter((originData) => ({
      ...originData,
      lat: center.y,
      lng: center.x,
    }));
  }, [map, setExploreMapCenter]);

  return <MapSearchButton onClick={handleClick} />;
}
